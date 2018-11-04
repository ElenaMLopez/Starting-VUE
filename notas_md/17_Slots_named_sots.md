# SLOTS & NAMED SLOTS:


  Si las propiedades en los componentes permiten personalizar la lógica de cada instancia, los [slots en Vue.js](https://vuejs.org/v2/guide/components.html#Content-Distribution-with-Slots) permiten que parte del template sea dinámico, único para cada instancia.

  Los slots son una forma más de pasar información a los componentes. Permiten configurar el template o la parte más visual, de esta forma les damos un template dinámico a los componentes

En el HTML tenemos componente llamado alerta:
```html
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>VUE 1</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <main>
      <alerta></alerta>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
    <script src="main17.js" charset="utf-8"></script>
  </body>
</html>
```
  Este componente tiene su template en el archivo de Vue, en realidad es una alerta, con un texto ficticio:
```javascript
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
```
  Y en esta ocasion tenemos también un archivo de CSS con nomeclatura BEM con lo siguiente:
```css
/* Bloques */

.alerta {
  width: 300px;
  border-radius: 15px;
  background-color: lightgray;
  border: 1px solid white;
  box-shadow: 1px 1px 2px gray;
  font-family: sans-serif;
  position: absolute;
}

/* Elementos */
.alerta_header {
  border-bottom: 1px solid white;
  padding: 10px;
  text-align: center;
  font-weight: bold;
}
.alerta_contenido {
  font-size: 14px;
  padding: 20px;
}
.alerta_footer {
  border-top: 1px solid white;
  text-align: center;
  padding: 10px;
  font-size: 12px;
}
/* Modificadores */
/*Estilo*/
.alerta--error {
  background-color: indianred;
}
.alerta--advertencia {
  background-color: lightgoldenrodyellow;
}
.alerta--exito {
  background-color: rgb(3, 107, 0);
  color: rgb(224, 224, 224);
}
/* Posición */
.alerta--arriba-izquierda {
  left: 0;
  top: 0;
}
.alerta--abajo-izquierda {
  left: 0;
  bottom: 0;
}
.alerta--arriba-derecha {
  right: 0;
  top: 0;
}
.alerta--abajo-derecha {
  right: 0;
  bottom: 0;
}
```
  Lo que vamos a hacer es cambiar el tipo de alerta que sale con los estilos por defecto, vamos a utilizar las propiedades (tanto *tipo* como *posición*) para agregar un tipo de alerta y una posición.
  Agregamos los atributos tipo y posición en el HTML:
```html
<main>
  <alerta tipo="alerta--exito" posicion="alerta--arriba-derecha"></alerta>
</main>
```
  Le pasamos tipo y posicion, porque son las props definidas en nuestro componente Vue, y estas están bindeadas en el template del componente con *:class*, por lo que lo que hacemos es decirle en el HTML, que clase tiene que aplicar.

### Slots, qué son y qué permiten:

  Puede ser que en cada instancia de la alerta deseemos tener un texto distinto, uno default por si no se especifica nada, y otro para error, exito o advertencia.

  Para costumizar el contenido lo vamos a hacer con slots. Dentro del template, vamos a insertar un slot. Es un punto del template donde se puede asignar el contenido:
```javascript
Vue.component('alerta', {
  props:['tipo', 'posicion'],
  template: `<section class="alerta" :class="[tipo, posicion]">
              <header class="alerta_header">
                CUCU header
              </header>
              <div class="alerta_contenido">
                <slot>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
                </slot>
              </div>
              <footer class="alerta_footer">
                  Footeeerrrrr!!! Silly text
              </footer>
            </section>`,
});
```
  Este slot será el contenido por defecto, pero si en el HTML insertamos un párrafo con un texto, se muetra este párrafo y no el slot. Si no deseamos añadir otro elemento, como en este caso el párrafo, se puede usar la etiqueta template en el HTML:
```html
<main>
  <alerta tipo="alerta--exito" posicion="alerta--arriba-derecha">
    <template> Contenido de la alerta del HTML </template>
  </alerta>
</main>
```
  Estamos creando un punto donde podemos customizar nuestros elementos, pero en este caso tenemos tres puntos, el header y footer. No se pueden añadir más slots, anónimos, por lo que para añadir otros slots hay que nombrarlos en el template:
```javascript
Vue.component('alerta', {
  props:['tipo', 'posicion'],
  template: `<section class="alerta" :class="[tipo, posicion]">
              <header class="alerta_header">
                <slot name="header">
                  CUCU header
                </slot>
              </header>
              <div class="alerta_contenido">
                <slot>
                   Contenido del Slot anónimo
                </slot>
              </div>
              <footer class="alerta_footer">
                <slot name="footer">
                  Footeeerrrrr!!! Silly text
                </slot>
              </footer>
            </section>`,
});
```
  ¿Como podemos acceder al texto del header y del footer para modificarlos? Pues insertando un template en el HTML (o un h1 si lo deseamos, o cualquier elemento que queramos) que tenga un atributo slot donde se le pasa el nombre. Esto hace que lo que haya en ese slot, se renderice por defecto:
```html
<main>
  <alerta tipo="alerta--exito" posicion="alerta--arriba-derecha">
    <template slot="header">  Contenido del HTML. Todo OK </template>
    <template> Contenido de la alerta del HTML </template>
    <template slot="footer">  Contenido del HTML footer  </template>
  </alerta>
</main>
```
  Permite hacer múltiples versiones de nuestro mensaje de alerta. Podemos insertar más componentes vue en el HTML customizados y con su texto por defecto:

```html
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
```
  De esta forma podemos poner texto en el HTML que es el que manda y customizar estilos y texto por defecto en los slots.
  Hemos usado las propiedades para situar la posición y el tipo de mensaje, y con los slots, los estilos y los mensajes.
