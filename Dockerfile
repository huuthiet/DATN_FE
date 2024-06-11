# Sử dụng image chứa Node.js phiên bản 14 trên Alpine Linux làm base image
FROM node:14-alpine as build

# Cài đặt các công cụ build cần thiết, bao gồm zlib-dev
RUN apk add --no-cache \
    make \
    gcc \
    g++ \
    python3 \
    autoconf \
    automake \
    libtool \
    nasm \
    bash \
    optipng \
    zlib-dev

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép file package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các gói npm
RUN npm install

# Sao chép tất cả các file trong thư mục hiện tại vào thư mục làm việc
COPY . .

# Kiểm tra optipng-bin
RUN ls -la /app/node_modules/optipng-bin/vendor/ && /app/node_modules/optipng-bin/vendor/optipng --version

ENV NODE_OPTIONS=--max_old_space_size=8192

# Build ứng dụng
RUN npm run build

# Sử dụng image chứa Nginx phiên bản stable trên Alpine Linux
FROM nginx:stable-alpine

# Sao chép các tệp build từ stage trước vào thư mục root của Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Sao chép tệp cấu hình Nginx tùy chỉnh
COPY nginx.conf /etc/nginx/nginx.conf

# Mở cổng 3006
EXPOSE 3006

# Khởi động Nginx trong chế độ daemon
CMD ["nginx", "-g", "daemon off;"]