# Base stage for fetching dependencies
FROM node:alpine as base

WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy the pnpm lockfile and package.json for efficient caching
COPY package.json pnpm-lock.yaml ./

# Fetch dependencies to prepare for offline installation
RUN pnpm fetch --prod

# Development stage for building the payments app
FROM base as development

# Copy all files into the container
COPY . .

# Install all dependencies for building
RUN pnpm install -r --offline

# Build the payments app
RUN pnpm run build payments && echo "Build successful!" && ls -l /usr/src/app/dist

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

# Copy node_modules for the payments project (if needed)
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/apps/payments/node_modules ./apps/payments/node_modules

# Check if everything exists as expected
RUN ls -l /usr/src/app/dist

# Set environment variable
ENV NODE_ENV=production

# Start the application
CMD [ "node", "dist/apps/payments/main" ]
