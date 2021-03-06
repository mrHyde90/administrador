const express = require("express");
const router = express.Router();
const CheckAuth = require("../middleware/check-auth");
const InstrumentController = require("../controllers/instrument");

//INDEX
router.get("/", InstrumentController.instruments_get_all);

//INDEX CATEGORIES
router.get("/categories", InstrumentController.instrument_categories);

//CREATE INSTRUMENT
router.post("/", CheckAuth.checkAdmin, InstrumentController.instrument_create);

//DELETE INSTRUMENT
router.delete("/:id", CheckAuth.checkAdmin, InstrumentController.instrument_delete);

//INCREASE INSTRUMENT
router.put("/increase/:id", CheckAuth.checkAdmin , InstrumentController.increase_instrument);

//UPDATE INSTRUMENT BY THE USER
router.put("/decrease/:id", CheckAuth.checkAdmin, InstrumentController.decrease_instrument);

//UPDATE ALL INSTRUMENT
router.put("/:id", CheckAuth.checkAdmin , InstrumentController.instrument_update);

//GET INSTRUMENT
router.get("/:id", CheckAuth.checkAdmin, InstrumentController.instrument_show);

module.exports = router;

