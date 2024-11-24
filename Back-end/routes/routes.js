const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers"); // Importar los controllers necesarios


//Rutas con métodos
router.get("/:fileName", controllers.getApiData);

router.get("/:fileName/:id", controllers.getApiDataById);

// contactsRouter.post("/", contactsController.addContact);

// contactsRouter.put("/:id", contactsController.updateContact);

// contactsRouter.delete("/:id", contactsController.deleteContact);

//Exportando módulo
module.exports = router;