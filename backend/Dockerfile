# 1️⃣ Imagen base con JDK 21
FROM eclipse-temurin:21-alpine

# 2️⃣ Carpeta de trabajo
WORKDIR /app

# 3️⃣ Copiar el JAR compilado desde target/
# (GitHub Actions va a generar este JAR antes del docker build)
COPY target/*.jar app.jar

# 4️⃣ Exponer el puerto
EXPOSE 8080

# 5️⃣ Arrancar con perfil de prod
ENTRYPOINT ["java", "-jar", "/app.jar", "--spring.profiles.active=prod"]
