FROM node:10.17.0-alpine
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install and cache app dependencies
# add app
COPY backend/ /app
RUN npm install

RUN npm run build
# start app
ENV NODE_ENV "production"
ENV MONGODB_URI "mongodb://localhost:27017/test"

CMD ["npm","run","serve"]
