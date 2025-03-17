FROM eclipse-temurin:21-jdk as build

COPY . /app
WORKDIR /app

RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline -e -X
RUN ./mvnw package -DskipTests -e -X -Dmaven.compiler.memory=512m -Dorg.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=warn
RUN mv -f target/*.jar app.jar

FROM eclipse-temurin:21-jre

ARG PORT
ENV PORT=${PORT}

COPY --from=build /app/app.jar .

RUN useradd runtime
USER runtime

ENTRYPOINT [ "java", "-Dserver.port=${PORT}", "-jar", "app.jar" ]