# GitHub Actions 部署配置

## 需要在GitHub仓库设置的Secrets

在你的GitHub仓库中，进入 Settings → Secrets and variables → Actions，添加以下secrets：

### 1. 服务器连接信息
- `SERVER_HOST`: 你的服务器IP地址或域名
- `SERVER_USER`: SSH用户名（如 ubuntu、root等）
- `SERVER_PORT`: SSH端口（默认22）
- `SERVER_SSH_KEY`: 服务器的SSH私钥（完整内容）

### 2. Token信息
- `HUGHES_GITHUB_TOKEN`: 用于访问Obsidian-Archive仓库的GitHub token
- `GITHUB_TOKEN`: （这个GitHub会自动提供，不需要设置）

## 获取SSH私钥

在本地运行：
```bash
# 如果还没有SSH密钥，生成一个
ssh-keygen -t rsa -b 4096 -C "github-actions"

# 查看私钥内容（复制到SERVER_SSH_KEY）
cat ~/.ssh/id_rsa

# 将公钥添加到服务器
ssh-copy-id user@your-server
```

## 服务器初始设置

第一次需要在服务器上手动执行：

```bash
# 1. 创建应用目录
mkdir -p ~/apps/hughes-api
cd ~/apps/hughes-api

# 2. 克隆仓库（如果是私有仓库）
git clone https://github.com/你的用户名/你的仓库名.git .

# 3. 创建systemd服务文件
sudo nano /etc/systemd/system/hughes-api.service
```

systemd服务文件内容见下一个文件...