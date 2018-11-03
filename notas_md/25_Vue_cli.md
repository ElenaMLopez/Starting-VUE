# VUE CLI


Comenzamos a explorar una nueva forma de organizar y estructurar las aplicaciones Vue. Gracias a vue-cli y Webpack a través de [vue-loader](https://vue-loader.vuejs.org/guide/), podemos hacer uso de Single File Componentes, hot-reloading, JavaScript transpiling con Babel y un montón más de beneficios.
La idea es llevar al extremo la idea de componente, encapsular su funcionalidad es un solo archivo. En el van a coexistir estructura, lógica y presentación. Tendrá una extensión .vue

### Instalación:

Se utiliza Vue-cli, una herramienta de consola, con la que se pueden crear diferentes templates de proyectos y más funcionalidades. 

Por otro lado con vue-loader, hace que un archivo con extensión .vue, que tenga el html, la lógica y el estilo en un sólo archivo, y carga webpack que traduce este archivo a algo que el navegador pueda entender. Webpack tiene tambien Bable  que es el que se encargará de transpilar los archivos de ES6 a ES5.

### Instalación:

Acudiendo a la documentación oficial vemos en el apartado [Setting Up a Project](https://vue-loader-v14.vuejs.org/en/start/setup.html) dice que se ha de instalar Vue-cli de forma global.

Luego se inicia un proyecto de vue con 

``` 
vue init webpack-simple <nombre-proyecto> 
```
Instalar las dependencias y para arrancar el servidor, utilizar ```npm run dev```

En resumen y para Vue 1 y 2:
``` 
npm install -g vue-cli
vue init webpack-simple hello-vue
npm install
npm run dev

```

Para Vue 3 seguir las instrucciones que vienen en la [documentación oficial](https://cli.vuejs.org/guide/prototyping.html) y se pude usar hasta una interfaz gráfica o [GUI](https://cli.vuejs.org/guide/creating-a-project.html#using-the-gui). Si bien en esta sección funcionando con la versión 3.0.3 de Vue he usado los comandos descritos anteriormente y ha funcionado sin problema.

### Creando un proyecto. 

Dentro de la carpeta 25_Vue_cli y escribimos:

``` vue init webpack-simple 25-vue-cli ```

Y en la consola se nos preguntan una serie de cuestiones a las que vamos respondiendo, en este caso no voy a usar sass:

```

? Project name 25-vue-cli
? Project description A Vue.js project
? Author elenamlopez <elena.mateos1@gmail.com>
? License MIT
? Use sass? No
```
Carga la plantilla y al rato nos devuelve la siguiente respuesta con el *get started*:
```
   vue-cli · Generated "25-vue-cli".

   To get started:

     cd 25-vue-cli
     npm install
     npm run dev
```
Vemos que ha creado una carpeta nueva en el directorio, navegamos a ella e instalamos dependencias;

```
cd 25-vue-cli
npm install
```

Con esto ya tenemos creado el repositorio donde trabajar, y las dependencias instaladas. Analicemos que es lo que se ha creado.


### Análisis del Scafolding:

Vemos que ha creado un archivo package.json, con las dependéncias de desarrollo y las de "dependencies" normales. Por supuesto las dependecias de desarrollo. También vemos que tiene dos scrips: "dev" y "build". Con dev se lanza un servidor local para el desarrollo con hot-reloading y con "build" se crea la carpeta **dist** para subir a producción donde está el resultado de lo desarrollado ya transpilado, uglificado y sin node-modules.

El archivo webpack.config.js es el que tiene la configuración de webpack:
```javascript
var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
```

El archivo .gitignore ya trae lo que tiene que obiar git por defecto. El archivo .editconfig la codificación utf-8, la sangría por defecto para la edición y demás, y por ultimo el archivo de configuración básica de babel. Todo estos archivos es mejor no tocarlos a no ser que sepamos lo que estamos haciendo. 

Vemos también un archivo index.html que es lo que parece que se va a cargar y que tiene esto dentro:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>25-vue-cli</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="/dist/build.js"></script>
  </body>
</html>
```
En el div con *id="app"* es donde se carga toda la aplicación. Es importante recordarlo un poco más adelante. 

#### Carpeta src

En la carpeta source (src) vemos los archivos **App.vue** y **main.js**. 

El archivo App.vue tiene en primer lugar un area de \<template>, luego la de \<script> (la lógica, que exporta un módulo de ES6) y por último la de \<style> (que se pueden usar estilo globales también).
```html
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
```

En el archivo **main.js** tenemos lo siguiente:

```javascript
import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})
```
Lo primero que hace es cargar vue con el primer import. Lo trae desde la carpetas node modules. También carga App, con lo que se trae lo que hay en ese archivo
Luego crea una nueva instancia con la propiedad *el* para decirle que vaya a **index.html** conde hay un div con el *id="app"* visto anteriormente.

Luego hay una función *render* que hasta ahora no se ha visto que lo que hace es compilar todo lo que haya en el archivo App.vue (estructura, logica y estilo), y se inyecta en donde esté *#app*(nuestro index.html).


De ahora en adelante trabajeremos con Vue-cli.