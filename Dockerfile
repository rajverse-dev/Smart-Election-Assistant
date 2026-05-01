# Stage 1: Build the React frontend
FROM node:22-alpine AS frontend-builder
WORKDIR /app/frontend
# Pass Vite variables during build
ARG VITE_GOOGLE_MAPS_API_KEY
ENV VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Setup the Node.js backend
FROM node:22-alpine
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ .

# Copy the built frontend into the backend's public directory
COPY --from=frontend-builder /app/frontend/dist ./public

# Expose port (Cloud Run sets PORT env var, defaults to 8080)
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
