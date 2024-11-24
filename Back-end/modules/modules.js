const fs = require('fs');
const path = require('path');

const readApiData = async (dir) => {
    const files = fs.readdirSync(dir); //lee la ruta y la guarda
    let data = []; //lista donde se van a cargar los json a mostrar

    files.forEach(file => {
        const filePath = path.join(dir, file); //ruta de cada archivo json
        const fileContent = fs.readFileSync(filePath, 'utf8'); // Leer el archivo de manera sincrónica    
        data.push(JSON.parse(fileContent)); //Guarda en la lista el contenido como json;
    });
 
    return data;

};
  

//Exportando módulos
module.exports = readApiData;