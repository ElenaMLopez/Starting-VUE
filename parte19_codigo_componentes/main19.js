Vue.component('alerta', {
  props:['tipo', 'posicion'],
  template: `<section class="alerta" :class="[tipo, posicion]">
              <header class="alerta_header">
                <a href="#" @click="ocultarWidget"> Cerrar </a>
                <slot name="header">
                  CUCU header (desde slot)
                </slot>
              </header>
              <div class="alerta_contenido">
                <slot>
                   Contenido del Slot anónimo
                </slot>
              </div>
              <footer class="alerta_footer">
                <slot name="footer">
                  Footeeerrrrr!!! Silly text (desde slot)
                </slot>
              </footer>
            </section>`,
  methods: {
    ocultarWidget() {
      this.$emit('ocultar');
    },
  }
});

new Vue({
  el: 'main',
  data: {
    mostrarExito: false,
    mostrarAdvertencia: false,
    mostrarError: false,
  }
});
