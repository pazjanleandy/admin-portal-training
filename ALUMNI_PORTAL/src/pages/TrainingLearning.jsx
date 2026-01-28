import React, { useRef, useState, useEffect, useMemo } from "react";
import FiltersPanel from "../components/Training_Learning/FiltersPanel";
import SortFilterDropdown from "../components/content_management/SortFilterDropdown";
import CourseCard from "../components/Training_Learning/CourseCard";
import RecCourses from "../components/Training_Learning/RecCourses";
import LearningPaths from "../components/Training_Learning/LearningPaths"; // ✅ ADD THIS

const PLATFORMS = [
  {
    name: "Microsoft Learning",
    href: "https://learn.microsoft.com/training/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Udemy",
    href: "https://www.udemy.com/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
  },
  {
    name: "LinkedIn Learning",
    href: "https://www.linkedin.com/learning/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
  },
  {
    name: "IBM SkillsBuild",
    href: "https://skillsbuild.org/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
];

// Dummy Data
const DUMMY_COURSES = [
  {
    id: 1,
    title: "HTML & CSS Mastery 2025 - Build Modern Websites",
    description:
      "Master modern HTML5 and CSS3 from scratch. Build responsive, accessible websites with Flexbox, Grid, and animations.",
    category: "Programming",
    duration: "3 Months",
    skill: "HTML/CSS",
    department: "Engineering",
    role: "Frontend Developer",
    instructor: { name: "Lira Johnson", avatar: "https://i.pravatar.cc/150?img=1" },
    price: 0,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
    platform: "Udemy",
    url: "https://www.udemy.com/course/html-css-mastery-2025/",
  },
  {
    id: 2,
    title: "AWS Cloud Practitioner Essentials",
    description:
      "Learn AWS fundamentals including EC2, S3, and RDS. Prepare for the AWS Certified Cloud Practitioner exam.",
    category: "Cloud",
    duration: "2 Months",
    skill: "AWS",
    department: "Engineering",
    role: "Cloud Architect",
    instructor: { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?img=5" },
    price: 0,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    platform: "IBM SkillsBuild",
    url: "https://skillsbuild.org/",
  },
  {
    id: 3,
    title: "React.js Fundamentals - Complete Guide",
    description:
      "Master React hooks, components, and state management. Build modern single-page applications from scratch.",
    category: "Programming",
    duration: "4 Months",
    skill: "React",
    department: "Engineering",
    role: "Full Stack Developer",
    instructor: { name: "Mike Ross", avatar: "https://i.pravatar.cc/150?img=8" },
    price: 0,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
    platform: "Udemy",
    url: "https://www.udemy.com/",
  },
  {
    id: 4,
    title: "Azure Fundamentals AZ-900",
    description:
      "Microsoft Azure basics including cloud concepts, core services, security, privacy, compliance, and pricing.",
    category: "Cloud",
    duration: "3 Months",
    skill: "Azure",
    department: "IT",
    role: "Cloud Engineer",
    instructor: { name: "Emily Davis", avatar: "https://i.pravatar.cc/150?img=9" },
    price: 0,
    image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    platform: "Microsoft Learning",
    url: "https://learn.microsoft.com/training/",
  },
  {
    id: 5,
    title: "Leadership and Management Essentials",
    description:
      "Develop critical leadership skills, team management, and strategic thinking for modern business environments.",
    category: "Management",
    duration: "2 Months",
    skill: "Leadership",
    department: "Operations",
    role: "Manager",
    instructor: { name: "Robert Wilson", avatar: "https://i.pravatar.cc/150?img=11" },
    price: 0,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    platform: "LinkedIn Learning",
    url: "https://www.linkedin.com/learning/",
  },
  {
    id: 6,
    title: "Python for Data Science",
    description:
      "Learn Python programming with focus on data analysis, Pandas, NumPy, and data visualization techniques.",
    category: "Data Science",
    duration: "3 Months",
    skill: "Python",
    department: "Analytics",
    role: "Data Scientist",
    instructor: { name: "Alex Turner", avatar: "https://i.pravatar.cc/150?img=12" },
    price: 0,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
    platform: "Udemy",
    url: "https://www.udemy.com/",
  },
  {
    id: 7,
    title: "Cybersecurity Fundamentals",
    description:
      "IBM's comprehensive cybersecurity course covering network security, threats, and protection strategies.",
    category: "Security",
    duration: "4 Months",
    skill: "Cybersecurity",
    department: "IT",
    role: "Security Analyst",
    instructor: { name: "Lisa Park", avatar: "https://i.pravatar.cc/150?img=15" },
    price: 0,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    platform: "IBM SkillsBuild",
    url: "https://skillsbuild.org/",
  },
  {
    id: 8,
    title: "Power Platform Fundamentals",
    description:
      "Microsoft Power Apps, Power Automate, and Power BI basics for business process automation.",
    category: "Low-Code",
    duration: "2 Months",
    skill: "Power Platform",
    department: "Operations",
    role: "Business Analyst",
    instructor: { name: "David Kim", avatar: "https://i.pravatar.cc/150?img=3" },
    price: 0,
    image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    platform: "Microsoft Learning",
    url: "https://learn.microsoft.com/training/",
  },
];

const ITEMS_PER_PAGE = 6;

function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const pages = [];
  const left = Math.max(2, currentPage - 1);
  const right = Math.min(totalPages - 1, currentPage + 1);

  pages.push(1);
  if (left > 2) pages.push("...");

  for (let p = left; p <= right; p++) pages.push(p);

  if (right < totalPages - 1) pages.push("...");
  pages.push(totalPages);

  return pages;
}

function CourseGridSection({
  paginatedCourses,
  filteredCourses,
  safePage,
  totalPages,
  goToPage,
  handleClearAll,
}) {
  return (
    <div className="mt-6">
      <div className="mb-4 text-sm text-gray-600 flex justify-between items-center">
        <span>
          Showing {paginatedCourses.length} of {filteredCourses.length} courses
        </span>
        {filteredCourses.length > 0 && (
          <span className="text-gray-400">
            Page {safePage} of {totalPages}
          </span>
        )}
      </div>

      {filteredCourses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-end gap-3">
            <button
              className="px-5 py-2.5 bg-[#DAB619] text-white hover:bg-[#c4a015] disabled:opacity-50 disabled:cursor-not-allowed rounded-md border border-[#AAA9A9] transition-colors"
              disabled={safePage === 1}
              onClick={() => goToPage(1)}
            >
              FIRST
            </button>

            <div className="inline-flex items-center rounded-md bg-white shadow-sm overflow-hidden border border-[#AAA9A9]">
              <button
                className="px-3 py-2.5 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                disabled={safePage === 1}
                onClick={() => goToPage(safePage - 1)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex items-center px-1">
                {getPageNumbers(safePage, totalPages).map((page, idx) =>
                  page === "..." ? (
                    <span key={`ellipsis-${idx}`} className="px-4 py-2.5 text-[#7B7B7B] font-bold">
                      …
                    </span>
                  ) : (
                    <button
                      key={page}
                      className={`px-4 py-2.5 min-w-[40px] text-center transition-colors ${
                        page === safePage
                          ? "bg-[#D7D7D7] text-[#7B7B7B] font-semibold"
                          : "text-[#7B7B7B] hover:bg-[#F0F0F0]"
                      }`}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                className="px-3 py-2.5 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                disabled={safePage === totalPages}
                onClick={() => goToPage(safePage + 1)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <button
              className="px-5 py-2.5 bg-[#DAB619] text-white hover:bg-[#c4a015] disabled:opacity-50 disabled:cursor-not-allowed rounded-md border border-[#AAA9A9] transition-colors"
              disabled={safePage === totalPages}
              onClick={() => goToPage(totalPages)}
            >
              LAST
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg mb-2">No courses found</p>
          <p className="text-gray-400 text-sm mb-4">Try adjusting your filters</p>
          <button
            onClick={handleClearAll}
            className="px-6 py-2 bg-[#DAB619] text-white rounded-lg hover:bg-[#c4a317] transition-colors font-medium"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function TrainingLearning() {
  const platformScrollerRef = useRef(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const setSearchQueryAndReset = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };
  const setSortByAndReset = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };
  const setDepartmentFilterAndReset = (value) => {
    setDepartmentFilter(value);
    setCurrentPage(1);
  };
  const setRoleFilterAndReset = (value) => {
    setRoleFilter(value);
    setCurrentPage(1);
  };
  const setSkillFilterAndReset = (value) => {
    setSkillFilter(value);
    setCurrentPage(1);
  };

  const scrollPlatforms = (dir) => {
    platformScrollerRef.current?.scrollBy({ left: 320 * dir, behavior: "smooth" });
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSortBy("newest");
    setDepartmentFilter("");
    setRoleFilter("");
    setSkillFilter("");
    setCurrentPage(1);
  };

  const filteredCourses = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();

    const filtered = DUMMY_COURSES.filter((course) => {
      const matchesSearch =
        !searchQuery ||
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower) ||
        course.instructor.name.toLowerCase().includes(searchLower);

      const matchesDepartment = !departmentFilter || course.department === departmentFilter;
      const matchesRole = !roleFilter || course.role === roleFilter;
      const matchesSkill = !skillFilter || course.skill === skillFilter;

      return matchesSearch && matchesDepartment && matchesRole && matchesSkill;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "newest") return (b.id ?? 0) - (a.id ?? 0);
      if (sortBy === "oldest") return (a.id ?? 0) - (b.id ?? 0);
      if (sortBy === "title-az") return a.title.localeCompare(b.title);
      if (sortBy === "title-za") return b.title.localeCompare(a.title);
      return 0;
    });

    return sorted;
  }, [searchQuery, departmentFilter, roleFilter, skillFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedCourses = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredCourses.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCourses, safePage]);

  const filteredPlatforms = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return PLATFORMS.filter((p) => p.name.toLowerCase().includes(q));
  }, [searchQuery]);

  useEffect(() => {
    const sidebar =
      document.getElementById("app-sidebar") || document.querySelector('[data-sidebar="true"]');

    if (!sidebar) return;

    const update = () => {
      setIsSidebarCollapsed(sidebar.getBoundingClientRect().width <= 120);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(sidebar);

    return () => ro.disconnect();
  }, []);

  const goToPage = (page) => {
    const next = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(next);
  };

  const recommendedCourses = useMemo(() => DUMMY_COURSES.slice(0, 6), []);

  return (
    <div className="p-6">
      {/* Platforms Carousel */}
      <section className="rounded-2xl px-16 py-10 bg-[#EEE6C8]">
        <h2 className="text-lg font-semibold mb-6">Learning Platforms</h2>

        <div className="relative">
          <button
            onClick={() => scrollPlatforms(-1)}
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border bg-white grid place-items-center hover:bg-gray-50 transition-colors"
          >
            ‹
          </button>

          <button
            onClick={() => scrollPlatforms(1)}
            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border bg-white grid place-items-center hover:bg-gray-50 transition-colors"
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
                className="w-[240px] h-[120px] bg-white rounded-2xl border flex items-center justify-center gap-3 shadow-md hover:scale-105 transition"
              >
                <img src={p.logo} className="h-10" alt={p.name} />
                <span className="font-medium">{p.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Search + Sort */}
      <div className="mt-8 flex justify-center">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-2xl border p-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQueryAndReset(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full h-10 pl-4 pr-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB619]/50"
                />
              </div>

              <SortFilterDropdown value={sortBy} onChange={setSortByAndReset} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters + Grid */}
      {isSidebarCollapsed ? (
        <>
          <div className="mt-6 grid grid-cols-12 gap-6">
            <aside className="col-span-3">
              <FiltersPanel
                variant="sidebar"
                showSearch={false}
                showClearTop={false}
                departmentFilter={departmentFilter}
                setDepartmentFilter={setDepartmentFilterAndReset}
                roleFilter={roleFilter}
                setRoleFilter={setRoleFilterAndReset}
                skillFilter={skillFilter}
                setSkillFilter={setSkillFilterAndReset}
                onClear={handleClearAll}
              />
            </aside>

            <main className="col-span-9">
              <CourseGridSection
                paginatedCourses={paginatedCourses}
                filteredCourses={filteredCourses}
                safePage={safePage}
                totalPages={totalPages}
                goToPage={goToPage}
                handleClearAll={handleClearAll}
              />
            </main>
          </div>

          <RecCourses title="Recommended for you" courses={recommendedCourses} fullBleed />

          {/* ✅ ADD LEARNING PATHS UNDER CAROUSEL */}
          <LearningPaths defaultOpen={null} />
        </>
      ) : (
        <div className="mt-1 flex flex-col items-center">
          <div className="max-w-4xl w-full">
            <FiltersPanel
              variant="inline"
              showSearch={false}
              showClearTop={false}
              showClearBottom={true}
              departmentFilter={departmentFilter}
              setDepartmentFilter={setDepartmentFilterAndReset}
              roleFilter={roleFilter}
              setRoleFilter={setRoleFilterAndReset}
              skillFilter={skillFilter}
              setSkillFilter={setSkillFilterAndReset}
              onClear={handleClearAll}
            />

            <CourseGridSection
              paginatedCourses={paginatedCourses}
              filteredCourses={filteredCourses}
              safePage={safePage}
              totalPages={totalPages}
              goToPage={goToPage}
              handleClearAll={handleClearAll}
            />
          </div>

          <RecCourses title="Recommended for you" courses={recommendedCourses} fullBleed />

          {/* ✅ ADD LEARNING PATHS UNDER CAROUSEL */}
          <LearningPaths defaultOpen={null} />
        </div>
      )}
    </div>
  );
}
