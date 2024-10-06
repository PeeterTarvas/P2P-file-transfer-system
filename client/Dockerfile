FROM node:21-bullseye-slim
RUN mkdir /client
WORKDIR /client
COPY /client .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
EXPOSE 5173