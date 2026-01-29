import React from "react";

import SortFilterDropdown from "../content_management/SortFilterDropdown";
import DeparmentDropdown from "../content_management/DepartmentDropdown";
import RoleFilterDropdown from "../alumni_management/RoleFilterDropdown";
import SkillFilterDropdown from "./SkillFilterDropdown";

export default function FiltersPanel({
  searchQuery,
  setSearchQuery,

  sortBy,
  setSortBy,

  departmentFilter,
  setDepartmentFilter,
  roleFilter,
  setRoleFilter,
  skillFilter,
  setSkillFilter,
  onClear,

  variant = "inline",
  showSearch = true,
  showClearTop = true,
  showClearBottom = true,
}) {
  const isSidebar = variant === "sidebar";
  const showSort = sortBy !== undefined && typeof setSortBy === "function";

  const shouldShowBottomClear = isSidebar || (!isSidebar && showClearBottom);

  return (
    <div
      className={
        isSidebar
          ? "bg-white rounded-2xl border border-neutral-200 shadow-sm p-5"
          : "bg-white rounded-2xl border border-neutral-200 shadow-sm p-4"
      }
    >
      {isSidebar && (
        <div className="font-bold text-sm tracking-wide mb-4 text-center">
          FILTER
        </div>
      )}

      {/* Top row (optional search + optional sort) */}
      {(showSearch || showSort) && (
        <div className={isSidebar ? "space-y-3" : "flex items-center gap-3"}>
          {showSearch && (
            <div className={isSidebar ? "" : "flex-1"}>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery ?? ""}
                onChange={(e) => setSearchQuery?.(e.target.value)}
                className="
                  w-full h-10 px-4 rounded-lg
                  border border-neutral-200 bg-white text-sm
                  outline-none
                  focus:ring-2 focus:ring-[#DAB619]/40
                  focus:border-[#DAB619]
                  transition
                "
              />
            </div>
          )}

          {showSort && (
            <div className={isSidebar ? "" : "shrink-0"}>
              <SortFilterDropdown value={sortBy} onChange={setSortBy} />
            </div>
          )}

          {!isSidebar && showClearTop && (
            <button
              type="button"
              onClick={onClear}
              className="h-10 px-5 rounded-lg bg-[#DAB619] text-white text-sm font-semibold hover:brightness-95 transition"
            >
              CLEAR
            </button>
          )}
        </div>
      )}

      {/* Filters layout */}
      <div className="mt-4">
        {isSidebar ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-full max-w-[220px] space-y-4">
              <DeparmentDropdown
                value={departmentFilter}
                onChange={setDepartmentFilter}
              />

              <RoleFilterDropdown
                value={roleFilter}
                onChange={setRoleFilter}
                placeholder="Role"
              />

              <SkillFilterDropdown
                value={skillFilter}
                onChange={setSkillFilter}
              />
            </div>

            {shouldShowBottomClear && (
              <button
                type="button"
                onClick={onClear}
                className="h-10 w-40 rounded-lg bg-[#DAB619] text-white text-sm font-semibold hover:brightness-95 transition"
              >
                CLEAR
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <DeparmentDropdown
                value={departmentFilter}
                onChange={setDepartmentFilter}
              />
              <RoleFilterDropdown
                value={roleFilter}
                onChange={setRoleFilter}
                placeholder="Role"
              />
              <SkillFilterDropdown
                value={skillFilter}
                onChange={setSkillFilter}
              />
            </div>

            {shouldShowBottomClear && (
              <button
                type="button"
                onClick={onClear}
                className="h-10 px-6 rounded-lg bg-[#DAB619] text-white text-sm font-semibold hover:brightness-95 transition"
              >
                CLEAR
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
