# STATS - Next.js 实验项目集

[English Version](#stats---nextjs-experimental-projects)

## 项目概览

这是一个包含多个 Next.js 实验性项目的代码库，主要用于测试和探索现代 Web 开发技术，包括 3D 可视化、UI 组件库和交互式界面设计。

## 项目结构

### 🌍 `/globe` 和 `/globe2` - 3D 地球可视化
使用 Three.js 构建的交互式 3D 地球渲染器：
- **动态星空背景** - 带有动画效果的星场
- **大气光晕效果** - 自定义 GLSL 着色器实现大气层渲染
- **渐进式纹理加载** - 从线框到高分辨率纹理的平滑过渡
- **颜色过渡动画** - 流畅的颜色变换效果

技术栈：React、Three.js、Framer Motion、Tailwind CSS

### 🎨 `/project2/nextjs_testing` - UI 组件实验室
丰富的 React 组件库和界面实验平台：

**组件特性：**
- 可复用的卡片组件（信息卡、音频播放器、Twitter 集成）
- 基于 Radix UI 原语和 shadcn/ui 的现代组件
- RSS 解析和 Twitter API 集成
- 音频可视化和交互式动画
- 3D 粒子效果和视觉特效

**页面路由：**
- `/home` - 主页面展示
- `/flipcard` - 翻转卡片动画
- `/rss_testing` - RSS 订阅测试
- `/tw_testing` - Twitter 集成测试
- `/hughes_rain` - 雨滴动画效果
- `/pages3D` - 3D 页面实验
- `/clutter/particlesGL` - WebGL 粒子系统

## 技术栈

- **框架**: Next.js 15+ (App Router)
- **开发工具**: Turbopack
- **样式**: Tailwind CSS v4+ with PostCSS
- **3D 图形**: Three.js with custom shaders
- **UI 组件**: 
  - Radix UI primitives
  - shadcn/ui components
  - Lucide React icons
- **动画**: Framer Motion
- **语言**: TypeScript

## 快速开始

### 安装依赖

```bash
# 进入项目目录
cd globe # 或 globe2 或 project2/nextjs_testing

# 安装依赖
npm install
```

### 开发命令

```bash
# 启动开发服务器 (使用 Turbopack)
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 运行代码检查
npm run lint
```

## 架构特点

- **客户端渲染模式** - 使用 `"use client"` 指令的现代 React 模式
- **模块化组件结构** - 遵循 shadcn/ui 规范，使用 `@/components/ui/` 导入
- **自动化资源管理** - Three.js 组件自动处理清理和动画循环
- **响应式设计** - 使用 Tailwind 工具类实现自适应布局
- **完整类型支持** - 全面使用 TypeScript 类型定义

## 项目特色

### Globe 项目
- 实时 3D 渲染性能优化
- 自定义着色器实现独特视觉效果
- 流畅的用户交互体验

### NextJS Testing 项目
- 组件化设计系统
- 多种数据源集成（RSS、Twitter API）
- 丰富的动画和过渡效果
- 实验性 UI 模式探索

---

# STATS - Next.js Experimental Projects

[中文版本](#stats---nextjs-实验项目集)

## Project Overview

A repository containing multiple Next.js experimental projects for testing and exploring modern web development technologies, including 3D visualization, UI component libraries, and interactive interface design.

## Project Structure

### 🌍 `/globe` and `/globe2` - 3D Globe Visualization
Interactive 3D globe renderers built with Three.js:
- **Animated Starfield** - Dynamic star background with animation
- **Atmospheric Glow Effects** - Custom GLSL shaders for atmosphere rendering
- **Progressive Texture Loading** - Smooth transition from wireframe to high-res textures
- **Color Transition Animations** - Fluid color transformation effects

Tech Stack: React, Three.js, Framer Motion, Tailwind CSS

### 🎨 `/project2/nextjs_testing` - UI Component Lab
Rich React component library and interface experimentation platform:

**Component Features:**
- Reusable card components (info cards, audio players, Twitter integration)
- Modern components based on Radix UI primitives and shadcn/ui
- RSS parsing and Twitter API integration
- Audio visualization and interactive animations
- 3D particle effects and visual effects

**Page Routes:**
- `/home` - Main page showcase
- `/flipcard` - Flip card animations
- `/rss_testing` - RSS feed testing
- `/tw_testing` - Twitter integration testing
- `/hughes_rain` - Rain drop animation effects
- `/pages3D` - 3D page experiments
- `/clutter/particlesGL` - WebGL particle systems

## Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Build Tool**: Turbopack for development
- **Styling**: Tailwind CSS v4+ with PostCSS
- **3D Graphics**: Three.js with custom shaders
- **UI Components**: 
  - Radix UI primitives
  - shadcn/ui components
  - Lucide React icons
- **Animation**: Framer Motion
- **Language**: TypeScript

## Quick Start

### Install Dependencies

```bash
# Navigate to project directory
cd globe # or globe2 or project2/nextjs_testing

# Install dependencies
npm install
```

### Development Commands

```bash
# Start development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Architecture Features

- **Client-side Rendering Pattern** - Modern React patterns with `"use client"` directives
- **Modular Component Structure** - Following shadcn/ui conventions with `@/components/ui/` imports
- **Automated Resource Management** - Three.js components handle cleanup and animation loops
- **Responsive Design** - Adaptive layouts using Tailwind utilities
- **Full Type Support** - Comprehensive TypeScript type definitions

## Project Highlights

### Globe Projects
- Optimized real-time 3D rendering performance
- Custom shaders for unique visual effects
- Smooth user interaction experience

### NextJS Testing Project
- Component-based design system
- Multiple data source integrations (RSS, Twitter API)
- Rich animations and transitions
- Experimental UI pattern exploration

## License

MIT

## Author

Yanfeng Wu