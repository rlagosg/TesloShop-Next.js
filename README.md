# Descripción del Proyecto: Tienda Online con Next.js, PayPal Sandbox, Cloudinary y Docker

Desarrollé una aplicación de tienda online utilizando Next.js, un framework de React que destaca por su eficiencia en la creación de aplicaciones web modernas. La plataforma no solo permite la compra de artículos mediante PayPal (actualmente en modo sandbox para pruebas) sino que también integra Cloudinary para la carga y descarga eficiente de imágenes de productos. Además, se implementa Docker para la gestión de una imagen de MongoDB en la versión 5.0.0, asegurando la escalabilidad y la portabilidad de la base de datos.

## Tecnologías Utilizadas:
- **Next.js:** Framework de React para la creación de aplicaciones web eficientes y rápidas.
- **MongoDB (Dockerized - Versión 5.0.0):** Base de datos NoSQL gestionada a través de Docker para garantizar escalabilidad y portabilidad.
- **Next Auth:** Implementación de autenticación que permite a los usuarios iniciar sesión mediante GitHub y credenciales locales.
- **Cloudinary:** Plataforma en la nube para la gestión de imágenes, utilizada para la carga y descarga eficiente de imágenes de productos.
- **Docker:** Plataforma de contenerización que facilita la gestión y despliegue de aplicaciones y servicios.

## Funcionalidades Destacadas:
- **SSG (Static Side Generation):** Generación estática de páginas para mejorar la velocidad de carga mediante pre-renderización en tiempo de compilación.
- **ISR (Incremental Static Regeneration):** Regeneración incremental de contenido estático para mantener actualizada la información sin necesidad de recompilar todas las páginas.
- **getStaticPaths y getStaticProps:** Utilizados para generar rutas y proporcionar datos estáticos, contribuyendo a la eficiencia y velocidad de la aplicación.
- **SSR (Server-Side Rendering) con getServerSideProps:** Proporciona datos dinámicos en tiempo real, asegurando la frescura y relevancia de la información.

## Gestión de Imágenes con Cloudinary:
- Integración de Cloudinary para la carga y descarga eficiente de imágenes de productos, mejorando la experiencia visual de los usuarios.

## Gestión de la Base de Datos con Docker:
- Uso de Docker para gestionar una imagen de MongoDB en la versión 5.0.0, garantizando la escalabilidad y portabilidad de la base de datos.

Con estas tecnologías y enfoques, la aplicación no solo se destaca por su rendimiento, eficiencia y gestión de imágenes, sino también por la implementación de Docker para la gestión eficiente de la base de datos MongoDB. La implementación de PayPal Sandbox permite realizar pruebas seguras de compra antes de lanzar la aplicación en un entorno de producción.



# Next.js Teslo Shop
Para correr localmente, se necesita la base de datos.
```
docker-compose up -d
```

* El -d, significa __detached__



## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__
* MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27017/teslodb
```

* Reconstruir los módulos de node y levantar Next
```
yarn install
yarn dev
```


## Llenar la base de datos con información de pruebas

Llamara:
```
http://localhost:3000/api/seed
```
