import React from 'react'
import { FiDownload } from 'react-icons/fi'

export default function CertificateCard({ certificate }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-64 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center overflow-hidden">
        {/* Certificate Design */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 text-yellow-400 text-6xl">🏆</div>
          <div className="absolute bottom-4 right-4 border-4 border-yellow-400 rounded-full w-16 h-16"></div>
        </div>

        <div className="relative text-center text-white px-4">
          <div className="text-xs uppercase tracking-widest text-yellow-300 mb-2">Certificate</div>
          <div className="text-xl font-bold mb-3">{certificate.name}</div>
          <div className="text-sm text-gray-200 max-w-xs">{certificate.holderName}</div>
        </div>

        {/* Decorative border */}
        <div className="absolute inset-4 border-2 border-yellow-400 rounded-lg pointer-events-none"></div>
      </div>

      <div className="p-4 bg-gray-50">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold text-gray-800 text-sm">{certificate.title}</h4>
            <p className="text-xs text-gray-600 mt-1">{certificate.issuer}</p>
          </div>
          <button className="p-2 text-gray-600 hover:text-yellow-500 transition-colors">
            <FiDownload size={18} />
          </button>
        </div>

        <div className="flex justify-between items-center text-xs text-gray-600">
          <span>
            {certificate.issueDate} • {certificate.expiryDate}
          </span>
        </div>

        <p className="text-xs text-gray-700 mt-3 line-clamp-2">{certificate.description}</p>
      </div>
    </div>
  )
}
