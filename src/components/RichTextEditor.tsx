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
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set())

  // Set initial content
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ''
    }
  }, [value])

  // Update active formats based on cursor position
  const updateActiveFormats = () => {
    const formats = new Set<string>()
    
    // Check inline styles (bold, italic, underline)
    if (document.queryCommandState('bold')) formats.add('bold')
    if (document.queryCommandState('italic')) formats.add('italic')
    if (document.queryCommandState('underline')) formats.add('underline')
    
    // Check list formats
    if (document.queryCommandState('insertUnorderedList')) formats.add('ul')
    if (document.queryCommandState('insertOrderedList')) formats.add('ol')
    
    // Check alignment
    if (document.queryCommandState('justifyLeft')) formats.add('left')
    if (document.queryCommandState('justifyCenter')) formats.add('center')
    if (document.queryCommandState('justifyRight')) formats.add('right')
    
    // Check block format (headings)
    const formatBlock = document.queryCommandValue('formatBlock').toLowerCase()
    if (formatBlock === 'h1') formats.add('h1')
    if (formatBlock === 'h2') formats.add('h2')
    if (formatBlock === 'h3') formats.add('h3')
    
    setActiveFormats(formats)
  }

  // Handle content change
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
      updateActiveFormats()
    }
  }

  // Handle selection change to update active formats
  const handleSelectionChange = () => {
    if (editorRef.current?.contains(document.activeElement)) {
      updateActiveFormats()
    }
  }

  // Listen for selection changes
  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange)
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [])

  // Execute formatting command with toggle support
  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    
    // Small delay to ensure DOM updates before checking state
    setTimeout(() => {
      handleInput()
    }, 10)
  }

  // Toggle heading format (removes heading if already applied)
  const toggleHeading = (tag: string) => {
    const currentFormat = document.queryCommandValue('formatBlock').toLowerCase()
    
    // If already this heading, convert to paragraph (toggle off)
    if (currentFormat === tag) {
      executeCommand('formatBlock', 'p')
    } else {
      executeCommand('formatBlock', tag)
    }
  }

  // Toolbar button component with active state
  const ToolbarButton = ({ 
    onClick, 
    icon: Icon, 
    title,
    isActive = false
  }: { 
    onClick: () => void
    icon: React.ElementType
    title: string
    isActive?: boolean
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded transition-all ${
        isActive 
          ? 'bg-blue-500 text-white hover:bg-blue-600' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
      }`}
    >
      <Icon className="w-4 h-4" />
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
            isActive={activeFormats.has('bold')}
          />
          <ToolbarButton
            onClick={() => executeCommand('italic')}
            icon={Italic}
            title="Italic (Ctrl+I)"
            isActive={activeFormats.has('italic')}
          />
          <ToolbarButton
            onClick={() => executeCommand('underline')}
            icon={Underline}
            title="Underline (Ctrl+U)"
            isActive={activeFormats.has('underline')}
          />
        </div>

        {/* Headings */}
        <div className="flex gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
          <ToolbarButton
            onClick={() => toggleHeading('h1')}
            icon={Heading1}
            title="Heading 1"
            isActive={activeFormats.has('h1')}
          />
          <ToolbarButton
            onClick={() => toggleHeading('h2')}
            icon={Heading2}
            title="Heading 2"
            isActive={activeFormats.has('h2')}
          />
          <ToolbarButton
            onClick={() => toggleHeading('h3')}
            icon={Heading3}
            title="Heading 3"
            isActive={activeFormats.has('h3')}
          />
          <ToolbarButton
            onClick={() => executeCommand('formatBlock', 'p')}
            icon={Type}
            title="Normal Text"
            isActive={!activeFormats.has('h1') && !activeFormats.has('h2') && !activeFormats.has('h3')}
          />
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
          <ToolbarButton
            onClick={() => executeCommand('insertUnorderedList')}
            icon={List}
            title="Bullet List"
            isActive={activeFormats.has('ul')}
          />
          <ToolbarButton
            onClick={() => executeCommand('insertOrderedList')}
            icon={ListOrdered}
            title="Numbered List"
            isActive={activeFormats.has('ol')}
          />
        </div>

        {/* Alignment */}
        <div className="flex gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
          <ToolbarButton
            onClick={() => executeCommand('justifyLeft')}
            icon={AlignLeft}
            title="Align Left"
            isActive={activeFormats.has('left')}
          />
          <ToolbarButton
            onClick={() => executeCommand('justifyCenter')}
            icon={AlignCenter}
            title="Align Center"
            isActive={activeFormats.has('center')}
          />
          <ToolbarButton
            onClick={() => executeCommand('justifyRight')}
            icon={AlignRight}
            title="Align Right"
            isActive={activeFormats.has('right')}
          />
        </div>

        {/* Font Size */}
        <div className="ml-2">
          <select
            onChange={(e) => {
              executeCommand('fontSize', e.target.value)
              // Reset to default after applying
              setTimeout(() => {
                e.target.value = '3'
              }, 100)
            }}
            className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
        onMouseUp={updateActiveFormats}
        onKeyUp={updateActiveFormats}
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
        
        /* Ensure proper styling for formatted content */
        [contenteditable] :global(h1) {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }
        
        [contenteditable] :global(h2) {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
        }
        
        [contenteditable] :global(h3) {
          font-size: 1.17em;
          font-weight: bold;
          margin: 0.83em 0;
        }
        
        [contenteditable] :global(b),
        [contenteditable] :global(strong) {
          font-weight: bold;
        }
        
        [contenteditable] :global(i),
        [contenteditable] :global(em) {
          font-style: italic;
        }
        
        [contenteditable] :global(u) {
          text-decoration: underline;
        }
        
        [contenteditable] :global(ul),
        [contenteditable] :global(ol) {
          margin: 1em 0;
          padding-left: 2em;
        }
        
        [contenteditable] :global(li) {
          margin: 0.5em 0;
        }
      `}</style>
    </div>
  )
}

