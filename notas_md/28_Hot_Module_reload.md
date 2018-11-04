# Hot Module Reload:

Una de las características más geniales de vue-loader.

Un loader es un componente del workflow de webpack. Webpack que es un bundler que coje los recursos de nuestra web y los combina de diferentes formas para que los podamos utilizar. En este caso por ejemplo transpilar ES6 a ES5 para que sea utilizado en cualquier navegador, por ejemplo, con Babel, que es otro loader de webpack.

Y ¿Qué es lo que hace entonces vue-loader? Pues se encarga de transpilar los archivos con extensión .vue a algo que el navegador pueda entender.

Entre las caracteristicas de vue-loader tenemos el hot reload, que mantiene el estado del componente mientras realizamos cambios en nuestro componente, lo que mejora increiblemente el proceso de desarrollo. 

### Ejemplo práctico: Componente tareas:

Vamos a crear un componente tareas con un par de computed properties para filtrarlas, que solo se reevalúan cuando se cambian sus dependencias, cuando cambia alguna de las partes de la matriz de tareas en este caso, cuando cambia la fuente de verdad, y es cuando la computed se activa.

Así creamos un nuevo proyecto llamado 28-hot-reloading y en su carpeta src la carpeta componentes con su archivo Tareas.vue.
De esta forma en App.js tenemos la instancia de nuestro componente tarea en el template, importado desde su archivo para poder usarlo, y exportado en *components* para que se renderice en index.html:
```html
<template>
  <tareas></tareas>
</template>

<script>
  import Tareas from './components/Tareas.vue';
  
  export default {
    components: {
      Tareas
    },
  }
</script>

<style>
</style>
```
Analicemos el archivo del componente Tareas:
```html
<template>
  <div>
    <h2> Tareas por hacer </h2>
    <ul>
      <li v-bind:key="tarea" v-for="tarea in tareasPendientes"> 
        <!-- v-bind:key="tarea" es agregado para solucionar error en linter -->
        <a href="#" @click="actualizarTarea(tarea)" v-text="tarea.nombre"></a>
      </li>
    </ul>
    <h2> Tareas Finalizadas </h2>
      <ul>
        <li v-bind:key="tarea" v-for="tarea in tareasFinalizadas">
          <a href="#" @click="actualizarTarea(tarea)" v-text="tarea.nombre"></a>
        </li>
      </ul>
    
  </div>
</template>

<script>
export default {

  data() {
    return {
      tareas: [
        {nombre:'Aprender Vue.js' , completado: true},
        {nombre: 'Grabar el módulo Vuex', completado: false},
        {nombre: 'Responder comentarios', completado: false},
        {nombre: 'Diseñar el módulo de Firebase', completado: false},
        {nombre: 'Diseñar el ejercicio final', completado: false},
      ],
      finalizadas: [],
    }
  },

  methods: {
    actualizarTarea(tarea) {
      tarea.completado = !tarea.completado;
    }
  },

  computed: {
    tareasPendientes() {
      return this.tareas.filter((tarea) => !tarea.completado);
    },
    tareasFinalizadas(){
      return this.tareas.filter((tarea) => tarea.completado);
    }
  }
  
}
</script>

<style>
</style>
```
Las computed porperties solo se reevalúan cuando cambian sus dependencias, así que con estas computed tengo acceso a las tareas pendientes o finalizadas. Es al hacer click cuando cambia la propiedad *completado* de la tarea y arranca la computed.

Cambiemos ahora por ejemplo el estilo, y veámos como cuando se salva, no solo se carga automáticamente en el navegador, sino que además nos mantiene el estado, es decir las tareas completadas siguen completadas y las pendientes pendientes. 
```html
<template>
  <div>
    <h2> Tareas por hacer </h2>
    <ul>
      <li v-bind:key="tarea" v-for="tarea in tareasPendientes"> 
        <!-- v-bind:key="tarea" es agregado para solucionar error en linter -->
        <a href="#" @click="actualizarTarea(tarea)" v-text="tarea.nombre"></a>
      </li>
    </ul>
    <h2> Tareas Finalizadas </h2>
      <ul>
        <li v-bind:key="tarea" v-for="tarea in tareasFinalizadas">
          <a href="#" @click="actualizarTarea(tarea)" v-text="tarea.nombre"></a>
        </li>
      </ul>
    
  </div>
</template>

<script>
export default {

  data() {
    return {
      tareas: [
        {nombre:'Aprender Vue.js' , completado: true},
        {nombre: 'Grabar el módulo Vuex', completado: false},
        {nombre: 'Responder comentarios', completado: false},
        {nombre: 'Diseñar el módulo de Firebase', completado: false},
        {nombre: 'Diseñar el ejercicio final', completado: false},
      ],
      finalizadas: [],
    }
  },

  methods: {
    actualizarTarea(tarea) {
      tarea.completado = !tarea.completado;
    }
  },

  computed: {
    tareasPendientes() {
      return this.tareas.filter((tarea) => !tarea.completado);
    },
    tareasFinalizadas(){
      return this.tareas.filter((tarea) => tarea.completado);
    }
  }
  
}
</script>

<style>
  li a {
    color:goldenrod;
    font-size: 1.2em;
    font-weight: bold;
    text-decoration: none;
  }
</style>
```

Esta es una de las características más interesantes del hot-reloading, MANTIENE EL ESTADO en el que estuviese en el momento de hacer cambios. No hace falta que recarguemos la página y vayamos al estado en el que estábamos trabajando.