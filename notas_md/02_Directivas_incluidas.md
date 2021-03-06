# DIRECIVAS INCLUIDAS:

### Introducción:  

  Las directivas (atributos que dotan de capacidades extras a elementos HTML) se pueden crear personalizadas, y se verá más adelante;
  pero Vue trae una serie de directivas propias que suelen ser las más utilizadas.
  Una de las directivas más usadas son las directivas de renderizado condicional, es decir una directiva que renderiza o no según
  unas determinadas condiciones que parten del **modelo**.
### Ejemplo de uso:

  1. Partimos de HTML:
```html
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>VUE 1</title>
      </head>
      <body>
        <main>
          <h1 > Estoy conectado</h1>
        </main>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
        <script src="main2.js" charset="utf-8"></script>
      </body>
    </html>
```
  2. Creamos la instancia de Vue, tomando como elemento 'main' y definiendo como modelo de datos 'conectado'
```javascript
  new Vue({
    el: 'main',
    data: {
      conectado: true
    }
  });
```
  Hay que asociar el h1 al modelo, puesto que si no, no va a ocurrir nada. Para ello hay q poner ls
  poner la directiva **v-show**:

```html
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>VUE 1</title>
      </head>
      <body>
        <main>
          <h1 v-show="conectado"> Estoy conectado</h1>
        </main>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
        <script src="main2.js" charset="utf-8"></script>
      </body>
    </html>
```
  Al tener seteado el modelo en *true* el h1 se muestra. si se cambia el modelo a *false* el h1 no aparece en la web,
  pero al inspeccionar en el dom, podemos ver que en realidad lo que ocurre es que el h1 tiene un
  un 'display:none'. Es decir con v-show se muestra o no el elemento bindeado en el DOM.

  3. Eliminar un elemento del DOM puede hacerse también, puede ser interesante que un elemento no aparezca directamente
  en el DOM para que el usuario no pueda acceder a éste con las dev tools del navegador. Y que este elemento aparezca o no según    alguna condición concreta. Para ello Vue tiene una directiva incluida que es **v-if**:
```html
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>VUE 1</title>
      </head>
      <body>
        <main>
          <h1 v-if="conectado"> Estoy conectado</h1>
        </main>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
        <script src="main2.js" charset="utf-8"></script>
      </body>
    </html>
```
  En este caso el elemento desaparece.

  4. ¿Cómo podemos ver la reactividad en este caso? Pues podemos guardar esta instancia en una constante a la que llamaremos vm (por ejemplo), y Vue hace un proxi, asociando las variales del model para poder acceder a ellas desde fuera:

```javascript
  const vm = new Vue({
                el: 'main',
                data: {
                  conectado: true
                }
             });
```
  Ahora en la consola se puede acceder a las propiedades de la constante vm, y setear diferentes valores, poniendo:
  
```javascript
vm.conectado = true; // Seteamos a true el valor del modelo
vm.conectado = false; // Seteamos a false el valor del modelo
```
  5. Otra directiva condicional y siguiendo a javascript sería **else-if** y **else**, para ver el ejemplo declaramos otro modelo en la instancia de Vue que tenemos:

```javascript
  const vm = new Vue({
                el: 'main',
                data: {
                  conectado: true,
                  edad: 44
                }
             });
```
  Y en el HTML creamos un h2 para cada caso:
```html
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>VUE 1</title>
      </head>
      <body>
        <main>
          <h1 v-show="conectado"> Estoy conectado</h1>
          <h2 v-if="edad < 18"> No puedes entrar enano!!! </h2>
          <h2 v-else-if="edad > 200"> Eres inmortal!!! </h2>
          <h2 v-else> Puedes entrar </h2>

          <pre> {{ $data }}</pre>
        </main>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
        <script src="main2.js" charset="utf-8"></script>
      </body>
    </html>
```
  En consola se puede probar con :

```javascript
    vm.edad = 16
    16
    vm.edad = 500
    500
    vm.edad = 30
    30
```
  Es absolutamente automático, es reactivo

  6. **Template v-if**. Imaginemos que queremos que se muestren o no una serie de elementos en base al valor de una condición, para ello se utiliza el elemento \<template\>, que contendrá una serie de elementos a mostrar o no según una serie de condiciones, para ello tomamos el siguiente ejemplo:
```html
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>VUE 1</title>
      </head>
      <body>
        <main>
          <h1 v-show="conectado"> Estoy conectado</h1>
          <h2 v-if="edad < 18"> No puedes entrar enano!!! </h2>
          <h2 v-else-if="edad > 200"> Eres inmortal!!! </h2>
          <h2 v-else> Puedes entrar </h2>
          <!-- Ponemos un elemento template con un v-if que afecta a TODO su contenido -->
          <template v-if="conectado">
            <ul>
              <li> <a href="#"> Elemento 1</a> </li>
              <li> <a href="#"> Elemento 2</a> </li>
              <li> <a href="#"> Elemento 3</a> </li>
            </ul>
          </template>

          <pre> {{ $data }}</pre>
        </main>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
        <script src="main2.js" charset="utf-8"></script>
      </body>
    </html>
```
  Los elementos de la lista tan sólo se muestran cuando conectado es *true*. Puede probarse en consola.
  Se puede asociar un v-else-if a este template, para ello hay que **ponerlo justo debajo** y quedaría de la siguiente forma:
  ```html
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>VUE 1</title>
      </head>
      <body>
        <main>
          <h1 v-show="conectado"> Estoy conectado</h1>
          <h2 v-if="edad < 18"> No puedes entrar enano!!! </h2>
          <h2 v-else-if="edad > 200"> Eres inmortal!!! </h2>
          <h2 v-else> Puedes entrar </h2>
          <!-- Ponemos un elemento template con un v-if que afecta a TODO su contenido -->
          <template v-if="conectado">
            <ul>
              <li> <a href="#"> Elemento 1</a> </li>
              <li> <a href="#"> Elemento 2</a> </li>
              <li> <a href="#"> Elemento 3</a> </li>
            </ul>
          </template>
          <h4 v-else> NO ESTÁS CONECTADO!!!</h4>

          <pre> {{ $data }}</pre>
        </main>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" charset="utf-8"></script>
        <script src="main2.js" charset="utf-8"></script>
      </body>
    </html>
```
  Cambiar el valor de conectado para ver el comportamiento
