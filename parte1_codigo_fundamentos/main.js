// Databinding con Vanilla JavaScript:
//
// var h1 = document.querySelector('h1'),
//     input = document.querySelector('input');
//
// input.addEventListener('keyup', function(){
//   h1.innerHTML = input.value;
// })

// Databinding con VUE:
new Vue({
  // el es el elemnto HTML que queremos bindear. Se accede a lo que esté
  //dentro del elemento 'main'
  el: 'main',
  // Definimos la segunda propiedad: data, que tendrá la fuente de datos
  // y en este caso tan solo se establece como fuente, mensaje con sus datos
  data: {
    mensaje: 'Cucú mundo! desde el mensaje de la instancia de Vue',
    titulo: 'Titulo desde la instacia de vue: Cucú!!!'
  }
})
