import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const imageId = params.id;
    const imageRecord = await prisma.uploadedImage.findUnique({
      where: { id: imageId },
    });

    if (!imageRecord) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const uploadsDir = path.join(process.cwd(), "uploads");
    const filePath = path.join(uploadsDir, imageRecord.filePath);

    const fileBuffer = await readFile(filePath);
    const contentType = imageRecord.mimeType || "image/jpeg";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Image fetch error", details: error.message }, { status: 500 });
  }
}
