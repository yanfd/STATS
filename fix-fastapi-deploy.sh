#!/bin/bash

echo "=== 修复FastAPI部署问题 ==="
echo ""

# 1. 先停止错误的服务
echo "1. 停止错误的服务..."
ssh -i ~/.ssh/github-deploy-key root@150.109.205.114 << 'EOF'
systemctl stop hughes-api
systemctl disable hughes-api
EOF

# 2. 创建正确的目录结构并克隆代码
echo "2. 创建目录并克隆代码..."
ssh -i ~/.ssh/github-deploy-key root@150.109.205.114 << 'EOF'
# 创建apps目录
mkdir -p /root/apps
cd /root/apps

# 删除旧目录（如果存在）
rm -rf hughes-api

# 克隆代码
git clone https://github.com/yanfd/tailwind_test.git hughes-api
cd hughes-api

# 检查FastAPI目录是否存在
if [ ! -d "project2/nextjs_fastapi" ]; then
    echo "错误：FastAPI目录不存在，检查目录结构："
    find . -type d -name "*fastapi*" 2>/dev/null
    ls -la project2/
else
    echo "FastAPI目录存在"
fi
EOF

# 3. 创建Python虚拟环境和安装依赖
echo ""
echo "3. 设置Python环境..."
ssh -i ~/.ssh/github-deploy-key root@150.109.205.114 << 'EOF'
cd /root/apps/hughes-api/project2/nextjs_fastapi

# 使用python3创建虚拟环境
python3 -m venv venv

# 激活虚拟环境并安装依赖
source venv/bin/activate

# 升级pip
pip install --upgrade pip

# 检查requirements.txt是否存在
if [ -f "requirements.txt" ]; then
    echo "安装requirements.txt中的依赖..."
    pip install -r requirements.txt
else
    echo "requirements.txt不存在，安装基本FastAPI依赖..."
    pip install fastapi uvicorn pydantic python-dotenv requests
fi

# 验证安装
python -c "import fastapi; import uvicorn; print('✓ FastAPI和Uvicorn安装成功')"
EOF

# 4. 创建systemd服务文件
echo ""
echo "4. 创建systemd服务..."
ssh -i ~/.ssh/github-deploy-key root@150.109.205.114 << 'EOF'
cat > /etc/systemd/system/hughes-api.service << 'SERVICE'
[Unit]
Description=Hughes API FastAPI Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/apps/hughes-api/project2/nextjs_fastapi
Environment="PATH=/root/apps/hughes-api/project2/nextjs_fastapi/venv/bin"
ExecStart=/root/apps/hughes-api/project2/nextjs_fastapi/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
SERVICE

systemctl daemon-reload
EOF

# 5. 创建简单的测试main.py（如果不存在）
echo ""
echo "5. 确保main.py存在..."
ssh -i ~/.ssh/github-deploy-key root@150.109.205.114 << 'EOF'
cd /root/apps/hughes-api/project2/nextjs_fastapi

if [ ! -f "main.py" ]; then
    echo "创建测试main.py..."
    cat > main.py << 'PYTHON'
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="Hughes API")

# CORS配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hughes API is running"}

@app.get("/api/hughes/status")
def get_status():
    return {
        "status": "online",
        "service": "hughes-api",
        "version": "1.0.0"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
PYTHON
    echo "测试main.py已创建"
else
    echo "main.py已存在"
    head -20 main.py
fi
EOF

# 6. 设置环境变量
echo ""
echo "6. 设置环境变量..."
read -p "输入GitHub Token (可选，按Enter跳过): " GITHUB_TOKEN

if [ ! -z "$GITHUB_TOKEN" ]; then
ssh -i ~/.ssh/github-deploy-key root@150.109.205.114 << EOF
cd /root/apps/hughes-api/project2/nextjs_fastapi
echo "GITHUB_TOKEN=$GITHUB_TOKEN" > .env
echo "HUGHES_GITHUB_TOKEN=$GITHUB_TOKEN" >> .env
EOF
fi

# 7. 启动服务
echo ""
echo "7. 启动FastAPI服务..."
ssh -i ~/.ssh/github-deploy-key root@150.109.205.114 << 'EOF'
systemctl enable hughes-api
systemctl start hughes-api
sleep 3
systemctl status hughes-api --no-pager
EOF

# 8. 测试API
echo ""
echo "8. 测试API端点..."
sleep 2
echo "测试根路径："
curl -s http://150.109.205.114:8000/ | python3 -m json.tool 2>/dev/null || echo "API可能需要更多时间启动"
echo ""
echo "测试状态端点："
curl -s http://150.109.205.114:8000/api/hughes/status | python3 -m json.tool 2>/dev/null || echo "请稍等片刻"
echo ""
echo "测试健康检查："
curl -s http://150.109.205.114:8000/health | python3 -m json.tool 2>/dev/null

echo ""
echo "=== 部署完成 ==="
echo "FastAPI文档: http://150.109.205.114:8000/docs"
echo "API根路径: http://150.109.205.114:8000/"
echo ""
echo "如果仍有问题，运行: ./debug-fastapi.sh 查看详细信息"