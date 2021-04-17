FROM node:latest
# The app's directory in docker image
WORKDIR /apps/src
# Install the app dependencies. * denotes Copy both package.json and package-lock.json is available
COPY package*.json ./
RUN npm i
# Copy all the source code contents to the workdir
COPY . .

EXPOSE 8080
CMD [ "node", "." ]
