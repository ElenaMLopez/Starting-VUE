# FILTROS

  A diferencia de Vue1, en Vue2 no disponemos de los filtros filterBy y orderBy (entre otros). Aunque hay quien ha tratado de portarlos, lo mejor es que aprendas cómo utilizar las propiedades computadas (que ya conoces), filtros [personalizados](https://github.com/freearhey/vue2-filters) y [librerías de utilidades](https://lodash.com/).

  Partimos ahora de otro ejemplo, una lista de juegos. Y queremos ahora filtrar los juegos por ejemplo por puntuación:

```html
<main>
  <h1> {{  }}</h1>

  <ul>
    <li v-for="juego in juegos"> {{juego.titulo}} </li>
  </ul>
     <hr>
  <pre> {{$data}}</pre>
</main>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
<script src="main7.js" charset="utf-8"></script>
```
Y en main7.js tenemos de entrada:
```javascript
const vm = new Vue({
  el: 'main',

  data:{
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

})
```
  Para realizar el filtro, lo haremos con una *Compute Property* puesto que así almacena en la caché las dependencias del objeto juegos y no tiene que estar evaluándolo todo el rato.

```javascript
    const vm = new Vue({
      el: 'main',

      data:{
        minimo: 5, // Varemo mínimo para puntuar. Está en data pq es una fuente de información...
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
        mejoresJuegos(){
          return this.juegos.filter(((juego) => juego.puntuación >= this.minimo);
        }
      }
  });
```

Podemos controlar esto de forma dinámica, por ejemplo con un input *type range*, al que damos un mínimo y que estará asociado a una propiedad del modelo:

```html
  <main>
    <h1> Lista de juegos </h1>

    <ul>
      <li v-for="juego in mejoresJuegos"> {{juego.titulo}} </li>
    </ul>
    <input type="range" min="0" max="10" v-model="minimo"> <!-- Hace variar la propiedad minimo del modelo -->
       <hr>
    <pre> {{$data}}</pre>
  </main>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
  <script src="main7.js" charset="utf-8"></script>
```
  Podemos usar una *Computed Property* para filtrar resultados también, añadimos otra propiedad en el modelo, en este caso búsqueda que será un 'string' vacío y otra propiedad computada que va a ser buscarJuego donde se aplica el filtro para esta búsqueda.
```html
<main>
  <h1> Lista de juegos </h1>
  <input type="search" v-model="busqueda" placeholder="Buscar Juego">
  <ul>
    <li v-for="juego in buscarJuego"> {{juego.titulo}} </li>
  </ul>
  <input type="range" min="0" max="10" v-model="minimo"> <!-- Hace variar la propiedad minimo del modelo -->
     <hr>
  <pre> {{$data}}</pre>
</main>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
<script src="main7.js" charset="utf-8"></script>
```
```javascript
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
```
  En el caso de la librería [vue2-filters](https://github.com/freearhey/vue2-filters), lo que hace es adaptar los filtros de Vue1 a Vue2, y trae:
  Pluralice, FilterBy... El equipo de Vue recomienda usar los filtros en una instancia de Vue.
  ¿Entonces no se puede usar un filtro fuera de la instancia? Puede hacerse, pero tiene que definirse ANTES de la instancia de Vue o no funcionará:
```javascript
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
```
  ¿No hay alternativa a tener que crear yo las funciones para los filtros? Puedes por ejemplo cargar Lodahs, permite poder cargar esta librería (u otra), y utilizar orderBy en una Computed Property para devolver el valor que deseemos y emular lo que venía como nativo en Vue1. 
