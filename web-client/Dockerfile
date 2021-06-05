FROM node:15.14.0 AS BASE

WORKDIR /frontend
COPY package.json ./
COPY package-lock.json ./
RUN npm install --verbose

WORKDIR /frontend
VOLUME /src
VOLUME /public
ENV PATH $PATH:/frontend/node_modules/.bin

#COPY . ./

EXPOSE 3000
CMD ["npm", "run", "start"]

