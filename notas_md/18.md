# SCOPED SLOTS:


  Los slots son geniales para re-utilizar partes del template de tus componentes de forma dinámica. Ahora imagina que además de elementos HTML, pudieras incluir referencias al modelo o a la fuente de datos para un mayor nivel de abstracción. Eso es lo que son los [scoped slots](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots) y eso es lo que vamos a hacer ahora.

  Tenemos un componente Vue que tiene lo siguiente:
```javascript
Vue.component('mis-tareas', {
  props:['listado'],
  template: '#mis-tareas-template'
});
new Vue({
  el: 'main',
  data: {
    tareas: [
      { titulo: 'Salir a Patinar'},
      { titulo: 'Llamar a Thomas'},
      { titulo: 'Backlog de proyecto Tedra'},
      { titulo: 'Llevar portadas para firmas'},
      { titulo: 'Avisar en el máster que hoy no voy'},
      { titulo: 'Quedar con Silvia'},
    ],
  }
});
```
  Dentro del HTML, tenemos declarada una instancia de Vue llamada mis-tareas que contiene un template y debajo de main un elemento template que recoge que va a contener nuestro componente Vue.
  Fijándonos en la instancia *mis tareas*, vemos que tiene dentro de su template un atributo scope. Con ese atributo lo que hacemos es decirla a Vue **en dónde tiene que meter los datos que reciba**, y a este espacio lo llamamos *datos*. ¿Y de donde recibe la información de lo que tiene que meter? En el template *mis-tareas-template* le decimos que tiene un atributo title, que luego es el que se utiliza en el li del scope. De esta forma tenemos bindeado title, con el listado de tareas *listado* definido en las props del componente.

```html
<main>
  <mis-tareas :listado="tareas">
    <template scope="datos">
      <li> {{ datos.title }}</li>
    </template>
  </mis-tareas>
</main>

<template id="mis-tareas-template">
  <ul>
    <slot v-for="tarea in listado" :title="tarea.titulo">
  </ul>
</template>
```
  Pensemos que por algún motivo, en alguna ocasión queremos que nuestro componente muestre la lista con un h1 o un icono delante. Y que estas formas se definan en la instancia, es decir que el template sea agnóstico a cómo se quiere representar visualmente el componente. Para eso están los slots.

  *:title*, es una propiedad comodín, es lo que nos permite conectar el slot con la instancia del componente a través del template.
  Luego podemos crear diferentes instancias del componente con diferentes aspectos en el template gracias a los scoped slots:
```html
<main>
  <mis-tareas :listado="tareas">
    <template scope="datos">
      <li> {{ datos.title }}</li>
    </template>
  </mis-tareas>
  <mis-tareas :listado="tareas">
    <template scope="datos">
      <li> 🐱 {{ datos.title }}</li>
    </template>
  </mis-tareas>
  <mis-tareas :listado="tareas">
    <template scope="datos">
      <li><h1> 🐱 {{ datos.title }} </h1></li>
    </template>
  </mis-tareas>
</main>

<template id="mis-tareas-template">
  <ul>
    <slot v-for="tarea in listado" :title="tarea.titulo">
  </ul>
</template>
```
  Pero dentro del template, en realidad da igual lo que tengas, es asnógtico de lo que se va a representar, lo que permite reutilizar el componente como queramos, mucho más personalizable a la hora de representarlo.
  
