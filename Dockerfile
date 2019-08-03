FROM node:10-alpine
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --production
COPY . /app
CMD ["npm", "start"]
