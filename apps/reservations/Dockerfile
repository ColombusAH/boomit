# Development stage
FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json

RUN npm install -g pnpm

COPY apps/reservations apps/reservations
COPY libs libs

# Install dependencies
RUN pnpm install

# Build the application
RUN pnpm run build reservations && echo "Build successful!" && ls -l /usr/src/app/dist && ls -l /usr/src/app/dist/apps && ls -l /usr/src/app/dist/apps/reservations

# Check if dist exists and is populated
RUN ls -l /usr/src/app/dist

RUN ls -l /usr/src/app/dist/apps

RUN ls -l /usr/src/app/dist/apps/reservations/src

# Production stage
FROM node:alpine as production 

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --prod

# Copy dist from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Check if dist exists in the production stage
RUN ls -l /usr/src/app/dist/apps/reservations/src

CMD [ "node", "dist/apps/reservations/src/main" ]
