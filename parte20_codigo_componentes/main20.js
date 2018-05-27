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
      eventBus.$emit('anadir', precio)
    },
    eliminarProducto(precio) {
      eventBus.$emit('eliminar', precio)
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
