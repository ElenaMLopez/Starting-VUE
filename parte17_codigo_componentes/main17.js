Vue.component('alerta', {
  props:['tipo', 'posicion'],
  template: `<section class="alerta" :class="[tipo, posicion]">
              <header class="alerta_header">
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
});

new Vue({
  el: 'main',
});
