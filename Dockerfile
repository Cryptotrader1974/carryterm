FROM node:20-alpine

WORKDIR /app

# Install build dependencies for native modules (better-sqlite3)
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDeps needed for build)
RUN npm ci

# Copy source
COPY . .

# Build the app
RUN npm run build

# Remove devDependencies after build to slim the image
RUN npm prune --production

EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "dist/index.cjs"]
