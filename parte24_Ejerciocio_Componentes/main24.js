Vue.component('usuarios', {
  template: '#usuarios-template',
  mounted(){
    axios.get('https://randomuser.me/api/?results=50')
      .then((datos)=> {
        console.log(datos);
        const listado = datos.data.results.map((usuario) => {
          return {
            nombre: `${usuario.name.title} ${usuario.name.first} ${usuario.name.last}`,
            email: usuario.email,
            foto: usuario.picture.medium,
          }
        });
      this.usuarios = listado;
      })
  },
  data(){
    return {
      usuarios: [],
    }
  }
});
Vue.component('usuario', {
  props:['datos'],
  template: '#usuario-template',

})

new Vue({
  el: 'main',
})
