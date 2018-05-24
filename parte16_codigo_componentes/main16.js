Vue.component('candidato', {
  props: ['nombre', 'mail', 'imagen'],
  template: '#candidato-template',
})



new Vue({
  el: 'main',
  mounted() {
    this.obtenerCandidatos();
  },
  data: {
    candidatos: [],
  },
  methods: {
    obtenerCandidatos() {
      axios.get('https://randomuser.me/api/?results=50')
        .then((respuesta) => {
          this.candidatos = respuesta.data.results;
        });
    }
  }
})
