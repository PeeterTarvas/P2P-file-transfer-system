## Requirements:
 - Java 21 https://www.azul.com/downloads/?package=jdk#zulu
 - Node v20+ https://nodejs.org/en
 - Docker https://www.docker.com/

To run:
- Postgres on docker, server on local, client on local:
    - cd ./server 
    - docker compose up <- starts database
    - ./gradlew bootRun (alternatively start main class server/src/main/java/com/server/iot/server/ServerApplication.java on IDE)
    - cd ..
    - cd ./client
    - npm install
    - npm run dev
- Test everything out on root compose:
  - docker compose up

Recommendation:
 - Run in IntelliJ

Done:
 - Dockerized 
 - Disable cors on server(might need to change later)
 - Added initial user and address tables
 - Added peer.js as a package in client

TODO:
 - login(user auth etc..)
 - client-to-client connection
 - file upload
 - file download
 - ...