# VALIDACIÓN DE PROPIEDADES:

Ya sabemos cómo pasar información a tus componentes a través de propiedades, es muy posible que quieras validar su existencia, su valor, su tipo o incluso ofrecer un valor por defecto.

Para ello, Vue pone a tu disposición un completo sistema de validación de [propiedades en los componentes](https://vuejs.org/v2/guide/components-props.html#Prop-Validation).

### ¿Cómo funcionan las validaciones?

  Partimos de un componente básico y una instancia de Vue, que trae candidatos de la API de axio (que ya hemos visto antes).
  El template del componente lo vamos a declarar en el HTML con el tag template y un id. Así tenemos:

```html
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>VUE 1</title>
  </head>
  <body>
    <main>
      <candidato v-for="candidato in candidatos"
        :nombre="candidato.name.first"
        :mail="candidato.email"
        :imagen="candidato.picture.thumbnail">

      <pre> {{$data}}</pre>
    </main>
    <template id="candidato-template">
      <blockquote>
        <img src="imagen" align="right" alt="nombre">
        <h1> {{ nombre }}</h1>
        <h2> {{ mail }}</h2>
        <hr>
      </blockquote>
    </template>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
    <script src="main16.js" charset="utf-8"></script>
  </body>
</html>
```
  Y en nuestro archivo Vue:
```javascript
Vue.component('candidato', {
  props: ['nombre', 'mail', 'imagen'],
  template: '#candidato-template',
})

new Vue({
  el: 'main',
  mounted() {
    this.obtenerCandidatos();
  },
  data: {
    candidatos: [],
  },
  methods: {
    obtenerCandidatos() {
      axios.get('https://randomuser.me/api/?results=50')
        .then((respuesta) => {
          this.candidatos = respuesta.data.results;
        });
    }
  }
})
```
  Ahora lo que queremos es realizar algún tipo de validación, y para ello lo primero que hay que hacer es pasar las propiedades como un objeto, de esta forma, a estas propiedades podemos asignarles otras propiedades que nos permitirán realizar validaciones:
```javascript
Vue.component('candidato', {
  // props: ['nombre', 'mail', 'imagen'],
  props: {
    nombre: String,
    mail: String,
    imagen: String,
  },
  template: '#candidato-template',
})
```
  De esta forma si por algún motivo, algo de lo que nos llega no cumple el tipo definido, Vue lanzará un error en consola que dice lo siguiente:

  >vue.js:597 [Vue warn]: Invalid prop: type check failed for prop "nombre". Expected String, got Number.

### Otros tipos de validaciones:

  Imaginemos que a parte de decirle el tipo (nativo) de dato que vamos a recibir, queremos decirle que es requerido, o que tenga alguno por defecto... En ese caso, para cada propiedad creamos un objeto y le pasamos todas las características que deseemos:
```javascript
Vue.component('candidato', {
  // props: ['nombre', 'mail', 'imagen'],
  props: {
    nombre: {
      type: String,
      required: true;
    },
    mail: {
      type: String,
      required: false,
      default: 'mail.defaul@default.com'
    },
    imagen: String,
  },
  template: '#candidato-template',
})
```
  De esta forma, si en el HTML ahora quitas por ejemplo *:mail* saldrá por defecto el mail indicado.

  Si por algún motivo no queremos indicar el tipo de lo que nos llegue, puede setearse la propiedad a **null**.

### Recorrer un objeto que nos llega como dato del modelo:

  ¿Y si lo que nos llega es un objeto? Dentro del JSON de la API que estamos usando de ejemplo, hay un apartado que es localización y es como sigue:
```JSON
"location": {
       "street": "1861 jan pieterszoon coenstraat",
       "city": "maasdriel",
       "state": "zeeland",
       "postcode": 69217
     },
```
  Vamos a tomar el caso de que nos interese mostrar todo el contenido de location en nuestra web, con un formato de lista.
```html
<main>
  <candidato v-for="candidato in candidatos"
    :nombre="candidato.name.first"
    :mail="candidato.email"
    :imagen="candidato.picture.thumbnail"
    :location="candidato.location">

  <pre> {{$data}}</pre>
</main>
<template id="candidato-template">
  <blockquote>
    <img src="imagen" align="right" alt="nombre">
    <h1> {{ nombre }}</h1>
    <h2> {{ mail }}</h2>
    <ul>
      <li v-for="(value, key, index) in location"> {{ value }} </li>
    </ul>
    <hr>
  </blockquote>
</template>
```
  Y en el archivo de Vue, de momento tan solo es necesaro declarar la propiedad y decirle el tipo:
```javascript
Vue.component('candidato', {
  // props: ['nombre', 'mail', 'imagen'],
  props: {
    nombre: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: false,
      default: 'mail.defaul@default.com'
    },
    imagen: String,
    location: Object,
  },
  template: '#candidato-template',
})
```
  Y si llegado el caso queremos que en este tipo (objeto) de propiedad haya un valor por defecto, pasamos un objeto con el tipo y en ved de unos valores por defecto, hemos de pasar una función que nos retorna un objeto por defecto:
```javascript
Vue.component('candidato', {
  // props: ['nombre', 'mail', 'imagen'],
  props: {
    nombre: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: false,
      default: 'mail.defaul@default.com'
    },
    imagen: String,
    location: {
      type: Object,
      default() {
        return {
          ciudad: 'Copenague',
        }
      }
    },
  },
  template: '#candidato-template',
})
```
  Se recomienda leer la parte de propiedades de la [documentación oficial](https://vuejs.org/v2/guide/components-props.html#Prop-Validation).
