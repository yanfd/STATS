'use client'
import dynamic from 'next/dynamic'

// 动态导入 LiquidGlass 组件，并禁用 SSR
const LiquidGlass = dynamic(() => import('liquid-glass-react'), {
  ssr: false, // 这一行至关重要，它告诉 Next.js 不要尝试在服务器端渲染这个组件
})

export default function LiquidGlassPage() {
  return (
    <div className='bg-blue-300 min-h-screen flex items-center justify-center'>
      <LiquidGlass>
        <div className="p-6">
          <h2>Your content here</h2>
          <p>This will have the liquid glass effect</p>
        </div>
      </LiquidGlass>
    </div>
  )
}
