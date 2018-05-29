Vue.component('lista-tareas', {
  props: ['tareas'],
  template: `<div>
              <h1><slot></slot></h1>
              <ul>
                <tarea v-for="unaTarea in tareas" v-bind:unaTarea="unaTarea"></tarea>
              </ul>
            </div>`
});
Vue.component ('tarea', {
  props: ['unaTarea'],
  template: `<li> {{unaTarea}}</li>`
})
new Vue({
  el:'main',
  data: {
    tareas: [
      'Finalizar sección Componenetes',
      'Iniciar Workflow con Vue CLI y Webpack',
      'Terminar de ver documentación de Vuex',
      'Jugar con Vue Router',
    ],
  },
})
