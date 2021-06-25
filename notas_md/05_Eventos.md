# EVENTOS:
  Vue reacciona muy bien a los eventos del DOM, lo único que hay que hacer es decirle que esté pendiente de esos eventos.

  Obiamente se puede hacer con Vanilla javascript de esta forma:

  ```html
  <!DOCTYPE html>
  <html lang="es" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>VUE 1</title>
    </head>
    <body>
      <main>
        <h3> Lista de tareas: </h3>
        <ul>
          <li v-for="tarea in tareas"> {{tarea}} </li>
        </ul>
        <input type="text" placeholder="Introduce una tarea"> </input>
        <input type="button" value="Enviar tarea" onclick="agregarTarea()">
        <pre> {{$data}}</pre>
      </main>
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
      <script src="main5.js" charset="utf-8"></script>
    </body>
  </html>
  ```

  ```javascript
  const vm = new Vue({
    el: 'main',
    data:{
      tareas: [
        'Aprender Vue.js',
        'Practicar katas de ES6',
        'Subir a Github todos los días'
      ]
    }
  })
  // Vanilla JavaScript:

  function agregarTarea(){
    const input = document.querySelector('input[type=text]');
    vm.tareas.unshift(input.value);
    input.value = '';
  }
  ```
  Pero de esta forma hay que entrar en el DOM, tomar el dato del input y modificar cada parte del dom donde desee. Si solo tienes un input bueno... pero si tienes muchos es muy dificil de mantener y modificar

  Con VUE utilizando la directiva v-on, podemos hacerlo fácilmente.

  La directiva que controla eventos es **v-on** y desde ahí se llama a la función *agregarTarea* pero esta función ha de estar **dentro de la instancia de VUE** y dentro de esta instancia ha de estar dentro de **methods**, de lo contrario no va a funcionar.


  Para pasar el evento al que ha de reaccionar la directiva v-on se utilizan ':', como en ángular, al poner dos puntos es como si en los filtros pones dos puntos y pasas otro argumento, dos puntos y otro argumento... pues en este caso es similar. Se pone la directiva y con los dos puntos definimos el evento ante el que se reacciona, de la siguiente forma: **v-on:click**

```html
  <!DOCTYPE html>
  <html lang="es" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>VUE 1</title>
    </head>
    <body>
      <main>
        <h3> Lista de tareas: </h3>
        <ul>
          <li v-for="tarea in tareas"> {{tarea}} </li>
        </ul>
        <input type="text" placeholder="Introduce una tarea"> </input>
        <input type="button" value="Enviar tarea" v-on:click="agregarTarea">

        <hr>
        <pre> {{$data}}</pre>
      </main>
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
      <script src="main5.js" charset="utf-8"></script>
    </body>
  </html>
```

```javascript
  const vm = new Vue({
    el: 'main',
    // MODELOS:
    data:{
      tareas: [
        'Aprender Vue.js',
        'Practicar katas de ES6',
        'Subir a Github todos los días'
      ]
    },
    // METODOS:
    methods: {
      agregarTarea(){
        console.log('Hola desde agregarTarea!!!');
      }
    }
  })
  // Vanilla JavaScript:

  // function agregarTarea(){
  //   const input = document.querySelector('input[type=text]');
  //   vm.tareas.unshift(input.value);
  //   input.value = '';
  // }
  ```
   El siguiente paso es pasar a la lista la tarea que vamos a agregar, pero en vez de poner lo que pondríamos en Vanilla JavaScript navegando por el DOM, lo que hay que hacer es cambiar el *modelo*, que es la fuente de datos.
   Para ello modificamos el modelo, declarando NuevaTarea y lo dejamos vacío.Después de esto hay que decirle está relacionado con él en el DOM, en este caso el input donde metemos las nuevas tareas.

   Ahora, desde el método `agregarTarea()` insertamos las nuevas tareas en este modelo. Para ello podemos usar *this*. Con VUE, en este caso *this* hace referencia a la instancia de VUE declarada, por lo que queda de esta forma:

```html
   <main>
     <h3> Lista de tareas: </h3>
     <ul>
       <li v-for="tarea in tareas"> {{tarea}} </li>
     </ul>
     <input v-model="nuevaTarea" type="text" placeholder="Introduce una tarea"> </input>
     <input type="button" value="Enviar tarea" v-on:click="agregarTarea">

     <hr>
     <pre> {{$data}}</pre>
   </main>
   <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
   <script src="main5.js" charset="utf-8"></script>

```

```javascript
   const vm = new Vue({
     el: 'main',
     // MODELOS:
     data:{
       nuevaTarea: null,

       tareas: [
         'Aprender Vue.js',
         'Practicar katas de ES6',
         'Subir a Github todos los días'
       ]
     },
     // METODOS:
     methods: {
       agregarTarea(){
         console.log('Hola desde agregarTarea!!!');
         // this hace referencia a la instancia de VUE!!!
         this.tareas.unshift(this.nuevaTarea);
       }
     }
   })
```

   Tan solo queda eliminar la tarea agregada del input, por lo que una vez hecho el *unshift* tan solo queda setear nuevaTarea a null de nuevo.
```javascript
 methods: {
   agregarTarea(){
     console.log('Hola desde agregarTarea!!!');
     // this hace referencia a la instancia de VUE!!!
     this.tareas.unshift(this.nuevaTarea);
     // eliminar la tarea una vez agregada
     this.nuevaTarea = null;
   }
 }
```
  Lo normal es que los input estén dentro de un \< fomr \> y en este caso el segundo input, el de enviar ha de ser tipo *submit*, pero si se deja tal cual, envía y recarga la página. Así pues, se ha de pasar el v-on al formulario y el evento ha de ser *submit*, y además prevenir el evento por defecto que enviar/recargar-página. Para ello poniengo un *'event-modify'*, en este caso **prevent** detrás del evento Vue ya sabe lo que tiene que hacer. Quedará así finalmente:
```html
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>VUE 1</title>
  </head>
  <body>
    <main>
      <h3> Lista de tareas: </h3>
      <ul>
        <li v-for="tarea in tareas"> {{tarea}} </li>
      </ul>

      <form v-on:submit.prevent="agregarTarea">
        <input v-model="nuevaTarea" type="text" placeholder="Introduce una tarea"> </input>
        <input type="submit" value="Enviar tarea">
      </form>
      
      <pre> {{$data}}</pre>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
    <script src="main5.js" charset="utf-8"></script>
  </body>
</html>
```

  Por tanto:
    - No hay que entrar en el DOM para cambiar valores.
    - Es sencillo usar eventos desde Vue.js y tenemos todos los que hay en JavaScript.
    - Los *Events Modifiers* son:    
      - .stop
      - .prevent
      - .capture
      - .self
      - .once
      - .passive
```html
    <!-- the click event's propagation will be stopped -->
    <a v-on:click.stop="doThis"></a>

    <!-- the submit event will no longer reload the page -->
    <form v-on:submit.prevent="onSubmit"></form>

    <!-- modifiers can be chained -->
    <a v-on:click.stop.prevent="doThat"></a>

    <!-- just the modifier -->
    <form v-on:submit.prevent></form>

    <!-- use capture mode when adding the event listener -->
    <!-- i.e. an event targeting an inner element is handled here before being handled by that element -->
    <div v-on:click.capture="doThis">...</div>

    <!-- only trigger handler if event.target is the element itself -->
    <!-- i.e. not from a child element -->
    <div v-on:click.self="doThat">...</div>
```
