import React from 'react'
import { Button, PrimaryButtonWithIcon, SecondaryButtonWithIcon, OutlinedButtonWithIcon } from './button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'

export const DesignSystemDemo: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-display-lg text-brand-black mb-4">
          DJR Candidate Design System
        </h1>
        <p className="text-body-lg text-gray-600 max-w-3xl mx-auto">
          A comprehensive design system built with Inter typography, semantic colors, 
          and accessible components for modern job recruitment applications.
        </p>
      </header>

      {/* Typography Showcase */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-xl text-brand-black">Typography System</CardTitle>
            <CardDescription className="text-body-md">
              Inter font family with four weights and comprehensive text scales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-heading-md text-brand-black mb-4">Display & Headings</h3>
                <div className="space-y-3">
                  <div className="text-display-sm text-brand-black">Display Small</div>
                  <div className="text-heading-xl text-brand-black">Heading XL</div>
                  <div className="text-heading-lg text-brand-black">Heading Large</div>
                  <div className="text-heading-md text-brand-black">Heading Medium</div>
                  <div className="text-heading-sm text-brand-black">Heading Small</div>
                </div>
              </div>
              <div>
                <h3 className="text-heading-md text-brand-black mb-4">Body & Labels</h3>
                <div className="space-y-3">
                  <div className="text-body-lg text-gray-700">Body Large Text</div>
                  <div className="text-body-md text-gray-700">Body Medium Text (Default)</div>
                  <div className="text-body-sm text-gray-600">Body Small Text</div>
                  <div className="text-label-lg text-gray-800">Label Large</div>
                  <div className="text-label-md text-gray-800">Label Medium</div>
                  <div className="text-label-sm text-gray-800">Label Small</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Color System Showcase */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-xl text-brand-black">Color System</CardTitle>
            <CardDescription className="text-body-md">
              Primary colors, semantic states, and application-specific palettes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Primary Colors */}
              <div>
                <h3 className="text-heading-md text-brand-black mb-4">Primary Colors</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-blue rounded-lg"></div>
                    <div>
                      <div className="text-label-md text-brand-black">Brand Blue</div>
                      <div className="text-body-xs text-gray-500">#3C66F9</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-black rounded-lg"></div>
                    <div>
                      <div className="text-label-md text-brand-black">Brand Black</div>
                      <div className="text-body-xs text-gray-500">#0D0C13</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-gray rounded-lg border"></div>
                    <div>
                      <div className="text-label-md text-brand-black">Brand Gray</div>
                      <div className="text-body-xs text-gray-500">#F5F5F5</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Semantic Colors */}
              <div>
                <h3 className="text-heading-md text-brand-black mb-4">Semantic Colors</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-success rounded-lg"></div>
                    <div>
                      <div className="text-label-md text-brand-black">Success</div>
                      <div className="text-body-xs text-gray-500">Confirmations</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-warning rounded-lg"></div>
                    <div>
                      <div className="text-label-md text-brand-black">Warning</div>
                      <div className="text-body-xs text-gray-500">Caution</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-danger rounded-lg"></div>
                    <div>
                      <div className="text-label-md text-brand-black">Danger</div>
                      <div className="text-body-xs text-gray-500">Errors</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-info rounded-lg"></div>
                    <div>
                      <div className="text-label-md text-brand-black">Info</div>
                      <div className="text-body-xs text-gray-500">Information</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Categories */}
              <div>
                <h3 className="text-heading-md text-brand-black mb-4">Job Categories</h3>
                <div className="grid grid-cols-4 gap-2">
                  <div className="w-8 h-8 bg-category-teal rounded-lg"></div>
                  <div className="w-8 h-8 bg-category-green rounded-lg"></div>
                  <div className="w-8 h-8 bg-category-purple rounded-lg"></div>
                  <div className="w-8 h-8 bg-category-lime rounded-lg"></div>
                  <div className="w-8 h-8 bg-category-yellow rounded-lg"></div>
                  <div className="w-8 h-8 bg-category-orange rounded-lg"></div>
                  <div className="w-8 h-8 bg-category-magenta rounded-lg"></div>
                  <div className="w-8 h-8 bg-category-pink rounded-lg"></div>
                </div>
                <div className="text-body-xs text-gray-500 mt-2">
                  8 distinct colors for job categorization
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Button System Showcase */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-xl text-brand-black">Button System</CardTitle>
            <CardDescription className="text-body-md">
              Consistent button styles with semantic colors and proper typography
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Primary Buttons */}
              <div>
                <h3 className="text-heading-sm text-brand-black mb-4">Primary Buttons</h3>
                <div className="space-y-3">
                  <div>
                    <Button variant="primary">My Account</Button>
                  </div>
                  <div>
                    <PrimaryButtonWithIcon>My Account</PrimaryButtonWithIcon>
                  </div>
                  <div>
                    <Button variant="primary" size="lg">Large Primary</Button>
                  </div>
                </div>
              </div>

              {/* Secondary & Outline Buttons */}
              <div>
                <h3 className="text-heading-sm text-brand-black mb-4">Secondary & Outline</h3>
                <div className="space-y-3">
                  <div>
                    <SecondaryButtonWithIcon>My Account</SecondaryButtonWithIcon>
                  </div>
                  <div>
                    <OutlinedButtonWithIcon>My Account</OutlinedButtonWithIcon>
                  </div>
                  <div>
                    <Button variant="outline" size="lg">Large Outline</Button>
                  </div>
                </div>
              </div>

              {/* Semantic Buttons */}
              <div>
                <h3 className="text-heading-sm text-brand-black mb-4">Semantic States</h3>
                <div className="space-y-3">
                  <div>
                    <Button variant="success">Success Action</Button>
                  </div>
                  <div>
                    <Button variant="warning">Warning Action</Button>
                  </div>
                  <div>
                    <Button variant="destructive">Delete</Button>
                  </div>
                  <div>
                    <Button variant="info">Info Action</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Interactive Demo */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-xl text-brand-black">Interactive Example</CardTitle>
            <CardDescription className="text-body-md">
              A realistic interface demonstrating typography hierarchy and color usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-heading-xl text-brand-black mb-2">Software Developer Position</h2>
                    <p className="text-body-md text-gray-600 mb-1">TechCorp Inc. • San Francisco, CA</p>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 bg-category-teal rounded-full"></span>
                      <span className="text-label-sm text-gray-700">Technology</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-label-md text-brand-black">$120k - $150k</div>
                    <div className="text-body-sm text-gray-500">Full-time</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-heading-md text-brand-black mb-3">Job Description</h3>
                  <p className="text-body-md text-gray-700 mb-4">
                    We&apos;re looking for a talented Software Developer to join our growing team. 
                    You&apos;ll work on cutting-edge projects using modern technologies and collaborate 
                    with a passionate team of engineers.
                  </p>
                  
                  <h4 className="text-heading-sm text-brand-black mb-2">Requirements</h4>
                  <ul className="text-body-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>3+ years of experience with React and TypeScript</li>
                    <li>Strong knowledge of modern web development practices</li>
                    <li>Experience with design systems and component libraries</li>
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-label-sm text-gray-500 mb-1">Application Status</div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-warning rounded-full"></span>
                        <span className="text-label-md text-gray-800">Under Review</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline">View Details</Button>
                      <PrimaryButtonWithIcon>Apply Now</PrimaryButtonWithIcon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Implementation Guide */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-xl text-brand-black">Implementation Guide</CardTitle>
            <CardDescription className="text-body-md">
              Ready-to-use classes and components for consistent design
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-heading-md text-brand-black mb-4">Typography Classes</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-body-sm font-mono">
                  <div className="space-y-1">
                    <div>{/* Display text */}</div>
                    <div>.text-display-2xl</div>
                    <div>.text-display-xl</div>
                    <div>.text-display-lg</div>
                    <div className="mt-3">{/* Headings */}</div>
                    <div>.text-heading-xl</div>
                    <div>.text-heading-lg</div>
                    <div>.text-heading-md</div>
                    <div className="mt-3">{/* Body text */}</div>
                    <div>.text-body-lg</div>
                    <div>.text-body-md</div>
                    <div>.text-body-sm</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-heading-md text-brand-black mb-4">Color Classes</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-body-sm font-mono">
                  <div className="space-y-1">
                    <div>{/* Primary colors */}</div>
                    <div>.text-brand-blue</div>
                    <div>.bg-brand-blue</div>
                    <div className="mt-3">{/* Semantic colors */}</div>
                    <div>.text-success</div>
                    <div>.bg-success</div>
                    <div>.text-warning</div>
                    <div>.bg-warning</div>
                    <div className="mt-3">{/* Job categories */}</div>
                    <div>.bg-category-teal</div>
                    <div>.bg-category-green</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default DesignSystemDemo 