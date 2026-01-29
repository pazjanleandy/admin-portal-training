import React, { useState, useMemo } from 'react'
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronDown, FiStar, FiUpload } from 'react-icons/fi'
import ContinueCertificationCard from '../components/ContinueCertificationCard'
import CertificateCard from '../components/CertificateCard'
import ViewHistoryCertification from '../components/Training_Learning/ViewHistoryCertification'
import { CONTINUE_CERTIFICATIONS, MY_CERTIFICATES } from '../components/Training_Learning/CertificationDummyData'
import UploadCertificateModal from '../components/Training_Learning/UploadCertificateModal'

export default function CertificationsPage() {
  const [certificateTab, setCertificateTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const itemsPerPage = 6

  const filteredCertificates = useMemo(() => {
    let filtered = MY_CERTIFICATES

    if (searchQuery) {
      filtered = filtered.filter(
        (cert) =>
          cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cert.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply sorting
    if (sortBy === 'newest') {
      filtered = [...filtered].sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))
    } else if (sortBy === 'oldest') {
      filtered = [...filtered].sort((a, b) => new Date(a.issueDate) - new Date(b.issueDate))
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title))
    }

    return filtered
  }, [searchQuery, sortBy])

  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCertificates = filteredCertificates.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  return (
    <div className="space-y-6 p-6">
      {/* History Modal */}
      <ViewHistoryCertification 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
      />

      <UploadCertificateModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />

      {/* Continue Certification Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Continue Certification</h2>
          <button 
            onClick={() => setIsHistoryOpen(true)}
            className="text-yellow-500 hover:text-yellow-600 text-sm font-semibold transition-colors"
          >
            View History
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTINUE_CERTIFICATIONS.map((cert) => (
            <ContinueCertificationCard key={cert.id} certification={cert} />
          ))}
        </div>
      </section>

      {/* My Certificates Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Certificates</h2>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            <div className="relative min-w-[140px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent cursor-pointer pr-10"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="name">Name A-Z</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setCertificateTab('all')}
            className={`flex items-center gap-4 p-5 rounded-xl border transition-all duration-200 ${
              certificateTab === 'all'
                ? 'bg-white border-yellow-400 shadow-md ring-1 ring-yellow-400'
                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#dab619]/40 text-[#dab619]">
              <FiStar size={24} />
            </div>
            <div className="text-left">
              <span className="block text-lg font-bold text-gray-800">
                {filteredCertificates.length} Certificates
              </span>
              <span className="text-sm text-gray-500 font-medium">View all your earned certificates</span>
            </div>
          </button>

          <button
            onClick={() => { setCertificateTab('upload'); setIsUploadOpen(true); }}
            className={`flex items-center gap-4 p-5 rounded-xl border transition-all duration-200 ${
              certificateTab === 'upload'
                ? 'bg-white border-yellow-400 shadow-md ring-1 ring-yellow-400'
                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#dab619]/40 text-[#dab619]">
              <FiUpload size={24} />
            </div>
            <div className="text-left">
              <span className="block text-lg font-bold text-gray-800">Upload New Certificate</span>
              <span className="text-sm text-gray-500 font-medium">Add external certifications</span>
            </div>
          </button>
        </div>

        {/* Certificate Status */}
        <div className="text-sm text-gray-600 mb-6 font-medium">
          Showing {filteredCertificates.length > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + itemsPerPage, filteredCertificates.length)} out of {filteredCertificates.length}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedCertificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-colors"
            >
              <FiChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-yellow-500 text-white'
                    : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-colors"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        )}
      </section>
    </div>
  )
}