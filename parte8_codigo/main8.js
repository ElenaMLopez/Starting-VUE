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
