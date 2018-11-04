# RENDERIZADO DE LISTAS

Hasta ahora hemos renderizado valores primitivos (un string, un número o un booleano), pero si el modelo tiene infromacin algo más complicada, como por ejemplo un array (o matriz unidimensional). Si lo hacemos como hasta ahora, lo que hace Vue es darnos una versión stringlyficada del array:

  1. Tenemos un modelo con un array:

```javascript
  const vm = new Vue({
  el: 'main',
  data:{
    laborables: ['Lunes', 'Martes','Miércoles','Jueves','Viernes'],
  }
})
```
  Si lo bindeamos tal cual en el HTML, lo que nos devuelve es el array en sí, una versión striglificada de este y no es lo     que queremos.

```html
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>VUE 1</title>
  </head>
  <body>
    <main>
      <h2> {{laborables}} </h2>
      <pre> {{$data}}</pre>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
    <script src="main3.js" charset="utf-8"></script>
  </body>
</html>
```

  2. Poner cada elemento del array en un elemento de una lista: Se utiliza la directiva **v-for** y con eso se recorre el     array con la siguiente sintacsis: ``` v-for="elemento in array"``` de forma que dentro de las comillas lo que está antes     del *in* es podemos llamarlo como deseemos puesto que hace referencia a cada elemento del Array, mientras que lo que está   detrás es el nombre del modelo que tiene como dato el array:

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
        <li v-for="dia in laborables"> {{dia}} </li>
      </ul>

      <pre> {{$data}}</pre>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
    <script src="main3.js" charset="utf-8"></script>
  </body>
</html>
```
  3. Para gestionar un objeto, es decir ir recorriendo cada una de sus partes, como por ejemplo cuando recibimos un JSON de   una API, podemos hacerlo con la directiva **v-for** también, solo que a la hora de llevar a la vista el dato, haremos       referencia a él como una parte más del objeto, con el *dot operator*:

```javascript
      const vm = new Vue({
      el: 'main',
      data:{
        laborables: ['Lunes', 'Martes','Miércoles','Jueves','Viernes'],
        tareas: [
          {
            nombre: 'Hacer la compra' ,
            prioridad: 'media'
          },
          {
            nombre: 'Aprender Vue y Firebase',
            prioridad: 'Muy Alta'
          },
          {
            nombre: 'Estudiar Node',
            prioridad: 'Alta'
          }
        ]
      }
    })
```

  Y en el HTML tendremos:

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
            <li v-for="dia in laborables"> {{dia}} </li>
            <h2> Tareas: </h2>
            <li v-for="tarea in tareas"> {{ tarea.nombre}} con prioridad {{tarea.prioridad}} </li>

          </ul>

          <pre> {{$data}}</pre>
        </main>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
        <script src="main3.js" charset="utf-8"></script>
      </body>
    </html>
```

  Así podemos recorrer el objeto que nos llegue. De hecho podemos acceder al índice declarándolo de la siguiente forma en el html, es importante que se le llame *index* porque si no, no va a funcionar:
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
              <li v-for="dia in laborables"> {{dia}} </li>
              <h2> Tareas: </h2>
              <li v-for="(tarea, index) in tareas"> {{ index }} - {{ tarea.nombre}} con prioridad {{tarea.prioridad}} </li>

            </ul>

            <pre> {{$data}}</pre>
          </main>
          <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
          <script src="main3.js" charset="utf-8"></script>
        </body>
  </html>
```
  4. **¿Cómo recorrer un objeto?** Usaremos un objeto llamado persona:
```javascript
const vm = new Vue({
  el: 'main',
  data:{
    laborables: ['Lunes', 'Martes','Miércoles','Jueves','Viernes'],
    tareas: [
      {
        nombre: 'Hacer la compra' ,
        prioridad: 'media'
      },
      {
        nombre: 'Aprender Vue y Firebase',
        prioridad: 'Muy Alta'
      },
      {
        nombre: 'Estudiar Node',
        prioridad: 'Alta'
      }
    ],
    persona: {
      nombre: 'Elena',
      profesion: 'dev',
      ciudad: 'Madrid'
    }
  }
})
```
  Y en el HTML (fijarse en la lista persona):
```html
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>VUE 1</title>
      </head>
      <body>
        <main>
          <ul> <!-- Lista o Array -->
            <li v-for="dia in laborables"> {{dia}} </li>
          </ul>
          <h2> Tareas: </h2> <!-- Matriz de objetos -->
          <ul>
            <li v-for="tarea in tareas"> {{ tarea.nombre}} con prioridad {{tarea.prioridad}} </li>
          </ul>
          <h2>Persona</h2> <!-- Objeto -->
          <ul>
            <li v-for="(value, key, index) in persona"> {{index}} - {{key}}: {{value}}</li>
          </ul>

          <pre> {{$data}}</pre>
        </main>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
        <script src="main3.js" charset="utf-8"></script>
      </body>
    </html>
```
   Es decir, en la directiva *v-for* declaramos las propiedades en las que queremos fijarnos dentro del objeto persona y luego con el binding las llamamos para que aparezcan dentro del *li*.

   Estas son las tres estructuras más típicas con las que vamos a trabajar normalmente. 
