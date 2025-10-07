'use client'

import { useRef, useEffect, useState } from 'react'
import { Bold, Italic, Underline, List, ListOrdered, Heading1, Heading2, Heading3, Type, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  // Set initial content
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ''
    }
  }, [value])

  // Handle content change
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  // Execute formatting command
  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  // Toolbar button component
  const ToolbarButton = ({ 
    onClick, 
    icon: Icon, 
    title 
  }: { 
    onClick: () => void
    icon: React.ElementType
    title: string 
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
    >
      <Icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
    </button>
  )

  return (
    <div className={`border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden ${isFocused ? 'ring-2 ring-blue-500 border-blue-500' : ''} ${className}`}>
      {/* Toolbar */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 p-2 flex flex-wrap gap-1">
        {/* Text Style */}
        <div className="flex gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
          <ToolbarButton
            onClick={() => executeCommand('bold')}
            icon={Bold}
            title="Bold (Ctrl+B)"
          />
          <ToolbarButton
            onClick={() => executeCommand('italic')}
            icon={Italic}
            title="Italic (Ctrl+I)"
          />
          <ToolbarButton
            onClick={() => executeCommand('underline')}
            icon={Underline}
            title="Underline (Ctrl+U)"
          />
        </div>

        {/* Headings */}
        <div className="flex gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
          <ToolbarButton
            onClick={() => executeCommand('formatBlock', 'h1')}
            icon={Heading1}
            title="Heading 1"
          />
          <ToolbarButton
            onClick={() => executeCommand('formatBlock', 'h2')}
            icon={Heading2}
            title="Heading 2"
          />
          <ToolbarButton
            onClick={() => executeCommand('formatBlock', 'h3')}
            icon={Heading3}
            title="Heading 3"
          />
          <button
            type="button"
            onClick={() => executeCommand('formatBlock', 'p')}
            title="Normal text"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <Type className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
          <ToolbarButton
            onClick={() => executeCommand('insertUnorderedList')}
            icon={List}
            title="Bullet List"
          />
          <ToolbarButton
            onClick={() => executeCommand('insertOrderedList')}
            icon={ListOrdered}
            title="Numbered List"
          />
        </div>

        {/* Alignment */}
        <div className="flex gap-1">
          <ToolbarButton
            onClick={() => executeCommand('justifyLeft')}
            icon={AlignLeft}
            title="Align Left"
          />
          <ToolbarButton
            onClick={() => executeCommand('justifyCenter')}
            icon={AlignCenter}
            title="Align Center"
          />
          <ToolbarButton
            onClick={() => executeCommand('justifyRight')}
            icon={AlignRight}
            title="Align Right"
          />
        </div>

        {/* Font Size */}
        <div className="ml-2">
          <select
            onChange={(e) => executeCommand('fontSize', e.target.value)}
            className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            defaultValue="3"
          >
            <option value="1">Very Small</option>
            <option value="2">Small</option>
            <option value="3">Normal</option>
            <option value="4">Medium</option>
            <option value="5">Large</option>
            <option value="6">Very Large</option>
            <option value="7">Huge</option>
          </select>
        </div>
      </div>

      {/* Editor Content */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="min-h-[300px] p-4 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 prose prose-sm dark:prose-invert max-w-none"
        data-placeholder={placeholder}
        style={{
          overflowY: 'auto',
          maxHeight: '500px'
        }}
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          display: block;
        }
      `}</style>
    </div>
  )
}

