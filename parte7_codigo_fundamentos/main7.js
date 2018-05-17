Vue.filter('alReves', (valor) => valor.split('').reverse().join(''));

const vm = new Vue({
  el: 'main',

  data:{
    busqueda: '',
    minimo: 5,
    juegos: [
      {
        'titulo': 'Residen Evil',
        'genero': 'Survival Horror',
        'puntuacion': 7,
      },
      {
        'titulo': 'Civilitation VI',
        'genero': 'Strategy',
        'puntuacion': 10,
      },  {
          'titulo': 'Battlefield 1',
          'genero': 'FPS',
          'puntuacion': 9,
        },
    ]
  },
  computed: {
    mejoresJuegos() {
      return this.juegos.filter((juego) => juego.puntuacion >= this.minimo);
    },
    buscarJuego() {
      return this.juegos.filter((juego) => juego.titulo.includes(this.busqueda));
    }
  }
})
