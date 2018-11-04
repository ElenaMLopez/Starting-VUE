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

<style scoped>
  li a {
    color:goldenrod;
    font-size: 1.2em;
    font-weight: bold;
    text-decoration: none;
  }
</style>
