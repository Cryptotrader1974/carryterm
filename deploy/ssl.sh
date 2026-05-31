#!/bin/bash
# Get free SSL cert via Let's Encrypt
# Usage: bash ssl.sh yourdomain.com
set -e

DOMAIN=$1
if [ -z "$DOMAIN" ]; then
  echo "Usage: bash ssl.sh yourdomain.com"
  exit 1
fi

# Install certbot
apt-get install -y certbot

# Stop nginx temporarily to get cert
docker compose stop nginx

# Get cert
certbot certonly --standalone -d $DOMAIN --non-interactive --agree-tos -m admin@$DOMAIN

# Update nginx.conf with domain
sed -i "s/carryterm.io/$DOMAIN/g" /opt/carryterm/nginx.conf

# Uncomment HTTPS block and redirect
sed -i 's|# return 301|return 301|' /opt/carryterm/nginx.conf
sed -i 's|# server {|server {|' /opt/carryterm/nginx.conf
sed -i 's|#     listen 443|    listen 443|' /opt/carryterm/nginx.conf
sed -i 's|#     server_name|    server_name|' /opt/carryterm/nginx.conf
sed -i 's|#     ssl_cert|    ssl_cert|' /opt/carryterm/nginx.conf
sed -i 's|#     location / {|    location / {|' /opt/carryterm/nginx.conf
sed -i 's|#         proxy_|        proxy_|' /opt/carryterm/nginx.conf
sed -i 's|#     }|}|' /opt/carryterm/nginx.conf
sed -i 's|# }|}|' /opt/carryterm/nginx.conf

# Restart nginx
docker compose start nginx

echo "SSL configured. CarryTerm is live at https://$DOMAIN"
