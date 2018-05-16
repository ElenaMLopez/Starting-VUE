# Binding (ataduras) de clase y estilo:

Una necesidad común para el enlace de datos es manipular la lista de clases de un elemento y sus estilos en línea. Dado que ambos son atributos, podemos usar v-bind para manejarlos: solo necesitamos calcular una cadena final con nuestras expresiones. Sin embargo, interferir con la concatenación de cadenas es molesto y propenso a errores. Por esta razón, Vue proporciona mejoras especiales cuando v-bind se usa con clase y estilo. Además de las cadenas, las expresiones también pueden evaluar objetos o matrices.

### Clases HTML vinculantes

#### Sintaxis de objetos:

Podemos pasar un objeto a v-bind: class para alternar dinámicamente clases:
```html
<div v-bind: class = "{active: isActive}">
</div>
```
La sintaxis anterior significa que la presencia de la clase activa estará determinada por la **veracidad** de la propiedad de datos isActive.

Puede tener múltiples clases alternadas al tener más campos en el objeto. Además, la directiva v-bind: class también puede coexistir con el atributo de clase simple. Así que dada la siguiente plantilla:
```html
<div class = "static"
     v-bind: class = "{active: isActive, 'text-danger': hasError}">
</div>
```
Y la siguiente información:
```javascript
datos: {
  isActive: cierto,
  hasError: falso
}
```
Hará:
```html
<div class = "static active">
</div>
```

Cuando *isActive* o *hasError* cambian, la lista de clases se actualizará en consecuencia. Por ejemplo, si hasError se convierte en verdadero, la lista de clases se convertirá en "static de text-danger".

El objeto enlazado no tiene que estar en línea:
```html
<div v-bind: class = "classObject">
</div>
```
```javascript
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```
Esto arrojará el mismo resultado. También podemos vincular a una propiedad calculada que devuelve un objeto. Este es un patrón común y poderoso:
```html
<div v-bind: class = "classObject">
</div>
```
```javascript
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```
#### Sintaxis de Array:

Podemos pasar una matriz a v-bind: class para aplicar una lista de clases:
```html
<div v-bind: class = "[activeClass, errorClass]">
</div>
```
```javascript
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```
Que representará:
```html
<div class = "active text-danger"> </div>
```
Si también desea alternar una clase en la lista condicionalmente, puede hacerlo con una expresión ternaria:
```html
<div v-bind: class = "[isActive? activeClass: '', errorClass]"> </div>
```
Esto siempre aplicará errorClass, pero solo aplicará activeClass cuando isActive es verdadero.

Sin embargo, esto puede ser un poco detallado si tienes múltiples clases condicionales. Es por eso que también es posible usar la sintaxis del objeto dentro de la sintaxis de la matriz:
```html
<div v-bind: class = "[{active: isActive}, errorClass]"> </div>
```
