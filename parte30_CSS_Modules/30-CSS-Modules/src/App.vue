<template>
  <h2 :class="{[$style.rojo]: rojo, [$style.subrayado]:subrayado}"> Hola CSS Module! </h2>
</template>

<script>
  export default {
    data() {
      return {
        subrayado: false,
        rojo: true
      }
    },
  }
</script>

<style module>
  .subrayado {
    text-decoration: underline;
  }
  .rojo {
    color: red;
  }
</style>
