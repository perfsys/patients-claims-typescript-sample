FROM node:10.17.0-alpine
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV "production"
# install and cache app dependencies
COPY backend-ts/package.json /app/package.json
RUN npm install
# add app
COPY backend-ts/ /app

RUN npm run build
# start app
CMD ["npm","run","serve"]
