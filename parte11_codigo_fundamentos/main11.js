const vm1 = new Vue({
  el: 'main',
  // mounted es el evento que intercepta el momento en el que ya se ha montado la app
  mounted(){
    console.log('instancia montada');
      this.cargarPersonas()
  },
  data: {
    personas:[],
  },
  methods: {
    cargarPersonas(){
      this.$http.get('https://randomuser.me/api/?results=50')
        .then((respuesta) => {
          console.log(respuesta);
          this.personas = respuesta.body.results;
        })
    }
  }
});
