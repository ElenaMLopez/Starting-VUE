Vue.component('candidato', {
  // props: ['nombre', 'mail', 'imagen'],
  props: {
    nombre: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: false,
      default: 'mail.defaul@default.com'
    },
    imagen: String,
    location: {
      type: Object,
      default() {
        return {
          ciudad: 'Copenague',
        }
      }
    },
  },
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
