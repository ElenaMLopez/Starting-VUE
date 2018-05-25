Vue.component('alerta', {
  props:['tipo', 'posicion'],
  template: `<section class="alerta" :class="[tipo, posicion]">
              <header class="alerta_header">
                CUCU header
              </header>
              <div class="alerta_contenido">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
              </div>
              <footer class="alerta_footer">
                  Footeeerrrrr!!! Silly text
              </footer>
            </section>`,
});

new Vue({
  el: 'main',
});
