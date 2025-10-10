'use client'

import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  content?: string
  children?: FileItem[]
  size?: number
  modified?: string
}

const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    children: [
      { id: '1-1', name: 'index.tsx', type: 'file', content: 'export default function App() {...}', size: 1024, modified: '2024-01-15' },
      { id: '1-2', name: 'styles.css', type: 'file', content: '.container { padding: 1rem; }', size: 512, modified: '2024-01-14' },
    ]
  },
  {
    id: '2',
    name: 'components',
    type: 'folder',
    children: [
      { id: '2-1', name: 'Button.tsx', type: 'file', content: 'export const Button = () => <button>Click</button>', size: 256, modified: '2024-01-13' },
      { id: '2-2', name: 'Card.tsx', type: 'file', content: 'export const Card = ({children}) => <div>{children}</div>', size: 384, modified: '2024-01-12' },
    ]
  },
  { id: '3', name: 'README.md', type: 'file', content: '# Terminal File Browser\n\nA terminal-style file browser built with React and Tailwind CSS.', size: 89, modified: '2024-01-11' },
  { id: '4', name: 'package.json', type: 'file', content: '{\n  "name": "terminal-browser",\n  "version": "1.0.0"\n}', size: 156, modified: '2024-01-10' },
]

const recentFiles = [
  { id: '1-1', name: 'index.tsx', path: 'src/index.tsx', modified: '2 hours ago' },
  { id: '2-1', name: 'Button.tsx', path: 'components/Button.tsx', modified: '1 day ago' },
  { id: '3', name: 'README.md', path: 'README.md', modified: '3 days ago' },
]

// Section wrapper component without text animations
function ScrollSection({
  children,
  bgColor
}: {
  children: React.ReactNode
  bgColor: string
}) {
  return (
    <section className={`relative h-screen snap-start ${bgColor} overflow-hidden`}>
      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}
        className="h-full"
      >
        {children}
      </motion.div>
    </section>
  )
}

