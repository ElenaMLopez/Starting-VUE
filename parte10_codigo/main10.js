const vm1 = new Vue({
  el: 'main',
  completadas: [],
  data: {
    mostrar: true,
    mensajes: {
      transicion: 'Trancisiones CSS con Vue.js',
      animacion: 'Animaciones CSS con Vue.js',
      animationCustom: 'Animaciones custom CSS con Vue.js',
      entreElementos: 'Transiciones entre elementos con Vue.js',
    }
  },

  methods: {
    completarTarea(tarea){
      tarea.completado = !tarea.completado;
    },
  },
  computed: {
    tareasCompletadas(){
      return this.tareas.filter((tarea) => tarea.completado);
    }
  }
});
