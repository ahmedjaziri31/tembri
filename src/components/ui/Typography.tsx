import React from 'react'

interface TypographyExampleProps {
  className?: string
  text?: string
  weight?: string
  size?: string
  description?: string
  showCharacterSet?: boolean
}

const TypographyExample: React.FC<TypographyExampleProps> = ({ 
  className, 
  text = "The quick brown fox jumps over the lazy dog", 
  weight,
  size,
  description,
  showCharacterSet = false 
}) => (
  <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-white">
    <div className="flex justify-between items-start mb-3">
      <div>
        {description && <h4 className="text-sm font-medium text-gray-700 mb-1">{description}</h4>}
        <div className="text-xs text-gray-500 space-x-4">
          {size && <span>Size: {size}</span>}
          {weight && <span>Weight: {weight}</span>}
          {className && <span>Class: {className}</span>}
        </div>
      </div>
    </div>
    <div className={className}>
      {text}
    </div>
    {showCharacterSet && (
      <div className={className + " mt-3"}>
        <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
        <div>abcdefghijklmnopqrstuvwxyz</div>
        <div>0123456789 !@#$%^&*()</div>
      </div>
    )}
  </div>
)

interface FontWeightDemoProps {
  size?: string
  className?: string
}

const FontWeightDemo: React.FC<FontWeightDemoProps> = ({ size = "text-2xl", className = "" }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
    <div className="text-center">
      <div className={`${size} ${className} font-regular mb-2`}>Aa</div>
      <div className="text-sm font-medium">Regular</div>
      <div className="text-xs text-gray-500">400</div>
    </div>
    <div className="text-center">
      <div className={`${size} ${className} font-medium mb-2`}>Aa</div>
      <div className="text-sm font-medium">Medium</div>
      <div className="text-xs text-gray-500">500</div>
    </div>
    <div className="text-center">
      <div className={`${size} ${className} font-semibold mb-2`}>Aa</div>
      <div className="text-sm font-medium">Semi Bold</div>
      <div className="text-xs text-gray-500">600</div>
    </div>
    <div className="text-center">
      <div className={`${size} ${className} font-bold mb-2`}>Aa</div>
      <div className="text-sm font-medium">Bold</div>
      <div className="text-xs text-gray-500">700</div>
    </div>
  </div>
)

