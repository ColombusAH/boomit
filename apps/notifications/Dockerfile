# Stage 1: Build the application (with an environment parameter)
FROM node:alpine AS development

# Define a build-time argument for the environment, with a default value of 'development'
# ARG BUILD_ENV=development
# ENV NODE_ENV=${BUILD_ENV}

WORKDIR /usr/src/app

# Copy only the package files to leverage Docker's layer caching
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json

# Install pnpm globally
RUN npm install -g pnpm

# Copy the source code into the container
COPY apps/notifications apps/notifications
COPY libs libs

# Install dependencies, including devDependencies if needed
RUN pnpm install -r 

# Run the build command; BUILD_ENV can determine which configuration to use
RUN pnpm run build notifications && echo "Build successful!" && ls -l /usr/src/app/dist

# Ensure the dist folder is created
RUN ls -l /usr/src/app/dist

# Stage 2: Create the production image
FROM node:alpine AS production

# Define a build-time argument for the environment, default is 'production'
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy only the package files
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install only production dependencies
RUN pnpm install -r --prod

# Copy the build artifacts from the 'development' stage
COPY --from=development /usr/src/app/dist ./dist

# Ensure the dist folder exists in production stage
RUN ls -l /usr/src/app/dist

# Define the command to run the application
CMD ["node", "dist/apps/notifications/src/main"]
