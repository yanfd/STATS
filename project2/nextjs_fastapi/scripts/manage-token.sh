#!/bin/bash

# Hughes API Token管理脚本
# 用于在服务器上手动设置或更新GitHub Token
# Token保存在 /etc/hughes-api/env （安全位置，不会被git覆盖）

set -e

echo "=== Hughes API Token 管理工具 ==="
echo ""

# 检查权限
if [ "$EUID" -ne 0 ]; then
    echo "错误：此脚本需要root权限运行"
    echo "请使用: sudo $0"
    exit 1
fi

# 配置文件路径
CONFIG_DIR="/etc/hughes-api"
CONFIG_FILE="$CONFIG_DIR/env"

# 创建配置目录
mkdir -p $CONFIG_DIR

# 检查现有Token
CURRENT_TOKEN=""
if [ -f "$CONFIG_FILE" ]; then
    CURRENT_TOKEN=$(grep "^GITHUB_TOKEN=" "$CONFIG_FILE" 2>/dev/null | cut -d'=' -f2 || echo "")
fi

# 显示当前状态
if [ -n "$CURRENT_TOKEN" ]; then
    # 只显示Token的前后几位
    TOKEN_DISPLAY="${CURRENT_TOKEN:0:7}...${CURRENT_TOKEN: -4}"
    echo "当前Token: $TOKEN_DISPLAY"
else
    echo "当前状态: 未配置Token"
fi

echo ""
echo "选择操作："
echo "1) 设置新Token"
echo "2) 查看当前配置"
echo "3) 测试同步功能"
echo "4) 删除Token配置"
echo "5) 退出"
echo ""
read -p "请选择 [1-5]: " choice

case $choice in
    1)
        echo ""
        echo "请输入GitHub Personal Access Token:"
        echo "（需要repo读取权限，访问 https://github.com/settings/tokens 创建）"
        read -s -p "Token: " NEW_TOKEN
        echo ""
        
        if [ -z "$NEW_TOKEN" ]; then
            echo "错误：Token不能为空"
            exit 1
        fi
        
        # 保存Token
        cat > "$CONFIG_FILE" << EOF
# Hughes API Configuration
# Updated at $(date)
GITHUB_TOKEN=$NEW_TOKEN
HUGHES_GITHUB_TOKEN=$NEW_TOKEN
EOF
        
        # 设置权限
        chmod 600 "$CONFIG_FILE"
        chown root:root "$CONFIG_FILE"
        
        echo "✓ Token已保存到 $CONFIG_FILE"
        
        # 重启服务
        echo ""
        read -p "是否重启hughes-api服务？(y/n) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            systemctl restart hughes-api
            echo "✓ 服务已重启"
            
            # 等待服务启动
            sleep 3
            
            # 测试同步
            echo ""
            echo "测试同步功能..."
            curl -s http://localhost:8000/api/hughes/sync | python3 -m json.tool 2>/dev/null || echo "同步测试失败"
        fi
        ;;
        
    2)
        echo ""
        echo "配置文件位置: $CONFIG_FILE"
        if [ -f "$CONFIG_FILE" ]; then
            echo "文件权限: $(ls -l $CONFIG_FILE)"
            echo ""
            echo "环境变量:"
            grep -E "^[A-Z]" "$CONFIG_FILE" | sed 's/=.*/=<已隐藏>/'
        else
            echo "配置文件不存在"
        fi
        
        echo ""
        echo "服务状态:"
        systemctl status hughes-api --no-pager | head -10
        ;;
        
    3)
        echo ""
        echo "测试API同步功能..."
        echo ""
        
        # 测试API状态
        echo "1. 检查API状态:"
        curl -s http://localhost:8000/api/hughes/status | python3 -m json.tool 2>/dev/null || echo "API未响应"
        
        echo ""
        echo "2. 触发数据同步:"
        curl -s http://localhost:8000/api/hughes/sync | python3 -m json.tool 2>/dev/null || echo "同步失败"
        
        echo ""
        echo "3. 检查数据文件:"
        ls -la /root/apps/tailwind_test/project2/nextjs_fastapi/processed/ 2>/dev/null || echo "数据目录不存在"
        ;;
        
    4)
        echo ""
        read -p "确定要删除Token配置吗？这将导致API无法同步数据。(y/n) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            rm -f "$CONFIG_FILE"
            echo "✓ Token配置已删除"
            echo ""
            echo "请重启服务使更改生效: systemctl restart hughes-api"
        fi
        ;;
        
    5)
        echo "退出"
        exit 0
        ;;
        
    *)
        echo "无效选择"
        exit 1
        ;;
esac

echo ""
echo "完成！"