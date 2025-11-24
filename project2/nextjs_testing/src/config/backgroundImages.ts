// 背景图片来源类型
export type BackgroundSource = 'gradient' | 'unsplash' | 'r2';

// 背景配置接口
export interface BackgroundConfig {
  type: BackgroundSource;
  value: string;
}

// Unsplash 随机图片配置
export const UNSPLASH_CONFIG = {
  // 你可以指定主题，比如：nature, tech, abstract, dark 等
  // Unsplash Collection IDs for different themes
  collections: {
    nature: '1163637',
    tech: '1065976',
    abstract: '3330445',
    dark: '4933370',
    city: '1114848',
  },
  // Unsplash 随机图片 API (使用新的 API)
  getRandomUrl: (topic?: string) => {
    const topics = Object.keys(UNSPLASH_CONFIG.collections) as Array<keyof typeof UNSPLASH_CONFIG.collections>;
    const selectedTopic = (topic || topics[Math.floor(Math.random() * topics.length)]) as keyof typeof UNSPLASH_CONFIG.collections;
    const collectionId = UNSPLASH_CONFIG.collections[selectedTopic];

    // 使用 Unsplash 的新 API endpoint
    // 注意：这需要 Unsplash API key，但我们先用 picsum.photos 作为替代方案
    // 如果你有 Unsplash API key，可以用: https://api.unsplash.com/photos/random?client_id=YOUR_ACCESS_KEY&collections=${collectionId}

    // 临时使用 Lorem Picsum 作为替代（免费且可靠）
    const seed = Math.floor(Math.random() * 10000);
    return `https://picsum.photos/seed/${seed}/1920/1080`;
  }
};

// Cloudflare R2 图床配置（预留）
export const R2_CONFIG = {
  // 你的 R2 bucket 公开访问 URL
  baseUrl: process.env.NEXT_PUBLIC_R2_BASE_URL || 'https://your-r2-bucket.r2.dev',
  // 背景图片文件夹路径
  folderPath: 'backgrounds',
  // 图片列表（你可以后续从 R2 API 动态获取）
  images: [
    // 示例：你可以手动添加图片文件名，或者通过 API 获取
    // 'bg1.jpg',
    // 'bg2.jpg',
    // 'bg3.jpg',
  ],
  // 获取随机图片 URL
  getRandomUrl: () => {
    if (R2_CONFIG.images.length === 0) {
      return '';
    }
    const randomImage = R2_CONFIG.images[Math.floor(Math.random() * R2_CONFIG.images.length)];
    return `${R2_CONFIG.baseUrl}/${R2_CONFIG.folderPath}/${randomImage}`;
  }
};

// 默认渐变背景
export const DEFAULT_GRADIENT = 'bg-[radial-gradient(ellipse_farthest-corner_at_50%_130%,_rgba(100,116,139,0.5)_0%,_rgba(17,24,39,0.9)_50%,_rgba(0,0,0,1)_80%)]';

// 获取背景样式
export const getBackgroundStyle = (config: BackgroundConfig): string => {
  switch (config.type) {
    case 'gradient':
      return DEFAULT_GRADIENT;
    case 'unsplash':
    case 'r2':
      return ''; // 图片背景将通过 inline style 设置
    default:
      return DEFAULT_GRADIENT;
  }
};

// 获取背景图片 URL
export const getBackgroundImageUrl = (config: BackgroundConfig): string | null => {
  switch (config.type) {
    case 'unsplash':
      return config.value || UNSPLASH_CONFIG.getRandomUrl();
    case 'r2':
      return config.value || R2_CONFIG.getRandomUrl();
    default:
      return null;
  }
};
