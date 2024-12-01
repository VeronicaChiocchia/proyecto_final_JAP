Para iniciar seguir los siguientes pasos:

1) En la terminal escribir "cd Back-end" para posicionarnos en la carpeta del backend.
2) Hacer correr localmente el servidor de MariaDB con user y password correspondientes.
3) En las líneas 8 y 9 del archivo database.js y en las líneas 13 y 14 de app.js reemplazar los valores de user y password por los correspondientes al servidor de MariaDB.
4) En la terminal escribir "node database.js" para crear la base de datos y las tablas.
5) En la terminal escribir "npm run dev" para iniciar el servidor.



Para hacer peticiones con JWT:
1) En el body de la petición:
{
    "username": "admin",
    "password": "admin"
}

2) Realizar el POST a http://localhost:3000/login  
3) Incluir el token recibido en un header con el key 'Authorization', en el campo de value debe ir el token, de esta manera: Bearer 'nrodeltoken'  (sin comillas) ejemplo:

![postman](https://github.com/user-attachments/assets/3f7457a3-4868-4083-bbaf-b78b8829112b)



4) Hacer peticiones GET a /protected/products, /protected/cats, /protected/cart ... etc
5) Para ingresar a la página desde login.html, hacerlo con las credenciales anteriores (en el campo de correo électronico, y contraseña debe ir la palabra 'admin')
