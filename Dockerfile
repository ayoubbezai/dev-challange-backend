##############################
# Stage 1: Build
##############################
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the app source
COPY . .

# Make DATABASE_URL available during build
# (Render requires this for Prisma)
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Generate Prisma client
RUN npx prisma generate

# Build NestJS app
RUN npm run build


##############################
# Stage 2: Production Image
##############################
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy compiled app and prisma client
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
