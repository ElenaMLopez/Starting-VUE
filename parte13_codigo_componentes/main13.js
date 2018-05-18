Vue.component('mis-tareas', {
  template: `<ul>
              <li v-for="tarea in tareasAjax" v-text="tarea.title"> </li>
            </ul>`,
})

const vm = new Vue({
  el: 'main',
  // mounted es el evento que intercepta el momento en el que ya se ha montado la app
  mounted(){
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then((respuesta) => {
        console.log(respuesta);
        this.tareasAjax = respuesta.data
      })
  },
  data: {
    tareasAjax:[],
  },
  methods: {
  }
});
