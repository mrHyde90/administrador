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

//UPDATE ALL INSTRUMENT
router.put("/update-all/:id", CheckAuth.checkAdmin , InstrumentController.instrument_good_update);

//UPDATE INSTRUMENT BY THE USER
router.put("/:id", CheckAuth.checkAdmin, InstrumentController.instrument_update);

//GET INSTRUMENT
router.get("/:id", CheckAuth.checkAdmin, InstrumentController.instrument_show);

module.exports = router;

