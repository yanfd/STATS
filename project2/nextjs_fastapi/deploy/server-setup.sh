#!/bin/bash

# Hughes API 部署脚本
# 在服务器上首次运行此脚本进行初始化

set -e

echo "=== Hughes API 服务器初始化脚本 ==="

# 配置变量
APP_DIR="$HOME/apps/hughes-api"
SERVICE_NAME="hughes-api"
PYTHON_VERSION="python3"

# 1. 创建应用目录
echo "创建应用目录..."
mkdir -p $APP_DIR
cd $APP_DIR

# 2. 检查Python
echo "检查Python版本..."
$PYTHON_VERSION --version

# 3. 创建systemd服务文件
echo "创建systemd服务文件..."
sudo tee /etc/systemd/system/${SERVICE_NAME}.service > /dev/null <<EOF
[Unit]
Description=Hughes API FastAPI Service
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$APP_DIR/project2/nextjs_fastapi
Environment="PATH=$APP_DIR/project2/nextjs_fastapi/venv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
Environment="GITHUB_TOKEN=\${GITHUB_TOKEN}"
ExecStart=$APP_DIR/project2/nextjs_fastapi/venv/bin/python main.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# 4. 创建环境变量文件
echo "创建环境变量配置文件..."
cat > $APP_DIR/.env <<EOF
# Hughes API Configuration
# 请填入你的GitHub Token
GITHUB_TOKEN=your_github_token_here
EOF

echo "请编辑 $APP_DIR/.env 文件，填入你的GitHub Token"

# 5. 重载systemd配置
echo "重载systemd配置..."
sudo systemctl daemon-reload

# 6. 创建手动启动脚本
cat > $APP_DIR/start.sh <<'EOF'
#!/bin/bash
cd ~/apps/hughes-api/project2/nextjs_fastapi
source venv/bin/activate
source ../../.env
export GITHUB_TOKEN
nohup python main.py > hughes-api.log 2>&1 &
echo $! > hughes-api.pid
echo "Hughes API started with PID $(cat hughes-api.pid)"
EOF

chmod +x $APP_DIR/start.sh

# 7. 创建停止脚本
cat > $APP_DIR/stop.sh <<'EOF'
#!/bin/bash
if [ -f ~/apps/hughes-api/hughes-api.pid ]; then
    kill $(cat ~/apps/hughes-api/hughes-api.pid)
    rm ~/apps/hughes-api/hughes-api.pid
    echo "Hughes API stopped"
else
    echo "PID file not found"
fi
EOF

chmod +x $APP_DIR/stop.sh

echo ""
echo "=== 初始化完成 ==="
echo ""
echo "后续步骤："
echo "1. 克隆你的代码仓库到 $APP_DIR"
echo "2. 编辑 $APP_DIR/.env 设置你的GITHUB_TOKEN"
echo "3. 进入 $APP_DIR/project2/nextjs_fastapi 运行："
echo "   python3 -m venv venv"
echo "   source venv/bin/activate"
echo "   pip install -r requirements.txt"
echo ""
echo "启动服务："
echo "  使用systemd: sudo systemctl start hughes-api"
echo "  或手动启动: $APP_DIR/start.sh"
echo ""
echo "查看日志："
echo "  journalctl -u hughes-api -f"
echo "  或: tail -f $APP_DIR/hughes-api.log"