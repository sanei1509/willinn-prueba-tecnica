# Prueba técnica
Mi elección es llevar a adelante el desafío frontend, dominando nextJS, aplicando estilos tanto estilos con tailwind como modulos css.


## Link a la app desplegada en VERCEL

[Link directo a la app](https://willinn-prueba-tecnica.vercel.app/)


## Comando para correr el Dockerfile
la app esta dockerizada por lo que luego de clonarlo y pararte en la raiz, si ejecutas lo siguiente:

### Paso 1 - Construye la imagen de docker de tu app

Usa el siguiente comando en la raíz de tu proyecto
````
docker build -t my-app .
````

### Paso 2 - Ejecuta el contenedor 
````
docker run -p 3000:3000 my-app
````

Ahora solo necesitas acceder a http://localhost:3000 para ver la app. 


## Desafío Frontend
1. Frontend Basado en Figma
Desarrollar el frontend de la aplicación siguiendo el diseño proporcionado en Figma.
El frontend debe incluir una pantalla de ``LOGIN`` y un ``PANEL DE ADMINISTRACIÓN`` de usuarios, conectado con el backend para la autenticación y la gestión de usuarios.

2. Pantalla de Login
Conectar la pantalla de login con el endpoint ``POST /users/login`` en el backend.
Permitir que los usuarios ingresen sus credenciales y se autentiquen a través del backend.

3. Panel de Administración de Usuarios

``Lista de Usuarios:``
Conectar con el endpoint ``GET /users`` para obtener y mostrar la lista de usuarios en una tabla.

``Agregar Usuario:``
Utilizar el endpoint ``POST /users`` para añadir un nuevo usuario, enviando los datos necesarios.
``Editar Usuario:``

Permitir la edición de información de un usuario accediendo al endpoint PUT /users/{id}.
``Eliminar Usuario:``
Implementar la funcionalidad para eliminar usuarios llamando al endpoint DELETE /users/{id}.

4. Dockerización del Frontend
Crear un archivo Dockerfile para el frontend desarrollado en Next.js, utilizando el template provisto.
Asegurarse de que el frontend esté preparado para ejecutarse en un contenedor de Docker.

5. Docker Compose
Configurar un archivo docker-compose.yml independiente para levantar el contenedor del frontend, separado del backend y de la base de datos.
Garantizar que los servicios puedan comunicarse entre sí según sea necesario.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



## Author

Santiago Neira
