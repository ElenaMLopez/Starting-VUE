# CUSTOM EVENTS:


  Como ya has visto, con las propiedades puedes pasar información de parent a children (One-way data flow) pero, ¿cómo pasar información desde un componente a la instancia principal (children a parent). La solución son los [custom events de Vue.js](https://vuejs.org/v2/guide/components.html#Sending-Messages-to-Parents-with-Events). Se pueden hacer dinámicas con v-bind o de un sólo un valor primitivo. Pero si queremos enviar información desde el hijo hasta el padre, usaremos estos *custom events*.

  Tenemos de nuevo el html de las tarjetas de advertencia:
```html
<head>
  <meta charset="utf-8">
  <title>VUE 1</title>
  <link rel="stylesheet" href="style_19.css">
</head>
<body>
  <main>
    <!-- Alerta exito -->
    <alerta tipo="alerta--exito" posicion="alerta--arriba-derecha">
      <template slot="header">  Contenido del HTML. Todo OK </template>
      <template> Contenido de la alerta-exito del HTML </template>
      <template slot="footer">  Contenido del HTML footer  </template>
    </alerta>
    <!-- Alerta advertencia -->
    <alerta tipo="alerta--advertencia" posicion="alerta--arriba-izquierda">
      <template slot="header">  Advertencia desde del HTML. Uy uy uy</template>
      <template> UY UY UY desde el HTML! </template>
      <template slot="footer">  Footer de advertencia del HTML  </template>
    </alerta>
    <!-- Alerta error -->
    <alerta tipo="alerta--error" posicion="alerta--abajo-derecha">
      <template slot="header">  Desde HTML te digo que lio </template>
      <template> ¡¡¡Ha comenzado el advenimiento zombie!!! </template>
      <template slot="footer">  Todo lo dicho desde HTML  </template>
    </alerta>
  </main>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
  <script src="main19.js" charset="utf-8"></script>
</body>
```
  Pero en esta ocasión en el archivo Vue, añadimos en el slot un link para poder cerrar la alerta:
```javascript
Vue.component('alerta', {
  props:['tipo', 'posicion'],
  template: `<section class="alerta" :class="[tipo, posicion]">
              <header class="alerta_header">
                <a href="#"> Cerrar </a>
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
```
  Y para poder controlar ese comportamiento en la instancia de vue, se añaden tres propiedades al modelo, de la que dependerá que se vean o no:
```javascript
new Vue({
  el: 'main',
  data: {
    mostrarExito: false,
    mostrarAdvertencia: false,
    mostrarError: false,
  }
});
```
  Añadimos en el HTML *v-show*
```html
<main>
  <!-- Alerta exito -->
  <alerta v-show="mostrarExito" tipo="alerta--exito" posicion="alerta--arriba-derecha">
    <template slot="header">  Contenido del HTML. Todo OK </template>
    <template> Contenido de la alerta-exito del HTML </template>
    <template slot="footer">  Contenido del HTML footer  </template>
  </alerta>
  <!-- Alerta advertencia -->
  <alerta v-show="mostrarAdvertencia" tipo="alerta--advertencia" posicion="alerta--arriba-izquierda">
    <template slot="header">  Advertencia desde del HTML. Uy uy uy</template>
    <template> UY UY UY desde el HTML! </template>
    <template slot="footer">  Footer de advertencia del HTML  </template>
  </alerta>
  <!-- Alerta error -->
  <alerta v-show="mostrarError" tipo="alerta--error" posicion="alerta--abajo-derecha">
    <template slot="header">  Desde HTML te digo que lio </template>
    <template> ¡¡¡Ha comenzado el advenimiento zombie!!! </template>
    <template slot="footer">  Todo lo dicho desde HTML  </template>
  </alerta>


  <pre>{{ $data }}</pre>
</main>
```
  No se ve ningún mensaje porque en las propiedades del modelo están seteadas a false, así que ahora agregamos unos botones, para que al hacer click en ellos se visualicen los diferentes mensajes:
```html
<!-- Botones para mostrar mensajes -->
<button @click="mostrarExito = true" type="button"> Mostrar Exito </button>
<button @click="mostrarAdvertencia = true"type="button"> Mostrar Advertencia</button>
<button @click="mostrarError = true"type="button"> Mostrar Error (no pulsar X) </button>
```
  Y aquí está el punto en el que el hijo tiene que mandar información al padre, cuando le demos al botón de cerrar queremos setear a false de nuevo la porpiedad del modelo correspondiente. Pasamos información del componente a la instancia principal. Para ello en el template del componente, es donde declaramos la funcionalidad del enlace. Crearemos un método ocultarWidget(), para meter la lógica. Pero ¿Cómo conectamos este método con su padre? ¿Con la instancia Vue? Lo que hay que hacer es que el hijo, lance un evento que la instancia pueda escuchar, y eso se hace con **$emit** con el tipo de evento. Se pueden enviar más cosas con este evento, pero de momento vamos a dejarlo sencillo.

  Por otro lado puedes emitir lo que desees, pero si la instancia Vue no está avisada de que tiene que escuchar, que estar pendiente de si se emiten eventos, no lo va a ver. Y esto se hace desde la misma instancia declarandola como un evento más, y diciendole que hace cuando ese evento se produzca:
```html
<alerta @ocultar="mostrarExito = false" v-show="mostrarExito" tipo="alerta--exito" posicion="alerta--arriba-derecha">
  <template slot="header">  Contenido del HTML. Todo OK </template>
  <template> Contenido de la alerta-exito del HTML </template>
  <template slot="footer">  Contenido del HTML footer  </template>
</alerta>
```
  Y así en todas las directivas que tengamos con su correspondiente propiedad. Mientras que en el archivo de Vue tendremos:
```javascript
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
```
  De esta forma es como comunicamos las instancias de nuestro componente con el componente.
