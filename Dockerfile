FROM node:13.3.0-alpine3.10
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD npm start
