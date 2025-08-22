#!/bin/bash

# 配置nginx使用已获取的证书
echo "🔧 配置Nginx使用Let's Encrypt证书"
echo "================================"

# 1. 配置nginx
echo "📝 更新nginx配置..."
sudo tee /etc/nginx/sites-available/api > /dev/null <<'EOF'
# HTTP重定向到HTTPS
server {
    listen 80;
    server_name api.yanfd.tech;
    return 301 https://$server_name$request_uri;
}

# HTTPS配置
server {
    listen 443 ssl http2;
    server_name api.yanfd.tech;

    # SSL证书路径
    ssl_certificate /etc/letsencrypt/live/api.yanfd.tech/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yanfd.tech/privkey.pem;
    
    # SSL优化配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # 反向代理到FastAPI
    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # CORS配置
        add_header 'Access-Control-Allow-Origin' 'https://stats.yanfd.tech' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
    }
}
EOF

# 2. 启用配置
echo "🔗 启用站点配置..."
sudo ln -sf /etc/nginx/sites-available/api /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# 3. 测试配置
echo "✅ 测试nginx配置..."
sudo nginx -t

# 4. 重新加载nginx
echo "🚀 重新加载nginx..."
sudo systemctl reload nginx
sudo systemctl status nginx --no-pager | head -5

# 5. 等待几秒让服务启动
sleep 3

# 6. 测试HTTPS
echo ""
echo "🔍 测试HTTPS连接..."
echo "================================"

# 测试从外部访问（使用-k忽略证书验证问题）
echo "测试API端点..."
curl -k https://api.yanfd.tech/api/hughes/status

echo ""
echo "✅ 配置完成！"
echo "================================"
echo ""
echo "如果curl还是报错，可以："
echo "1. 等待1-2分钟让证书完全生效"
echo "2. 使用浏览器访问: https://api.yanfd.tech/api/hughes/status"
echo "3. 从其他机器测试（本地curl可能有缓存）"
echo ""
echo "📝 前端应该可以正常访问了："
echo "https://stats.yanfd.tech 应该不再显示'not secure'警告"