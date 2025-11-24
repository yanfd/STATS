# 快速开始指南

## 立即体验背景切换功能

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **访问页面**
   打开浏览器访问：`http://localhost:3000/home_testing`

3. **切换背景**
   - 点击导航栏右侧的 "BACKGROUND" 按钮
   - 选择 "渐变背景" 或 "Unsplash 随机"
   - 享受新的视觉体验！

## 配置 R2 图床（可选）

如果你想使用自己的图片库：

1. **设置环境变量**
   ```bash
   cp .env.local.example .env.local
   ```
   编辑 `.env.local` 并填入你的 R2 URL

2. **更新图片列表**
   在 [src/config/backgroundImages.ts](src/config/backgroundImages.ts:21) 的 `R2_CONFIG.images` 中添加图片文件名

3. **启用 R2 选项**
   在 [src/components/BackgroundToggleButton.tsx](src/components/BackgroundToggleButton.tsx:35) 中将 `disabled={true}` 改为 `disabled={false}`

详细说明请查看 [BACKGROUND_FEATURE_GUIDE.md](BACKGROUND_FEATURE_GUIDE.md)
