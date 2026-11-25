FROM oven/bun:1 AS builder
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install
COPY . .
ARG EXPO_PUBLIC_WEATHER_API_KEY
ENV EXPO_PUBLIC_WEATHER_API_KEY=$EXPO_PUBLIC_WEATHER_API_KEY
RUN bunx expo export --platform web

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
