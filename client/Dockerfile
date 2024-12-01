FROM node:21-bullseye-slim
RUN mkdir /client
WORKDIR /client
COPY . /client
RUN npm install
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
EXPOSE 5173