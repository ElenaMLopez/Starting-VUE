# Scoped CSS:

Si pensamos en el ámbito (scope) de las variables en JavaScript, es bastante sencillo entender que significa el scope de CSS en Vue.

Si aplicamos una serie de estilos en un componente sin más, estos estilos se aplican a lo largo de toda nuestra aplicación. Esto no sucede si en el estilo le indicamos que es *scoped*, es decir, que ha de mantenerse encapsulado dentro de ese componente y tan solo se ha de aplicar a él. 

Vamos a ver cómo y por qué es así con un ejemplo sencillo.
NOTA: En este caso y para no repetir código inecesariamente, se continúa con el ejemplo de código anterior "28_Hot_Module_Reloading"..Acudir a esa carpeta para verlo.

### Componente sin scope y con scope en el CSS:

Partiendo del código anterior, imaginemos que dentro de App.js, tenemos una lista de enlaces de esta forma:
