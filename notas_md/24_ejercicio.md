# EJERCICIO: COMPONENTES

Para finalizar este módulo del curso, vamos a poner en práctica algunos de los conceptos aprendidos sobre [componentes en Vue.js](https://vuejs.org/v2/guide/components.html).

### ¿Que hay que hacer?

  Se trara de realizar el siguiente buscador por nombre de empleado con una interfaz de este estilo:
  ![Interfaz](../img/ejercicio1_vue.png)

#### Recursos:
**Axios**: ```<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

**Api Usuarios**: [Random User](https://randomuser.me/) ```https://randomuser.me/api/?results=5000
```
### Pasos seguidos:

  En primer lugar vamos a necesitar un componente usuarios que englobe dentro de si al resto de usuarios. No tomará los datos del modelo de la instancia Vue, si no que los recogerá el mismo, por ello no tiene props. Los datos se recogen en la llamada Ajax en el momento de ser montado el componente:
```javascript
Vue.component('usuarios', {
  template: '<div></div>',
  mounted(){
    axios.get('https://randomuser.me/api/?results=50')
      .then((datos)=> {
        console.log(datos);
      })
  }
});

new Vue({
  el: 'main',
})
```
```html
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>EMPOYER SEARCH</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <main>
      <usuarios>
      </usuarios>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="main24.js" charset="utf-8"></script>
  </body>
</html>
```
  En *datos* recibimos un JSON del que tan solo nos interesan algunas cosas, así que se puede realizar un map sobre éste para sacar la info que nos interesa. Luego en el modelo, se declara la propiedad usuarios, que empieza siendo un array vacío que se rellenará con lo que se retorna en el mounted:
```javascript
mounted(){
  axios.get('https://randomuser.me/api/?results=50')
    .then((datos)=> {
      const listado = datos.data.results.map((usuario) => {
        return {
          nombre: `${usuario.name.title} ${usuario.name.first} ${usuario.last}`,
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
```
  El template lo vamos a crear en el HTML, después de main con su id para llamarlo desde el componente:
```html
<template id="usuarios-template">
  <div>
    <section class="cabecera">
      <slot></slot>
      <input type="search" placeholder="Filtrar Usuario">
    </section>
    <hr>
    <section>
      <p v-for="usuario in usuarios"> {{ usuario }} </p>
    </section>
  </div>
</template>
```
  Esto está muy bien, pero lo suyo sería tener un componente por cada usuario que sea el que tiene dentro de cada uno de los usuarios. Empezamos con el componente:
```javascript
Vue.component('usuario', {
  props:['datos'],
  template: '#usuario-template',
});
```
  Y creamos un template más en el html:
```html
<template id="usuario-template">
  <div class="usuario">
    <img align="left" :src="datos.foto" :alt="datos.nombre">
    <section>
      <h2> {{ datos.nombre }}</h2>
      <small> {{ datos.email }} </small>
    </section>
  </div>
</template>
```

  Ya solo queda hacer el formulario de búsqueda. Para ello vamos a usar una Computed Propertie que hará de filtro, para gestionarlo.
  En el modelo del componente principal, definimos una nueva propiedad que será la palabra buscada, y está inicializada, vacía. Asociamos el input con el modelo mediante *v-model*,  y luego definimos una Computed Propertie que va a filtrar los usuarios.