export default function TerminalBrowser() {
  const [selectedItem, setSelectedItem] = useState<FileItem | null>(null)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['1', '2']))
  const containerRef = useRef<HTMLDivElement>(null)
  const [windowHeight, setWindowHeight] = useState(0)

  // Set window height on client side only
  React.useEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  // Track scroll progress - monitor the container's scroll position
  const { scrollY } = useScroll({
    container: containerRef
  })

  // Transform scroll to opacity (fade out completely by 50vh)
  const textOpacity = useTransform(scrollY, [0, windowHeight * 0.5], [1, 0])

  // Transform for left text (slides up and out)
  const leftY = useTransform(scrollY, [0, windowHeight * 0.5], [0, -150])

  // Transform for right text (slides down and out)
  const rightY = useTransform(scrollY, [0, windowHeight * 0.5], [0, 150])

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev)
      if (newSet.has(folderId)) {
        newSet.delete(folderId)
      } else {
        newSet.add(folderId)
      }
      return newSet
    })
  }

  const findFileById = (id: string): FileItem | null => {
    for (const item of mockFiles) {
      if (item.id === id) return item
      if (item.children) {
        const child = item.children.find(c => c.id === id)
        if (child) return child
      }
    }
    return null
  }

  const renderFileTree = (items: FileItem[], level = 0) => {
    return items.map(item => (
      <div key={item.id}>
        <div
          className={`flex items-center px-2 py-1 cursor-pointer hover:bg-gray-700 ${
            selectedItem?.id === item.id ? 'bg-gray-700' : ''
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => {
            if (item.type === 'folder') {
              toggleFolder(item.id)
            } else {
              setSelectedItem(item)
            }
          }}
        >
          <span className="mr-2 text-gray-400">
            {item.type === 'folder' ? (expandedFolders.has(item.id) ? '▼' : '▶') : '◆'}
          </span>
          <span className={item.type === 'folder' ? 'text-blue-400' : 'text-gray-300'}>
            {item.name}
          </span>
        </div>
        {item.type === 'folder' && expandedFolders.has(item.id) && item.children && (
          <div>{renderFileTree(item.children, level + 1)}</div>
        )}
      </div>
    ))
  }

  // Terminal Browser Component
  const TerminalContent = () => (
    <div className="h-full bg-gray-900 text-gray-100 font-mono text-sm flex">
      {/* Left Side - Two Sections */}
      <div className="w-1/2 flex flex-col border-r border-gray-700">
        {/* Top Section - File Tree */}
        <div className="flex-1 overflow-y-auto border-b border-gray-700">
          <div className="bg-gray-800 px-3 py-2 border-b border-gray-700 text-xs text-gray-400 uppercase">
            Files
          </div>
          <div className="p-2">
            {renderFileTree(mockFiles)}
          </div>
        </div>

        {/* Bottom Section - Recent Files */}
        <div className="h-1/3 overflow-y-auto">
          <div className="bg-gray-800 px-3 py-2 border-b border-gray-700 text-xs text-gray-400 uppercase">
            Recent
          </div>
          <div className="p-2">
            {recentFiles.map(file => (
              <div
                key={file.id}
                className={`px-2 py-1 cursor-pointer hover:bg-gray-700 ${
                  selectedItem?.id === file.id ? 'bg-gray-700' : ''
                }`}
                onClick={() => {
                  const fullFile = findFileById(file.id)
                  if (fullFile) setSelectedItem(fullFile)
                }}
              >
                <div className="text-gray-300">{file.name}</div>
                <div className="text-xs text-gray-500">{file.path} • {file.modified}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Content Display */}
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
          <div className="text-sm">
            {selectedItem ? (
              <>
                <span className="text-gray-400">Selected: </span>
                <span className="text-blue-400">{selectedItem.name}</span>
              </>
            ) : (
              <span className="text-gray-500">No file selected</span>
            )}
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {selectedItem ? (
            <div>
              {selectedItem.type === 'file' ? (
                <>
                  <div className="mb-4 text-xs text-gray-500">
                    <div>Type: {selectedItem.name.split('.').pop()?.toUpperCase() || 'FILE'}</div>
                    <div>Size: {selectedItem.size ? `${selectedItem.size} bytes` : 'Unknown'}</div>
                    <div>Modified: {selectedItem.modified || 'Unknown'}</div>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <pre className="text-xs bg-gray-800 p-3 rounded overflow-x-auto">
                      <code>{selectedItem.content || 'No content available'}</code>
                    </pre>
                  </div>
                </>
              ) : (
                <div className="text-gray-500">
                  <p>Folder: {selectedItem.name}</p>
                  <p className="mt-2">Contains {selectedItem.children?.length || 0} items</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500 text-center mt-10">
              Select a file to view its contents
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black">
      {/* Fixed vertical text - only visible on first page */}
      <motion.div
        className="fixed left-0 top-0 h-screen w-1/5 flex items-end justify-center pointer-events-none z-10"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.25, 0.1, 0.25, 1.0]
        }}
        style={{
          opacity: textOpacity,
          y: leftY
        }}
      >
        <p
          className="text-8xl font-bold tracking-wider text-transparent pb-20"
          style={{
            writingMode: 'vertical-rl',
            WebkitTextStroke: '2px rgba(156, 163, 175, 0.5)'
          }}
        >
          TERMINAL
        </p>
      </motion.div>

      <motion.div
        className="fixed right-0 top-0 h-screen w-1/5 flex items-start justify-center pointer-events-none z-10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.25, 0.1, 0.25, 1.0]
        }}
        style={{
          opacity: textOpacity,
          y: rightY
        }}
      >
        <p
          className="text-8xl font-bold tracking-wider text-gray-400 pt-20"
          style={{ writingMode: 'vertical-rl' }}
        >
          BROWSER
        </p>
      </motion.div>

      {/* Section 1 - Welcome */}
      <ScrollSection
        bgColor="bg-gradient-to-br from-black via-gray-900 to-black"
      >
        <div className="h-full flex items-center justify-center px-20">
          <div className="text-center">
            <motion.h1
              className="text-7xl font-bold text-white mb-6 font-mono"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              YANFD PRODUCTS
            </motion.h1>
            <motion.p
              className="text-xl text-gray-400 font-mono"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Terminal-style file browser built with React
            </motion.p>
            <motion.div
              className="mt-8 text-gray-600 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Scroll down to explore ↓
            </motion.div>
          </div>
        </div>
      </ScrollSection>

      {/* Section 2 - File Browser */}
      <ScrollSection
        bgColor="bg-gray-900"
      >
        <TerminalContent />
      </ScrollSection>

      {/* Section 3 - Info */}
      <ScrollSection
        bgColor="bg-gradient-to-br from-gray-900 via-black to-gray-900"
      >
        <div className="h-full flex items-center justify-center px-20">
          <div className="max-w-4xl">
            <motion.h2
              className="text-5xl font-bold text-white mb-8 font-mono"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Key Features
            </motion.h2>
            <motion.div
              className="grid grid-cols-2 gap-6 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="border border-gray-700 p-6 rounded-lg bg-gray-800/50">
                <h3 className="text-xl font-bold text-blue-400 mb-2">File Tree</h3>
                <p className="text-sm">Navigate through folders and files with an intuitive tree structure</p>
              </div>
              <div className="border border-gray-700 p-6 rounded-lg bg-gray-800/50">
                <h3 className="text-xl font-bold text-blue-400 mb-2">Recent Files</h3>
                <p className="text-sm">Quick access to your recently opened files</p>
              </div>
              <div className="border border-gray-700 p-6 rounded-lg bg-gray-800/50">
                <h3 className="text-xl font-bold text-blue-400 mb-2">Code Preview</h3>
                <p className="text-sm">View file contents with syntax highlighting</p>
              </div>
              <div className="border border-gray-700 p-6 rounded-lg bg-gray-800/50">
                <h3 className="text-xl font-bold text-blue-400 mb-2">Terminal Style</h3>
                <p className="text-sm">Classic terminal aesthetic with modern functionality</p>
              </div>
            </motion.div>
          </div>
        </div>
      </ScrollSection>
    </div>
  )
}

