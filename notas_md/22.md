# COMPONENTES DINAMICOS:


Con los [componentes dinámicos de Vue.js](https://vuejs.org/v2/guide/components.html#Dynamic-Components) tenemos un único punto de montaje universal para cualquier cantidad de componentes. De esta forma podemos decidir qué componente está montado en cada momento.

Podríamos utilizar *v-if* o *v-show* para gestionarlo, pero en realidad si lo hacemos así vamos a ensuciar mucho el código y no es necesario. Vue nos provee de una directiva propia para poder manejar el renderizado de componentes que simplifica muchísimo el proceso. El elemento **component**.

### El elemento Component:
  Vamos a verlo de forma práctica. Partimos de un html con una serie de componentes que vamos a querer mostrar o no según se pulsen botones:

```html
<body>
  <main>
    <button type="button"> Lista tareas </button>
    <button type="button"> Contacto </button>
    <button type="button"> Biografía </button>

    <component></component>

    <!-- Esta sería la declaración habitual, pero la dejamos comentada
    tan solo para tenerla como referencia:
    <lista-tareas></lista-tareas>
    <contacto></contacto>
    <bio></bio> -->
  </main>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
  <script src="main22.js" charset="utf-8"></script>
</body>
```
  Dentro del archivo vue, tenemos básicamente los componentes declarados y una muy simple instancia de Vue:
```javascript
Vue.component('lista-tareas', {
  template: `<div>
              <h1> Tareas</h1>
              <ul>
                <tarea v-for="unaTarea in tareas" v-bind:unaTarea="unaTarea"></tarea>
              </ul>
            </div>`,
  data() {
    return {
      tareas: [
        'Finalizar sección Componenetes',
        'Iniciar Workflow con Vue CLI y Webpack',
        'Terminar de ver documentación de Vuex',
        'Jugar con Vue Router',
      ]
    }
  }
});
Vue.component ('tarea', {
  props: ['unaTarea'],
  template: `<li> {{unaTarea}}</li>`
})
Vue.component('contacto', {
  template: '<div> <a href="mailto:cucu@cu.dddrmail"> lalalaa </a> <hr> </div>',
})
Vue.component('bio', {
  template: `      <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </p>
        </div>`
})
// Esta es la mínima instancia de Vue que se puede hacer. Hace referencia
// a un elemento del DOM.
new Vue({
  el:'main',
})
```
  Esto da un error en consola, porque no entiende que significa como tal la directiva ```<component></component>``` no recibe datos de ningún sitio, no sabe que componente tiene que renderizar porque no le hemos pasado ningún nombre de componente.

  Así pues en el modelo de la instancia Vue, lo que hacemos es definir una propiedad, por ejemplo, seleccionado, y la igualamos al componente lista-tareas. Luego con un *@click* agregamos un click handler a los botones que lo que hará será cambiar el valor de esta propiedad en el modelo, seleccionado, para que se iguale al componente que queramos en cada caso:
```html
<body>
  <main>
    <button @click="seleccionado = 'lista-tareas'" type="button"> Lista tareas </button>
    <button @click="seleccionado = 'contacto'" type="button"> Contacto </button>
    <button @click="seleccionado = 'bio'"type="button"> Biografía </button>

    <component :is="seleccionado"></component>
  </main>
```
```javascript
new Vue({
  el:'main',
  data: {
    seleccionado: 'lista-tareas',
  }
})
```
