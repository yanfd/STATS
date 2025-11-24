# 背景图片切换功能使用指南

## 功能概述

在 home_testing 页面的导航栏中添加了一个背景切换按钮，支持三种背景模式：
1. **渐变背景**：原有的渐变色背景
2. **Unsplash 随机图片**：从 Unsplash 获取随机背景图片
3. **R2 图床**：从你的 Cloudflare R2 存储桶获取图片（需配置）

## 使用方法

### 基础使用

1. 启动开发服务器：`npm run dev`
2. 访问 home_testing 页面
3. 点击导航栏中 "BACKGROUND" 按钮
4. 选择你想要的背景类型

### 配置 Cloudflare R2 图床（可选）

#### 第 1 步：准备 R2 存储桶

1. 登录 Cloudflare Dashboard
2. 进入 R2 服务
3. 创建或选择一个存储桶
4. 配置公开访问权限（如果需要）
5. 记录你的 R2 bucket 访问 URL（例如：`https://your-bucket-name.r2.dev`）

#### 第 2 步：上传背景图片

1. 在 R2 存储桶中创建一个名为 `backgrounds` 的文件夹
2. 上传你的背景图片到该文件夹
3. 推荐图片尺寸：1920x1080 或更高
4. 支持的格式：JPG, PNG, WebP

#### 第 3 步：配置环境变量

1. 复制 `.env.local.example` 为 `.env.local`：
   ```bash
   cp .env.local.example .env.local
   ```

2. 编辑 `.env.local`，填入你的 R2 URL：
   ```env
   NEXT_PUBLIC_R2_BASE_URL=https://your-bucket-name.r2.dev
   ```

#### 第 4 步：更新图片列表

编辑 `src/config/backgroundImages.ts`，在 `R2_CONFIG.images` 数组中添加你的图片文件名：

```typescript
images: [
  'bg1.jpg',
  'bg2.jpg',
  'bg3.png',
  // 添加更多图片...
],
```

#### 第 5 步：启用 R2 选项

在 `src/components/BackgroundToggleButton.tsx` 中，将 R2 选项的 `disabled` 改为 `false`：

```typescript
<DropdownMenuItem
  onClick={() => onBackgroundChange('r2')}
  className="cursor-pointer"
  disabled={false} // 改为 false
>
```

## 自定义配置

### 修改 Unsplash 主题

编辑 `src/config/backgroundImages.ts` 中的 `UNSPLASH_CONFIG.topics`：

```typescript
topics: ['nature', 'tech', 'abstract', 'dark', 'city', 'minimal'],
```

### 修改默认渐变色

编辑 `src/config/backgroundImages.ts` 中的 `DEFAULT_GRADIENT`：

```typescript
export const DEFAULT_GRADIENT = 'bg-[radial-gradient(...)]';
```

## 文件结构

```
src/
├── config/
│   └── backgroundImages.ts       # 背景配置文件
├── components/
│   ├── BackgroundToggleButton.tsx # 背景切换按钮组件
│   └── Navbar.tsx                 # 导航栏（已更新）
└── app/
    └── home_testing/
        └── page.tsx               # 主页面（已更新）
```

## 技术说明

- 使用 React useState 管理背景状态
- 支持动态切换背景类型
- 图片背景添加半透明黑色遮罩确保内容可读性
- 背景图片使用 `background-attachment: fixed` 实现视差效果
- Unsplash URL 添加时间戳避免缓存问题

## 注意事项

1. **Unsplash API 限制**：Unsplash 可能有请求频率限制，建议不要频繁切换
2. **R2 存储成本**：使用 R2 图床会产生存储和流量费用，请注意 Cloudflare 计费规则
3. **图片尺寸**：建议使用压缩过的图片以提高加载速度
4. **CORS 配置**：如果 R2 图片无法显示，可能需要配置 CORS 策略

## 未来扩展

可以考虑添加以下功能：
- 本地图片上传
- 背景偏好记忆（localStorage）
- 更多背景效果（模糊、亮度调整等）
- 背景图片预加载
- 动画过渡效果
