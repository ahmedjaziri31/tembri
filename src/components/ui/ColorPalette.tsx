import React from 'react'

interface ColorSwatchProps {
  color: string
  name: string
  value: string
  textColor?: string
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, name, value, textColor = 'white' }) => (
  <div className="flex flex-col">
    <div
      className="w-20 h-20 rounded-lg shadow-sm border border-gray-200 flex items-end justify-center p-2"
      style={{ backgroundColor: color }}
    >
      <span
        className="text-xs font-medium"
        style={{ color: textColor }}
      >
        {name}
      </span>
    </div>
    <div className="mt-2 text-center">
      <div className="text-sm font-medium text-gray-900">{name}</div>
      <div className="text-xs text-gray-500 font-mono">{value}</div>
    </div>
  </div>
)

interface ColorScaleProps {
  colors: { name: string; value: string; textColor?: string }[]
  title: string
  description?: string
}

const ColorScale: React.FC<ColorScaleProps> = ({ colors, title, description }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    {description && <p className="text-gray-600 text-sm mb-4">{description}</p>}
    <div className="flex gap-4 flex-wrap">
      {colors.map((color, index) => (
        <ColorSwatch
          key={index}
          color={color.value}
          name={color.name}
          value={color.value}
          textColor={color.textColor}
        />
      ))}
    </div>
  </div>
)

export const ColorPalette: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">DJR Candidate Color System</h1>
      
      {/* Primary Colors */}
      <ColorScale
        title="Primary Colors"
        description="The main brand colors used throughout the application"
        colors={[
          { name: 'Black', value: '#0D0C13', textColor: 'white' },
          { name: 'Blue', value: '#3C66F9', textColor: 'white' },
          { name: 'Gray', value: '#F5F5F5', textColor: 'black' },
        ]}
      />

      {/* Semantic Colors - Danger */}
      <ColorScale
        title="Danger / Error Colors"
        description="Used for error states, destructive actions, and critical alerts"
        colors={[
          { name: '50', value: '#fef1f1', textColor: 'black' },
          { name: '100', value: '#fee0e0', textColor: 'black' },
          { name: '200', value: '#fec6c6', textColor: 'black' },
          { name: '300', value: '#fe9d9d', textColor: 'black' },
          { name: '400', value: '#ff6969', textColor: 'white' },
          { name: '500', value: '#fd383b', textColor: 'white' },
          { name: '600', value: '#ed1619', textColor: 'white' },
          { name: '700', value: '#c31114', textColor: 'white' },
        ]}
      />

      {/* Semantic Colors - Warning */}
      <ColorScale
        title="Warning Colors"
        description="Used for warning states, caution messages, and attention-grabbing elements"
        colors={[
          { name: '50', value: '#fffef5', textColor: 'black' },
          { name: '100', value: '#fff6ca', textColor: 'black' },
          { name: '200', value: '#fdeab5', textColor: 'black' },
          { name: '300', value: '#fbd446', textColor: 'black' },
          { name: '400', value: '#ffcb1b', textColor: 'black' },
          { name: '500', value: '#ffad0d', textColor: 'white' },
          { name: '600', value: '#e2970c', textColor: 'white' },
          { name: '700', value: '#bb5b02', textColor: 'white' },
        ]}
      />

      {/* Semantic Colors - Success */}
      <ColorScale
        title="Success Colors"
        description="Used for success states, confirmations, and positive feedback"
        colors={[
          { name: '50', value: '#edf1c3', textColor: 'black' },
          { name: '100', value: '#d3f8e1', textColor: 'black' },
          { name: '200', value: '#aaf0c9', textColor: 'black' },
          { name: '300', value: '#73e2ad', textColor: 'black' },
          { name: '400', value: '#3bcc88', textColor: 'white' },
          { name: '500', value: '#17b26f', textColor: 'white' },
          { name: '600', value: '#0cb461', textColor: 'white' },
          { name: '700', value: '#09734a', textColor: 'white' },
        ]}
      />

      {/* Semantic Colors - Info */}
      <ColorScale
        title="Info Colors"
        description="Used for informational messages, tooltips, and neutral feedback"
        colors={[
          { name: '50', value: '#f0f6fe', textColor: 'black' },
          { name: '100', value: '#ddeafc', textColor: 'black' },
          { name: '200', value: '#c2dbfb', textColor: 'black' },
          { name: '300', value: '#99c6f7', textColor: 'black' },
          { name: '400', value: '#68a712', textColor: 'white' },
          { name: '500', value: '#458aec', textColor: 'white' },
          { name: '600', value: '#3470e2', textColor: 'white' },
          { name: '700', value: '#2754ce', textColor: 'white' },
        ]}
      />

      {/* Job Categories Colors */}
      <ColorScale
        title="Job Category Colors"
        description="Used for categorizing different job types on the home page"
        colors={[
          { name: 'Teal', value: '#6BD4CC', textColor: 'black' },
          { name: 'Green', value: '#7BBF6A', textColor: 'white' },
          { name: 'Purple', value: '#C4A7E7', textColor: 'black' },
          { name: 'Lime', value: '#8FD460', textColor: 'black' },
          { name: 'Yellow', value: '#F5D547', textColor: 'black' },
          { name: 'Orange', value: '#F5A547', textColor: 'black' },
          { name: 'Magenta', value: '#E667E4', textColor: 'white' },
          { name: 'Pink', value: '#F58AA6', textColor: 'black' },
        ]}
      />

      {/* Calendar Colors */}
      <ColorScale
        title="Calendar Entry Colors"
        description="Used for different types of calendar events and entries"
        colors={[
          { name: 'Red', value: '#FF1166', textColor: 'white' },
          { name: 'Lavender', value: '#D8C7F0', textColor: 'black' },
          { name: 'Purple', value: '#7B2D9E', textColor: 'white' },
          { name: 'Light Blue', value: '#C7E0F0', textColor: 'black' },
          { name: 'Mint', value: '#C7F0E0', textColor: 'black' },
          { name: 'Rose', value: '#F0C7D8', textColor: 'black' },
          { name: 'Light Purple', value: '#E0C7F0', textColor: 'black' },
        ]}
      />

      {/* Application Status Colors */}
      <ColorScale
        title="Application Status Colors"
        description="Used for tracking application states and progress"
        colors={[
          { name: 'Pending', value: '#D8C7F0', textColor: 'black' },
          { name: 'Active', value: '#7B2D9E', textColor: 'white' },
        ]}
      />

      {/* Usage Guidelines */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Usage Guidelines</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium mb-2">Primary Colors</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• <strong>Blue (#3C66F9):</strong> Primary actions, links, focus states</li>
              <li>• <strong>Black (#0D0C13):</strong> Text, borders, backgrounds</li>
              <li>• <strong>Gray (#F5F5F5):</strong> Subtle backgrounds, dividers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Semantic Colors</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• <strong>Danger:</strong> Errors, destructive actions</li>
              <li>• <strong>Warning:</strong> Caution, pending states</li>
              <li>• <strong>Success:</strong> Confirmations, completed states</li>
              <li>• <strong>Info:</strong> Neutral information, tips</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorPalette 