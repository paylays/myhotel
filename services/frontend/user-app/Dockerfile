# Stage 1: Install dependencies
FROM node:18 AS deps

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Clean node_modules and install dependencies
RUN rm -rf node_modules && npm install --legacy-peer-deps

# Reinstall vite to ensure a clean binary
RUN npm install vite@6.3.4 --force

# Verify node, npm, and vite versions, log to file
RUN (node --version && npm --version && npx vite --version) > debug.log 2>&1 || echo "Version check failed" >> debug.log

# Inspect vite script, log to file
RUN (cat node_modules/.bin/vite || echo "Failed to cat vite script") >> debug.log 2>&1

# Test node executable, log to file
RUN (echo "console.log('Node.js is working');" > test.js && node test.js || echo "Node test failed") >> debug.log 2>&1

# Test vite script execution, log to file
RUN (node node_modules/.bin/vite --version || echo "Vite script execution failed") >> debug.log 2>&1

# Stage 2: Build
FROM node:18 AS builder

WORKDIR /app

# Copy node_modules and debug log from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/package-lock.json ./package-lock.json
COPY --from=deps /app/debug.log ./debug.log

# Copy the rest of the application
COPY . .

# Run the build, log to file
RUN (npm run build || echo "Build failed") >> debug.log 2>&1

# Stage 3: Serve
FROM nginx:alpine

# Copy debug log for inspection
COPY --from=builder /app/debug.log /usr/share/nginx/html/debug.log
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]