export const Typography: React.FC = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Typography System</h1>
        <p className="text-lg text-gray-600">
          Our typography system is built with Inter font, offering four precise weights and a comprehensive scale 
          designed for clarity, accessibility, and brand consistency.
        </p>
      </div>

      {/* Font Family Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Inter Font Family</h2>
        <div className="bg-gray-50 p-8 rounded-lg">
          <div className="text-center mb-8">
            <div className="text-8xl font-semibold mb-4" style={{ fontFamily: 'Inter' }}>
              Inter
            </div>
            <div className="text-lg text-gray-600">
              A versatile, modern sans-serif typeface designed for user interfaces
            </div>
          </div>
          
          <div className="text-center mb-6">
            <div className="text-3xl font-regular mb-2" style={{ fontFamily: 'Inter' }}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </div>
            <div className="text-3xl font-regular mb-2" style={{ fontFamily: 'Inter' }}>
              abcdefghijklmnopqrstuvwxyz
            </div>
            <div className="text-3xl font-regular" style={{ fontFamily: 'Inter' }}>
              0123456789 !@#$%^&*()
            </div>
          </div>
        </div>
      </section>

      {/* Font Weights */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Font Weights</h2>
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <FontWeightDemo />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <div className="text-xl font-regular mb-2">Regular</div>
            <div className="text-sm text-gray-600 mb-3">Font Weight: 400</div>
            <div className="text-sm text-gray-500">
              Used for body text, descriptions, and content where readability is key.
            </div>
          </div>
          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <div className="text-xl font-medium mb-2">Medium</div>
            <div className="text-sm text-gray-600 mb-3">Font Weight: 500</div>
            <div className="text-sm text-gray-500">
              Used for labels, form fields, and subtle emphasis within paragraphs.
            </div>
          </div>
          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <div className="text-xl font-semibold mb-2">Semi Bold</div>
            <div className="text-sm text-gray-600 mb-3">Font Weight: 600</div>
            <div className="text-sm text-gray-500">
              Used for headings, subheadings, and important interface elements.
            </div>
          </div>
          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <div className="text-xl font-bold mb-2">Bold</div>
            <div className="text-sm text-gray-600 mb-3">Font Weight: 700</div>
            <div className="text-sm text-gray-500">
              Used for main headlines, call-to-action buttons, and strong emphasis.
            </div>
          </div>
        </div>
      </section>

      {/* Display Text Scale */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Display Text</h2>
        <p className="text-gray-600 mb-6">Large text for hero sections, main headlines, and prominent features.</p>
        
        <TypographyExample
          className="text-display-2xl"
          text="Display 2XL"
          description="Display 2XL"
          size="72px"
          weight="Bold (700)"
        />
        <TypographyExample
          className="text-display-xl"
          text="Display XL"
          description="Display XL"
          size="60px"
          weight="Bold (700)"
        />
        <TypographyExample
          className="text-display-lg"
          text="Display Large"
          description="Display Large"
          size="48px"
          weight="Bold (700)"
        />
        <TypographyExample
          className="text-display-md"
          text="Display Medium"
          description="Display Medium"
          size="36px"
          weight="Bold (700)"
        />
        <TypographyExample
          className="text-display-sm"
          text="Display Small"
          description="Display Small"
          size="30px"
          weight="Semi Bold (600)"
        />
      </section>

      {/* Heading Scale */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Headings</h2>
        <p className="text-gray-600 mb-6">Structured hierarchy for content organization and page sections.</p>
        
        <TypographyExample
          className="text-heading-xl"
          text="Heading XL"
          description="Heading XL"
          size="24px"
          weight="Semi Bold (600)"
        />
        <TypographyExample
          className="text-heading-lg"
          text="Heading Large"
          description="Heading Large"
          size="20px"
          weight="Semi Bold (600)"
        />
        <TypographyExample
          className="text-heading-md"
          text="Heading Medium"
          description="Heading Medium"
          size="18px"
          weight="Semi Bold (600)"
        />
        <TypographyExample
          className="text-heading-sm"
          text="Heading Small"
          description="Heading Small"
          size="16px"
          weight="Semi Bold (600)"
        />
      </section>

      {/* Body Text Scale */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Body Text</h2>
        <p className="text-gray-600 mb-6">Main content text optimized for readability across different contexts.</p>
        
        <TypographyExample
          className="text-body-xl"
          text="Body XL text provides excellent readability for important content sections and introductory paragraphs where you want to make a strong impression."
          description="Body XL"
          size="20px"
          weight="Regular (400)"
        />
        <TypographyExample
          className="text-body-lg"
          text="Body Large text is perfect for lead paragraphs, important descriptions, and content that should stand out while maintaining excellent readability."
          description="Body Large"
          size="18px"
          weight="Regular (400)"
        />
        <TypographyExample
          className="text-body-md"
          text="Body Medium text is our default body text size, providing optimal readability for most content including articles, descriptions, and general interface text."
          description="Body Medium"
          size="16px"
          weight="Regular (400)"
        />
        <TypographyExample
          className="text-body-sm"
          text="Body Small text is used for secondary information, captions, help text, and areas where space is limited but readability is still important."
          description="Body Small"
          size="14px"
          weight="Regular (400)"
        />
        <TypographyExample
          className="text-body-xs"
          text="Body XS text is used for fine print, metadata, timestamps, and other supplementary information that needs to be readable but unobtrusive."
          description="Body XS"
          size="12px"
          weight="Regular (400)"
        />
      </section>

      {/* Label Text Scale */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Labels</h2>
        <p className="text-gray-600 mb-6">Medium weight text for form labels, buttons, and interface elements.</p>
        
        <TypographyExample
          className="text-label-lg"
          text="Label Large"
          description="Label Large"
          size="16px"
          weight="Medium (500)"
        />
        <TypographyExample
          className="text-label-md"
          text="Label Medium"
          description="Label Medium"
          size="14px"
          weight="Medium (500)"
        />
        <TypographyExample
          className="text-label-sm"
          text="Label Small"
          description="Label Small"
          size="12px"
          weight="Medium (500)"
        />
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Usage Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-4">✅ Best Practices</h3>
            <ul className="text-green-700 space-y-2">
              <li>• Use consistent hierarchy throughout your application</li>
              <li>• Maintain proper contrast ratios for accessibility</li>
              <li>• Use Medium weight for interactive elements and labels</li>
              <li>• Reserve Bold weight for primary headlines and CTAs</li>
              <li>• Keep line lengths between 45-75 characters for readability</li>
              <li>• Use sufficient line height for multi-line text</li>
            </ul>
          </div>
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-4">❌ Avoid</h3>
            <ul className="text-red-700 space-y-2">
              <li>• Mixing too many different text sizes on one screen</li>
              <li>• Using Bold weight for large amounts of body text</li>
              <li>• Skipping hierarchy levels (e.g., Display to Body)</li>
              <li>• Using insufficient contrast with background colors</li>
              <li>• Creating overly long lines of text without breaks</li>
              <li>• Using decorative fonts for interface elements</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Implementation Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Implementation Examples</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">CSS Classes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
            <div>
              <h4 className="font-semibold mb-2 font-sans">Display Text:</h4>
              <div className="bg-white p-3 rounded border">
                .text-display-2xl<br/>
                .text-display-xl<br/>
                .text-display-lg<br/>
                .text-display-md<br/>
                .text-display-sm
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 font-sans">Headings:</h4>
              <div className="bg-white p-3 rounded border">
                .text-heading-xl<br/>
                .text-heading-lg<br/>
                .text-heading-md<br/>
                .text-heading-sm
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 font-sans">Body Text:</h4>
              <div className="bg-white p-3 rounded border">
                .text-body-xl<br/>
                .text-body-lg<br/>
                .text-body-md<br/>
                .text-body-sm<br/>
                .text-body-xs
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 font-sans">Labels:</h4>
              <div className="bg-white p-3 rounded border">
                .text-label-lg<br/>
                .text-label-md<br/>
                .text-label-sm
              </div>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold mb-4 mt-6">Font Weights:</h3>
          <div className="bg-white p-3 rounded border text-sm font-mono">
            .font-regular /* 400 */<br/>
            .font-medium /* 500 */<br/>
            .font-semibold /* 600 */<br/>
            .font-bold /* 700 */
          </div>
        </div>
      </section>
    </div>
  )
}

export default Typography 