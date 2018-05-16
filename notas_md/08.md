# LA INSTANCIA VUE


Es importante que entiendas, a grandes rasgos, cómo funciona la [instancia Vue](https://vuejs.org/v2/guide/instance.html), ya que es la unión entre el DOM y la lógica de tu App. Preguntas sobre su [ciclo de vida](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram), si se pueden tener varias instancias Vue al mismo tiempo, o cómo se comunican entre ellas, tienen su respuesta en esta lección.

La definición de instancia de Vue en la guía oficial es:
>Aunque no está estrictamente asociado con el patrón MVVM, el diseño de Vue fue inspirado en parte por él. Como una convención, a menudo usamos la variable vm (abreviatura de ViewModel) para referirnos a nuestra instancia de Vue.

>Cuando creas una instancia de Vue, pasas un objeto de opciones. La mayoría de esta guía describe cómo puede usar estas opciones para crear su comportamiento deseado. Como referencia, también puede explorar la lista completa de opciones en la referencia de la API.

>Una aplicación Vue consiste en una instancia raíz Vue creada con el nuevo Vue, opcionalmente organizada en un árbol de componentes anidados y reutilizables. (...) Por ahora tan solo saber que todos los componentes de Vue son instacias de Vue y aceptan las mismas opciones de objeto (a excepción de algunas opciones específicas de la raíz).

 LA instancia Vue es el intermediario entre la aplicación y el DOM. La lógica que se introduce en la instancia, como el 'el', el 'data', los métodos etc, se une con el DOM cuando declaramos la instancia. Con las *Conputed Properties* se manipula el modelo sin tener que operar en el DOM.

 En la documentación se nos dice que Vue utiliza un Modelo-Vista-Modelo de Vista [MVVM patern](https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93modelo_de_vista), que busca desacoplar lo máximo posible la interfaz de usuario de la lógica de la aplicación.

 Otra cosa que vemos en esta documentación es que cuando creamos una instancia de Vue, lo que hace es crear un proxy, asociando las propiedades del modelo y haciéndolas accesibles desde fuera (en la consola por ejemplo).
 No solo el modelo es asociado en este proxy, los métodos también.

 ¿Se pueden tener varias instancias de Vue? Si que se puede, normalmente lo que se hará es tener varios componentes, pero se pueden crear varias instancias no obstante:

```javascript
const vm1 = new Vue({
  el: 'main',
  data: {
    mensaje: 'Instancia 1 de Vue',
  },
  methods: {
    alReves(){
       this.mensaje = this.mensaje.split('').reverse().join('');
    }
  },
  computed: {
    mensajeMayusculas(){
      return this.mensaje.toUpperCase();
    }
  }
});


 const vm2 = new Vue({
  el: '#app',
  data: {
    mensaje: 'Instancia 2 de Vue',
  },
});

```


```html
<body>
  <main>
    <h1 v-text="mensaje"></h1>
    <button type="button" @click="alReves"> Al revés </button>
    <hr>
    <pre> {{$data}}</pre>
  </main>
  <div id="app">
    <h1> {{mensaje}} </h1> <!-- interpolamos el mensaje, con las llaves
      es la forma más básica de bindear -->

  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
  <script src="main8.js" charset="utf-8"></script>
</body>
```
¿Se pueden comunicar? Sí, de hecho se puede utilizar el método alReves en el modelo de la instancia 2. Para ello dentro del método alReves, llamamos a la constante vm2 y de ella a su mensaje y le aplicamos lo que deseemos:
```javascript
const vm1 = new Vue({
  el: 'main',
  data: {
    mensaje: 'Instancia 1 de Vue',
  },
  methods: {
    alReves(){
       this.mensaje = this.mensaje.split('').reverse().join('');
       vm2.mensaje = "Cucú desde la instancia 1 de Vue!!!!"
    }
  },
  computed: {
    mensajeMayusculas(){
      return this.mensaje.toUpperCase();
    }
  }
});


 const vm2 = new Vue({
  el: '#app',
  data: {
    mensaje: 'Instancia 2 de Vue',
  },
});
```
  Una cosa es que se pueda hacer y otra que sea conveniente. En realidad este tipo de lógica es mejor atacarla con componenetes (que se verán más adelante), pero se ha de ser consciente de que se puede y cómo es el funcionamiento.

  ¿Se pueden crear propiedades reactivas? NO, desde fuera se pueden modificar los contenidos de las propiedades, porque en el momento del *montaje* de la instancia de Vue se crean getters y setters para las propiedades del modelo, que es lo que hace que sean reactivas. Pero desde fuera NO puede añadirse una propiedad que vaya a ser **reactiva** (o sea, se puede añadir una propiedad, pero no va a ser reactiva).

  La instancia de Vue se monta en un momento dado, es aquí donde comienza su ciclo de vida. Empezamos con new Vue, y hay un evento que es beforeCreate, que se ejecuta justo antes de crear la instancia, luego viene una serie de fases y eventos que se pueden capturar. En el diagrama vemos que ocurre desde que se crea la instancia de Vue hasta que se destruye si se desea. Hay un evento que se produce antes de crear, si deseamos capturar algo para que ocurra justo antes de la creación podemos setearlo ahí.
  Luego se crea la instancia, pero aun no se ha creado el template. Luego es cuando se compila y se interpolan los valores con los strings, con el HTML etc, y ahí es donde están beforeMoutn y mounted... es recomendable leer la documentación oficial sobre las instancias.

  ```javascript
  const vm1 = new Vue({
    el: 'main',
    data: {
      mensaje: 'Instancia 1 de Vue',
    },
    beforeCreate(){
      console.log('justo aki aun no me he creado como instanciaaa!');
    },
    beforeUpdate(){
      console.log('Antes de update:', this.mensaje);
    },
    updated(){
      console.log('Cuando update', this.mensaje);
    },

    methods: {
      alReves(){
         this.mensaje = this.mensaje.split('').reverse().join('');
         vm2.mensaje = "Cucú desde la instancia 1 de Vue!!!!"
      }
    },
    computed: {
      mensajeMayusculas(){
        return this.mensaje.toUpperCase();
      }
    }
  });


   const vm2 = new Vue({
    el: '#app',
    data: {
      mensaje: 'Instancia 2 de Vue',
    },
  });
  ```
