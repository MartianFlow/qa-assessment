# OCMI Workers Comp - QA Automation Engineer

- Instructions in [Spanish](README-ES.md)
- Instructions in [English](README.md)

Please forward any questions to [cristian@ocmiwc.com](mailto:cristian@ocmiwc.com).


# NOTAS

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=MartianFlow_qa-assessment&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=MartianFlow_qa-assessment)

# Proyecto de Pruebas E2E hecho con Cypress

Este proyecto incluye pruebas E2E tanto para el cliente como para el servidor (APIs), implementadas en Cypress. A continuación, se detalla la estructura del proyecto

## Justificación para el uso de Cypress

Los casos de prueba E2E para el cliente y las APIs del servidor las  implemente en Cypress ya que es la herramienta de automatización de pruebas que más domino. Esto me facilita la implementación y mantenimiento de pruebas robustas y a su vez permite realizar pruebas tanto en la interfaz de usuario como en la API del backend dentro de un solo entorno de pruebas.

## Detalles de la Implementacion 

### Casos de Prueba

En la carpeta `cypress/e2e` se encuentran los archivos que contienen las diversas pruebas escritas tanto para cliente como para servidor.

### Manejo de Datos de Prueba

Se utiliza un archivo JSON en la carpeta de `fixtures` de Cypress para manejar los datos de prueba. Esto permite reutilizar datos y facilita el mantenimiento, ya que todos los datos necesarios para las pruebas están centralizados y fácilmente accesibles.

### Organización de Selectores y Acciones

Para mejorar la legibilidad y el mantenimiento de las pruebas E2E en el cliente, se organizaron los selectores y acciones en archivos correspondientes a cada página. Las páginas incluyen:

- **Login**: Selectores y acciones para la autenticación de usuario.
- **Post**: Selectores y acciones para la visualización y manipulación de los posts.
- **NewPost**: Selectores y acciones para la creación de nuevos posts.

Esta estructura permite que el código sea más modular y que los cambios en los elementos de la interfaz sean más fáciles de gestionar.

### Métodos Personalizados para Consumo de APIs

Se añadieron métodos personalizados en el archivo de `commands.ts` de Cypress, lo que permite consumir las APIs de manera más directa y eficiente durante las pruebas. Estos métodos incluyen solicitudes específicas para las APIs del servidor, lo cual optimiza las pruebas y evita a su vez la duplicación de código.

## Integración Continua

Además de las pruebas solicitadas en la prueba técnica, se añadió un sistema de integración continua (CI) que permite la ejecución automática de pruebas y otras validaciones usando github actions. Este sistema de CI se compone de los siguientes pipelines y jobs:

- **Pipeline: Requirements**
  - **security-checks**: Realiza verificaciones de seguridad en el código.
  - **linter**: Asegura que el código cumpla con las normas de estilo definidas.
  - **sonar**: Ejecuta un análisis de calidad de código utilizando SonarCloud.

- **Pipeline: Cypress-Test**
  - Ejecuta las pruebas E2E en Cypress y genera un reporte usando la libreria de Mochawesome para facilitar la revisión de resultados.

## Ejecución de Pruebas Localmente

Para ejecutar las pruebas E2E en tu entorno local, utiliza el siguiente comando:

```bash
npx cypress run --spec "cypress/e2e/**/*.cy.ts"