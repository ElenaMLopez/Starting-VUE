# AJAX CON VUE-RESOURCE

  En algún momento seguramente se necesite consultar una API externa.

  Vue **no incorpora funcionalidad especial utilizar Ajax**. Para cubrir esa necesidad tienes [vue-resource](https://github.com/pagekit/vue-resource), una colección de métodos y bindings (basado en el Promise API) para realizar peticiones HTTP y crear recursos (asociar tareas comunes como verbos HTTP).
  Se puede usar el *fetch* nativo de JavaScript, pero en ese caso se necesitará un polifill para navegadores antiguos.

  En esta lección, se consulta el API de [RandomUser](https://randomuser.me/) para ejemplificar el uso de vue-resource.

  Vue resource es un plugin muy completo y sencillo de usar, basado en le api de promesas, y antes de usarlo es recomendable consultar la configuración del plugin así como el listado de verbos que cubre (que son todos). También tiene una serie de recursos muy buenos.

  Se puede instalar con npm, pero como estamos trabajando con CDN, usaremos el CDN dle plugin y se pone el vínculo debajo del CDN de Vue.js

```html
  <script src="https://cdn.jsdelivr.net/npm/vue-resource@1.5.0"></script>
```
  Vamos a la API de RandomUser y navegamos hasta [Requesting multiple users](https://randomuser.me/documentation#multiple) y dentro de la instancia de Vue.js y usaremos el evento de ciclo de vida mounted, y esta función se arrancará en el momento en el que se ha montado la app, y está lista. En este evento se lanza un método que llamaremos cargarPersonas. Lo que pondremos en este método, como nos dice en la documentación de vue-resources en el apartado *Example*, usando get:
```javascript
const vm1 = new Vue({
  el: 'main',
  // mounted es el evento que intercepta el momento en el que ya se ha montado la app
  mounted(){
    console.log('instancia montada');
      this.cargarPersonas()
  },
  methods: {
    cargarPersonas(){
      this.$http.get('https://randomuser.me/api/?results=50')
        .then((respuesta) =>{
          console.log(respuesta);
        })
    }
  }
});
```
  Una vez nos ha llegado la respuesta, vamos a guardarla en una propiedad del modelo para poder representarlo en la vista.
  Creamos un *data* donde estará un array vacío que es personas. Y el método cargarPersonas:
```javascript
const vm1 = new Vue({
  el: 'main',
  // mounted es el evento que intercepta el momento en el que ya se ha montado la app
  mounted(){
    console.log('instancia montada');
      this.cargarPersonas()
  },
  data: {
    personas:[],
  },
  methods: {
    cargarPersonas(){
      this.$http.get('https://randomuser.me/api/?results=50')
        .then((respuesta) => {
          console.log(respuesta);
          this.personas = respuesta.body.results;
        })
    }
  }
});
```
>
  Usamos **this** entr del *then* de cargar personas, porque dentro de las arrow Functions no modifican el valor del this, sino que usan el del padre, y como estamos un método, y automáticamente hace un proxy Vue a la instancia de Vue en la que nos encontramos.

  Vamos a captar la foto, así que vamos a mostar una foto por cada una de las personas que nos trae:
```html
<main>
  <img v-for="persona in personas"
  v-bind:src="persona.picture.thumbnail"
  alt="Usuario random">
  <hr>
  <pre> {{$data}}</pre>

</main>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-resource@1.5.0"></script>

<script src="main11.js" charset="utf-8"></script>
```
  En este caso, el atributo v-bind se usa para **evaluar** algo, lo que se pone entre comillas no es ya un string, sino una expresión, si no pongo el v-bind (o dos puntos ':')tomaría *persona.picture.thumbnail* como un string. Con los : o el v-bind le decimos a Vue que evalúe lo que hay ahí
  En el atributo alt vamos a poner el nombre:
  ```html
  <main>
    <img v-for="persona in personas"
    v-bind:src="persona.picture.thumbnail"
    :alt="persona.name.first">
    <hr>
    <pre> {{$data}}</pre>

  </main>
```
  Vue-resource lo vamos a utilizar mucho en el resto del curso, así que con la práctica se cogerá soltura. No obstante no se puede decir que no sea sencillo! =)
