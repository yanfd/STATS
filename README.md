# STATS — Next.js + FastAPI Playground

[English Version](#stats--nextjs--fastapi-playground-en)

## 技术栈 Tech Stack

- 前端 Frontend: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Radix UI, shadcn/ui, Framer Motion, Three.js
- 后端 Backend: FastAPI, Python 3.13, Pydantic, Uvicorn

## 应用概览 Apps

- `globe` / `globe2` — 3D 地球与可视化实验 | 3D globe and visualization experiments
- `project2/nextjs_testing` — UI / 图形与交互实验 | UI, graphics and interaction lab
- `project2/nextjs_fastapi` — 实验用 API 服务 | API service for experiments

## 精选路由 Featured Routes (nextjs_testing)

- `/home` — 主页展示 | main showcase
- `/pages3D` — 3D 实验 | 3D experiments
- `/clutter` — 实验区 | experiments
  - `/clutter/particlesGL` — WebGL 粒子 | particles
  - `/clutter/liquid` — 液体效果 | liquid effect
  - `/clutter/terminal` — 终端模拟 | terminal emulator
  - `/clutter/pic_merge` — 图片合并 | image merge

注：此处仅列展示清单，非访问控制；后端路由不在公开展示范围。 Note: Showcase list only; does not affect access. Backend routes intentionally omitted.

## 开发指引 Dev

- 前端 Frontend: `cd <app> && npm install && npm run dev`
- 后端 Backend: `cd project2/nextjs_fastapi && ./run.sh` 或 or `uvicorn main:app --reload`

## 子项目文档 Subproject Docs

- globe/README.md
- globe2/README.md
- project2/nextjs_testing/README.md
