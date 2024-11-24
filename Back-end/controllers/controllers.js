const path = require('path');
const readApiData = require('../modules/modules'); // Importar el módulo
const dir = require("../app"); //Importar ruta base




//Respuesta a obtener un Api
const getApiData = async (req, res) => {
  const { fileName } = req.params; // Extraer el nombre del archivo desde la URL
  const folderPath = path.join(dir, 'json', fileName); // Ruta de la carpeta que contiene los json
  const jsonFiles = await readApiData(folderPath); // Obtener los archivos json utilizando el módulo
  res.json(jsonFiles); // Enviar los archivos JSON como respuesta

};

//Exportando modulos
module.exports = {getApiData};