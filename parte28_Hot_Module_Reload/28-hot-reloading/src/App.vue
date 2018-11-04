<template>
  <div>
    <h2> Lista que viene de App.js</h2>
    <input type="range">
    <ul>
      <li><a href="#">Enlace de App.js</a></li>
      <li><a href="#">Enlace de App.js</a></li>
      <li><a href="#">Enlace de App.js</a></li>
      <li><a href="#">Enlace de App.js</a></li>
      <li><a href="#">Enlace de App.js</a></li>
      <li><a href="#">Enlace de App.js</a></li>
    </ul>

    <tareas></tareas>
  </div>
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
