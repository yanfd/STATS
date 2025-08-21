// API配置
export const API_CONFIG = {
  // 开发环境
  development: {
    baseUrl: 'http://localhost:8000',
  },
  // 生产环境 - 部署到Vercel时使用你的服务器地址
  production: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://your-server.com:8000',
  },
  // 测试环境
  test: {
    baseUrl: 'http://localhost:8000',
  }
};

export const getApiUrl = () => {
  const env = process.env.NODE_ENV as keyof typeof API_CONFIG;
  return API_CONFIG[env]?.baseUrl || API_CONFIG.development.baseUrl;
};