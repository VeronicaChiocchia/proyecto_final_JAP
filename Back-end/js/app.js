const express = require('express');
app.use(express.json());
const port = 3000;












app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
  