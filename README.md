# rokk3r-labs-test

1) npm install
2) Crear en mysql una base de datos que se llame lbprueba
3) Renombrar el archivo server/boot/sample-models.js.temp(quitarle el .temp) para la primera ejecución luego se puede
   volver a renombrar agregandole al final el .temp. Es un script para poblar la base de datos la primera vez.
4) node . ó npm start La app recreará las tablas y la data de prueba automáticamente.
5) Si se va a parar la ejecución y reintentar es importante que el script que llena los datos de prueba,  
   este renombrada a sample-models.js.temp (o cualquier extension que no sea .js).
