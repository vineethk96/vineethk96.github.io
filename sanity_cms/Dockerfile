FROM node:20-bookworm

# System packages: git for version ops, curl for health checks,
# python3 + make + g++ for node-gyp native builds
RUN apt-get update && apt-get install -y \
    git \
    curl \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Install global tools: Claude CLI and Playwright MCP server
RUN npm install -g \
    @anthropic-ai/claude-code \
    @playwright/mcp

# Install Playwright Chromium browser + system deps for headless operation
RUN npx playwright install --with-deps chromium

WORKDIR /app

# Copy package files and pre-install deps as a cached layer.
# The compose file mounts a named volume over node_modules so the
# host's node_modules never overwrites this layer.
COPY package*.json ./
RUN npm ci

ENV CI=true
ENV SANITY_TELEMETRY_DISABLED=1

EXPOSE 3333

# Sanity hot-reload requires polling inside Docker (inotify doesn't work over bind mounts)
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

CMD ["npx", "sanity", "dev", "--host=0.0.0.0", "--port=3333"]
