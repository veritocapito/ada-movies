# 🎬 My Movies

[![my-Movies.png](https://i.postimg.cc/nchTJqPW/my-Movies.png)](https://postimg.cc/F1w0bkmb)

**My Movies** es una aplicación web moderna y responsiva construida con React, que te permite explorar el vasto mundo del cine. Descubre los últimos lanzamientos, las películas más populares, las mejor valoradas y busca tus títulos favoritos. Esta aplicación fue desarrollada como un proyecto práctico para aplicar conceptos avanzados de React.

---

## ✨ Características Principales (Features)

* **Exploración de Películas:** Navega entre diferentes categorías como "Últimos Lanzamientos" y "Populares".
* **Slider Interactivo:** Un carrusel dinámico en la página de inicio que destaca las películas más importantes.
* **Búsqueda en Tiempo Real:** Un buscador inteligente que realiza llamadas a la API mientras escribes, utilizando un hook `useDebounce` para ser más eficiente.
* **Página de Detalles:** Una vista completa para cada película con su imagen de fondo, póster, sinopsis, géneros, calificación y más.
* **Sistema de Favoritos:** Añade o quita películas de tu lista de favoritos. ¡Tus elecciones se guardan en tu navegador gracias a `localStorage`!
* **Paginación:** Navega a través de miles de resultados de películas de forma sencilla en las listas.
* **Diseño Responsivo:** Una interfaz que se adapta perfectamente a cualquier dispositivo, desde móviles hasta ordenadores de escritorio.
* **Experiencia de Usuario Fluida:** Indicadores de carga y manejo de errores para una navegación sin interrupciones.

---

## 🛠️ Tecnologías Utilizadas (Tech Stack)

| Tecnología        | Descripción                                                                                              |
| :---------------- | :------------------------------------------------------------------------------------------------------- |
| **React** | Biblioteca principal para construir la interfaz de usuario.                                              |
| **Vite** | Herramienta de desarrollo ultra rápida para proyectos web modernos.                                      |
| **JavaScript (ES6+)** | Lenguaje de programación principal.                                                                      |
| **React Router** | Para manejar la navegación y las rutas dentro de la aplicación.                                          |
| **Context API** | Para gestionar el estado global de los favoritos de forma eficiente.                                     |
| **Custom Hooks** | Creación de hooks personalizados (`useFetchMovies`, `useDebounce`, `useLocalStorage`) para reutilizar lógica. |
| **Axios** | Cliente HTTP para realizar las peticiones a la API de TMDB.                                              |
| **Material-UI** | Para componentes de UI robustos y estilizados como la barra de navegación, botones y menús.                |
| **Tailwind CSS** | Framework de CSS "utility-first" para un diseño rápido y responsivo.                                     |
| **SweetAlert2** | Para mostrar alertas y notificaciones elegantes y personalizadas.                                        |
| **React Slick** | Para la implementación del carrusel de películas.                                                        |

---

## 🚀 Cómo Empezar (Getting Started)

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### Prerrequisitos

* Node.js (versión 14 o superior)
* npm o yarn

### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/veritocapito/ada-movies.git](https://github.com/veritocapito/ada-movies.git)
    ```
2.  **Navega al directorio del proyecto:**
    ```bash
    cd ada-movies
    ```
3.  **Instala las dependencias:**
    ```bash
    npm install
    ```
4.  **Configura tus variables de entorno:**
    * Crea un archivo `.env` en la raíz del proyecto.
    * Añade tu clave de API de The Movie Database (TMDB) de la siguiente manera:
        ```
        VITE_TMDB_API_KEY=TU_API_KEY_AQUI
        ```
5.  **Ejecuta la aplicación:**
    ```bash
    npm run dev
    ```
    La aplicación debería estar corriendo en `http://localhost:5173/`.

---

## 🌍 Despliegue (Deploy)

My Movies está alojado en Vercel.
Puedes acceder a la aplicación en vivo desde este enlace:
[My-Movies](https://ada-movies-vc.vercel.app/)

---

## 👤 Autora

* **Verónica Capobianco** - [GitHub](https://github.com/veritocapito)
* LinkedIn - [vscapobianco](https://www.linkedin.com/in/vscapobianco/)
