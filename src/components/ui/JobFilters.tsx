'use client'

import React, { useState } from 'react'
import { FilterDropdown } from './FilterDropdown'

export function JobFilters() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({
    datePosted: 'anytime',
    remoteWork: 'no-remote',
    experienceLevel: 'entry',
    jobCategory: 'internship',
    employmentType: 'accounting',
    perksAndBenefits: 'gym',
    companySize: '1-50'
  })
  const [resetTrigger, setResetTrigger] = useState(0)

  const datePostedOptions = [
    { label: 'Anytime', value: 'anytime', selected: true },
    { label: 'Last 7 days', value: 'last-7-days' },
    { label: 'Last 14 days', value: 'last-14-days' },
    { label: 'Last 30 days', value: 'last-30-days' }
  ]

  const remoteWorkOptions = [
    { label: 'No remote work', value: 'no-remote', selected: true },
    { label: 'Remote', value: 'remote' },
    { label: 'Few days at home', value: 'hybrid' },
    { label: 'Fully remote', value: 'fully-remote' }
  ]

  const experienceLevelOptions = [
    { label: 'Entry level', value: 'entry', selected: true },
    { label: 'Junior', value: 'junior' },
    { label: 'Mid level', value: 'mid' },
    { label: 'Senior level', value: 'senior' }
  ]

  const jobCategoryOptions = [
    { label: 'Internship', value: 'internship', selected: true },
    { label: 'Full-time', value: 'full-time' },
    { label: 'Part-time', value: 'part-time' },
    { label: 'Contract', value: 'contract' }
  ]

  const employmentTypeOptions = [
    { label: 'Accounting & Finance', value: 'accounting', selected: true },
    { label: 'Digital Marketing', value: 'marketing' },
    { label: 'Computer & IT', value: 'it' },
    { label: 'Business operations', value: 'business' },
    { label: 'Arts', value: 'arts' },
    { label: 'Animal care', value: 'animal' },
    { label: 'Administration & office', value: 'admin' }
  ]

  const perksAndBenefitsOptions = [
    { label: 'On-site gym', value: 'gym', selected: true },
    { label: 'Free coffee', value: 'coffee' },
    { label: 'Long term disability', value: 'disability' },
    { label: 'Short-term disability', value: 'short-disability' },
    { label: 'Life insurance', value: 'life-insurance' },
    { label: 'Vision insurance', value: 'vision' },
    { label: 'Dental insurance', value: 'dental' }
  ]

  const companySizeOptions = [
    { label: '1-50 employees', value: '1-50', selected: true },
    { label: '51-200 employees', value: '51-200' },
    { label: '201-500 employees', value: '201-500' },
    { label: '501-1000 employees', value: '501-1000' },
    { label: '1001-5000 employees', value: '1001-5000' },
    { label: '5001-10,000 employees', value: '5001-10000' },
    { label: '10,000+ employees', value: '10000+' }
  ]

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
    console.log(`${filterType}:`, value)
  }

  const handleResetAll = () => {
    setSelectedFilters({
      datePosted: 'anytime',
      remoteWork: 'no-remote',
      experienceLevel: 'entry',
      jobCategory: 'internship',
      employmentType: 'accounting',
      perksAndBenefits: 'gym',
      companySize: '1-50'
    })
    setResetTrigger(prev => prev + 1)
    console.log('All filters reset')
  }

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <FilterDropdown 
        title="Date posted" 
        options={datePostedOptions}
        onSelectionChange={(value) => handleFilterChange('datePosted', value)}
        resetTrigger={resetTrigger}
        selectedValue={selectedFilters.datePosted}
      />
      
      <FilterDropdown 
        title="Remote work" 
        options={remoteWorkOptions}
        onSelectionChange={(value) => handleFilterChange('remoteWork', value)}
        resetTrigger={resetTrigger}
        selectedValue={selectedFilters.remoteWork}
      />
      
      <FilterDropdown 
        title="Experience level" 
        options={experienceLevelOptions}
        onSelectionChange={(value) => handleFilterChange('experienceLevel', value)}
        resetTrigger={resetTrigger}
        selectedValue={selectedFilters.experienceLevel}
      />
      
      <FilterDropdown 
        title="Job category" 
        options={jobCategoryOptions}
        onSelectionChange={(value) => handleFilterChange('jobCategory', value)}
        resetTrigger={resetTrigger}
        selectedValue={selectedFilters.jobCategory}
      />
      
      <FilterDropdown 
        title="Employment type" 
        options={employmentTypeOptions}
        onSelectionChange={(value) => handleFilterChange('employmentType', value)}
        resetTrigger={resetTrigger}
        selectedValue={selectedFilters.employmentType}
      />
      
      <FilterDropdown 
        title="Perks and benefits" 
        options={perksAndBenefitsOptions}
        onSelectionChange={(value) => handleFilterChange('perksAndBenefits', value)}
        resetTrigger={resetTrigger}
        selectedValue={selectedFilters.perksAndBenefits}
      />
      
      <FilterDropdown 
        title="Company size" 
        options={companySizeOptions}
        onSelectionChange={(value) => handleFilterChange('companySize', value)}
        resetTrigger={resetTrigger}
        selectedValue={selectedFilters.companySize}
      />
      
      <button 
        onClick={handleResetAll}
        className="text-blue-600 hover:text-blue-800 font-medium text-xs px-4 py-2 rounded-full hover:bg-blue-50 transition-colors"
      >
        Reset all
      </button>
    </div>
  )
} 