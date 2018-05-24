# PROPIEDADES DE LOS COMPONENTES:

  Cada componente es una isla, aislada del resto, por lo que se necesitan formas de pasar información desde la instancia o componente padre al componente hijo ([One-way data flow](https://vuejs.org/v2/guide/components-props.html#One-Way-Data-Flow)). Ese es el objetivo de las [propiedades de los componentes](https://vuejs.org/v2/guide/components.html#Passing-Data-to-Child-Components-with-Props) y ese es el tema de esta lección.
  ¿Qué es el *One Way Data Flow*?
  >Todos las props forman un enlace de ida y vuelta entre la propiedad hija y la principal: cuando la propiedad principal se actualice, fluirá hacia el hijo, pero no al revés. Esto evita que los componentes secundarios muten accidentalmente el estado de los padres, lo que puede hacer que el flujo de datos de la aplicación sea más difícil de comprender.

### Propiedades en componentes:

  Cada instancia de cada componente tienen un ámbito aislado y por eso su modelo, su propiedad data en los componentes es una función que retorna un objeto, mientras que en la instacia es tan solo un objeto.
  Esto es así porque las funciones crean un ámbito propio, un scope, que está aislado (se puede acceder a él pero se encuentra aislado) y cada instancia de cada componente tiene un ámbito unico para él.

  Hay que buscar una manera de pasarle información al componente, sobre todo si hablamos desde le padre al hijo, ya sea desde la instancia Vue a un componente, o de un componente padre a uno hijo. En este caso lo más utilizado son las propiedades.

### Formas de pasar información al componente:

  Por ejemplo en nuestra instancia de Vue tenemos un componente instanciado llamado *autor* y que en nuestro archivo Vue tiene declarado un nuevo componente llamado autor, con su pro piedad. Las propiedades son unos elementos esplícitos.
  Así en el HTML tenemos:
```html
<body>
  <main>

    <autor v-bind:nombre="autor"></autor>

    <hr>
    <pre> {{$data}}</pre>
  </main>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
  <script src="main15.js" charset="utf-8"></script>
</body>
```
  Y en el archivo Vue:

```javascript
Vue.component('autor', {
  props: ['nombre'],
  template: `<h1> {{ nombre }} </h1>`,

});

new Vue({
  el: 'main',
  data: {
    autor: 'Juan Andrés',
  },
});
```
  Hay que recordar que las porpiedades son accesibles desde *this*, es decir, puede accederse al valor que registren:

```javascript
Vue.component('autor', {
  props: ['nombre'],
  mounted() {
    console.log(this.nombre); // Muestra el contenido de props en consola. This hace un proxy.
  },
  template: `<h1> {{ nombre }} </h1>`,

});

new Vue({
  el: 'main',
  data: {
    autor: 'Juan Andrés',
  },
});
```
  Yademás son dinámicas, puesto que al hacer el binding, como evalúa la expresión, si el padre cambia, se actualizarán todas las instacias basadas en él, por tanto si en las Vue Tools cambiamos con  *$vm0* el valor del modelo de la instancia Vue, también cambia en el renderizado (puesto que se evalúa la propiedad nombre). Pero esto es así cuando **cambia el padre pero no a la inversa**, es decir, si cambiamos el valor de props desde el hijo no se produce el cambio. Ya vermos por qué.
  Si se intenta pasar un número (no ya una porpiedad del modelo), lo que pasa es que no es un número, sino un string, comprobémoslo:
```html
<main>
  <!-- Pasamos un atributo edad que es 99 -->
  <autor v-bind:nombre="autor" edad="99"></autor>

  <hr>
  <pre> {{$data}}</pre>
</main>
```
  Y declaramos la propiedad en el componente, así como ver en consola el tipo de edad:
```javascript
Vue.component('autor', {
  props: ['nombre', 'edad'],// declaramos la edad
  mounted() {
    console.log(typeof(this.edad));
  },
  template: `<h1> {{ nombre }} </h1>`,

});
```
  Abriendo la consola vemos que edad es un string, no un número. Para solucionar esto, y aunque la propiedad no venga de un modelo, podemos evaluarla, y eso se hace con *v-bind:*, de esta forma indicamos que lo que está dentro del atributo declarado debe EVALUARSE:
  ```html
  <main>
    <!-- Evaluamos el atributo edad con v-bind o los : -->
    <autor v-bind:nombre="autor" :edad="99"></autor>

    <hr>
    <pre> {{$data}}</pre>
  </main>
  ```
  Todas las propiedades fluyen de padre a hijo y no al reves, por lo que no se deben intentar cambiar las propiedades dentro del hijo, y de hecho si se hace Vue se va a quejar. Probemos con un método declarado dentro de nuestro componente autor:
```javascript
Vue.component('autor', {
  props: ['nombre', 'edad'],// declaramos la edad
  mounted() {
    console.log(typeof(this.edad));
  },
  template: `<div>
              <h1> {{ nombre }} </h1>
              <button @click="cambiarProp"> Cambiar Propiedad</button>
            </div>`,// Hay que meter todo el template en un elemento root, si no peta ;)
  methods: {
    cambiarProp() {
      this.nombre = this.nombre.toUpperCase();
    }
  },
});
```
  Al pulsar el botón lanza una función que cambia la propiedad del componente autor, es decir del hijo de la instancia Vue que tiene como elemento en el Dom, *main*, y la consola lanza este mensaje de error:
  >[Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "nombre"

  Esto es así porque es peligroso cambiar una propiedad en un hijo y que mute el modelo del padre. Si se permitierá sin más, podríamos cambiar TODO el modelo de datos (porque se pasa por referencias) para TODAS las instancias hijas. A parte de que si cambia en el padre sobreescribirá lo que deseabas hacer...¿Que podemos hacer?

  Si necesitamos modificar el valor, en la documentación oficial, nos dice como hacerlo. Hay dos Formas
  1. Que la propiedad se pase solo como un valor inicial, de base sobre el que realizar cálculos
  2. Se pasa como valor original que necesita ser modificado

**1. Propiedad que se pasa solo como un valor inicial, sobre el que realizar cálculos:**
```javascript
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```
  Lo que hacemos es acceder con this con el valor de la propiedad, no con la propiedad en sí. De esta forma accedemos a una propiedad de la propiedad del modelo, pero no al modelo en sí. Se toma el valor inicial del modelo, y luego se calcula sobre ese valor sin modificar el modelo. si no a una parte de él. (En el apartado templates veíamos eso con listado).


**2. La propiedad se pasa como valor original que necesita ser modificado:**

  Cuando la propiedad es un valor que tiene que ser transformado a partir de una Computed Property, utiliza el valor de la propiedad custom, y lo usa para cambiar y hacer cambios, pero no MUTA el valor inicial.

```javascript
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```
  Esto es así pq **en JS los objetos y arrays se pasan por referencia**, por lo que si tocas al hijo vas a modificar probablemente al padre.
  >Note that objects and arrays in JavaScript are passed by reference, so if the prop is an array or object, mutating the object or array itself inside the child component will affect parent state.
  Tenga en cuenta que los objetos y las matrices en JavaScript se pasan por referencia, por lo que si el origen es una matriz u objeto, mutar el objeto o la matriz en sí dentro del componente secundario afectará al estado principal.

  Si modificas la copia modificas el original. 
