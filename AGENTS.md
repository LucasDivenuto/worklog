# AGENTS.md

#

# Este archivo define cómo debe trabajar Codex dentro del proyecto WorkLog.

# No es documentación técnica para humanos.

# Es contexto para que el agente tome mejores decisiones.

#

# Objetivos:

# - Reducir cambios innecesarios

# - Mantener consistencia

# - Evitar errores en producción

# - Hacer debugging más preciso

#

# ============================================================================

# PROYECTO

# ============================================================================

#

# Contexto general del sistema.

# Le permite a Codex entender qué está construyendo antes de tocar código.

#

## Overview

WorkLog is a workforce management platform used by companies to manage employees, work shifts, attendance, and related operations.

The primary goals are:

- Reliability
- Simplicity
- Maintainability

Users are mostly non-technical.

---

# ============================================================================

# ARQUITECTURA

# ============================================================================

#

# Describe el stack tecnológico.

# Evita que Codex pierda tiempo investigando tecnologías ya conocidas.

#

## Architecture

### Frontend

- React (Create React App)
- Axios
- JWT Authentication

### Backend

- Spring Boot 3
- Java 21
- REST APIs

### Database

- MySQL

### Infrastructure

- EC2 Frontend
- EC2 Backend
- NGINX
- Cloudflare

### Production URLs

Frontend:
https://app.worklog.rustikas.com.uy

Backend:
https://backend-worklog.rustikas.com.uy

---

# ============================================================================

# CONTEXTO DE NEGOCIO

# ============================================================================

#

# Esto ayuda a Codex a entender la lógica del negocio.

# Muchas veces puede proponer mejores soluciones si entiende para qué sirve

# la aplicación.

#

## Business Context

WorkLog manages workforce information.

Main entities:

- Usuario
- Persona
- Empresa
- Jornada

Users are generally not technical.

Prefer:

- Clear terminology
- Simple interfaces
- Mobile-friendly solutions

---

# ============================================================================

# PRINCIPIOS DE INGENIERÍA

# ============================================================================

#

# Cómo queremos que piense.

# Esto afecta las decisiones de diseño.

#

## Engineering Principles

Always prefer:

- Simplicity
- Readability
- Maintainability
- Backward compatibility

Avoid:

- Clever code
- Unnecessary abstractions
- Overengineering

When multiple solutions exist:

Choose the simplest solution.

---

# ============================================================================

# FORMA DE TRABAJO

# ============================================================================

#

# Define el proceso que debe seguir antes de modificar código.

# Muy importante para evitar cambios impulsivos.

#

## Workflow

For every task:

1. Analyze existing implementation.
2. Explain findings.
3. Identify risks.
4. Propose solution.
5. Implement.
6. Explain modified files.
7. Explain how to test.

Do not modify code before understanding the current flow.

---

# ============================================================================

# DEBUGGING

# ============================================================================

#

# Fuerza a Codex a investigar antes de programar.

# Reduce muchísimo los arreglos incorrectos.

#

## Debugging Rules

When fixing bugs:

First:

- Trace request flow.
- Identify root cause.
- Explain reasoning.
- List affected files.

Only then propose changes.

Avoid guessing.

Prefer evidence-based debugging.

---

# ============================================================================

# SEGURIDAD

# ============================================================================

#

# Evita que Codex haga cambios peligrosos.

# Fundamental para JWT y permisos.

#

## Security Rules

Never:

- Disable authentication.
- Disable authorization.
- Remove JWT validation.
- Expose secrets.
- Hardcode credentials.

Always:

- Preserve security behavior.
- Explain security-related changes.

If security changes are required:

Explain the impact first.

---

# ============================================================================

# BASE DE DATOS

# ============================================================================

#

# Protege la estructura de producción.

# Muy importante porque una mala sugerencia puede romper datos existentes.

#

## Database Rules

Before changing entities:

- Analyze schema impact.
- Identify affected tables.
- Explain migration requirements.

Prefer:

- Additive changes.

Avoid:

- Renaming columns.
- Removing columns.
- Removing foreign keys.

Unless explicitly requested.

---

# ============================================================================

# APIS

# ============================================================================

#

# Mantiene compatibilidad entre frontend y backend.

#

## API Rules

Before modifying endpoints:

- Review existing contracts.
- Preserve backward compatibility.

Prefer:

- DTOs
- Consistent responses

Avoid:

- Breaking frontend integrations.

---

# ============================================================================

# FRONTEND

# ============================================================================

#

# Reglas específicas para React.

#

## Frontend Rules

Prefer:

- Existing components.
- Existing styles.
- Existing hooks.

Avoid:

- Duplicated logic.
- New patterns when existing ones already work.

Keep pages responsive.

---

# ============================================================================

# BACKEND

# ============================================================================

#

# Reglas específicas para Spring Boot.

#

## Backend Rules

Prefer:

- Constructor injection.
- Service layer.
- DTOs.

Avoid:

- Business logic in controllers.
- Huge methods.
- Duplicate code.

Keep controllers thin.

---

# ============================================================================

# PERFORMANCE

# ============================================================================

#

# Evita consultas ineficientes y problemas futuros de escalabilidad.

#

## Performance Rules

Prefer:

- Pagination
- Batch processing
- Existing indexes

Avoid:

- N+1 queries
- Full table scans
- Loading unnecessary data

Consider performance impact before implementation.

---

# ============================================================================

# DEPLOYMENT

# ============================================================================

#

# Protege infraestructura y pipelines.

#

## Deployment Rules

Before modifying deployment:

Review:

- GitHub Actions
- NGINX
- Environment variables

Never:

- Change production URLs.
- Remove SSL.
- Modify Cloudflare assumptions.

Without explicit approval.

---

# ============================================================================

# TESTING

# ============================================================================

#

# Obliga a indicar cómo validar los cambios.

#

## Testing Rules

Whenever code is modified:

Explain:

- What changed.
- How to validate.
- Expected result.

If tests exist:

Run relevant tests.

If tests do not exist:

Provide manual verification steps.

---

# ============================================================================

# COMUNICACIÓN

# ============================================================================

#

# Cómo quiero que me responda.

# Esta sección suele mejorar muchísimo la calidad de salida.

#

## Communication Style

Assume the user is an experienced software engineer.

Be:

- Direct
- Technical
- Concise

Always provide:

- Exact files modified
- Exact commands
- Risks
- Testing instructions

Avoid:

- Generic explanations
- Beginner-level descriptions
- Excessive verbosity

---

# ============================================================================

# SENIOR ENGINEER MODE

# ============================================================================

#

# Hace que Codex piense como un desarrollador senior.

#

## Senior Engineer Mode

Act as a senior software engineer.

Before coding:

- Evaluate alternatives.
- Consider risks.
- Choose the simplest maintainable solution.

Favor:

- Maintainability
- Stability
- Backward compatibility

Over:

- Cleverness
- Complexity
- Large refactors
