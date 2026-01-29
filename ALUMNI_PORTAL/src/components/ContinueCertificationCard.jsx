import React from 'react'
import { FiClock } from 'react-icons/fi'

export default function ContinueCertificationCard({ certification }) {
  const progressPercentage = (certification.progress / certification.totalLessons) * 100

  return (
    <a 
      href={certification.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="relative">
        <img
          src={certification.image}
          alt={certification.title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-3 right-3 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
          {certification.status}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm mb-3 line-clamp-2">
          {certification.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <img
            src={certification.instructor.avatar}
            alt={certification.instructor.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-xs text-gray-600">{certification.instructor.name}</span>
        </div>

        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-600">Progress</span>
            <span className="text-xs font-semibold text-gray-700">
              Lesson {certification.progress} of {certification.totalLessons}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </a>
  )
}