'use client'

import React from 'react'
import Image from 'next/image'

interface JobCardProps {
  id: string
  title: string
  company: string
  location: string
  description: string
  logo: string
  jobType: 'On site' | 'Remote' | 'Hybrid'
  employmentType: 'Full time' | 'Part time' | 'Contract'
  experience?: string
  onLearnMore?: (id: string) => void
  onApply?: (id: string) => void
}

export function JobCard({
  id,
  title,
  company,
  location,
  description,
  logo,
  jobType,
  employmentType,
  experience,
  onLearnMore,
  onApply
}: JobCardProps) {
  const handleLearnMore = () => {
    if (onLearnMore) {
      onLearnMore(id)
    }
  }

  const handleApply = () => {
    if (onApply) {
      onApply(id)
    }
  }

  const getJobTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'On site':
        return 'bg-blue-100 text-blue-800'
      case 'Remote':
        return 'bg-green-100 text-green-800'
      case 'Hybrid':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Header with Logo and Company */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Image
            src={logo}
            alt={`${company} logo`}
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {title}
          </h3>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-700">{company}</p>
            <p className="text-sm text-gray-500">{location}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {description}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeBadgeColor(jobType)}`}>
          {jobType}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {employmentType}
        </span>
        {experience && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {experience}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleLearnMore}
          className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors"
        >
          Learn more
        </button>
        <button
          onClick={handleApply}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  )
} 