# Hot Module Reload:

Una de las características más geniales de vue-loader.

Un loader es un componente del workflow de webpack. Webpack que es un bundler que coje los recursos de nuestra web y los combina de diferentes formas para que los podamos utilizar. En este caso por ejemplo transpilar ES6 a ES5 para que sea utilizado en cualquier navegador, por ejemplo, con Babel, que es otro loader de webpack.

Y ¿Qué es lo que hace entonces vue-loader? Pues se encarga de transpilar los archivos con extensión .vue a algo que el navegador pueda entender.

Entre las caracteristicas de vue-loader tenemos el hot reload, que mantiene el estado del componente mientras realizamos cambios en nuestro componente, lo que mejora increiblemente el proceso de desarrollo. 

### Ejemplo práctico: Componente tareas:

Vamos a crear un componente tareas con un par de computed properties para filtrarlas, que solo se reevalúan cuando se cambian sus dependencias, cuando cambia alguna de las partes de la matriz de tareas en este caso, cuando cambia la fuente de verdad, es cuando la computed se activa.

así creamos un nuevo proyecto llamado 28-hot-reloading y en su carpeta src la carpeta componentes con su archivo Tareas.vue.
