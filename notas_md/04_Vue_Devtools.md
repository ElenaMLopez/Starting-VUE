# VUE DEV TOOLS:

  Vue dispone de sus herramientas propias de desarrollo, que conviven con el resto de herramientas de las crhome dev tools como   las [VUE DEV TOOLS](https://github.com/vuejs/vue-devtools), y son especificas pra el desarrollo de app con VUE. Son
  básicamente una extension de Crhome. Siguiendo el enlace que aparece en el repositorio de las Vue ddev tools, podemos adquirir la extension de vue en la Web Store, es gratuita obiamente.
  Puede que una vez instaladas, el icono aparezca deahabilitado, para que esto no sea así, dentro de la configuración de las devtools en la de vue ha de habilitarse el acceso a las urls de archivo.

  una vez aparezca la ta de VUE podemos ver la instancia de Root y la ha asociado a una variable que es $vm0.
  Esto es así, porque en mi instancia de VUE no la he asociado a ninguna variable, por lo que si quiero ver el comportamiento de la reactividad en consola podría poner $vm0.mensaje = 'Hola desde dev toools' y vería por la reactividad como cambia el mensaje que sale en el *h1*
    El código de ejemplo en este caso sería:


```html
  <!DOCTYPE html>
  <html lang="es" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>VUE 1</title>
    </head>
    <body>
      <main>
        <input v-model="mensaje"> {{mensaje}}</input>

        <pre> {{$data}}</pre>
      </main>
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
      <script src="main4.js" charset="utf-8"></script>
    </body>
  </html>
```
  Y el Javascript:

```javascript
  new Vue({
    el: 'main',
    data:{
      mensaje: 'Cucú desde main4.js!',
    }
  })
```
  Desde las dev tools se puede editar el cuerpo de *mensaje* y ver la reactividad.
