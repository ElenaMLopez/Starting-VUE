# AJAX CON AXIOS


Aunque como has podido comprobar, vue-resource es una gran solución para utilizar Ajax con Vue, la recomendación oficial del creador de Vue.js, [Evan You](https://medium.com/the-vue-point/retiring-vue-resource-871a82880af4) es la librería Axios.

Evan You no considera que las llamadas AJAX deban venir implementadas en el framework y recomienda el uso de la librería [Axios](https://github.com/axios/axios) para hacerlas.

La mecánica es muy similar por lo que utilizaremos el código del último capítulo directamente.

De hecho, con un pequeño truco, se pueden intercabiar las API's :)

Vamos a seguir trabajando con el CDN, por lo que en el HTML y después del script de Vue.js ponemos el vínculo a la librería:
```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

Y vemos que tenemos que poner en el Vue.js:
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
      // this.$http.get('https://randomuser.me/api/?results=50')
      //   .then((respuesta) => {
      //     console.log(respuesta);
      //     this.personas = respuesta.body.results;
      //   })
      axios.get('https://randomuser.me/api/?results=50')
        .then((respuesta) => {
          console.log(respuesta);
        })
    },
  },
});
```

  La diferencia básica es que ahora la información no aparece en body, sino en data, por lo que:
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
      // this.$http.get('https://randomuser.me/api/?results=50')
      //   .then((respuesta) => {
      //     console.log(respuesta);
      //     this.personas = respuesta.body.results;
      //   })
      axios.get('https://randomuser.me/api/?results=50')
        .then((respuesta) => {
          console.log(respuesta);
          this.personas = respuesta.data.results;
        })
    }
  }
});
```

¿Cual es el truco para que podamos usar el código usado en Vue-resource con Axios?
Dentro del archivo de Vue.js podemos poner al principio una modificación del prototype de Vue:

```javascript
Vue.prototype.$http = axios;
```
Con esto ya podemos usar el código creado para Vue-resource, pero importando la librería Axios.
