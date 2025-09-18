# --------- STAGE 1: Build ---------
    FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
    WORKDIR /app
    
    # Copiar todo lo necesario para ejecutar Maven Wrapper
    COPY mvnw .
    COPY .mvn .mvn
    COPY pom.xml .
    
    RUN chmod +x mvnw
    RUN ./mvnw dependency:go-offline -B
    
    # Ahora sí copiamos el código fuente
    COPY src ./src
    
    # Compilar JAR
    RUN ./mvnw clean package -DskipTests -B
    
    # --------- STAGE 2: Runtime ---------
    FROM eclipse-temurin:21-alpine
    WORKDIR /app
    
    # Copiar el jar desde el builder
    COPY --from=builder /app/target/*.jar app.jar
    
    EXPOSE 8080
    ENTRYPOINT ["java","-jar","/app.jar","--spring.profiles.active=prod"]
    