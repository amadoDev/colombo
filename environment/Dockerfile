FROM node:10-alpine
LABEL Author="Web Team <equipo_web@qdqmedia.com>"

RUN apk update && apk upgrade
# Installs bash (tsuru requirement)
RUN apk add bash

# Create app directory
WORKDIR /home/application/current
COPY src .

# Bundle app source
ARG NODE_ENV=development
ENV NODE_ENV ${NODE_ENV}
ARG URL=/
ENV URL ${URL}

RUN npm install
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 4000:4000

ENTRYPOINT ["npm" , "start"]