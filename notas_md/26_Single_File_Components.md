# Single File Components:


Es el momento de familiarizarnos con la estructura y funcionamiento de los *Single File Components* de Vue, que encampsulan en un solo archivo la estructura, logica y estilo. Dentro de la [documentación oficial del Single File Components](https://vuejs.org/v2/guide/single-file-components.html#ad) hay dos puntos a destacar: 

1. ¿Por qué es interesante?
No ha nada malo en usar Vue.component para proyectos pequeños o medianos, como hemos hecho hasta ahora, creando una instancia de Vue con Vue.component, pero puede traer problmas cuando tenemos un proyecto más grande una *simple page application* (spa), por ejemplo, donde ha de hacerse definiciones globales. 
2. ¿Qué pasa con la separación de responsabilidades?
Lo que nos contesta es que aunque estemos acostumbrados al modelo vista controlador (mvc), no es lo mismo separar archivos que separar responsabilidades. 

En realidad está todo mezclado, pero pertenece todo a una unica responsabilidad, y todos los componentes tienen su responsabilidad propia. 

Veamoslo con un ejemplo.

### Crear un Single File Component con Vue-cli

Para empezar, creamos el proyecto 26-single-file-component con la plantilla webpack-simple:

```bash
vue init webpack-simple 26-single-file-component
cd 26-single-file-component
npm install
npm run dev
```
Vamos al archivo App.js y lo borramos todo dejándolo así:
```html
<template>
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>

<style>
</style>
```

Hemos quitado la estructura, el modelo y nombre dentro de la lógica, y los estilos, con lo que ya no vemos nada dentro del navegador aunque sí que funciona. 

Ahora vamos a poner dentro del template lo que queremos cargar, que es el componente \<persona>\</persona> y que va a instanciar los datos de una persona sacada de Random User. 
```html
<template>
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>

<style>
</style>
```

Para crear el componente lo primero que hay que hacer es crear el directorio components dentro de la carpeta src. Y dentro de esta carpeta creamos el archivo *Persona.vue*. 

Dentro de este archivo la estructura va a ser igual que la de App.vue, puesto que es un componente. 
```html
<template>
</template>

<script>
</script>

<style>
</style>
```
En la lógica se exporta por defecto, y lo que necesitamos en este caso, es que exporte la información de una persona, que vamos a recoger de una api con axios. 
```html
<template>
</template>

<script>
  export default {
  
  }
</script>

<style>
</style>
```

Axios se puede utilizar desde un CDN, pero ya que estamos con módulos, pues lo mejor es instalarlo como un módulo más con: 
```bash
npm install -S axios
```

En este caso se ha instalado como una dependencia con *-S* (no solo en desarrollo ).

¿Que hemso estado haciendo hasta ahora? Pues importar lo que necesitamos para la lógica del componente (como en main.js se importa Vue por ejemplo), así que en Persona.vue, que es el componente que va a traer la información de la api, importamos Axios para que pueda utilizarlo:

```html
<script>
  import axios from 'axios';

  export default {

  }
</script>
```
Como es un componente Vue normal, tenemos a disposición todas las características que hemos visto hasta ahora. Por lo que puedo utilizar el evento de mounted() para realizar la llamada Ajax, para traer una unica persona:
```html
  <script>
  import axios from 'axios';

  export default {
    mounted() {
      axios.get('https://randomuser.me/api/')
        .then((respuesta) => {
          this.persona = respuesta.data.results[0];
        })
    }
  }
</script>
```
En el then de la llamada, una vez obtiene la respuesta, se solicita tan solo la primeta posición del JSON, puesto que tan solo queremos una persona, así pues creamos una propiedad en el modelo con ``` this.persona = respuesta.data.results[0]```. Ahora vamos a crear el modelo, así que en data, retornamos persona inicializado con null. De esta forma declaramos el modelo persona, que en el mounted se rellenará con los datos recibidos:

```html
<script>
  import axios from 'axios';

  export default {
    mounted() {
      axios.get('https://randomuser.me/api/')
        .then((respuesta) => {
          this.persona = respuesta.data.results[0]
        })
    },
    data() {
      return{
        persona: null,
      }
    },

  }
</script>
```

Una vez reciba la información se asocia a la propiedad del modelo, pero quiero hacer una trasnformación con ella. De todas las propiedades que me llegan, no me interesa toda la información, si no tan solo parte de ella. Para hacer eso creamos una *computed propertie*, que recogerá tan solo lo que me interesa de la respuesta. Esta computed se va a llamar datosPersona y va a traer nombre y apellido, el email y la foto grande de la persona:
```html
<script>
  import axios from 'axios';

  export default {

    mounted() {
      axios.get('https://randomuser.me/api/')
        .then((respuesta) => {
          this.persona = respuesta.data.result[0];
        })
    },
    data() {
      return {
        persona: null,
      }
    },
    computed:{
      datosPersona() {
        return {
          nombre: `${this.persona.name.first} ${this.persona.name.last}`,
          foto: this.persona.picture.large,
          correoe: this.persona.email
        }
      }, 
    }
  }
</script>
```

Ahora lo que quiero es mostrar en el template del componente los datos que me han llegado, para lo cual lo primero crearé un *div* que contendrá todo lo demás como elemento root del componente. 
En este caso habrá dos estados, uno que tiene información cuando recibimos los datos y otro que no tiene datos puesto que los datos de la persona pueden tardar en llegar. Para ello utilizaremos un *v-if*:
```html
<template>
  <div>
    <template v-if="persona">
      <h1 v-text="datosPersona.nombre"></h1>
      <h2 v-text="datosPersona.correoe"></h2>
      <img :src="datosPersona.foto" alt="foto usuario">
    </template>
  </div>

</template>

<script>
  import axios from 'axios';

  export default {
    mounted() {
      axios.get('https://randomuser.me/api/')
        .then((respuesta) => {
          this.persona = respuesta.data.results[0];
        })
    },
    data() {
      return {
        persona: null,
      }
    },
    computed: {
      datosPersona() {
        return{
          nombre: `${this.persona.name.first} ${this.persona.name.last}`,
          foto: this.persona.picture.large,
          correoe: this.persona.email,
        }
      }
    },
  }
</script>

<style>
</style>
```

Dentro de la *computed property* definimos la función datosPersona, que toma de persona (almacenado en data y con lo que ya tiene tras el mounted) lo que nos interesa, y es esto lo que usaremos en el template, por lo que con **datosPersona.nombre**,por ejemplo, renderizamos sólo lo que se ha definido en la computed. Si quisieramos más datos tan solo tendríamos que definirlos en computed y luego insertarlos en el template.

Si intentamos ejecutar esto ahora va a dar un error, y esto es porque en realidad nos falta una cosa, llevar nuestro nuevo componente al componente principal, el que reune todo,que ahora mismo no tiene ninguna referencia de que este componente existe.

Vamos a App.vue e importamos nuestro nuevo componente, en la sección de la lógica:

```html
<template>
  <div>
    <!-- Podemos poner todos los que queramos -->
    <persona></persona>
  </div>
</template>

<script>
  import persona from './components/Persona.vue';

  export default {
    components: {
      persona
    },
    data () {
      return { }
    }
  }
</script>

<style>
</style>
```

Al registrar el componente persona, si no no estoy diciendo a esta instancia que tiene acceso a este componente. Esto se hace definiendo la sección *components* que nos da un objeto, que tiene dentro todos los componentes que se estén utilizando en la instancia (y que van a ser exportados a ese *div* con id="#App" del archivo index.html). 

En la parte del template, y dentro de un *div* que será root, ponemos nuestra directiva. Puede ponerse varias veces, puesto que lo que hacemos con cada una de ellas es incrustar nuestro componenete perfectamente funcional e independiente.

Tan solo queda ya una cuestión. Hemos usado un template en nuestro componente para cuando se recibe la información, pero ¿Y si aun no ha llegado? para ese caso vamos a usar *v-else* y dentro de esto un simple mensaje diciendo algo, puede ponerse un spiner o lo que sea. El archivo del componente persona quedaría finalmente así:
```html
<template>
  <div>
    <template v-if="persona">
      <h1 v-text="datosPersona.nombre"></h1>
      <h2 v-text="datosPersona.correoe"></h2>
      <img :src="datosPersona.foto" alt="foto usuario">
    </template>
    <template v-else> Cargando persona.....</template>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    mounted() {
      axios.get('https://randomuser.me/api/')
        .then((respuesta) => {
          this.persona = respuesta.data.results[0];
        })
    },
    data() {
      return {
        persona: null,
      }
    },
    computed: {
      datosPersona() {
        return{
          nombre: `${this.persona.name.first} ${this.persona.name.last}`,
          foto: this.persona.picture.large,
          correoe: this.persona.email,
        }
      }
    },
  }
</script>

<style>
</style>
```

