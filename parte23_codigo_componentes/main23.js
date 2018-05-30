Vue.component ('contrasena', {
  props: ['contrasena'],
  template: `<div>
              <label for="miInput"> Contraseña </label>
              <input ref="pass" id="miInput" :value="contrasena" @input="comprobarContrasena($event.target.value)">
            </div>`,
  methods: {
    comprobarContrasena(contrasena) {
      if(this.noValidas.includes(contrasena)) {
        this.$refs.pass.value = contrasena = '';
      }
        this.$emit('input', contrasena);
    }
  },
  data() {
    return {
      noValidas: ['abc', 'admin', 'root'],
    }
  }
});

new Vue({
  el:'main',
  data: {
    contrasena: 'LaContraseña',
  }
})
