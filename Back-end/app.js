const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const dir = __dirname;
module.exports = dir; //Exporta ruta base
const cors = require('cors'); // Importar cors

// Aquí importamos los routers
const router = require("./routes/routes");

app.get('/', (req, res) => {
    res.send('¡Servidor funcionando!');
});

// Autorización
const verifyAuthentication = (req, res, next) => {
    const token = req.headers['Authorization'];
    if (token === 'my-secret-token') {
        next();
    } else {
        res.status(401).send('Usuario no autorizado');
    }
};

app.use(verifyAuthentication);

//Evitar errores en el navegador
app.use(cors());
app.get('/favicon.ico', (req, res) => {
    res.status(204).end(); // Responder sin contenido
});


//Llamando a la ruta
app.use("/", router);



app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});