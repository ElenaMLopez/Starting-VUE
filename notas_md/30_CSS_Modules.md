


La [documentación oficial de Vue-loader](https://vue-loader.vuejs.org/guide/css-modules.html), nos dice que CSS es una sistema popular para modularizar y componetizar CSS y que es una alternativa a CSS-Scoped. Y a continuación explica como utilizarlo, pero esto no es demasiada información.

En un [artículo de CSS Tricks](https://css-tricks.com/css-modules-part-1-need/) encontramos una explicación más prolija del asunto. Ahí encontramos la siguiente explicación:

>Archivos CSS en los que todos los nombres de las clases y los nombres de las animaciones tienen un ámbito local de forma predeterminada.

Es decir, es una forma de encapsular el estilo en un comonente y solo para ese componente (como hace scope). Son archivos CSS que se comporta como modulo donde los nombres de clase, estilos o demás son aplicados tan solo de forma local, y para que esto sea así, los nombres son creados de forma dinámica, de forma que solo existen para ese módulo. Requiere de Webpack para generar estos nombres. Veamoslo en acción.

### Creando un módulo de CSS (CSS Module):

Para crear un módulo de Css, tenemos un template básico y en el mismo archivo App.js vamos a crear un módulo de css. Tan solo hay que añadir el atributo *module* en la etiqueta script:


Al agregar el atributo *module* lo que se hace en realidad crear una coputed propertie, que es dinámico y se reevalúa, con el nombre **$style**, y en Vue, todo lo que va precedido de **$** es parte de la instancia principal de Vue, como $data. Es funcionalidad por defecto. Y al añadir *module* lo que hacemos es meter ese estilo en el estilo por defecto de la instancia. 

Y para usarla se utiliza igual que una computed propertie. En este caso class es lo que se bindea puesto que se debe generar dinámicamente, y su valor, le decimos que lo que haya en el estilo de la instancia con .rojo:
```html
<template>
  <h2 :class="$style.rojo"> Hola CSS Module! </h2>
</template>

<script>
export default {
}
</script>

<style module>
  .subrayado {
    text-decoration: underline;
  }
  .rojo {
    color: red;
  }

</style>
```

Se puede usar el object sintax para aplicar diferentes estilos. Creamos en el objeto vue un modelo (en data), y lo bindeamos a class:
```html
<template>
  <h2 :class="{[$style.rojo]: rojo, [$style.subrayado]:subrayado}"> Hola CSS Module! </h2>
</template>

<script>
  export default {
    data() {
      return {
        subrayado: false,
        rojo: true
      }
    },
  }
</script>

<style module>
  .subrayado {
    text-decoration: underline;
  }
  .rojo {
    color: red;
  }
</style>
```
De esta forma podemos ver que la clase aparece con un nombre generado dinámicamente (*_1oP0IoolXFTubQ1_R0sx3q_0 _1R6rh-tNh8Ihsz8P804NC3_0* ). 

Si en las Vue dev tools cambiamos el valor false de surayado por true, vemos como automáticamente cambia a un texto subrayado. Es un estílo dinámico también. Si ponemos en la consola 
```javascript
$vm0.$style.subrayado
// devuelve el nombre dinámico de la clase.
"_1R6rh-tNh8Ihsz8P804NC3_0"
// cambia el valor dinámicamente y subralla el párrafo.
$vm0.subrayado = true
true
```




