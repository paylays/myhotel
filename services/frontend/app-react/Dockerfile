# Gunakan image node untuk tahap build
FROM node:20-alpine AS build

WORKDIR /app

# Salin file proyek ke container
COPY . .

# Install dependencies
RUN npm install

# Build aplikasi
RUN npm run build

# Gunakan Nginx untuk serving file build
FROM nginx:alpine

# Copy hasil build ke folder Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Salin konfigurasi default Nginx (opsional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
