FROM node:10.17.0-alpine
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install and cache app dependencies
COPY front/package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli
# add app
COPY front/ /app
# start app
CMD ["ng", "serve", "--host", "0.0.0.0"]
