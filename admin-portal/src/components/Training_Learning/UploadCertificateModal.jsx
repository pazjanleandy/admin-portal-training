import React, { useState } from 'react'

export default function UploadCertificateModal({ isOpen, onClose }) {
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  if (!isOpen) return null

  function handleFile(e) {
    const f = e.target.files && e.target.files[0]
    if (f) {
      setFile(f)
      setProgress(0)
      setIsUploading(false)
    }
  }

  function startUpload() {
    if (!file) return
    setIsUploading(true)
    setProgress(5)
    const iv = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.floor(Math.random() * 20) + 10)
        if (next >= 100) {
          clearInterval(iv)
          setIsUploading(false)
        }
        return next
      })
    }, 250)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[720px] max-w-[95%] bg-white rounded-xl shadow-lg p-8">
        
        {/* Drop Zone */}
        <div 
          className="border-2 border-dashed border-[#dab619] rounded-lg h-56 flex items-center justify-center mb-6 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => document.getElementById('fileInput').click()}
        >
          <div className="text-center">
            <div className="mb-3">
              {/* Cloud Upload Icon */}
              <svg 
                width="56" 
                height="56" 
                viewBox="0 0 24 24" 
                fill="#dab619" 
                className="mx-auto"
              >
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
              </svg>
            </div>
            <div className="text-lg font-medium text-gray-800">Browse Files to upload</div>
          </div>
        </div>

        {/* File Info Row */}
        <div className="flex items-center gap-3 mb-4 bg-gray-100 rounded-full px-2 py-2 pr-4">
          <div className="w-10 h-10 rounded-lg bg-[#F3DF9F] flex items-center justify-center flex-shrink-0">
            {/* File Icon */}
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="#dab619"
            >
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
          </div>
          <div className="flex-1 text-sm text-gray-600 truncate">
            {file ? file.name : 'No selected File -'}
          </div>
          <button 
            onClick={() => { setFile(null); setProgress(0); setIsUploading(false) }} 
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            {/* Trash Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
          <input 
            id="fileInput"
            type="file" 
            onChange={handleFile} 
            className="hidden" 
          />
        </div>

        {/* Progress Section with Floating Badge */}
        <div className="relative mb-8">
          {/* Floating Badge */}
          {isUploading && progress < 100 && (
            <div className="absolute -top-10 left-0 bg-gray-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow-md">
              Verifying Certificate...
            </div>
          )}
          
          {/* Thick Progress Bar */}
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#dab619] rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 rounded-md border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            CANCEL
          </button>
          <button 
            onClick={startUpload} 
            disabled={!file || isUploading}
            className="px-6 py-2.5 rounded-md bg-[#dab619] text-white font-medium hover:bg-[#c49f16] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            UPLOAD
          </button>
        </div>
      </div>
    </div>
  )
}