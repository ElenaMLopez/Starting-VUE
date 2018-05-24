Vue.component('autor', {
  props: ['nombre', 'edad'],// declaramos la edad
  mounted() {
    console.log(typeof(this.edad));
  },
  template: `<div>
              <h1> {{ nombre }} </h1>
              <button @click="cambiarProp"> Cambiar Propiedad</button>
            </div>`,
  methods: {
    cambiarProp() {
      this.nombre = this.nombre.toUpperCase();
    }
  },
});

new Vue({
  el: 'main',
  data: {
    autor: 'Juan Andrés',
  },
});
