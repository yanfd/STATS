#!/bin/bash

echo "=== FastAPI调试脚本 ==="
echo ""

# 1. 检查服务状态
echo "1. 检查服务状态..."
ssh -i ~/.ssh/github-deploy-key root@150.109.205.114 << 'EOF'
echo "--- Systemd服务状态 ---"
systemctl status hughes-api --no-pager

echo ""
echo "--- 检查进程 ---"
ps aux | grep -E "uvicorn|fastapi|python.*main:app" | grep -v grep

echo ""
echo "--- 检查端口 ---"
netstat -tlnp | grep 8000 || ss -tlnp | grep 8000

echo ""
echo "--- 最近的服务日志 ---"
journalctl -u hughes-api -n 50 --no-pager
EOF

# 2. 尝试直接运行FastAPI
echo ""
echo "2. 尝试手动启动FastAPI测试..."
ssh -i ~/.ssh/github-deploy-key root@150.109.205.114 << 'EOF'
cd /root/apps/hughes-api/project2/nextjs_fastapi

# 检查目录和文件
echo "--- 检查项目文件 ---"
ls -la
echo ""

# 检查Python和依赖
echo "--- Python版本 ---"
python3 --version
echo ""

# 检查虚拟环境
if [ -d "venv" ]; then
    echo "虚拟环境存在"
    source venv/bin/activate
    
    echo "--- 已安装的包 ---"
    pip list | grep -E "fastapi|uvicorn|pydantic"
    
    echo ""
    echo "--- 尝试导入测试 ---"
    python3 -c "import fastapi; import uvicorn; print('FastAPI和Uvicorn导入成功')" 2>&1
    
    echo ""
    echo "--- 检查main.py ---"
    if [ -f "main.py" ]; then
        head -20 main.py
    else
        echo "main.py不存在！"
        echo "查找Python文件："
        find . -name "*.py" -type f
    fi
else
    echo "虚拟环境不存在，需要创建"
fi
EOF

# 3. 检查Nginx配置
echo ""
echo "3. 检查Nginx配置..."
ssh -i ~/.ssh/github-deploy-key root@150.109.205.114 << 'EOF'
echo "--- Nginx状态 ---"
systemctl status nginx --no-pager | head -10

echo ""
echo "--- Nginx配置（FastAPI相关） ---"
grep -r "8000\|hughes\|fastapi" /etc/nginx/sites-enabled/ 2>/dev/null || echo "没有找到FastAPI相关配置"

echo ""
echo "--- Nginx错误日志 ---"
tail -20 /var/log/nginx/error.log
EOF

echo ""
echo "=== 调试完成 ==="