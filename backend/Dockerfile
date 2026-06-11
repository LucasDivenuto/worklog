# ---------- STAGE 1: Build ----------
    FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
    WORKDIR /app
    
    # Copiamos primero pom.xml para aprovechar cache de dependencias
    COPY pom.xml .
    RUN mvn dependency:go-offline -B || true
    
    # Ahora copiamos el código fuente
    COPY src ./src
    
    # Compilamos el jar (Spring Boot lo empaqueta con dependencias)
    RUN mvn clean package -DskipTests -B
    
# ---------- STAGE 2: Runtime ----------
    FROM eclipse-temurin:21-alpine
    WORKDIR /app
    
    COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar app.jar
    
    EXPOSE 8080
    ENTRYPOINT ["java","-jar","app.jar","--spring.profiles.active=prod"]