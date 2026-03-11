FROM node:20-bookworm-slim

# System packages: git for version ops, curl for health checks,
# python3 + make + g++ for node-gyp native builds
RUN apt-get update && apt-get install -y \
    git \
    curl \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Install global tools: Claude CLI for interactive dev sessions
RUN npm install -g @anthropic-ai/claude-code

WORKDIR /app

# Copy package files and pre-install deps as a cached layer.
# The compose file mounts a named volume over node_modules so the
# host's node_modules never overwrites this layer.
COPY package*.json ./
RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]
