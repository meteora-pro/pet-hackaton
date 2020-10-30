FROM node:12 as builder
# Choose a workdir
WORKDIR /usr/src/app
# Copy sources
COPY package.json .
COPY package-lock.json .
COPY .npmrc .
COPY angular.json .
COPY tools .
COPY decorate-angular-cli.js .
COPY nx.json .
COPY tsconfig.base.json .

RUN npm ci

COPY libs /usr/src/app/libs
COPY apps/frontoffice /usr/src/app/apps/frontoffice

# Build app
RUN npm run build:frontoffice

FROM nginx:alpine

RUN mkdir -p /usr/frontoffice/www
WORKDIR /usr/frontoffice

# Copy custom configuration file from the current directory
COPY ./deploy/frontoffice/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /usr/src/app/dist/apps/frontoffice/ /usr/frontoffice/www/

EXPOSE 80
