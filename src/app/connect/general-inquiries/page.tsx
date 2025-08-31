'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

export default function GeneralInquiriesPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    jobTitle: '',
    market: '',
    message: '',
    receiveInfo: false,
    agreeTerms: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative min-h-screen flex items-center justify-center">
        <section className="w-full max-w-4xl mx-auto px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4 tracking-tight">
              LET'S CONNECT
            </h1>
            <p className="text-[#336b62] text-xl lg:text-2xl font-heading font-medium mb-8">
              General Inquiries
            </p>
            
            {/* Back Button */}
            <Link href="/connect">
              <button className="bg-[#336b62] hover:bg-[#2a5751] text-white px-8 py-3 rounded-full transition-colors duration-300 font-body font-medium mb-8">
                Back To Contact
              </button>
            </Link>
          </div>

          {/* Description */}
          <div className="text-center mb-12">
            <p className="text-lg text-gray-300 font-body leading-relaxed max-w-2xl mx-auto">
              For all other enquiries, please complete the form below. Our team will be in touch 
              if there's an immediate opportunity within the agency.
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* First Row - First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-white font-body mb-2">
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-gray-600 focus:border-[#336b62] text-white py-3 px-0 focus:outline-none transition-colors duration-300"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-white font-body mb-2">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-gray-600 focus:border-[#336b62] text-white py-3 px-0 focus:outline-none transition-colors duration-300"
                />
              </div>
            </div>

            {/* Second Row - Company & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block text-white font-body mb-2">
                  Company*
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-gray-600 focus:border-[#336b62] text-white py-3 px-0 focus:outline-none transition-colors duration-300"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white font-body mb-2">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-gray-600 focus:border-[#336b62] text-white py-3 px-0 focus:outline-none transition-colors duration-300"
                />
              </div>
            </div>

            {/* Third Row - Job Title & Market */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="jobTitle" className="block text-white font-body mb-2">
                  Job Title*
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-gray-600 focus:border-[#336b62] text-white py-3 px-0 focus:outline-none transition-colors duration-300"
                />
              </div>
              <div>
                <label htmlFor="market" className="block text-white font-body mb-2">
                  Market*
                </label>
                <input
                  type="text"
                  id="market"
                  name="market"
                  value={formData.market}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-gray-600 focus:border-[#336b62] text-white py-3 px-0 focus:outline-none transition-colors duration-300"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-white font-body mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-transparent border-b-2 border-gray-600 focus:border-[#336b62] text-white py-3 px-0 focus:outline-none transition-colors duration-300 resize-none"
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="receiveInfo"
                  name="receiveInfo"
                  checked={formData.receiveInfo}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 accent-[#336b62]"
                />
                <label htmlFor="receiveInfo" className="text-white font-body text-sm">
                  I agree to receive information from Maison Elaris.
                </label>
              </div>
              
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-4 h-4 accent-[#336b62]"
                />
                <label htmlFor="agreeTerms" className="text-white font-body text-sm">
                  I agree to the <span className="text-[#336b62] underline">Terms and Conditions</span> *
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="bg-[#336b62] hover:bg-[#2a5751] text-white px-12 py-3 rounded-full transition-colors duration-300 font-body font-medium"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
