const vm = new Vue({
  el: 'main',
  // MODELOS:
  data:{
    mensaje: 'Cucú desde la propiedad mensaje del modelo',
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
  },
  computed: {
    mensajeAlreves(){
      // recuerda que this hace refetencia a la instancia de VUE
      return this.mensaje.split('').reverse().join('')
    }
  }
})
