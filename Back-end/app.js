const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const dir = __dirname;
module.exports = dir; //Exporta ruta base
const cors = require('cors'); // Importar cors
const jwt = require('jsonwebtoken');

const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root', // Cambia esto por tu usuario de MariaDB
    password: '1234', // Cambia esto por tu contraseña de MariaDB
    connectionLimit: 5
});

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

app.post("/cart", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('USE ecommerce_jap')
        const response = await conn.query("INSERT INTO cart(product_id, name, quantity, total_price) value (?, ?, ?, ?)", 
            [req.body.product_id, req.body.name, req.body.quantity, req.body.total_price]);
        // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
        
        res.json({id: parseInt(response.insertId), ...req.body})
    
    } catch (error) {
        res.status(500).json({message: "No se pudo cargar la información"})
    } finally {
        if (conn) conn.release();
    }
})
