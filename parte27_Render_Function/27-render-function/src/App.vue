<template>
  <div>
      <elemento tipo="header"> Hola Header </elemento>
      <elemento tipo="aside"> Hola Aside </elemento>
      <elemento tipo="section"> Hola Mundo </elemento>
      <elemento tipo="nav"> Hola Nav </elemento>
      <elemento tipo="footer"> Hola Footer </elemento>
  </div>
</template>

<script>
import elemento from './components/Elemento.vue';
export default {
  components: {
    elemento,
  }
}
</script>

<style>
</style>
