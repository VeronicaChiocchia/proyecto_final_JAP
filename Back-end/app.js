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

app.use(cors());

app.get('/favicon.ico', (req, res) => {
    res.status(204).end(); // Responder sin contenido
});

app.use("/", router);



app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});