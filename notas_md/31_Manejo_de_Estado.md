# Manejo de Estado con Vue

Vamos a definir el concepto de estado. Utilizaremos el CDN para hacerlo.

Imaginemos que tenemos diferentes componentes o instancias o ambas cosas y deseamos compartir un único punto de verdad para todos ellos. 


### Instancias que comparten estado.

Imaginemos que tenemos dos instancias con sus dos puntos de anclaje para el HTML. Y que tienen un modelo que va a ser un usuario con nombre:
```javascript
new Vue ({
  el: '#app1',
  data: {
    usuario: {
      nombre: 'Juan Andrés'
    }
  }
})

new Vue ({
  el: '#app2',
  data: {
    usuario: {
      nombre: 'Juan Andrés'
    }
  }
})
```
Lo desplegamos en el HTML, y ponemos el nombre en un h1:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Vue.js Estado</title>
</head>
<body>
  <div id="app1"><h1>{{ usuario.nombre }}</h1></div>
  <div id="app2"><h1>{{ usuario.nombre }}</h1></div>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```
Si abrimos la consola, en la Vue Devtools seleccionamos uno de los Root (una de las instancias) y en la consola escribimos ``` $vm0.usuario.nombre = 'juan'``` lo que ocurre es que tan solo cambia uno de ellos, el seleccionado.

Si quisieramos que este modelo fuese compartido, se puede hacer de varias formas, pero con lo que hemos visto hasta ahora puede ser dificil de mantener el día de mañana. Así que pensando que en realidad el modelo es un objeto que es compartido, podemos extrapolar esto a un objeto externo, que sea el que luego se llame en estas instancias. Hay que recordar que este objeto se llama por referencia y no por valor:
```javascript 
const compartido = {
  usuario: {
    nombre: 'Juan Andrés'
  }
}

new Vue ({
  el: '#app1',
  data: compartido,
})

new Vue ({
  el: '#app2',
  data: compartido
})
```
De esta forma podemos cambiar los datos que están dentro del modelo, que es un objeto y al que se puede acceder incluso con la consola poniendo ``` compartido.usuario.nombre ``` y de esta forma cambiar la fuente de verdad en ambas instancias.
Tambien podemos cambiar el estado desde una de las instancias, si utilizamos las dev tools poniendo  ````$vm0.compartido.nombre ```. 

Antes o después vamos a encontrarnos con la situación de manejar y compartir un estado, y por ello el equipo de Vuejs ha creado Vuex, que es un patron, una librería para manejar el estado.


