const express = require('express');
const app = express();
const port = 8008;
const fs = require('fs');
const dir = __dirname;
module.exports = dir; //Exporta ruta base
const cors = require('cors'); // Importar cors
const jwt = require('jsonwebtoken');

// Aquí importamos los routers
const router = require("./routes/routes");

app.get('/', (req, res) => {
    res.send('¡Servidor funcionando!');
});

// Autorización
app.use(express.json());
app.use(cors());

// Clave secreta para JWT
const JWT_SECRET = 'clavesecreta';

// Usuario de prueba 
const USER = {
    username: 'admin',
    password: 'admin'
};

// Middleware para verificar el token
const authenticateToken = (req, res, next) => {
    // Obtener el header de autorización
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // Verificar el token
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }
        req.user = user;
        next();
    });
};

// Ruta de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verificar credenciales
    if (username === USER.username && password === USER.password) {
        const token = jwt.sign(
            { username: USER.username },
            JWT_SECRET
        );

        res.json({ token });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
});

// Ruta protegida
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: '¡Acceso permitido al contenido protegido!' });
});

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