import React from 'react'
import { FiX } from 'react-icons/fi'
import { CONTINUE_CERTIFICATIONS } from './CertificationDummyData'

export default function ViewHistoryCertification({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-white rounded shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-[#8B7A32] italic">
            History
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto">
          {CONTINUE_CERTIFICATIONS.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No certification history available
            </div>
          ) : (
            CONTINUE_CERTIFICATIONS.map((cert) => {
              const isDone = cert.progress === cert.totalLessons
              
              return (
                <div
                  key={cert.id}
                  className="flex items-center px-6 py-5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                >
                  {/* Left: Title and Provider */}
                  <div className="flex-1 pr-4">
                    <h3 className="text-sm font-bold text-[#111111]">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      LinkedIn Learning • {cert.instructor.name}
                    </p>
                  </div>

                  {/* Center: Date */}
                  <div className="flex-1 text-center">
                    <span className="text-sm text-gray-500">
                      {isDone ? 'Finished' : 'Last Visited'}: June 2019
                    </span>
                  </div>

                  {/* Right: Buttons with rounded corners */}
                  <div className="flex-1 flex items-center justify-end gap-2">
                    <span
                      className={`w-[80px] py-1.5 rounded-sm text-xs font-bold border text-center ${
                        isDone
                          ? 'border-[#199A08] text-[#199A08] bg-white'
                          : 'border-[#DF9919] text-[#DF9919] bg-white'
                      }`}
                    >
                      {isDone ? 'Done' : 'Ongoing'}
                    </span>

                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-[80px] py-1.5 rounded-sm bg-[#808080] hover:bg-[#6a6a6a] text-white text-xs font-bold text-center block"
                    >
                      View
                    </a>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}