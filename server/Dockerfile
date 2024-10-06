FROM gradle:8.10-jdk21 AS build
COPY --chown=gradle:gradle server /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build -x test --no-daemon


FROM openjdk:21-oracle
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/server-0.0.1-SNAPSHOT.jar /app/spring-boot-application.jar
ENTRYPOINT ["java", "-jar", "/app/spring-boot-application.jar"]
EXPOSE 8080