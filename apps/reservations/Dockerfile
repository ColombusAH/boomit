# Base stage for fetching dependencies
FROM node:alpine as base

WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy the pnpm lockfile and package.json for efficient caching
COPY package.json pnpm-lock.yaml ./

# Fetch dependencies to prepare for offline installation
RUN pnpm fetch --prod

# Development stage for building the reservations app
FROM base as development

# Copy all files into the container
COPY . .

# Install all dependencies for building
RUN pnpm install -r

# Build the reservations app
RUN pnpm run build reservations && echo "Build successful!" && \
    ls -l /usr/src/app/dist && \
    ls -l /usr/src/app/dist/apps && \
    ls -l /usr/src/app/dist/apps/reservations

# Production stage with production dependencies only
FROM node:alpine as production

WORKDIR /usr/src/app

# Install pnpm globally in the production image
RUN npm install -g pnpm

# Copy pnpm lockfile and package.json for production installation
COPY pnpm-lock.yaml package.json ./

# Fetch production dependencies only
RUN pnpm fetch --prod

# Copy built assets from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Copy node_modules for the reservations project (if needed)
COPY --from=development /usr/src/app/node_modules ./node_modules
# COPY --from=development /usr/src/app/apps/reservations/node_modules ./apps/reservations/

# Check if everything exists as expected
RUN ls -l /usr/src/app/dist/apps/reservations/src

# Set environment variable
ENV NODE_ENV=production

# Start the application
CMD [ "node", "dist/apps/reservations/main" ]
