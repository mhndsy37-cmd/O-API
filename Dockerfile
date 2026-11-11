# stage
FROM node:22-slim AS builder

# workdir
WORKDIR /app

# install pnpm
RUN npm install -g pnpm

# set registry
RUN pnpm config set registry https://registry.npmjs.org/

# copy
COPY package.json pnpm-lock.yaml* ./

# install
RUN pnpm install --config.strict-peer-dependencies=false --config.dangerously-allow-all-builds=true

# copy
COPY . .

# build
RUN pnpm run build

# stage
FROM node:22-slim AS production

# workdir
WORKDIR /app

# env
ENV NODE_ENV=production

# install pnpm
RUN npm install -g pnpm

# set registry
RUN pnpm config set registry https://registry.npmjs.org/

# copy
COPY package.json pnpm-lock.yaml* ./

# install production
RUN pnpm install --prod --config.strict-peer-dependencies=false --config.dangerously-allow-all-builds=true

# copy dist
COPY --from=builder /app/dist ./dist

# port
EXPOSE 3000

# run
CMD ["node", "dist/main.js"]