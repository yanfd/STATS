#!/bin/bash

# 使用standalone模式获取证书（不需要nginx插件）
echo "🔐 使用Standalone模式获取SSL证书"
echo "================================"

# 1. 临时停止nginx（让certbot使用80端口）
echo "⏸️  临时停止nginx..."
sudo systemctl stop nginx

# 2. 使用standalone模式获取证书
echo "🔒 获取证书..."


# 3. 检查证书是否成功获取
if [ -f "/etc/letsencrypt/live/api.yanfd.tech/fullchain.pem" ]; then
    echo "✅ 证书获取成功！"
    
    # 4. 配置nginx使用证书
    echo "📝 配置nginx..."
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

    # SSL证书
    ssl_certificate /etc/letsencrypt/live/api.yanfd.tech/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yanfd.tech/privkey.pem;
    
    # SSL优化
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
        
        # CORS配置（允许Vercel前端访问）
        add_header 'Access-Control-Allow-Origin' 'https://stats.yanfd.tech' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
        
        # 处理OPTIONS请求
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' 'https://stats.yanfd.tech';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';
            add_header 'Access-Control-Max-Age' 86400;
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            return 204;
        }
    }
}
EOF

    # 5. 启用配置
    sudo ln -sf /etc/nginx/sites-available/api /etc/nginx/sites-enabled/
    
    # 6. 测试nginx配置
    sudo nginx -t
    
    # 7. 启动nginx
    echo "🚀 启动nginx..."
    sudo systemctl start nginx
    sudo systemctl reload nginx
    
    # 8. 设置自动续期
    echo "⏰ 设置自动续期..."
    (crontab -l 2>/dev/null; echo "0 2 * * * certbot renew --pre-hook 'systemctl stop nginx' --post-hook 'systemctl start nginx'") | crontab -
    
    echo ""
    echo "✅ 全部完成！"
    echo "================================"
    echo ""
    echo "🔍 测试HTTPS连接："
    echo "curl https://api.yanfd.tech/api/hughes/status"
    echo ""
    echo "📝 前端配置确认："
    echo "确保 .env.production 包含："
    echo "NEXT_PUBLIC_API_URL=https://api.yanfd.tech"
    echo ""
    echo "🚀 推送代码让Vercel重新部署："
    echo "git add ."
    echo "git commit -m 'Configure HTTPS API'"
    echo "git push"
    
else
    echo "❌ 证书获取失败"
    echo "请检查："
    echo "1. DNS是否已生效（api.yanfd.tech → 150.109.205.114）"
    echo "2. 防火墙是否开放80和443端口"
    echo "3. 是否有其他服务占用80端口"
    
    # 重启nginx避免服务中断
    sudo systemctl start nginx
fi