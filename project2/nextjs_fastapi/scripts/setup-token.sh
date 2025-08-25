#!/bin/bash

# Hughes API Token配置脚本
# 用于设置或更新GitHub Token

set -e

echo "=== Hughes API Token 配置脚本 ==="
echo ""

# 检查是否在正确的目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$(dirname "$SCRIPT_DIR")"

if [ ! -f "$APP_DIR/main.py" ]; then
    echo "错误：请在FastAPI项目目录中运行此脚本"
    exit 1
fi

# 读取现有token（如果存在）
CURRENT_TOKEN=""
if [ -f "$APP_DIR/.env" ]; then
    CURRENT_TOKEN=$(grep "^GITHUB_TOKEN=" "$APP_DIR/.env" 2>/dev/null | cut -d'=' -f2)
fi

# 提示输入新token
echo "当前Token: ${CURRENT_TOKEN:-未设置}"
echo ""
echo "请输入新的GitHub Personal Access Token:"
echo "（需要repo读取权限，访问 https://github.com/settings/tokens 创建）"
read -s -p "Token: " NEW_TOKEN
echo ""

if [ -z "$NEW_TOKEN" ]; then
    echo "错误：Token不能为空"
    exit 1
fi

# 创建或更新.env文件
cat > "$APP_DIR/.env" << EOF
# Hughes API Configuration
# Generated at $(date)
GITHUB_TOKEN=$NEW_TOKEN
HUGHES_GITHUB_TOKEN=$NEW_TOKEN
EOF

echo "✓ Token已保存到 $APP_DIR/.env"

# 如果是root用户，询问是否重启服务
if [ "$EUID" -eq 0 ]; then
    echo ""
    read -p "是否重启hughes-api服务？(y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        systemctl restart hughes-api
        echo "✓ 服务已重启"
        
        # 测试同步
        echo ""
        echo "测试同步功能..."
        sleep 2
        curl -s http://localhost:8000/api/hughes/sync | python3 -m json.tool || echo "同步测试失败"
    fi
fi

echo ""
echo "配置完成！"
echo ""
echo "后续步骤："
echo "1. 如果服务未重启，请运行: sudo systemctl restart hughes-api"
echo "2. 测试同步: curl http://localhost:8000/api/hughes/sync"
echo "3. 查看日志: journalctl -u hughes-api -f"