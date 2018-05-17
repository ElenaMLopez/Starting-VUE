const vm = new Vue({
  el: 'main',
  // MODELOS:
  data:{
    mensaje: 'Cucú desde la propiedad mensaje del modelo',
    nuevaTarea: '',
    tareas: [
      {
        'titulo': 'Aprender Vue.js',

        'prioridad': true ,
        'antiguedad': 2,
      },
      {
        'titulo':'Practicar katas de ES6' ,
        'prioridad': false,
        'antiguedad': 40,
      },
      {
        'titulo': 'Subir a Github todos los días',
        'prioridad': false,
        'antiguedad':20 ,
      }
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
    },
    tareasConPrioridad(){
      return this.tareas.filter(function(tarea){
        return tarea.prioridad
      })
    }, // en ES6: return this.tareas.filter((tarea) => tarea.prioridad)
    tareasPorAntiguedad(){
      return this.tareas.sort((a,b) => b.antiguedad < a.antiguedad)
    }
  }
})
