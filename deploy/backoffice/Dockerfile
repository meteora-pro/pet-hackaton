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
COPY apps/backoffice /usr/src/app/apps/backoffice

# Build app
RUN npm run build:backoffice

FROM nginx:alpine

RUN mkdir -p /usr/backoffice/www
WORKDIR /usr/backoffice

# Copy custom configuration file from the current directory
COPY ./deploy/backoffice/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /usr/src/app/dist/apps/backoffice/ /usr/backoffice/www/

EXPOSE 80
