import React from "react";

const CourseCard = ({ course, onEdit, onDelete }) => {
  return (
    <div className="relative group h-full">
      {/* Edit/Delete (Admin only) */}
      {(onEdit || onDelete) && (
        <div className="absolute top-3 left-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onEdit(course);
              }}
              className="px-3 py-1 text-xs rounded-md bg-[#DAB619] text-white hover:bg-blue-700 shadow"
            >
              Edit
            </button>
          )}

          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onDelete(course.id);
              }}
              className="px-3 py-1 text-xs rounded-md bg-red-600 text-white hover:bg-red-700 shadow"
            >
              Delete
            </button>
          )}
        </div>
      )}

      {/* Card */}
      <a
        href={course.url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group cursor-pointer border border-gray-100 hover:border-[#DAB619]/30"
      >
        {/* Image Section */}
        <div className="relative w-full h-48 overflow-hidden bg-gray-50 flex items-center justify-center p-8">
          <img
            src={course.image}
            alt={course.platform}
            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
          />

          {/* Duration Badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-white shadow-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 border border-gray-100">
              {course.duration}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#DAB619] uppercase tracking-wider">
              {course.category}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {course.platform}
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 leading-tight group-hover:text-[#DAB619] transition-colors">
            {course.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
            {course.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 truncate max-w-[100px]">
                {course.instructor.name}
              </span>
            </div>

            <span className="font-bold text-lg text-[#DAB619]">
              ₱{course.price}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default CourseCard;
