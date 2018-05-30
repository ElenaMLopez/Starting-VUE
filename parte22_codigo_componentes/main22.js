Vue.component('lista-tareas', {
  template: `<div>
              <h1> Tareas</h1>
              <ul>
                <tarea v-for="unaTarea in tareas" v-bind:unaTarea="unaTarea"></tarea>
              </ul>
            </div>`,
  data() {
    return {
      tareas: [
        'Finalizar sección Componenetes',
        'Iniciar Workflow con Vue CLI y Webpack',
        'Terminar de ver documentación de Vuex',
        'Jugar con Vue Router',
      ]
    }
  }
});
Vue.component ('tarea', {
  props: ['unaTarea'],
  template: `<li> {{unaTarea}}</li>`
})
Vue.component('contacto', {
  template: '<div> <a href="mailto:cucu@cu.dddrmail"> lalalaa </a> <hr> </div>',
})
Vue.component('bio', {
  template: `      <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </p>
        </div>`
})
// Esta es la mínima instancia de Vue que se puede hacer. Hace referencia
// a un elemento del DOM.
new Vue({
  el:'main',
  data: {
    seleccionado: 'lista-tareas',
  }
})
