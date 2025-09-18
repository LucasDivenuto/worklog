# ---------- STAGE 1: Build ----------
    FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
    WORKDIR /app
    
    # Copiamos solo lo necesario para cachear dependencias
    COPY pom.xml .
    COPY mvnw .
    COPY .mvn/ .mvn/
    
    RUN chmod +x mvnw
    RUN ./mvnw dependency:go-offline -B || true
    
    # Ahora copiamos el código fuente
    COPY src ./src
    
    # Compilamos
    RUN mvn clean package -DskipTests -B
    
    # ---------- STAGE 2: Runtime ----------
    FROM eclipse-temurin:21-alpine
    WORKDIR /app
    
    COPY --from=builder /app/target/*.jar app.jar
    
    EXPOSE 8080
    ENTRYPOINT ["java","-jar","/app.jar","--spring.profiles.active=prod"]
    