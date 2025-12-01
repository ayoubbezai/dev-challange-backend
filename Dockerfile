# Stage 1: Build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install deps
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the NestJS app
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copy package files and install only production deps
COPY package.json package-lock.json ./
RUN npm install --production

# Copy build and Prisma client
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "dist/main.js"]
