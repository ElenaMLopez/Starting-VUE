# INTRODUCCION A COMPONENTES

### ¿Que son los componentes?

  Los [componentes](https://vuejs.org/v2/guide/components.html) son una de las partes más pontentes de Vue.js. Para estudiar qué son y como funcionan, haremos una llamada a una API llamada [JSONPlaceholder](https://jsonplaceholder.typicode.com/) utilizando Axio. De ella nos traeremos los *to-do*, y los trabajaremos.

  Empezamos pues con lo siguiente:
```html
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>VUE 1</title>

  </head>
  <body>
    <main>
    <ul>
      <li v-for="tarea in tareas" v-text="tarea.title"> </li>
    </ul>
      <hr>
      <pre> {{$data}}</pre>

    </main>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

    <script src="main13.js" charset="utf-8"></script>
  </body>
</html>

```
```javascript
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
```
  **Un componente  es reusable, declarativo y que encapsula información.** En nuestro ejemplo podemos querer renderizar esta lista en otra parte de la página por ejemplo, y podríamos duplicar el ul, o incluso crear otra instancia si lo deseamos, pero puede resultar engorroso, y al fin y al cabo, los componentes permiten hacer todo eso de una forma mucho más sencilla. Podríamos insertar toda la información de la lista y su operativa tan solo añadiendo un tag personalizado como por ejemplo ```<mis-tareas></mis-tareas>```, y que poniendo tan solo eso, ya nos da la lista, con toda la lógica que tiene detrás.

  Vamos a crear nuestro primer componente. En el archivo js, encima de la instancia de Vue, ponemos el componente:

```javascript
Vue.component('mis-tareas', {
  template: `<p> Hacer la compra </p>`,
})
```
  La primera parte es la declaración de un nuevo componente de Vue. Se le pasa como parámetro un string que será el nombre del componenete y un segundo parámetro que será un objeto con la información del componenete.

  La información mínima que tiene un componente es que es lo que contiene, de que se descompone, y eso es lo que va en la propiedad *template*.

  Si se abre el inspector podemos observar que en realidad el tag ```<mis-tareas></mis-tareas>``` no existe en el DOM.
  Para insertar el listado que obteníamos y encapsularlo dentro del componente, pondremos en template lo que teníamos en el HTML, pero hay que decrile a Vue.js dónde se encuentra tareas, porque por scope, nuestro componenete no puede ver lo que hay dentro de la instancia de Vue creada más abajo.
  De la misma forma que las etiquetas de HTML tienen atributos, a nuestras etiquetas de componente, podemos pasarle atributos también.
  De esta forma podemos pasarle un atributo llamado tareas y dentro de él, dónde está la fuente de datos. Como la instancia de Vue es ACCESIBLE dentro de main, y me encuentro en main, puedo acceder a esta instancia, mediante una propiedad llamada tareas:"tareasAjax" que debe bindearse(hacer una expresión evaluable con los ':').

  El componente es *agnostico* a la fuente de datos, pero hay que decirle dónde está esa fuente.

  Con v-bind, asociamos valores dinámicos a atributos, y también se pude poner *:tarea*.

  Por tanto quedará así:
```html
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>VUE 1</title>

  </head>
  <body>
    <main>

      <mis-tareas :tareas="tareasAjax"></mis-tareas>

      <hr>
      <pre> {{$data}}</pre>

    </main>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

    <script src="main13.js" charset="utf-8"></script>
  </body>
</html>
```
```javascript
Vue.component('mis-tareas', {
  props: ['tareas'],
  template: `<ul>
              <li v-for="tarea in tareas" v-text="tarea.title"></li>
            </ul>`,
})

const vm = new Vue({
  el: 'main',
  // mounted es el evento que intercepta el momento en el que ya se ha montado la app
  mounted(){
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then((respuesta) => {
        this.tareasAjax = respuesta.data
      })
  },
  data: {
    tareasAjax:[],
  },
  methods: {
  }
});
```
  Y si deseo tomar datos desde otra fuente de datos, es tan sencillo como definirlo en el modelo y bindear esa fuente en nuestro tag *mis-tareas*.
```html
<main>

  <mis-tareas :tareas="tareasAjax"></mis-tareas>
  <hr>
  <mis-tareas :tareas="tareasLocales"></mis-tareas>
  <hr>
  <pre> {{$data}}</pre>

</main>
```

```javascript
Vue.component('mis-tareas', {
  props: ['tareas'],
  template: `<ul>
              <li v-for="tarea in tareas" v-text="tarea.title"></li>
            </ul>`,
})

const vm = new Vue({
  el: 'main',
  // mounted es el evento que intercepta el momento en el que ya se ha montado la app
  mounted(){
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then((respuesta) => {
        this.tareasAjax = respuesta.data
      })
  },
  data: {
    tareasAjax:[],
    tareasLocales: [
      {title: 'Aprender Vue'},
      {title: 'Repaso Express'},
      {title: 'Aprender Firebase'},
      {title: 'Aprender Firestore'},
    ]
  },
  methods: {
  }
});
```
  De esta forma se utiliza la fuente bindeada tareasLocales, y si hay más orígenes, como está encapsulado se puede reutilizar

  ¿Y si deseo un componente que deseo que sea totalmente independiente del origen de datos? Para que nuestro componenete no dependa de la instancia de Vue.js creada. Vamos a verlo en el apartado Las Tareas.
  ¿Cómo lo hacemos? Pues en el componente vue creado con *new* podemos meter el mounted y la fuente de datos, puesto que cada componente tiene a su vez su propio ciclo y pueden tener una fuente de datos propia. Lo que pasa es que en este caso. El único pero, es q los componentes tienen que crearse como una función, para que se cree un nuevo scope o ámbito, y que de esta forma sean unicos. En este caso los datos del modelo están aislados dentro de él, y esta funcion retorna la fuente de datos. Si no se hace así todos los compoenentes pueden tener acceso a él. Tareas ya no es una propiedad, no se especifia desde fuera, sino que pertenece al modelo del componente:
