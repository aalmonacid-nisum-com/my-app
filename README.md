# my-app
1.- Uso EXPO para realizar mi proyecto<br />
2.- Para el token uso Context Api, ya que me pareció lo más adecuado para un proyecto sencillo, versus Redux<br />
3.- LOGIN:
  * Muestro mensaje de error, en caso de error de conección o usuario o login no existe, y en caso de campos obligatorios
  * En caso de que este todo ok paso a la portada de productos
  * utilizo los colores que están en la portada del sitio con su logo, algo simple y rápido para hacer las pruebas

# Carpetas

A modo general, separo el proyecto en carpetas y archivos para separar el contenido dinamico de lo "fijo" como header y rutas
  * screen/ : Pantallas de login, productos y detalle
  * navigation: cargo AppNavigator.js y Routes.js
  * context: manejo de token

# portadaProductos

  * portadaProductos.js: además de mostrar los productos desde la api, agregue un modal para que el usuario confirme que desea cerrar sesion, para esto ocupo el componente generico "Modal" de react, con dos botones: Aceptar y Cancelar.
  * 

# App.js




