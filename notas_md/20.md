# COMUNICACIÓN ENTRE COMPOENENTES:

Saliendo de la comunicación Parent-Child y viceversa entre componentes, ¿es posible comunicar dos o más componentes entre si, sin tener que recurrir a la instancia Vue principal? La respuesta es si. Hoy, como primera aproximación a esta [Non Parent-Child Communication](https://vuejs.org/v2/guide/state-management.html) vamos a ver que podemos usar una **instancia Vue vacía** como **puente de comunicación**, para no tener que remitir a la instancia principal de Vue.

### Comunicación entre componenetes:

  Partimos de dos componentes de Vue, un listado de productos y un carrito de la compra; así como de una instancia principal de Vue, donde se declaran los elementos que hay en el listado de listado de productos:
```javascript
Vue.component('listado-productos', {
  props:['productos'],
  template: `      <section>
          <ul>
            <li v-for="producto in productos">
              {{ producto.nombre }} -
              <small> {{ producto.precio.toFixed(2) }}€</small>
              <button @click="eliminarProducto(producto.precio)" type="button"> - </button>
              <button @click="anadirProducto(producto.precio)" type="button"> + </button>
            </li>
          </ul>
        </section>`,
  methods: {
    anadirProducto(precio) {
    },
    eliminarProducto(precio) {
    },
  }
});

Vue.component('carrito-compra', {
    template: `
        <section>
            <h1> {{ total.toFixed(2) }} € </h1>
            <h3> {{ cantidadProductos }} productos </h3>
        </section>`,
    data() {
        return {
            cantidadProductos: 0,
            total: 0,
        }
    },
})

new Vue({
  el: 'main',
  data: {
    productos: [
      {nombre: 'Libro ES6', precio: 38},
      {nombre: 'Portatil', precio: 999},
      {nombre: 'Pen Drive', precio: 4},
      {nombre: 'Taza Termo', precio: 10},
      {nombre: 'Palomitas', precio: 1},
    ],
  }
});
```
  Y en el html tenemos las dos instancias de los componentes:
```html
<body>
  <main>
    <listado-productos :productos="productos" class="lista">
    </listado-productos>
    <carrito-compra   class="carrito"></carrito-compra>

    <pre>{{ $data }}</pre>
  </main>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
  <script src="main20.js" charset="utf-8"></script>
</body>
```
  Lo que deseamos es que al dar en los botones de añadir de los productos, se añada el precio y el total de productos PERO sin tener que pasar por la instancia principal, eso es, comunicando los componentes entre sí.

  Para ello vamos a crear una pasarela de comunicación entre componentes, un puente que comunique a ambos y que haremos gracias a una instancia de vue nueva y vacía, puesto que lo que nos interesa es sus sistema de custom events (de emitir y recibir eventos).

  Dentro de los métodos del componente listado-productos, lo que hacemos es utilizar $emit con esta instancia que hemos creado:
```javascript
const eventBus = new Vue();
Vue.component('listado-productos', {
  props:['productos'],
  template: `      <section>
          <ul>
            <li v-for="producto in productos">
              {{ producto.nombre }} -
              <small> {{ producto.precio.toFixed(2) }}€</small>
              <button @click="eliminarProducto(producto.precio)" type="button"> - </button>
              <button @click="anadirProducto(producto.precio)" type="button"> + </button>
            </li>
          </ul>
        </section>`,
  methods: {
    anadirProducto(precio) {
      eventBus.$emit('añadir', precio)
    },
    eliminarProducto(precio) {
      eventBus.$emit('eliminar', precio)
    },
  }
});
```
  Ya hemos utilizado nuestro componente eventBus para emitir el evento, ahora hay que usarlo para recepcionar desde el componente carrito. Así que dentro de lo que es el ciclo de vida del componente, vamos a usar *created()* (momento en el que se crea el componente), para decirle que tiene que escuchar lo que emita emitBus, de momento ejecutamos un console.log y console.error para ver que funciona
```javascript
Vue.component('carrito-compra', {
    template: `
        <section>
            <h1> {{ total.toFixed(2) }} € </h1>
            <h3> {{ cantidadProductos }} productos </h3>
        </section>`,
    data() {
        return {
            cantidadProductos: 0,
            total: 0,
        }
    },
    created() {
      eventBus.$on('anadir', (precio)=> {
        console.log('Desde el carrito',precio);
      });
      eventBus.$on('eliminar', (precio)=> {
        console.error('Desde el carrito', precio);
      })
    }
})
```
  Por último metemos algo de funcionalidad para ver como funciona realmente, si bien esto necesitaría mejoras, vamos a centrarnos en la comunicación entre componentes:
```javascript
Vue.component('carrito-compra', {
    template: `
        <section>
            <h1> {{ total.toFixed(2) }} € </h1>
            <h3> {{ cantidadProductos }} productos </h3>
        </section>`,
    data() {
        return {
            cantidadProductos: 0,
            total: 0,
        }
    },
    created() {
      eventBus.$on('anadir', (precio)=> {
        console.log('Desde el carrito',precio);
        this.total = this.total + precio;
        this.cantidadProductos = this.cantidadProductos +1;
      });
      eventBus.$on('eliminar', (precio)=> {
        console.error('Desde el carrito', precio);
        if (this.total >0 ) {
          this.total = this.total - precio;
          this.cantidadProductos = this.cantidadProductos -1;
        }
      })
    },
})
```
  Como dice la documentación si es algo más complejo, hay que hablar de estado y para eso se usa Vuex. Pero por ahora ya podemos comunicar entre compoenentes dejando sin tocar la instancia principal
  
