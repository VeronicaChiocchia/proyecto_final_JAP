const express = require("express");
const router = express.Router();
const {getApiData} = require("../controllers/controllers"); // Importar los controllers necesarios


//Rutas con métodos
router.get("/:fileName", getApiData);

// contactsRouter.get("/:id", contactsController.getContactById);

// contactsRouter.post("/", contactsController.addContact);

// contactsRouter.put("/:id", contactsController.updateContact);

// contactsRouter.delete("/:id", contactsController.deleteContact);

//Exportando módulo
module.exports = router;