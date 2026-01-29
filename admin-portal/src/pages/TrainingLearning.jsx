import React, { useRef, useState, useMemo } from "react";
import FiltersPanel from "../components/Training_Learning/FiltersPanel";
import SortFilterDropdown from "../components/content_management/SortFilterDropdown";
import CourseCard from "../components/Training_Learning/CourseCard";
import RecCourses from "../components/Training_Learning/RecCourses";
import LearningPaths from "../components/Training_Learning/LearningPaths";
import CreateCourseModal from "../components/Training_Learning/CreateCourseModal";
import SidebarResponsiveLayout from "../components/Training_Learning/SidebarResponsiveLayout";
import {
  PLATFORMS,
  DUMMY_COURSES,
} from "../components/Training_Learning/TrainingLearningDummyData";
import LearningPlatformsCarousel from "../components/Training_Learning/LearningPlatformsCarousel";
import Pagination from "../components/Training_Learning/Pagination";

const ITEMS_PER_PAGE = 6;

function CourseGridSection({
  paginatedCourses,
  filteredCourses,
  safePage,
  totalPages,
  goToPage,
  handleClearAll,
  onEditCourse,
  onDeleteCourse,
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
              <CourseCard
                key={course.id}
                course={course}
                onEdit={onEditCourse}
                onDelete={onDeleteCourse}
              />
            ))}
          </div>

          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg mb-2">No courses found</p>
          <p className="text-gray-400 text-sm mb-4">Try adjusting your filters</p>
          <button
            onClick={handleClearAll}
            className="px-6 py-2 bg-[#DAB619] text-white rounded-lg hover:bg-[#c4a317] transition-colors font-medium"
            type="button"
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
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);

  const [courses, setCourses] = useState(() => DUMMY_COURSES);

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

    const filtered = courses.filter((course) => {
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
  }, [courses, searchQuery, departmentFilter, roleFilter, skillFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedCourses = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredCourses.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCourses, safePage]);

  const filteredPlatforms = useMemo(() => PLATFORMS, []);
  const recommendedCourses = useMemo(() => courses.slice(0, 6), [courses]);

  const goToPage = (page) => {
    const next = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(next);
  };

  const handleDeleteCourse = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEditCourse = (course) => {
    console.log("Edit course:", course);
  };

  const handleCreateCourseSubmit = (payload) => {
    setCourses((prev) => [
      { ...payload, id: (prev.at(-1)?.id ?? 0) + 1 },
      ...prev,
    ]);
  };

  return (
    <div>
      <LearningPlatformsCarousel
        platformScrollerRef={platformScrollerRef}
        filteredPlatforms={filteredPlatforms}
        onScrollPlatforms={scrollPlatforms}
      />

      <div className="p-6">
        {/* Search + Sort */}
        <div className="mt-8 flex justify-center">
          <div className="max-w-4xl w-full">
            <div className="bg-white rounded-2xl border p-4">
              <div className="flex items-center gap-3">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQueryAndReset(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full h-10 pl-4 pr-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB619]/50"
                />
                <SortFilterDropdown value={sortBy} onChange={setSortByAndReset} />
              </div>
            </div>
          </div>
        </div>

        <SidebarResponsiveLayout
          sidebar={
            <FiltersPanel
              variant="auto"
              showSearch={false}
              showClearTop={false}
              showClearBottom
              departmentFilter={departmentFilter}
              setDepartmentFilter={setDepartmentFilterAndReset}
              roleFilter={roleFilter}
              setRoleFilter={setRoleFilterAndReset}
              skillFilter={skillFilter}
              setSkillFilter={setSkillFilterAndReset}
              onClear={handleClearAll}
            />
          }
          main={
            <CourseGridSection
              paginatedCourses={paginatedCourses}
              filteredCourses={filteredCourses}
              safePage={safePage}
              totalPages={totalPages}
              goToPage={goToPage}
              handleClearAll={handleClearAll}
              onEditCourse={handleEditCourse}
              onDeleteCourse={handleDeleteCourse}
            />
          }
          bottom={
            <>
              <RecCourses title="Recommended for you" courses={recommendedCourses} fullBleed />

              <div className="mt-8 flex justify-end max-w-4xl w-full">
                <button
                  type="button"
                  onClick={() => setIsCreateCourseOpen(true)}
                  className="px-6 py-2.5 rounded-lg bg-[#DAB619] text-white font-semibold hover:bg-[#c4a015] transition shadow-sm"
                >
                  + New Course
                </button>
              </div>

              <LearningPaths defaultOpen={null} />
            </>
          }
        />

        <CreateCourseModal
          open={isCreateCourseOpen}
          onClose={() => setIsCreateCourseOpen(false)}
          onSubmit={handleCreateCourseSubmit}
        />
      </div>
    </div>
  );
}
