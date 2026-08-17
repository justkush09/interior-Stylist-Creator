import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const consultationId = formData.get("consultationId") as string | null;
    const spaceCategory = formData.get("spaceCategory") as string | null;

    if (!file || !consultationId) {
      return NextResponse.json({ error: "File and consultationId are required" }, { status: 400 });
    }

    // File validation: MAX 10MB, JPG/PNG/WEBP only
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only JPG, PNG, and WEBP allowed." }, { status: 400 });
    }

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File size exceeds 10MB limit." }, { status: 400 });
    }

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const ext = path.extname(file.name) || ".jpg";
    const filename = `${crypto.randomUUID()}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));

    // Save record to DB
    const imageRecord = await prisma.uploadedImage.create({
      data: {
        consultationId,
        spaceCategory: spaceCategory || "General",
        filePath: filename,
        originalName: file.name,
        mimeType: file.type,
        sizeBytes: file.size,
      },
    });

    return NextResponse.json({
      success: true,
      image: {
        id: imageRecord.id,
        url: `/api/images/${imageRecord.id}`,
        spaceCategory: imageRecord.spaceCategory,
      },
    });
  } catch (error: any) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ error: "Failed to upload image", details: error.message }, { status: 500 });
  }
}
