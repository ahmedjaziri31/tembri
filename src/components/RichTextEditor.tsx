'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { Bold, Italic, Underline, List, ListOrdered, Heading1, Heading2, Heading3, Type, AlignLeft, AlignCenter, AlignRight, Undo, Redo } from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set())
  const [isSticky, setIsSticky] = useState(false)

  // Set initial content
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ''
    }
  }, [value])

  // Update active formats based on cursor position
  const updateActiveFormats = useCallback(() => {
    try {
      const formats = new Set<string>()
      
      // Check inline styles (bold, italic, underline)
      if (document.queryCommandState('bold')) formats.add('bold')
      if (document.queryCommandState('italic')) formats.add('italic')
      if (document.queryCommandState('underline')) formats.add('underline')
      
      // Check list formats with better detection
      try {
        if (document.queryCommandState('insertUnorderedList')) {
          formats.add('ul')
        }
        if (document.queryCommandState('insertOrderedList')) {
          formats.add('ol')
        }
      } catch (e) {
        // Fallback: check if cursor is in a list element
        const selection = window.getSelection()
        if (selection && selection.anchorNode) {
          let node = selection.anchorNode.nodeType === Node.TEXT_NODE 
            ? selection.anchorNode.parentElement 
            : selection.anchorNode as HTMLElement
          
          while (node && node !== editorRef.current) {
            if (node.tagName === 'UL') {
              formats.add('ul')
              break
            }
            if (node.tagName === 'OL') {
              formats.add('ol')
              break
            }
            node = node.parentElement as HTMLElement
          }
        }
      }
      
      // Check alignment
      if (document.queryCommandState('justifyLeft')) formats.add('left')
      if (document.queryCommandState('justifyCenter')) formats.add('center')
      if (document.queryCommandState('justifyRight')) formats.add('right')
      
      // Check block format (headings)
      try {
        const formatBlock = document.queryCommandValue('formatBlock').toLowerCase()
        if (formatBlock === 'h1') formats.add('h1')
        if (formatBlock === 'h2') formats.add('h2')
        if (formatBlock === 'h3') formats.add('h3')
      } catch (e) {
        // Ignore format block errors
      }
      
      setActiveFormats(formats)
    } catch (error) {
      // Silently handle errors when editor is not in focus
      console.debug('Format update skipped:', error)
    }
  }, [])

  // Handle content change
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
      updateActiveFormats()
    }
  }

  // Handle selection change to update active formats
  const handleSelectionChange = useCallback(() => {
    if (editorRef.current?.contains(document.activeElement)) {
      updateActiveFormats()
    }
  }, [updateActiveFormats])

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!editorRef.current?.contains(document.activeElement)) return

    // Keyboard shortcuts with Ctrl/Cmd
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'z':
          if (e.shiftKey) {
            e.preventDefault()
            document.execCommand('redo')
          } else {
            e.preventDefault()
            document.execCommand('undo')
          }
          break
        case 'y':
          e.preventDefault()
          document.execCommand('redo')
          break
      }
    }
    
    // Update formats after any key press
    setTimeout(updateActiveFormats, 10)
  }, [updateActiveFormats])

  // Listen for selection changes and keyboard shortcuts
  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange)
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleSelectionChange, handleKeyDown])

  // Execute formatting command with toggle support
  const executeCommand = useCallback((command: string, value?: string) => {
    // Prevent mousedown from removing focus
    editorRef.current?.focus()
    
    try {
      document.execCommand(command, false, value)
    } catch (error) {
      console.error('Command execution failed:', error)
    }
    
    // Small delay to ensure DOM updates before checking state
    setTimeout(() => {
      if (editorRef.current) {
        handleInput()
      }
    }, 10)
  }, [])

  // Toggle heading format (removes heading if already applied)
  const toggleHeading = useCallback((tag: string) => {
    try {
      const currentFormat = document.queryCommandValue('formatBlock').toLowerCase()
      
      // If already this heading, convert to paragraph (toggle off)
      if (currentFormat === tag) {
        executeCommand('formatBlock', 'p')
      } else {
        executeCommand('formatBlock', tag)
      }
    } catch (error) {
      executeCommand('formatBlock', tag)
    }
  }, [executeCommand])

  // Toggle list format with better handling
  const toggleList = useCallback((listType: 'insertUnorderedList' | 'insertOrderedList') => {
    editorRef.current?.focus()
    
    try {
      // Save selection
      const selection = window.getSelection()
      if (!selection || !selection.rangeCount) return
      
      // Check if already in a list
      const isActive = document.queryCommandState(listType)
      
      // Execute the list command
      document.execCommand(listType, false, undefined)
      
      // Force update after a short delay to ensure DOM has updated
      setTimeout(() => {
        if (editorRef.current) {
          handleInput()
          updateActiveFormats()
        }
      }, 50)
    } catch (error) {
      console.error('List command failed:', error)
      // Fallback: try again
      setTimeout(() => {
        document.execCommand(listType, false, undefined)
        handleInput()
      }, 10)
    }
  }, [])

  // Toolbar button component with active state and improved interactions
  const ToolbarButton = ({ 
    onClick, 
    icon: Icon, 
    title,
    isActive = false,
    shortcut
  }: { 
    onClick: () => void
    icon: React.ElementType
    title: string
    isActive?: boolean
    shortcut?: string
  }) => (
    <button
      type="button"
      onMouseDown={(e) => {
        // Prevent default to keep editor focus
        e.preventDefault()
        onClick()
      }}
      title={shortcut ? `${title} (${shortcut})` : title}
      className={`group relative p-2 rounded transition-all duration-200 transform hover:scale-105 active:scale-95 ${
        isActive 
          ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:shadow-sm'
      }`}
      aria-pressed={isActive}
      aria-label={title}
    >
      <Icon className="w-4 h-4" />
      {/* Tooltip */}
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        {title}
        {shortcut && <span className="ml-1 text-gray-400">({shortcut})</span>}
      </span>
    </button>
  )

  return (
    <div className={`border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden transition-all duration-200 ${isFocused ? 'ring-2 ring-blue-500 border-blue-500 shadow-lg' : 'shadow'} ${className}`}>
      {/* Toolbar */}
      <div 
        ref={toolbarRef}
        className={`bg-gray-50 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 p-2 flex flex-wrap gap-1 transition-all duration-200 ${isSticky ? 'sticky top-0 z-10 shadow-md' : ''}`}
      >
        {/* Undo/Redo */}
        <div className="flex gap-1 border-r border-gray-300 dark:border-gray-600 pr-2 mr-1">
          <ToolbarButton
            onClick={() => executeCommand('undo')}
            icon={Undo}
            title="Undo"
            shortcut="Ctrl+Z"
          />
          <ToolbarButton
            onClick={() => executeCommand('redo')}
            icon={Redo}
            title="Redo"
            shortcut="Ctrl+Y"
          />
        </div>

        {/* Text Style */}
        <div className="flex gap-1 border-r border-gray-300 dark:border-gray-600 pr-2 mr-1">
          <ToolbarButton
            onClick={() => executeCommand('bold')}
            icon={Bold}
            title="Bold"
            shortcut="Ctrl+B"
            isActive={activeFormats.has('bold')}
          />
          <ToolbarButton
            onClick={() => executeCommand('italic')}
            icon={Italic}
            title="Italic"
            shortcut="Ctrl+I"
            isActive={activeFormats.has('italic')}
          />
          <ToolbarButton
            onClick={() => executeCommand('underline')}
            icon={Underline}
            title="Underline"
            shortcut="Ctrl+U"
            isActive={activeFormats.has('underline')}
          />
        </div>

        {/* Headings */}
        <div className="flex gap-1 border-r border-gray-300 dark:border-gray-600 pr-2 mr-1">
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
        <div className="flex gap-1 border-r border-gray-300 dark:border-gray-600 pr-2 mr-1">
          <ToolbarButton
            onClick={() => toggleList('insertUnorderedList')}
            icon={List}
            title="Bullet List"
            isActive={activeFormats.has('ul')}
          />
          <ToolbarButton
            onClick={() => toggleList('insertOrderedList')}
            icon={ListOrdered}
            title="Numbered List"
            isActive={activeFormats.has('ol')}
          />
        </div>

        {/* Alignment */}
        <div className="flex gap-1 border-r border-gray-300 dark:border-gray-600 pr-2 mr-1">
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
        <div className="flex items-center">
          <select
            onMouseDown={(e) => e.preventDefault()}
            onChange={(e) => {
              editorRef.current?.focus()
              executeCommand('fontSize', e.target.value)
              // Reset to default after applying
              setTimeout(() => {
                e.target.value = '3'
              }, 100)
            }}
            className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 hover:border-blue-400"
            defaultValue="3"
            title="Font Size"
          >
            <option value="1">Tiny</option>
            <option value="2">Small</option>
            <option value="3">Normal</option>
            <option value="4">Medium</option>
            <option value="5">Large</option>
            <option value="6">X-Large</option>
            <option value="7">Huge</option>
          </select>
        </div>
      </div>

      {/* Editor Content */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => {
          setIsFocused(true)
          updateActiveFormats()
        }}
        onBlur={() => setIsFocused(false)}
        onMouseUp={updateActiveFormats}
        onKeyUp={updateActiveFormats}
        onPaste={(e) => {
          // Clean pasted content
          e.preventDefault()
          const text = e.clipboardData.getData('text/plain')
          document.execCommand('insertText', false, text)
        }}
        className="min-h-[300px] p-4 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 prose prose-sm dark:prose-invert max-w-none transition-colors duration-200"
        data-placeholder={placeholder}
        style={{
          overflowY: 'auto',
          maxHeight: '500px'
        }}
        spellCheck="true"
        role="textbox"
        aria-multiline="true"
        aria-label="Rich text editor"
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
        
        [contenteditable] :global(ul) {
          list-style-type: disc;
        }
        
        [contenteditable] :global(ol) {
          list-style-type: decimal;
        }
        
        [contenteditable] :global(li) {
          margin: 0.5em 0;
          display: list-item;
        }
        
        [contenteditable] :global(ul li) {
          list-style-type: disc;
        }
        
        [contenteditable] :global(ol li) {
          list-style-type: decimal;
        }
        
        /* Nested lists */
        [contenteditable] :global(ul ul) {
          list-style-type: circle;
          margin: 0.25em 0;
        }
        
        [contenteditable] :global(ol ol) {
          list-style-type: lower-alpha;
          margin: 0.25em 0;
        }
      `}</style>
    </div>
  )
}

