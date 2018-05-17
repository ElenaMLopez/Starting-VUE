const vm1 = new Vue({
  el: 'main',
  completadas: [],
  data: {
    tareas: [
        {
          titulo:'Hacer la compra',
          completado: false,
        },
        {
          titulo:'Aprender Vue.js',
          completado: false,
        },
        {
          titulo:'Aprender Firebase',
          completado: false,
        },
        {
          titulo:'Dominar ES6',
          completado: false,
        },
        {
        titulo:'Salir a patinar',
        completado: false,
        },
      ],
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
