# CURSO DE VUE JS:
[curso](https://wmedia.teachable.com/courses/140226/lectures/2073296)

## Instalación y Databinding:

#### Conceptos clave:

**MODELO**:
  - Fuente de datos

  - Se refleja en diferentes partes de la página web

  - Puede actualizarse

**REACTIVIDAD**:
  - Capacidad de los elementos de la web que representan datos, para actualizarse cuando estos datos cambian

**DATABINDING**:
  - Relación de asociación entre el modelo y los elementos q lo muestran.

**DIRECTIVA**:
  - Atributo de HTML que no forma parte de la especificación oficial, pero que añade 'superpoderes' a
  los elementos HTML. Son atributos "personalizados" que traen la potencia de Vue al HTML.



#### Formas de instalación de VUE:

  Hay varias formas para realizar la instalación:
   1. NPM y sus módulos

   2. CLI

   3. CDN

  Para el primer uso de prueba y ver las bases de VUE se usará CDN.

  Pasos:
   1. Ir a la [página oficial de VUE](https://vuejs.org/v2/guide/installation.html).

   2. En el apartado de CDN copiar esta línea de código:

```html
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
```

   Teniendo la plantilla de HTML:

```html

      <!DOCTYPE html>
      <html lang="en" dir="ltr">
        <head>
          <meta charset="utf-8">
          <title>VUE 1</title>
        </head>
        <body>
          <main>
            <h1 > Hola mundo!</h1>
            <input type="text" name="" value="">
          </main>
          <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
          <script src="main.js" charset="utf-8"></script>
        </body>
      </html>
```
  3. Pegar esta línea de código encima del cierre del body, en primer lugar antes del resto de scripts.

        Una vez hecho esto al visualizar la página en el navegador, se puede abrir la consola y comprobar que efectivamente           se ha importado la librería.
  4. Creamos la instancia de VUE: Creamos un objeto del prototipo de VUE con
  
```javascript

   //Vue.js
   new Vue ({
   });
```
   5. Hemos creado un hijo de Vue, y por ahora va a tener dos propiedades 'el' el elemento que se determinará
   como el 'main' del HTML:
  
```javascript
    // Databinding con VUE:
new Vue({
  // el es el elemnto HTML que queremos bindear. Se accede a lo que esté
  //dentro del elemento 'main'
  el: 'main',
  // Definimos la segunda propiedad: data, que tendrá la fuente de datos a través
  //de modelos, y en este caso tan solo se establece como modelo, 'mensaje' con sus datos:
  data: {
    mensaje: 'Cucú mundo! desde el mensaje de la instancia de Vue' //modelo llamado 'mensaje'
  }
})
```

  6. Luego hay que poner la **directiva** de Vue en el HTML para saber dónde se renderizará el mensaje
  que hemos pasado en 'data'.

```html
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>VUE 1</title>
    </head>
    <body>
      <main>
        <h1 > Hola mundo!</h1>
        <input v-model="mensaje" type="text" name="" value="">
      </main>
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
      <script src="main.js" charset="utf-8"></script>
    </body>
   </html>
```
   7. Podemos ver que está pasando en el modelo, a traves de una **variable de conveniencia** que nos provee
   Vue, puesto que si se cambia el valor en el input, se cambia también en el modelo. El template es con
   {{$data}}, que nos permite ver que pasa en el modelo en tiempo real:
  
```html
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>VUE 1</title>
      </head>
      <body>
        <main>
          <h1 > Hola mundo!</h1>
          <input v-model="mensaje" type="text" name="" value="">
          <pre>{{ $data }}</pre> <!-- Esta es la 'Variable de Conveniencia' -->
        </main>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
        <script src="main.js" charset="utf-8"></script>
      </body>
    </html>
```
{{ $data }} es pues una variable de conveniencia que nos crea y asocia Vue para ver q está
pasando dentro del modelo. Con la etiqueta \<pre\> lo que hacemos es mantener el formato de lo
que nos llega, en este caso un formato JSON. Esta es la forma de tener two-way databinding.

8. Para que lo que se meta en el input cambie lo que hay en el h1, hay que interpolar o introducirlo en
el h1. Para eso, le decimos a Vue que vamos a interpolar, con doble llave de apertura y cierra
{{ }}, y dentro de ellas se pone el nombre del modelo, en este caso mensaje.

```html
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>VUE 1</title>
      </head>
      <body>
        <main>
          <h1 > {{ modelo }} </h1> <!-- Esta es la interpolación del modelo 'mensaje' -->
          <input v-model="mensaje" type="text" name="" value="">
          <pre>{{ $data }}</pre>
        </main>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
        <script src="main.js" charset="utf-8"></script>
      </body>
    </html>
```


### Documentación oficial:
[API](https://vuejs.org/v2/api/)


### Definición de instancia:
[link](https://definicion.de/instancia/)

Las partes de la estructura psíquica capaces de actuar y la copia de una versión ejecutable de un programa informático (software) que se ha escrito en la memoria de una computadora u ordenador reciben asimismo el nombre de instancia.

Más específicamente, dentro del ámbito de la programación orientada a objetos, es posible diseñar un tipo de entidad, asignándole distintas propiedades y funciones, tal y como si se creara un molde para una camisa y se decidiera si tiene bolsillos y, de ser así, cuántos, de qué material debe fabricarse, cuáles serán sus proporciones y en qué situación será apropiado usarla (una reunión informal, una fiesta de gala, etcétera). Si bien es un ejemplo alejado de la informática, al tomar ese molde y confeccionar una camisa a partir de él estaríamos instanciando esa clase de prenda de vestir.

En el mundo real, la camisa ya ha sido creada y tiene un nombre conocido por todos los hispanohablantes; pero en la programación, el desarrollador goza de total libertad a la hora de denominar una creación suya, y los únicos límites serán los impuestos por su creatividad y por la tecnología de la cual disponga. Los videojuegos actuales se desarrollan adoptando el modelo de clases, dado que permite una organización extremadamente compleja, manteniendo un orden y el control sobre cada elemento, que pueden llegar a ser decenas, cientos o miles.

Básicamente, es posible que en un juego de disparos ambientado en el espacio exterior existan distintos tipos de naves enemigas, que en este caso agruparemos por colores para simplificar el ejemplo. Los desarrolladores establecerán, entonces, que existen x cantidad de clases de enemigos, cada uno con sus características y habilidades (tamaño, energía máxima, poder de ataque, nivel de defensa, velocidad, aceleración, tipos de ataque, etcétera), y podrán crear tantos individuos de cada tipo como deseen, siempre dentro del marco de la lógica establecida para el universo del juego.

Por lo tanto, en una determinada sección de un nivel podrían aparecer cinco naves rojas que vuelan hacia el personaje principal y disparan sin piedad; cada una de ellas tendrá las mismas propiedades que el resto, pero es necesario entender que no serán clones, sino más bien hermanas gemelas idénticas.
