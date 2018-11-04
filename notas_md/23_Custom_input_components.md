# INPUTS PERSONALIZADOS:


  La directiva v-model no funciona como quizás esperes dentro de un componente. Sabiendo qué significa v-model realmente, podemos crear [componentes personalizados con inputs](https://vuejs.org/v2/guide/components-custom-events.html#Binding-Native-Events-to-Components) que se validan y procesan de forma autónoma.

  Con la directiva v-model realizamos un *two way databinding*, podemos por ejemplo podemos asociar el modelo de una directiva Vue a un input:
```html
  <body>
    <main>
      <input v-model="contraseña" type="text">
    </main>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
    <script src="main23.js" charset="utf-8"></script>
  </body>
```
```javascript
new Vue({
  el:'main',
  data: {
    contraseña: 'LaContraseña',
  }
})
```
  Lo que se puede hacer también es encapsular la lógica en el componente sin tener que acudir a la instancia principal. Es decir, se escribe en el componente y el mísmo tiene toda la lógica en sí mismo, de forma que a la instancia principal con mucho se tiene que acceder en la inicilialización:
```html
<main>
  <!-- <input v-model="contraseña" type="text"> -->
  <contrasena> </contrasena>
</main>
```
```javascript
Vue.component ('contrasena', {
  props: ['contrasena'],
  template: `<div>
              <label for="miInput"> Contraseña </label>
              <input id="miInput" type="text" v-model="contrasena">
            </div>`,
});
new Vue({
  el:'main',
  data: {
    contrasena: 'LaContraseña',
  }
})
```
  Pero si lo dejamos así, al ser un binding en dos direcciones, si intentamos cambiar la contraseña, apuntamos al modelo, y esto **no se debe hacer**, de hecho Vue se va a quejar con un error de que no se deben mutar las propiedades. Para solucionarlo. Se pueden usar eventos o computed properties.

### ¿Qué es realmente *v-model*?

  Es una *sugar sintax*, una forma más sencilla de hacer lo siguiente, hacer una evaluación del valor de contraseña, y su propagación en caso de que cambie.

  Por tanto este *v-model* lo que hace en realidad son dos cosas, el bindeo al valor de la propiedad contraseña y su modificación, es decir ``` <input type="text" v-model="contrasena"> ``` es equivalente a ```<input :value="contrasena" @input="contrasena = $event.target.value">``` donde ```@input="$event.target.value"``` se compone de lo siguiente:
    1. *@input* es un evento que remite a lo que haga un input

      Y lo que hace es decir que contrasena es igual a:

    2. *$event* es una propiedad de cortesía para acceder a la información del evento.
    3. *target.value* es el valor que esté en el input.

    Pero además en nuestro caso, lo que queremos es que, al actualizar el valor del input, este valor se propague, haga algo, y para ello lo que vamos a hacer es asociar al evento ```@input``` un método, y una propiedad que es *ref*, donde se asigna una referencia para luego usarla en el método que hagamos. Queda así:
```javascript
Vue.component ('contrasena', {
  props: ['contrasena'],
  template: `<div>
              <label for="miInput"> Contraseña </label>
              <input ref="pass" id="miInput" :value="contrasena" @input="comprobarContrasena($event.target.value)">
            </div>`,
  methods: {
    comprobarContrasena(contrasena) {
      if(this.noValidas.includes(contrasena)) {
        //$refs es la forma de buscar la propiedad ref del input
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
```
  En data damos una serie de contraseñas nó validas, y en el método comprobamos que no se ha escrito ninguna de ellas, y en caso de que sí, la vacía.
