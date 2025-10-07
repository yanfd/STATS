'use client'

import React, { useState } from 'react'

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

export default function TerminalBrowser() {
  const [selectedItem, setSelectedItem] = useState<FileItem | null>(null)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['1', '2']))

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

  return (
    <div className="h-screen bg-gray-900 text-gray-100 font-mono text-sm flex">
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
}

