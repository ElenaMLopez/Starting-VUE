# La instancia Vue


### Crear una instancia de Vue

Cada aplicación Vue comienza creando una nueva instancia Vue con la función Vue:
```javascript
var vm = new Vue ({
  // opciones
})
```
Aunque no está estrictamente asociado con el patrón MVVM, el diseño de Vue fue inspirado en parte por él. Como una convención, a menudo usamos la variable vm (abreviatura de ViewModel) para referirnos a nuestra instancia de Vue.

Cuando creas una instancia de Vue, pasas un objeto de opciones. La mayoría de esta guía describe cómo puede usar estas opciones para crear su comportamiento deseado. Como referencia, también puede explorar la lista completa de opciones en la referencia de la API.

Una aplicación Vue consiste en una instancia raíz Vue creada con el nuevo Vue, opcionalmente organizada en un árbol de componentes anidados y reutilizables. Por ejemplo, un árbol de componentes de una aplicación de tareas pendientes podría verse así:
```
Instancia raíz
└─ TodoList
   ├─ TodoItem
   ├─ To DeleteTodoButton
   └─ To EditTodoButton
   └─ TodoListFooter
      ├─ ClearTodosButton
      └─ TodoListStatistics
```
Hablaremos sobre el sistema de componentes en detalle más adelante. Por ahora, solo ten en cuenta que todos los componentes Vue también son instancias Vue, por lo tanto, acepta el mismo objeto de opciones (excepto por algunas opciones específicas de raíz).

### Datos y métodos

Cuando se crea una instancia de Vue, agrega todas las propiedades encontradas en su objeto de datos al sistema de reactividad de Vue. Cuando los valores de esas propiedades cambian, la vista "reaccionará" y se actualizará para que coincida con los nuevos valores.
```javascript
// Nuestro objeto de datos
var data = {a: 1}

// El objeto se agrega a una instancia de Vue
var vm = new Vue ({
  data: datos
})

// Obtener la propiedad en la instancia
// devuelve uno de los datos originales
vm.a == data.a // => true

// Establecer la propiedad en la instancia
// también afecta los datos originales
vm.a = 2
data.a // => 2

// ... y viceversa
data.a = 3
vm.a // => 3
```

Cuando estos datos cambien, la vista volverá a reproducirse. Se debe tener en cuenta que **las propiedades de los datos solo son reactivas si existieron cuando se creó la instancia**. Eso significa que si agrega una nueva propiedad, como:
```javascript
vm.b = 'hola'
```

Entonces los cambios a b no activarán ninguna actualización de vista. Si sabes que vas a necesitar una propiedad más adelante, pero comienza vacía o inexistente, tendrás que establecer un valor inicial. Por ejemplo:

```javascript
data: {
  newTodoText: '',// de lo contrario NO SERÁ REACTIVA
  visitCount: 0,
  hideCompletedTodos: falso,
  todos: [],
  error: nulo
}
```
La única excepción a esto es el uso de Object.freeze (), que impide que se cambien las propiedades existentes, lo que también significa que el sistema de reactividad no puede rastrear los cambios.
```javascript
var obj = {
  foo: 'bar'
}

Object.freeze (obj)

new Vue ({
  el: '#app',
  data: obj
})
```
```html
<div id = "app">
  <p> {{foo}} </ p>
  <!-- ¡esto ya no actualizará `foo`! -->
  <button v-on: click = "foo = 'baz'"> Cambiarlo </ button>
</ div>
```
Además de las propiedades de los datos, las instancias de Vue exponen una cantidad de propiedades y métodos de instancias útiles. Estos tienen el prefijo $ para diferenciarlos de las propiedades definidas por el usuario. Por ejemplo:
```javascript
var data = {a: 1}
var vm = new Vue ({
  el: '#example',
  data: datos
})

vm. $ data === data // => true
vm. $ el === document.getElementById ('example') // => true

// $ watch es un método de instancia
vm. $ watch ('a', function (newValue, oldValue) {
  // Se llamará a esta devolución de llamada cuando cambie `vm.a`
})
```
En el futuro, puede consultar la [referencia de API](https://vuejs.org/v2/api/#Instance-Properties) para obtener una lista completa de propiedades y métodos de instancia.

###Instance Lifecycle Hooks

Cada instancia de Vue pasa por una serie de pasos de inicialización cuando se crea; por ejemplo, necesita configurar la observación de datos, compilar la plantilla, montar la instancia en el DOM y actualizar el DOM cuando los datos cambian. En el camino, también ejecuta funciones llamadas Instance Lifecycle Hooks (enganches de ciclo de vida), que da a los usuarios la oportunidad de agregar su propio código en etapas específicas.

Por ejemplo, el *gancho* created (creado) se puede usar para ejecutar código después de que se crea una instancia:
```javascript
new Vue ({
  data: {
    a: 1
  },
  created: function () {
    // `this` apunta a la instancia de vm
    console.log ('a es:' + this.a)
  }
})
// => "a es: 1"
```

También hay otros *ganchos* que serán llamados en diferentes etapas del ciclo de vida de la instancia, como **mounted** (montado), **updated** (actualizados) y **destroyed** (destruido). Todos los ganchos de ciclo de vida se llaman con su contexto apuntando a la instancia de Vue invocándolo.

No utilice funciones de flecha en una propiedad de opciones o devolución de llamada, como

```javascript
created: () => console.log (this.a)
```
o
```javascript
vm. $ Watch ('a', newValue => this.myMethod ()) // El contexto de this en las arrow functions no funciona igual
```
Dado que las funciones de flecha están vinculadas al contexto principal, esta no será la instancia de Vue como es de esperar, lo que a menudo da como resultado errores como
```
 UnEdge TypeError: No se puede leer la propiedad undefined o UnSought TypeError: this.myMethod no es una función.
```

### Diagrama del ciclo de vida

A continuación se muestra un diagrama para el ciclo de vida de la instancia. No es necesario comprender completamente todo lo que sucede en este momento, pero a medida que aprendamos y construyamos más, será una referencia útil.

![Lifecycle](lifecycle.png)
El ciclo de vida de la instancia Vue
