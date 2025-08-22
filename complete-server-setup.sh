#!/bin/bash

echo "=== 完成服务器FastAPI设置 ==="

# 1. 克隆代码
echo "1. 克隆代码仓库..."
ssh -i ~/.ssh/github-deploy-key root@150.109.205.114 << 'EOF'
cd /root/apps/hughes-api
if [ ! -d ".git" ]; then
    git clone https://github.com/yanfd/tailwind_test.git .
else
    git pull origin main
fi
EOF

# 2. 设置环境变量（需要你提供token）
echo ""
echo "2. 请提供能访问Obsidian-Archive私有仓库的GitHub Token："
read -p "输入token (ghp_xxx): " GITHUB_TOKEN

ssh -i ~/.ssh/github-deploy-key root@150.109.205.114 << EOF
echo "GITHUB_TOKEN=$GITHUB_TOKEN" > /root/apps/hughes-api/.env
echo "HUGHES_GITHUB_TOKEN=$GITHUB_TOKEN" >> /root/apps/hughes-api/.env
EOF

# 3. 安装Python依赖
echo "3. 安装Python依赖..."
ssh -i ~/.ssh/github-deploy-key root@150.109.205.114 << 'EOF'
cd /root/apps/hughes-api/project2/nextjs_fastapi
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
EOF

# 4. 启动服务
echo "4. 启动FastAPI服务..."
ssh -i ~/.ssh/github-deploy-key root@150.109.205.114 << 'EOF'
systemctl start hughes-api
systemctl enable hughes-api
systemctl status hughes-api --no-pager
EOF

# 5. 测试API
echo ""
echo "5. 测试API..."
sleep 3
curl -s http://150.109.205.114:8000/api/hughes/status || echo "API可能需要几秒启动"

echo ""
echo "=== 完成！==="
echo "FastAPI运行在: http://150.109.205.114:8000"
echo "可以访问: http://150.109.205.114:8000/docs 查看API文档"