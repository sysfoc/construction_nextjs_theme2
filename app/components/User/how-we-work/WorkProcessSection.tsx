// app/components/User/how-we-work/WorkProcessSection.tsx
import Image from "next/image";
import Link from "next/link";

export function WorkProcessSection() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Images */}
        <div className="flex gap-3 mb-5 max-w-lg">
          <div className="flex-1 relative aspect-[16/10] rounded-full overflow-hidden">
            <Image
              src="/how-we-work/how-we-work (1).png"
              alt="Construction worker at site"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 relative aspect-[16/10] rounded-full overflow-hidden">
            <Image
              src="/how-we-work/how-we-work (2).png"
              alt="Construction professional"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Heading Text */}
        <p className="text-[var(--foreground)] text-sm md:text-base mb-5">
          Our software development center provides you with the best resources,
          expertise.
        </p>

        {/* List Items */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full border-2 border-[var(--primary)] flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
            </div>
            <span className="text-[var(--foreground)] text-sm md:text-base font-medium">
              Providing Solutions For Construction
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full border-2 border-[var(--primary)] flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
            </div>
            <span className="text-[var(--foreground)] text-sm md:text-base font-medium">
              Work with energetic team
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full border-2 border-[var(--primary)] flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
            </div>
            <span className="text-[var(--foreground)] text-sm md:text-base font-medium">
              Providing Solutions For Construction
            </span>
          </div>
        </div>

        {/* Button */}
        <Link href="/about">
          <button className="bg-[var(--primary)] text-[var(--primary-foreground)] px-8 py-3 text-sm font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity">
            EXPLORE MORE
          </button>
        </Link>
      </div>
    </section>
  );
}
