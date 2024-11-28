const mariadb = require('mariadb');
const fs = require('fs');
const path = require('path');

// Crear el pool de conexiones a MariaDB
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root', // Cambia esto por tu usuario de MariaDB
    password: 'password', // Cambia esto por tu contraseña de MariaDB
    connectionLimit: 5
  });
  
  // Leer el archivo ecommerce.sql para crear base de datos y tablas
  const schemaSQL = fs.readFileSync(path.join(__dirname, 'ecommerce.sql'), 'utf8');
  
  // Función para ejecutar múltiples consultas
  async function executeQueries() {
    let conn;
    try {
      conn = await pool.getConnection();
  
      // Dividir el archivo SQL en consultas individuales usando el punto y coma como delimitador
      const queries = schemaSQL
        .split(';')
        .map(query => query.trim())
        .filter(query => query.length > 0); // Ignorar líneas vacías
  
      // Ejecutar las consultas una por una
      for (const query of queries) {
        await conn.query(query);
      }
      console.log('Base de datos y tablas creadas correctamente.');
    } catch (err) {
      console.error('Error al configurar la base de datos:', err.message);
    } finally {
      if (conn) conn.release(); // Liberar la conexión
      pool.end(); // Cerrar el pool de conexiones
    }
  }
  
  // Ejecutar la función
  executeQueries();

