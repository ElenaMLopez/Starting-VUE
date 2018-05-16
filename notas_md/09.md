# DATA BINDING EN ATRIBUTOS Y CLASES

>
¿Se pueden asociar valores dinámicos a propiedades HTML?. Con Vue, si. En esta lección a prenderás a utilizar la directiva [v-bind y la sintaxis de objeto y la sintaxis de objeto](https://vuejs.org/v2/guide/class-and-style.html) para aplicar evaluar expresiones y utilizar el resultado en atributos y clases CSS.

Partimos de un listado de tareas y lo que vamos a hacer es cambiar el atributo completado a través de un método:

```html
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>VUE 1</title>
  </head>
  <body>
    <main>
      <h1> Tareas </h1>
      <ul>
        <li v-on:click="completarTarea(tarea)"
            v-for="tarea in tareas"> <!-- Se puede usar @click como directiva -->
              {{tarea.titulo}}: {{tarea.completado}}
      </li>
      </ul>

      <hr>
      <pre> {{$data}}</pre>

    </main>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
    <script src="main9.js" charset="utf-8"></script>
  </body>
</html>

```
```javascript
const vm1 = new Vue({
  el: 'main',
  data: {
    tareas: [
        {
          titulo:'Hacer la compra',
          completado: false,
        },
        {
          titulo:'Aprender Vue.js',
          completado: false,
        },
        {
          titulo:'Aprender Firebase',
          completado: false,
        },
        {
          titulo:'Dominar ES6',
          completado: false,
        },
        {
        titulo:'Salir a patinar',
        completado: false,
        },
      ],
  },
  methods: {
    completarTarea(tarea){
      tarea.completado = !tarea.completado;
    }
});
```
  Si lo que queremos es que una tarea que esté completada, aparezca tachada por encima, y eso se hace con CSS. En el HTML añadimos una etiqueta style y ahí definimos la clase que hará que se tache el texto:
```html
<head>
  <meta charset="utf-8">
  <title>VUE 1</title>
  <style>
    li{
      cursor: pointer;
    }
    .completado {
      text-decoration: line-through;
    }

  </style>
</head>
```
Para añadir una clase hay que realizar una asociación, un atributo como class con una parte del modelo. Se usa la directiva v-bind, que vamos a usar para asociar el atributo class a tarea.completado. Para ello a v-bind se le asocia un objeto, donde la key es la clase a asociar y el valor a que parte del modelo que interesa evaluar, en este caso tarea.completado. Queda de la siguiente forma:
```html
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>VUE 1</title>
    <style>
      li{
        cursor: pointer;
      }
      .completado {
        color: #078b00;
        text-decoration: line-through;
      }

    </style>
  </head>
  <body>
    <main>
      <h1> Tareas </h1>
      <ul>
        <li v-bind:class="{completado: tarea.completado}"
            v-on:click="completarTarea(tarea)"
            v-for="tarea in tareas"> <!-- Se puede usar @click como directiva -->
              {{tarea.titulo}}: {{tarea.completado}}
      </li>
      </ul>

      <hr>
      <pre> {{$data}}</pre>

    </main>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
    <script src="main9.js" charset="utf-8"></script>
  </body>
</html>
```

Lo que se hace con :
```html
v-bind:class="{completado: tarea.completado}"
```
Es decirle, 'asóciame la clase completado si tarea.completado es *true* y no lo hagas si es *false*'', de esta forma se aplica o no en base al valor de la propiedad del modelo.

 Por último podemos ver como hacer para que nos diga la cantidad de tareas completadas:

 ```html
 <body>
   <main>
     <h2> Tareas Completadas en total: {{tareasCompletadas.length}}</h2>
     <h1> Tareas </h1>
     <ul>
       <li v-bind:class="{completado: tarea.completado}"
           v-on:click="completarTarea(tarea)"
           v-for="tarea in tareas"> <!-- Se puede usar @click como directiva -->
             {{tarea.titulo}}: {{tarea.completado}}
     </li>
     </ul>

     <hr>
     <pre> {{$data}}</pre>

   </main>

   <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
   <script src="main9.js" charset="utf-8"></script>
 </body>
 ```
 ```javascript
 const vm1 = new Vue({
   el: 'main',
   completadas: [],
   data: {
     tareas: [
         {
           titulo:'Hacer la compra',
           completado: false,
         },
         {
           titulo:'Aprender Vue.js',
           completado: false,
         },
         {
           titulo:'Aprender Firebase',
           completado: false,
         },
         {
           titulo:'Dominar ES6',
           completado: false,
         },
         {
         titulo:'Salir a patinar',
         completado: false,
         },
       ],
   },

   methods: {
     completarTarea(tarea){
       tarea.completado = !tarea.completado;
     },
   },
   computed: {
     tareasCompletadas(){
       return this.tareas.filter((tarea) => tarea.completado);
     }
   }
 });
```
