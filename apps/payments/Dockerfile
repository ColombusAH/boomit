# Development stage
FROM node:alpine as development

WORKDIR /usr/src/app

# Copy package.json and pnpm lock file
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json

# Install pnpm globally
RUN npm install -g pnpm

# Copy the payments app and libs
COPY apps/payments apps/payments
COPY libs libs

# Install all dependencies, including devDependencies
RUN pnpm install -r 

# Build the payments app and log the output
RUN pnpm run build payments && echo "Build successful!" && ls -l /usr/src/app/dist

# Ensure that the dist directory exists and is populated
RUN ls -l /usr/src/app/dist

# Production stage
FROM node:alpine as production 

# Set the environment variable for production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy package.json and pnpm lock file for production dependencies
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install pnpm globally in the production image
RUN npm install -g pnpm

# Install only production dependencies
RUN pnpm install --prod

# Copy the dist folder from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Ensure dist exists and is populated in the production stage
RUN ls -l /usr/src/app/dist

# Start the application
CMD [ "node", "dist/apps/payments/src/main" ]
