FROM node:14-slim
# Setting working directory of the app in the container
WORKDIR /apps/node-ejs-app
# Copying all the files package.json and package-lock.json
COPY package*.json ./
# Install the dependencies
RUN npm i
# Copy all the source code contents to the workdir
COPY . .
# Exposing container to port 3000
EXPOSE 3000
# start the application
CMD [ "node", "." ]

