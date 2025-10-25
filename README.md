# STATS - Next.js 实验项目集

[English Version](#stats---nextjs-experimental-projects)

## 项目概览

这是一个包含多个 Next.js 实验性项目的代码库，主要用于测试和探索现代 Web 开发技术，包括 3D 可视化、UI 组件库、交互式界面设计和后端 API 开发。

## 项目结构

### 🌍 `/globe` 和 `/globe2` - 3D 地球可视化
使用 Three.js 构建的交互式 3D 地球渲染器：
- **动态星空背景** - 带有动画效果的星场
- **大气光晕效果** - 自定义 GLSL 着色器实现大气层渲染
- **渐进式纹理加载** - 从线框到高分辨率纹理的平滑过渡
- **颜色过渡动画** - 流畅的颜色变换效果

**技术栈**: React · Three.js · Framer Motion · Tailwind CSS · TypeScript

**启动项目**:
```bash
cd globe  # 或 globe2
npm install
npm run dev
```

### 🎨 `/project2/nextjs_testing` - UI 组件实验室
丰富的 React 组件库和界面实验平台：

**组件特性**:
- 可复用的卡片组件（信息卡、音频播放器、Twitter 集成）
- 基于 Radix UI primitives 和 shadcn/ui 的现代组件
- RSS 解析和 Twitter API 集成
- 音频可视化和交互式动画
- 3D 粒子效果和视觉特效
- 国际象棋 UI、液体效果、图像合并等实验性界面

**页面路由**:
- `/home` - 主页面展示
- `/hughes` - Hughes 数据可视化
- `/flipcard` - 翻转卡片动画
- `/rss_testing` - RSS 订阅测试
- `/tw_testing` - Twitter 集成测试
- `/hughes_rain` - 雨滴动画效果
- `/pages3D` - 3D 页面实验
- `/clutter/particlesGL` - WebGL 粒子系统
- `/clutter/another_chess` - 国际象棋界面
- `/clutter/liquid` - 液体动画效果
- `/clutter/pic_merge` - 图像合并工具
- `/clutter/terminal` - 终端模拟器

**技术栈**: Next.js 15+ · TypeScript · Tailwind CSS v4 · Radix UI · shadcn/ui · Lucide React · Framer Motion

**启动项目**:
```bash
cd project2/nextjs_testing
npm install
npm run dev
```

### ⚡ `/project2/nextjs_fastapi` - FastAPI 后端
Python 后端 API 服务：

**功能模块**:
- **音频处理**: 音频文件上传、波形生成、音效应用
- **Hughes 同步**: Hughes 数据自动同步和查询接口
- **CORS 支持**: 配置前端跨域访问
- **生命周期管理**: 启动时自动同步数据，可选定期任务

**API 路由**:
- `/api/audio/*` - 音频上传和处理
- `/api/waveform/*` - 波形数据生成
- `/api/effects/*` - 音效应用
- `/api/hughes/*` - Hughes 数据接口

**技术栈**: FastAPI · Python 3.13 · Pydantic · Uvicorn

**启动项目**:
```bash
cd project2/nextjs_fastapi
python -m venv venv
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
uvicorn main:app --reload
```

## 技术栈总览

### 前端
- **框架**: Next.js 15+ (App Router)
- **开发工具**: Turbopack
- **样式**: Tailwind CSS v4+ with PostCSS
- **3D 图形**: Three.js with custom GLSL shaders
- **UI 组件**:
  - Radix UI primitives
  - shadcn/ui components
  - Lucide React icons
- **动画**: Framer Motion
- **语言**: TypeScript

### 后端
- **框架**: FastAPI
- **语言**: Python 3.13
- **数据验证**: Pydantic
- **服务器**: Uvicorn (ASGI)

## 快速开始

### 安装依赖

**前端项目**:
```bash
# 进入项目目录
cd globe  # 或 globe2 或 project2/nextjs_testing

# 安装依赖
npm install
```

**后端项目**:
```bash
cd project2/nextjs_fastapi
python -m venv venv
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
```

### 开发命令

**前端（Next.js）**:
```bash
npm run dev          # 启动开发服务器 (使用 Turbopack)
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 运行代码检查
```

**后端（FastAPI）**:
```bash
uvicorn main:app --reload    # 启动开发服务器
# 或
python main.py

# 访问 API 文档
# http://localhost:8000/docs
```

## 架构特点

### 前端架构
- **客户端渲染模式** - 使用 `"use client"` 指令的现代 React 模式
- **模块化组件结构** - 遵循 shadcn/ui 规范，使用 `@/components/ui/` 导入
- **自动化资源管理** - Three.js 组件自动处理清理和动画循环
- **响应式设计** - 使用 Tailwind 工具类实现自适应布局
- **完整类型支持** - 全面使用 TypeScript 类型定义

### 后端架构
- **模块化路由** - 按功能拆分路由模块（audio, waveform, effects, hughes）
- **数据验证** - Pydantic schemas 严格校验输入输出
- **统一响应格式** - JSON 格式 `{code, msg, data}`
- **CORS 配置** - 支持本地开发和生产环境跨域
- **生命周期管理** - 启动/关闭时的资源管理和自动任务

## 项目特色

### Globe 项目
- 实时 3D 渲染性能优化
- 自定义着色器实现独特视觉效果
- 流畅的用户交互体验
- 渐进式资源加载策略

### NextJS Testing 项目
- 组件化设计系统
- 多种数据源集成（RSS、Twitter API）
- 丰富的动画和过渡效果
- 实验性 UI 模式探索
- WebGL 粒子系统和 3D 可视化

### FastAPI 后端
- 高性能异步 API
- 完整的音频处理流程
- 自动化数据同步机制
- RESTful API 设计

## 部署配置

### 生产环境域名
- **前端**: `https://stats.yanfd.tech`
- **后端 API**: `https://api.yanfd.tech`

### CORS 配置
后端已配置允许以下域名访问：
- `http://localhost:3000` (本地开发)
- `http://127.0.0.1:3000` (本地开发)
- `https://stats.yanfd.tech` (生产环境)
- `https://api.yanfd.tech` (API 域名)

---

# STATS - Next.js Experimental Projects

[中文版本](#stats---nextjs-实验项目集)

## Project Overview

A repository containing multiple Next.js experimental projects for testing and exploring modern web development technologies, including 3D visualization, UI component libraries, interactive interface design, and backend API development.

## Project Structure

### 🌍 `/globe` and `/globe2` - 3D Globe Visualization
Interactive 3D globe renderers built with Three.js:
- **Animated Starfield** - Dynamic star background with animation
- **Atmospheric Glow Effects** - Custom GLSL shaders for atmosphere rendering
- **Progressive Texture Loading** - Smooth transition from wireframe to high-res textures
- **Color Transition Animations** - Fluid color transformation effects

**Tech Stack**: React · Three.js · Framer Motion · Tailwind CSS · TypeScript

**Start Project**:
```bash
cd globe  # or globe2
npm install
npm run dev
```

### 🎨 `/project2/nextjs_testing` - UI Component Lab
Rich React component library and interface experimentation platform:

**Component Features**:
- Reusable card components (info cards, audio players, Twitter integration)
- Modern components based on Radix UI primitives and shadcn/ui
- RSS parsing and Twitter API integration
- Audio visualization and interactive animations
- 3D particle effects and visual effects
- Experimental UIs (chess, liquid effects, image merging, etc.)

**Page Routes**:
- `/home` - Main page showcase
- `/hughes` - Hughes data visualization
- `/flipcard` - Flip card animations
- `/rss_testing` - RSS feed testing
- `/tw_testing` - Twitter integration testing
- `/hughes_rain` - Rain drop animation effects
- `/pages3D` - 3D page experiments
- `/clutter/particlesGL` - WebGL particle systems
- `/clutter/another_chess` - Chess interface
- `/clutter/liquid` - Liquid animation effects
- `/clutter/pic_merge` - Image merging tool
- `/clutter/terminal` - Terminal emulator

**Tech Stack**: Next.js 15+ · TypeScript · Tailwind CSS v4 · Radix UI · shadcn/ui · Lucide React · Framer Motion

**Start Project**:
```bash
cd project2/nextjs_testing
npm install
npm run dev
```

### ⚡ `/project2/nextjs_fastapi` - FastAPI Backend
Python backend API service:

**Feature Modules**:
- **Audio Processing**: Audio file upload, waveform generation, effects application
- **Hughes Sync**: Automatic Hughes data synchronization and query APIs
- **CORS Support**: Configured for frontend cross-origin access
- **Lifecycle Management**: Auto-sync on startup, optional periodic tasks

**API Routes**:
- `/api/audio/*` - Audio upload and processing
- `/api/waveform/*` - Waveform data generation
- `/api/effects/*` - Audio effects application
- `/api/hughes/*` - Hughes data endpoints

**Tech Stack**: FastAPI · Python 3.13 · Pydantic · Uvicorn

**Start Project**:
```bash
cd project2/nextjs_fastapi
python -m venv venv
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
uvicorn main:app --reload
```

## Technology Stack Overview

### Frontend
- **Framework**: Next.js 15+ (App Router)
- **Build Tool**: Turbopack for development
- **Styling**: Tailwind CSS v4+ with PostCSS
- **3D Graphics**: Three.js with custom GLSL shaders
- **UI Components**:
  - Radix UI primitives
  - shadcn/ui components
  - Lucide React icons
- **Animation**: Framer Motion
- **Language**: TypeScript

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.13
- **Data Validation**: Pydantic
- **Server**: Uvicorn (ASGI)

## Quick Start

### Install Dependencies

**Frontend Projects**:
```bash
# Navigate to project directory
cd globe  # or globe2 or project2/nextjs_testing

# Install dependencies
npm install
```

**Backend Project**:
```bash
cd project2/nextjs_fastapi
python -m venv venv
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
```

### Development Commands

**Frontend (Next.js)**:
```bash
npm run dev          # Start development server (with Turbopack)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linting
```

**Backend (FastAPI)**:
```bash
uvicorn main:app --reload    # Start development server
# or
python main.py

# Access API documentation
# http://localhost:8000/docs
```

## Architecture Features

### Frontend Architecture
- **Client-side Rendering Pattern** - Modern React patterns with `"use client"` directives
- **Modular Component Structure** - Following shadcn/ui conventions with `@/components/ui/` imports
- **Automated Resource Management** - Three.js components handle cleanup and animation loops
- **Responsive Design** - Adaptive layouts using Tailwind utilities
- **Full Type Support** - Comprehensive TypeScript type definitions

### Backend Architecture
- **Modular Routing** - Routes split by functionality (audio, waveform, effects, hughes)
- **Data Validation** - Strict input/output validation with Pydantic schemas
- **Unified Response Format** - JSON format `{code, msg, data}`
- **CORS Configuration** - Support for local development and production environments
- **Lifecycle Management** - Startup/shutdown resource management and automated tasks

## Project Highlights

### Globe Projects
- Optimized real-time 3D rendering performance
- Custom shaders for unique visual effects
- Smooth user interaction experience
- Progressive resource loading strategy

### NextJS Testing Project
- Component-based design system
- Multiple data source integrations (RSS, Twitter API)
- Rich animations and transitions
- Experimental UI pattern exploration
- WebGL particle systems and 3D visualization

### FastAPI Backend
- High-performance async API
- Complete audio processing pipeline
- Automated data synchronization mechanism
- RESTful API design

## Deployment Configuration

### Production Domains
- **Frontend**: `https://stats.yanfd.tech`
- **Backend API**: `https://api.yanfd.tech`

### CORS Configuration
Backend configured to allow access from:
- `http://localhost:3000` (local development)
- `http://127.0.0.1:3000` (local development)
- `https://stats.yanfd.tech` (production)
- `https://api.yanfd.tech` (API domain)

## License

MIT

## Author

Yanfeng Wu