FROM node:20-slim AS base

WORKDIR /app

# Copy only dependency files first for better caching
COPY package.json package-lock.json ./
COPY angular.json tsconfig*.json ./

# Copy source and public files
COPY src ./src
COPY public ./public

RUN npm ci
RUN npm run build --prod

FROM nginx:alpine AS runtime
COPY --from=base /app/dist/my-angular-app/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.conf.template

ENV API_HOST="http://localhost:8080"

EXPOSE 80
