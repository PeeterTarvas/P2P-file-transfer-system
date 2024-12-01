## Requirements:
 - Java 21 https://www.azul.com/downloads/?package=jdk#zulu
 - Node v20+ https://nodejs.org/en
 - Docker https://www.docker.com/

To run:
- Postgres on docker, server on local, client on local:
    - make sure in client/src/services/endpoints.tsx BASE_URL = "http://localhost:8080/" 
    - cd ./server 
    - docker compose up <- starts database
    - ./gradlew bootRun (alternatively start main class server/src/main/java/com/server/iot/server/ServerApplication.java on IDE)
    - cd ..
    - cd ./client
    - npm install
    - npm run dev
- To run client against the server:
    - make sure in client/src/services/endpoints.tsx BASE_URL = "http://48.209.187.92:8080/"
    - cd into client
    - run 'docker build -t client .'
    - run docker run -p 5173:5173 client
    - in your web browser you can access the application via http://localhost:5173

Recommendation:
 - Run in IntelliJ