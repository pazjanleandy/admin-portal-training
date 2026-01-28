import React, { useRef } from "react";
import CourseCard from "./CourseCard";

export default function RecCourses({ title = "Recommended for you", courses = [] }) {
  const scrollerRef = useRef(null);

  const scrollByCards = (dir) => {
    scrollerRef.current?.scrollBy({ left: 420 * dir, behavior: "smooth" });
  };

  if (!courses || courses.length === 0) return null;

  return (
    <section className="mt-10">
      {/* full-bleed breakout */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-[#EEE6C8]">
        <div className="px-6 sm:px-10 py-10">
          <h2 className="text-lg font-semibold mb-6 text-center sm:text-left">
            {title}
          </h2>

          <div className="relative">
            {/* left */}
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                         h-10 w-10 rounded-full border bg-white grid place-items-center
                         hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Scroll left"
            >
              ‹
            </button>

            {/* right */}
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10
                         h-10 w-10 rounded-full border bg-white grid place-items-center
                         hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Scroll right"
            >
              ›
            </button>

            {/* track */}
            <div
              ref={scrollerRef}
              className="
                flex justify-center gap-8
                overflow-x-auto scroll-smooth
                pb-2
                [scrollbar-width:none] [-ms-overflow-style:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="
                    shrink-0
                    w-[min(360px,80vw)]
                    sm:w-[340px]
                    md:w-[360px]
                  "
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
