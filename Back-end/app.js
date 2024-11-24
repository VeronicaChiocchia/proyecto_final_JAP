const express = require('express');
const app = express();
const port = 3000;
const dir = __dirname;

// Aquí importamos los routers
const router = require("./routes/routes");


app.get('/', (req, res) => {
    res.send('¡Servidor funcionando!');
});

//Obtiene los json
app.use("/", router);


module.exports = dir; //Exporta ruta base


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});