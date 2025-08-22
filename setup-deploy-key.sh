#!/bin/bash

echo "=== 创建GitHub Actions部署专用SSH密钥 ==="
echo ""

# 1. 生成新的SSH密钥对（专门用于GitHub Actions部署）
echo "1. 生成部署专用密钥..."
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github-deploy-key -N ""

echo ""
echo "2. 私钥内容（复制到 GitHub Secrets 的 SERVER_SSH_KEY）："
echo "---开始---"
cat ~/.ssh/github-deploy-key
echo "---结束---"

echo ""
echo "3. 公钥内容（需要添加到服务器）："
echo "---开始---"
cat ~/.ssh/github-deploy-key.pub
echo "---结束---"

echo ""
echo "=== 接下来的步骤 ==="
echo ""
echo "4. 将公钥添加到服务器（在本地执行）："
echo "   ssh root@150.109.205.114 'echo \"$(cat ~/.ssh/github-deploy-key.pub)\" >> ~/.ssh/authorized_keys'"
echo ""
echo "5. 测试新密钥是否工作："
echo "   ssh -i ~/.ssh/github-deploy-key root@150.109.205.114 'echo SSH连接成功'"
echo ""
echo "6. 在GitHub仓库设置中添加Secrets："
echo "   - SERVER_HOST: 150.109.205.114"
echo "   - SERVER_USER: root"
echo "   - SERVER_PORT: 22"
echo "   - SERVER_SSH_KEY: （上面显示的私钥内容）"
echo ""