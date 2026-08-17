import Link from "next/link";

const images = {
  hero:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=80",
  plantRoom:
    "https://images.unsplash.com/photo-1783962211635-ef0af72c7759?auto=format&fit=crop&w=1200&q=80",
  softLiving:
    "https://images.unsplash.com/photo-1771888703723-01d85da1dae1?auto=format&fit=crop&w=1200&q=80",
  bedroom:
    "https://images.unsplash.com/photo-1737712374342-da1db894a397?auto=format&fit=crop&w=1200&q=80",
  modern:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80",
};

const stats = [
  ["255+", "Rooms restyled"],
  ["18+", "Indian cities"],
  ["96%", "Client clarity"],
  ["4.9", "Session rating"],
];

const process = [
  {
    step: "Step 1",
    title: "Room story",
    copy: "Share photos, room dimensions, budget and the feeling you want the space to hold.",
  },
  {
    step: "Step 2",
    title: "Live styling consult",
    copy: "We map furniture placement, light, storage and decor decisions with you on a focused call.",
  },
  {
    step: "Step 3",
    title: "Action kit",
    copy: "You receive priorities, sourcing cues and a room-by-room edit you can execute with confidence.",
  },
];

const gallery = [
  ["Living room", images.plantRoom],
  ["Bedroom", images.bedroom],
  ["Balcony mood", images.softLiving],
  ["Decor detail", images.modern],
];

function PhotoCard({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <figure className={`reference-photo-card ${className}`}>
      <img src={src} alt={alt} />
    </figure>
  );
}

function RoundSeal({ className = "" }: { className?: string }) {
  return (
    <div className={`reference-round-seal ${className}`} aria-label="Indian Minimalist styling seal">
      <span>IM</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="reference-home">
      <div className="reference-stage">
        <div className="reference-frame">
          <section className="reference-hero">
            <img
              className="reference-hero-photo"
              src={images.hero}
              alt="Moody green living room with layered seating"
            />
            <div className="reference-hero-shade" />

            <div className="reference-plant reference-plant-hero" aria-hidden>
              <span className="reference-pot" />
              <span className="reference-leaf leaf-a" />
              <span className="reference-leaf leaf-b" />
              <span className="reference-leaf leaf-c" />
              <span className="reference-leaf leaf-d" />
            </div>
            <div className="reference-chair reference-chair-left" aria-hidden />
            <div className="reference-chair reference-chair-right" aria-hidden />

            <div className="reference-hero-copy">
              <p className="reference-eyebrow">Premium home styling</p>
              <h1>Your home, edited into calm.</h1>
              <p>
                A cinematic consultation experience for Indian homes that need
                warmth, restraint and a clear styling plan before buying more.
              </p>
              <Link href="/book" className="reference-arrow" aria-label="Book a consultation">
                <span className="sr-only">Book a consultation</span>
              </Link>
            </div>
          </section>

          <section className="reference-intro">
            <div className="reference-intro-copy">
              <p className="reference-eyebrow">About us</p>
              <h2>Minimalism that still feels lived in.</h2>
              <p>
                We help you decide what to keep, what to move and what to add,
                using the furniture, light and textures already available in
                your home.
              </p>

              <div className="reference-stats">
                {stats.map(([value, label]) => (
                  <div key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact" className="reference-cta">
                Contact us
              </Link>
            </div>

            <PhotoCard
              src={images.plantRoom}
              alt="Sunlit living room with plants and a leather sofa"
              className="reference-intro-main"
            />

            <div className="reference-gallery" aria-label="Project mood gallery">
              {gallery.map(([label, src]) => (
                <PhotoCard key={label} src={src} alt={label} />
              ))}
            </div>

            <RoundSeal className="reference-seal-intro" />
          </section>

          <section className="reference-process">
            <div className="reference-plant-silhouette" aria-hidden />
            <PhotoCard
              src={images.softLiving}
              alt="Bright modern living room with soft armchairs"
              className="reference-wide-room"
            />

            <div className="reference-process-copy">
              <p className="reference-eyebrow">How it works</p>
              <h2>A sharper room plan in three steps.</h2>
              <div className="reference-process-list">
                {process.map((item) => (
                  <article key={item.step}>
                    <span>{item.step}</span>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </article>
                ))}
              </div>
              <Link href="/book" className="reference-cta">
                Book consult
              </Link>
            </div>

            <div className="reference-chair reference-accent-chair" aria-hidden />
            <RoundSeal className="reference-seal-process" />
          </section>

          <section className="reference-showcase">
            <img
              src={images.modern}
              alt="Warm modern living room with a low sofa and neutral palette"
            />
            <button className="reference-slider-button" aria-label="Previous project">
              <span className="sr-only">Previous project</span>
            </button>
            <div className="reference-media-tabs" aria-label="Project media types">
              <span>Images</span>
              <span>Reels</span>
              <span>Videos</span>
              <span>360 rooms</span>
              <span>Concept boards</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
