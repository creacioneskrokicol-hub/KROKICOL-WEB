# KROKICOL WEB — primera base visual

Proyecto independiente de KROKI APP. Es una primera maqueta responsive inspirada en tendencias visuales de sitios de marcas de calzado: fotografía protagonista, tipografía amplia, navegación sencilla y secciones editoriales. No copia el código ni los recursos de Rider.

## Cómo abrirlo
1. Descomprime la carpeta `KROKICOL-WEB`.
2. Abre la carpeta en Visual Studio Code.
3. Abre `index.html` con Live Server o directamente en el navegador.
4. Para ver el prototipo de administración, abre `admin/index.html`.

## Estructura
- `index.html`: página pública.
- `css/styles.css`: estilos.
- `js/site.js`: navegación móvil y año del footer.
- `admin/`: prototipo visual de administración.
- `assets/images/`: imágenes SVG provisionales para reemplazar.
- `assets/video/hero.mp4`: ubicación prevista para el video de portada.

## Importante sobre el panel
El panel de `admin/` es solamente una demostración local de interfaz. No tiene autenticación, no guarda archivos en un servidor y no publica cambios en la página. No se debe subir como panel real ni utilizar con contraseñas reales. En la siguiente fase conectaremos un backend (por ejemplo Supabase), con reglas de acceso, almacenamiento y validación de archivos.

## Reemplazar recursos
- Sustituye los SVG de `assets/images/` por fotografías reales conservando los nombres, o cambia las rutas en `index.html`.
- Coloca el video principal en `assets/video/hero.mp4` (MP4 H.264, optimizado y sin audio si se usará en autoplay).
- Cambia el enlace de WhatsApp y los datos de contacto en `index.html`.

## Próximas fases
1. Confirmar logo, paleta, tipografías y contenido institucional.
2. Ajustar el diseño con fotografías reales.
3. Crear panel de administración real y autenticado.
4. Conectar base de datos y almacenamiento.
5. Publicar y configurar SEO / Google Search Console.

## Tecnologías iniciales
HTML, CSS y JavaScript sin framework. La arquitectura de backend y publicación se definirá antes de conectar servicios externos.
