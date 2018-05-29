# COMPONENTES DENTRO DE COMPONENTES:

Se pueden instanciar componentes desde otros componentes, y no hay restricción alguna en esta técnica, así que todo depende del contexto y del proyecto. En esta lección veremos un caso sencillo.

### Crear componentes dentro de otros.

  Creamos una instancia Vue con un lista de datos llamada tareas:
```javascript
new Vue({
  el:'main',
  data: {
    tareas: [
      {'Finalizar sección Componenetes'},
      {'Iniciar Workflow con Vue CLI y Webpack'},
      {'Terminar de ver documentación de Vuex'},
      {'Jugar con Vue Router'},
    ]
  }
})
```
  Haremos un componente para el listado general de la tareas, y otro para cada una de estas tareas:
  Empezamos con el componente que será el contenedor de todas las tareas:
```javascript
Vue.component('lista-tareas', {
  props: ['tareas'],
  template: `<div>
              <h1><slot></slot></h1>
              <ul>
                <tarea></tarea>
              </ul>
            </div>`
});
```
  En este componente, dentro de props irán todas las tareas, y en su template, insertamos otro componente llamado *tareas* que será un componente que recoge cada una de éstas:
```javascript
Vue.component ('tarea', {
  props: ['unaTarea'],
  template: `<li> {{unaTarea}}</li>`
})
```
  Y ahora este nuevo  componente lo instanciamos en el componente lista-tareas:
```javascript
Vue.component('lista-tareas', {
  props: ['tareas'],
  template: `<div>
              <h1><slot></slot></h1>
              <ul>
                <tarea v-for="unaTarea in tareas" v-bind:unaTarea="unaTarea"></tarea>
              </ul>
            </div>`
});
```
  De la misma forma que en el HTML instanciaremos el componente lista-tareas:
```html
<main>
  <lista-tareas :tareas="tareas" >
    Tareas que tengo que hacer ya!
  </lista-tareas>
  <pre>{{ $data }}</pre>
</main>
```

  De esta forma es como anidamos componentes dentro de componentes.
  Con el texto insertado en el HTML *Tareas que tengo que hacer ya!* lo que hacemos es insertarlo en el slot definido dentro del componente lista-tareas.
