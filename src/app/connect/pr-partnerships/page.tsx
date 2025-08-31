'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

export default function PRPartnershipsPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    jobTitle: '',
    inquiryType: '',
    partnershipType: '',
    budget: '',
    timeline: '',
    message: '',
    receiveInfo: false,
    agreeTerms: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    console.log('PR & Partnerships form submitted:', formData)
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
              PR & Partnerships
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
              Interested in partnering with us or exploring PR opportunities? Share your vision 
              and let's discuss how we can collaborate to create something extraordinary together.
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

            {/* Third Row - Job Title & Inquiry Type */}
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
                <label htmlFor="inquiryType" className="block text-white font-body mb-2">
                  Inquiry Type*
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-gray-600 focus:border-[#336b62] text-white py-3 px-0 focus:outline-none transition-colors duration-300"
                >
                  <option value="" className="bg-black">Select inquiry type</option>
                  <option value="partnership" className="bg-black">Strategic Partnership</option>
                  <option value="pr" className="bg-black">Public Relations</option>
                  <option value="collaboration" className="bg-black">Creative Collaboration</option>
                  <option value="media" className="bg-black">Media Inquiry</option>
                  <option value="other" className="bg-black">Other</option>
                </select>
              </div>
            </div>

            {/* Fourth Row - Partnership Type & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="partnershipType" className="block text-white font-body mb-2">
                  Partnership Type
                </label>
                <select
                  id="partnershipType"
                  name="partnershipType"
                  value={formData.partnershipType}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b-2 border-gray-600 focus:border-[#336b62] text-white py-3 px-0 focus:outline-none transition-colors duration-300"
                >
                  <option value="" className="bg-black">Select partnership type</option>
                  <option value="brand-partnership" className="bg-black">Brand Partnership</option>
                  <option value="technology" className="bg-black">Technology Partnership</option>
                  <option value="content" className="bg-black">Content Collaboration</option>
                  <option value="event" className="bg-black">Event Partnership</option>
                  <option value="influencer" className="bg-black">Influencer Partnership</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="block text-white font-body mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b-2 border-gray-600 focus:border-[#336b62] text-white py-3 px-0 focus:outline-none transition-colors duration-300"
                >
                  <option value="" className="bg-black">Select budget range</option>
                  <option value="under-10k" className="bg-black">Under $10,000</option>
                  <option value="10k-50k" className="bg-black">$10,000 - $50,000</option>
                  <option value="50k-100k" className="bg-black">$50,000 - $100,000</option>
                  <option value="100k-500k" className="bg-black">$100,000 - $500,000</option>
                  <option value="500k-plus" className="bg-black">$500,000+</option>
                  <option value="discuss" className="bg-black">Prefer to discuss</option>
                </select>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <label htmlFor="timeline" className="block text-white font-body mb-2">
                Project Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b-2 border-gray-600 focus:border-[#336b62] text-white py-3 px-0 focus:outline-none transition-colors duration-300"
              >
                <option value="" className="bg-black">Select timeline</option>
                <option value="asap" className="bg-black">ASAP</option>
                <option value="1-month" className="bg-black">Within 1 month</option>
                <option value="3-months" className="bg-black">Within 3 months</option>
                <option value="6-months" className="bg-black">Within 6 months</option>
                <option value="flexible" className="bg-black">Flexible timeline</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-white font-body mb-2">
                Tell us about your vision and goals*
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                placeholder="Describe your partnership goals, campaign objectives, or PR needs..."
                className="w-full bg-transparent border-b-2 border-gray-600 focus:border-[#336b62] text-white py-3 px-0 focus:outline-none transition-colors duration-300 resize-none placeholder-gray-500"
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
                  I agree to receive information from Maison Elaris about partnership opportunities.
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
                Submit Partnership Inquiry
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
