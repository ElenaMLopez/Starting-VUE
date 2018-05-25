Vue.component('mis-tareas', {
  props:['listado'],
  template: '#mis-tareas-template'
});

new Vue({
  el: 'main',
  data: {
    tareas: [
      { titulo: 'Salir a Patinar'},
      { titulo: 'Llamar a Thomas'},
      { titulo: 'Backlog de proyecto Tedra'},
      { titulo: 'Llevar portadas para firmas'},
      { titulo: 'Avisar en el master que hoy no voy'},
      { titulo: 'Quedar con Silvia'},
    ],
  }
});
