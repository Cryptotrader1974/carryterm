#!/bin/bash
# CarryTerm — One-command setup for Ubuntu 22.04 LTS droplet
# Usage: bash setup.sh
set -e

echo "=== CarryTerm Server Setup ==="

# 1. Update system
apt-get update -y && apt-get upgrade -y

# 2. Install Docker
apt-get install -y ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 3. Install git
apt-get install -y git

# 4. Clone repo (replace with your actual GitHub URL once pushed)
# git clone https://github.com/YOUR_USERNAME/carryterm.git /opt/carryterm

# For now: copy files from current directory
mkdir -p /opt/carryterm
cp -r . /opt/carryterm/
cd /opt/carryterm

# 5. Start containers
docker compose up -d --build

echo ""
echo "=== Setup Complete ==="
echo "CarryTerm is running at http://$(curl -s ifconfig.me)"
echo ""
echo "Next steps:"
echo "  1. Point your domain DNS A record to: $(curl -s ifconfig.me)"
echo "  2. Run: bash /opt/carryterm/deploy/ssl.sh yourdomain.com"
echo "  3. Uncomment the HTTPS block in nginx.conf and restart: docker compose restart nginx"
