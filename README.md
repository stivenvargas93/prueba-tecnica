## Comenzando

### Prerrequisitos

- Instalar [Node.js 18](https://nodejs.org/)

### Instalación

Primero, instala las dependencias:

```bash
npm install
```

### Ejecutar el Servidor de Desarrollo

Para ejecutar el servidor de desarrollo localmente:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.


### Ejecutar con Docker

Para construir y ejecutar la imagen Docker:

1. **Construir la imagen Docker**:

    ```bash
    docker build -t prueba-tecnica-stiven .
    ```

2. **Ejecutar el contenedor Docker**:

    ```bash
    docker run -p 3000:3000 prueba-tecnica-stivenn
    ```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.