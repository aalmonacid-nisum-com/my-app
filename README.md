*No se incluye la carpeta node_modules en git
*Cree dos branch, main como rama principal y DEV donde estoy haciendo las pruebas

# GlobalContext.js
1.- Uso de useState, para manejar el token

# AppNavigator.js
1.- Navegacion y boton cerrar sesion

# routes.js
1.- Rutas del proyecto

# my-app
1.- Uso de EXPO para crear y ejecutar el proyecto<br />
2.- Para el token uso de Context Api, ya que por el tamaño del proyecto me pareció lo más adecuado<br />
3.- LOGIN:
  * Muestro mensaje de error, en caso de error de conección, usuario o login no existe, y en caso de campos obligatorios
  * En caso de que este todo ok paso a la portada de productos
  * Utilización de colores y logos estandar, algo simple y rápido para hacer las pruebas

# Carpetas
  * screen/ : Pantallas de login, LogoutModal, productos y detalle
  * navigation: AppNavigator.js y Routes.js
  * context: manejo de token

# portadaProductos

  * portadaProductos.js: además de mostrar los productos desde la API, agregue un modal para que el usuario confirme que desea cerrar sesion, para esto ocupo el componente generico "Modal" de react, con dos botones: Aceptar y Cancelar.

# detalleProductos

  * detalleProductos.js: muestra el detalle tal como llega desde la API, agregando un botón volver y la modal de cierre de sesión

