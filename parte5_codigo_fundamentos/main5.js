const vm = new Vue({
  el: 'main',
  // MODELOS:
  data:{
    nuevaTarea: '',

    tareas: [
      'Aprender Vue.js',
      'Practicar katas de ES6',
      'Subir a Github todos los días'
    ]
  },
  // METODOS:
  methods: {
    agregarTarea(){
      console.log('Hola desde agregarTarea!!!');
      // this hace referencia a la instancia de VUE!!!
      this.tareas.unshift(this.nuevaTarea);
      // eliminar la tarea una vez agregada
      this.nuevaTarea = null;
    }
  }
})
// Vanilla JavaScript:
//
// function agregarTarea(){
//   const input = document.querySelector('input[type=text]');
//   vm.tareas.unshift(input.value);
//   input.value = '';
// }
