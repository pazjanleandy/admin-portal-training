import React from "react";

export default function LearningPlatformsCarousel({
  platformScrollerRef,
  filteredPlatforms,
  onScrollPlatforms,
  title = "Learning Platforms",
}) {
  return (
    // FULL-BLEED BACKGROUND
    <section className="w-full bg-[#EEE6C8]">
      {/* inner container keeps your normal spacing like other sections */}
      <div className="px-6 py-10">
        <h2 className="text-lg font-semibold mb-6">{title}</h2>

        <div className="relative">
          <button
            onClick={() => onScrollPlatforms(-1)}
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border bg-white grid place-items-center hover:bg-gray-50 transition-colors"
            aria-label="Scroll platforms left"
            type="button"
          >
            ‹
          </button>

          <button
            onClick={() => onScrollPlatforms(1)}
            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border bg-white grid place-items-center hover:bg-gray-50 transition-colors"
            aria-label="Scroll platforms right"
            type="button"
          >
            ›
          </button>

          <div
            ref={platformScrollerRef}
            className="flex justify-center gap-8 overflow-x-auto px-6 py-8"
          >
            {filteredPlatforms.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="w-[260px] h-[160px] bg-white rounded-2xl border flex items-center justify-center gap-3 shadow-md hover:scale-105 transition"
                title={p.name}
              >
                <img src={p.logo} className="h-10" alt={p.name} />
                <span className="font-medium">{p.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
