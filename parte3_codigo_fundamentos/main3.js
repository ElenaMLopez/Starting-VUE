const vm = new Vue({
  el: 'main',
  data:{
    laborables: ['Lunes', 'Martes','Miércoles','Jueves','Viernes'],
    tareas: [
      {
        nombre: 'Hacer la compra' ,
        prioridad: 'media'
      },
      {
        nombre: 'Aprender Vue y Firebase',
        prioridad: 'Muy Alta'
      },
      {
        nombre: 'Estudiar Node',
        prioridad: 'Alta'
      }
    ],
    persona: {
      nombre: 'Elena',
      profesion: 'dev',
      ciudad: 'Madrid'
    }
  }
})
