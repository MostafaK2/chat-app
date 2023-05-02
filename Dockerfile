#
# Build stage
#
FROM maven:3.8.6-jdk-8 AS build
COPY . .
RUN mvn clean package -Pprod -DskipTests

#
# Package stage
#
ENV DATABASE_URI = database
ENV DATABASE_USER = user
ENV DATABASE_PASSWORD = pass

FROM openjdk:8-jdk-slim
COPY --from=build /target/chat-app-backend-0.0.1-SNAPSHOT.jar demo.jar
# ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["java","-jar","demo.jar"]