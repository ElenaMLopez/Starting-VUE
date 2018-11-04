# TRANSICIONES

Vue permite realizar todo tipo de [transiciones y animaciones](https://vuejs.org/v2/guide/transitions.html) (transition, animation y JavaScript animation) a los elementos de tu vista, utilizando el componente transition y una serie de prefijos de nombre de clase predefinidos.

Si además, se puede utilizar una colección de animaciones CSS como [Animate.css](https://github.com/daneden/animate.css/pulls) de forma muy sencilla.

#### Jugando con transiciones:

  Partimos de lo siguiente:
```html

  <body>
    <main>
      <button @click="mostrar = !mostrar"> Mostrar/Ocultar </button>
      <h1 v-if="mostrar" v-text="mensajes.transicion"></h1>
      <hr>
      <pre> {{$data}}</pre>

    </main>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
    <script src="main10.js" charset="utf-8"></script>
  </body>
```
```javascript
const vm1 = new Vue({
  el: 'main',
  completadas: [],
  data: {
    mostrar: true,
    mensajes: {
      transicion: 'Trancisiones CSS con Vue.js',
      animacion: 'Animaciones CSS con Vue.js',
      animationCustom: 'Animaciones custom CSS con Vue.js',
      entreElementos: 'Transiciones entre elementos con Vue.js',
    }
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
  Y queremos que la transición entre que se muestre el mensaje y que no sea algo gradual, no tan brusco mo está ahora. En la [documentación oficial](https://vuejs.org/v2/guide/transitions.html), nos dice que tenemos que usar un tag llamado *transition*

``` <transition name="fade">  </transition>
```
  Este tag es en realidad un componenete, pero qué es un componente se verá más adelante, de momento saber que es así es suficiente.

  Encerramos dentro del tag *transition* nuestros elementos y le asignamos el *name*. Es importante ver que este nombre es el que se va a utilizar después Vue.js y CSS para asignar una serie de clases que son las que van a dotar de efectos a lo que esté dentro del tag.
  Quedaría así.
  ```html

    <body>
      <main>
        <transition name="aparecer">
          <button @click="mostrar = !mostrar"> Mostrar/Ocultar </button>
          <h1 v-if="mostrar" v-text="mensajes.transicion"></h1>
        </transition>
        <hr>
        <pre> {{$data}}</pre>

      </main>

      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
      <script src="main10.js" charset="utf-8"></script>
    </body>
  ```
  En este nombre se establecen unas clases al atributo name, que añaden las propiedades que añaden la transición a este tag.
  En caso de no dar nombre al atributo, se usa *v-enter* por ejemplo, es decir *v-* con la clase que aplique según el caso.
```html
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>VUE 1</title>
    <style>
    /* Transition */
    .aparecer-enter-active, .aparecer-leave-active {
      transition: opacity 2s;
    }
    .aparecer-enter, .aparecer-leave-to {
      opacity: 0;
    }

    </style>
  </head>
  <body>
    <main>
      <button @click="mostrar = !mostrar"> Mostrar/Ocultar </button>
      <!-- Transition -->
      <transition name="aparecer">
        <h1 v-if="mostrar" v-text="mensajes.transicion"></h1>
      </transition>
      <hr>
      <pre> {{$data}}</pre>

    </main>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
    <script src="main10.js" charset="utf-8"></script>
  </body>
</html>
```
  Las clases ```.aparecer-enter-active, .aparecer-leave-active,.aparecer-enter, .aparecer-leave-to``` son clases que Vue.js nos da para aplicar las transiciones.

  Pero no sólo tenemos transiciones, tambien Animaciones. En la documentación oficial podemor ver que utiliza *-enter-active* y *-leave-active* para activar la entrada y salida de un texto mediante una animación. En nuestro caso quedará de la siguiente forma:
```html
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>VUE 1</title>
    <style>
    /* Transition */
    .aparecer-enter-active, .aparecer-leave-active {
      transition: opacity 2s;
    }
    .aparecer-enter, .aparecer-leave-to {
      opacity: 0;
    }
    /* Animation */
    .bote-enter-active {
      animation: bounce-in .5s;
    }
    .bote-leave-active {
      animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
      }
    }
    </style>
  </head>
  <body>
    <main>
      <button @click="mostrar = !mostrar"> Mostrar/Ocultar </button>
      <!-- Transition -->
      <transition name="aparecer">
        <h1 v-if="mostrar" v-text="mensajes.transicion"></h1>
      </transition>
      <!-- Animation con Vue.js -->
      <transition name="bote">
        <h1 v-if="mostrar" v-text="mensajes.animacion"></h1>
      </transition>

      <hr>
      <pre> {{$data}}</pre>

    </main>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
    <script src="main10.js" charset="utf-8"></script>
  </body>
</html>
```

  Y si deseamos utilizar la librería de [Animate.css](https://github.com/daneden/animate.css/pulls), incluso en la documentación oficial nos da el enlace para utilizar el CDN de esta librería. Así es como vasmos a trabajarla. Así que nos tremos la librería con el vínculo del CDN:
  ```html
  <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
  ```
  y lo añadimos antes de nuestra etiqueta de *style*. Esta librería es una colección de keyframes, y podemos elegir las que deseemos y las aplicamos a nuestros elementos. Se pueden especificar una serie de clases con sus propiedades a utilizar. Hay tres principalmente:
  ```
  name
  enter-active-class
  leave-active-class
  ```
  Creamos otro elemento en el HTML y en el atributo *name* lo que queramos, luego eso sí el nombre que deseemos mas *-active-class* y en este caso la propiedad será la que deseemos de la librería, y siempre precedida de animated, porque es requisito de la librería, por lo que nuestro nuevo elemento queda así:
```html
<!-- Agregado sobre tag <style>  -->
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">

<!-- En el body, el nuevo elemento con los atributos necesarios -->
<!-- Animation -->
<transition name="animate.css"
  enter-active-class="animated rotateInUpLeft"
  leave-active-class="animated zoomOutUp">

  <h1 v-if="mostrar" v-text="mensajes.animationCustom"></h1>
</transition>
```
  Si deseamos que la animación se inicie en la carga de la página, sin tener que decirle nada, dentro de la documentación oficial, podemos ver que hay una sección llamada 'Transition on Initial Render', y lo que se nos dice ahí es que al elemento que queremos que aparezca en el renderizado inicial con su animación, hay que ponerle el atributo *appear*. Tiene más clases asociadas, pero poniendo ese atributo tal cual, el elemento aparece en la carga de la página. Lo pondremos en nuestro primer *h1*:
```html
<!-- Transition -->
<transition name="aparecer" appear>
  <h1 v-if="mostrar" v-text="mensajes.transicion"></h1>
</transition>
```
  ¿Y si deseamos hacer una transición entre diferentes elementos? Por ejemplo

  Añadimos otro bloque de transition en el html, donde ponemos un v-else que actúa con el *v-if*:
```html
<transition name="aparecer">
  <h1 v-if="mostrar" v-text="mensajes.entreElementos"></h1>
  <h1 v-else> No hay mensaje!!! </h1>
</transition>
```
  De esta forma, si es cierto que no hay animación. En la documentación advierte, que cuando la transición es entre elementos del mismo tipo (en este caso dos *h1*), hay que utilizar un atributo llamado *key*, para poder decirle a Vue cual tiene una animación u otra, si no Vue piensa que es el mismo y remplaza contenidos al compilar.
```html
<!-- Transiciones entre diferentes elementos -->
<transition name="aparecer">
  <h1 v-if="mostrar" v-text="mensajes.entreElementos" key="aparecer"></h1>
  <h1 v-else key="ocultar"> No hay mensaje!!! </h1>
</transition>
```

  Lo que ocurre ahora, es que por la naturaleza misma de las transiciones, se monta un mensaje justo encima del otro, para ello Vue.js nos da unos *Transition Models* que son *in-out* y *out-in* y que solucionan este problema. Estos modelos de transición han de especificarse denro de otro atributo en el html de la transición, que es **mode**, de forma que quedaría así:
```html
<!-- Transiciones entre diferentes elementos -->
<transition name="aparecer" mode="out-in">
  <h1 v-if="mostrar" v-text="mensajes.entreElementos" key="aparecer" ></h1>
  <h1 v-else key="ocultar"> No hay mensaje!!! </h1>
</transition>
```

  Dentro de la documentación oficial hay mucho más:
```
  Overview
  Transitioning Single Elements/Components
  Transition Classes
  CSS Transitions
  CSS Animations
  Custom Transition Classes
  Using Transitions and Animations Together
  Explicit Transition Durations
  JavaScript Hooks
  Transitions on Initial Render
  Transitioning Between Elements
  Transition Modes
  Transitioning Between Components
  List Transitions
  List Entering/Leaving Transitions
  List Move Transitions
  Staggering List Transitions
  Reusable Transitions
  Dynamic Transitions
```
