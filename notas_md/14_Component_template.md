# TEMPLATES EN COMPONENTES

### Opciones para añadir un template a un componente

  No hay duda de que cada componente necesita un plantilla o template para renderizar su contenido. En esta lección te explicaré las opciones que tienes disponibles. La pregunta es, ¿hay alguna mejor?. La respuesta: no. Hay varias opciones para añadir un template a un componente, cúal es la más adecuada dependerá del contexto y la situación.

#### 1ª Inline templating (en el componente del archivo Vue):

  Partimos del siguiente archivo de Vue.js:
```javascript
Vue.component('elegir-ganador', {
  props: ['listado'],
  template: '',
  methods: {
    elegirGanador() {
      let cantidad = this.participantes.length;
      let indice = Math.floor(Math.random() * cantidad);
      this.ganador = this.participantes[indice -1];
    }
  },
  /* El modelo ha de devolver un objeto para que de esta forma los datos que aporta sean SOLO para este componente, creando un Scope propio, aísla los datos que tiene solo para este componente. Es una función que retorna un objeto. Es la forma de hacerlo independiente */
  data() {
    return {
      ganador: false,
      participantes: this.listado
    }
  },
});

new Vue({
  el: 'main',
  data: {
    personas: [
      'Juan', 'Alicia', 'Pedro', 'Javier', 'Marcos'
    ]
  },
});
```
  Tenemos un componente llamado elegir ganador, que lo que hace es tomar los datos del modelo de la instancia principal de Vue y luego realiza un calculo sobre estos datos:

```html
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>VUE 1</title>

  </head>
  <body>
    <main>
      <elegir-ganador :listado="personas"></elegir-ganador>
      <pre> {{$data}}</pre>

    </main>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
    <script src="main14.js" charset="utf-8"></script>
  </body>
</html>
```
  Es importante fijarse que en nuestro componente ```<elegir-ganador :listado="personas"></elegir-ganador>``` está bindeado "personas", es decir, le decimos a Vue que dentro de listado tiene que evaluar lo que trae, buscarlo en algún sitio. En este caso la instancia de Vue.

  Extendamos el template para que quede mejor y añadimos algunos elementos, y hay una cosa a tener en cuenta, los templates de Vue, tan solo pueden tener un ROOT ELEMENT, si se ponen dos dará errores. Por tanto la propiedad template del componente queda así:
```javascript
template: `
            <div>
              <h1> Participantes: </h1>
              <ul>
                <li v-for="persona in listado" v-text="persona">
                </li>
              </ul>
            </div>
          `,
```
  Vamos a mostrar el ganador o los participantes, si no hay ganador se muestran los participantes y si lo hay, se muestra el ganador:
```javascript
template: `
            <div>
              <h1 v-if="ganador"> El ganador es: {{ ganador }}</h1>

              <template v-else>
                <h1> Participantes: </h1>
                <ul>
                  <li v-for="persona in listado" v-text="persona">
                  </li>
                </ul>
              </template>
              <button @click="elegirGanador"> Elegir Ganador </button>
            </div>
          `,
```
  Pero este tamplate tan simple ya está empezando a engrosar mucho el código, si tuviesemos que poner eso en linea sería prácticamente ilegible, por lo que quizás lo interesante sea sacarlo de donde está. ¿Y dónde lo ponemos?

####2ª Template con scripts:

  Otra de las opciones para hacer un template, es llevarlo dentro de un ```<script type="text/template">``` que el navegador no reconoce pero que esté dentro del DOM y asignarle un id para poder llamarlo desde el template del componente.

```html
<body>
  <main>
    <elegir-ganador :listado="personas"></elegir-ganador>
    <pre> {{$data}}</pre>

  </main>
  <script type="text/template" id="elegir-ganador-template">
    <div>
      <h1 v-if="ganador"> El ganador es: {{ ganador }}</h1>

      <template v-else>
        <h1> Participantes: </h1>
        <ul>
          <li v-for="persona in listado" v-text="persona">
          </li>
        </ul>
      </template>
      <button @click="elegirGanador"> Elegir Ganador </button>
    </div>
  </script>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
  <script src="main14.js" charset="utf-8"></script>
</body>
```
  Y dentro del componente de Vue, en la propiedad template, ya tan solo habrá que poner:
```javascript
template: '#elegir-ganador-template'
```
####3ª Template con elemento template en el HTML:

  De hecho en ved de poner un elemento script en el html, podemos poner una etiqueta template con su id y no hace falta nada más.
```html
  <body>
    <main>
      <elegir-ganador :listado="personas"></elegir-ganador>
      <pre> {{$data}}</pre>

    </main>
    <template type="text/template" id="elegir-ganador-template">
      <div>
        <h1 v-if="ganador"> El ganador es: {{ ganador }}</h1>

        <template v-else>
          <h1> Participantes: </h1>
          <ul>
            <li v-for="persona in listado" v-text="persona">
            </li>
          </ul>
        </template>
        <button @click="elegirGanador"> Elegir Ganador </button>
      </div>
    </template>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
    <script src="main14.js" charset="utf-8"></script>
  </body>
```
#### 4ª Opción: Inline Template:

  Mover el template al componente, pero no dentro de la definición del componente vue, sino en el mismo html, dentro de la etiqueta de nuestro componente. Para que esto no de errores, es importante decirle que es un template en linea, porque si no, no entiende de donde tiene que tomar datos ni nada:
```html
<main>
  <elegir-ganador :listado="personas" inline-template>
    <div>
      <h1 v-if="ganador"> El ganador es: {{ ganador }}</h1>

      <template v-else>
        <h1> Participantes: </h1>
        <ul>
          <li v-for="persona in listado" v-text="persona">
          </li>
        </ul>
      </template>
      <button @click="elegirGanador"> Elegir Ganador </button>
    </div>
  </elegir-ganador>
  <pre> {{$data}}</pre>

</main>
```
  El archivo Vue quedará con la propiedad *template* comentada, puesto que no es necesaría así, al haberse determinado el template inline dentro del HTML:
```javascript
Vue.component('elegir-ganador', {
  props: ['listado'],
  //template: '#elegir-ganador-template'
            // `
            //   <div>
            //     <h1 v-if="ganador"> El ganador es: {{ ganador }}</h1>
            //
            //     <template v-else>
            //       <h1> Participantes: </h1>
            //       <ul>
            //         <li v-for="persona in listado" v-text="persona">
            //         </li>
            //       </ul>
            //     </template>
            //     <button @click="elegirGanador"> Elegir Ganador </button>
            //   </div>
            // `
          //  ,
  methods: {
    elegirGanador() {
      let cantidad = this.participantes.length;
      let indice = Math.floor(Math.random() * cantidad);
      this.ganador = this.participantes[indice -1];
    }
  },
  data() {
    return {
      ganador: false,
      participantes: this.listado
    }
  },
});

new Vue({
  el: 'main',
  data: {
    personas: [
      'Juan', 'Alicia', 'Pedro', 'Javier', 'Marcos'
    ]
  },
});
```
  Hay más formas de recibir el template, desde una llamada Ajax hasta alojarlo en servidor, pero estas son las más comunes. Cual se use dependerá del contexto, y eso es lo más importante.
  
