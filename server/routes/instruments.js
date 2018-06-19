const express = require("express");
const router = express.Router();
const InstrumentController = require("../controllers/instrument");

//INDEX
router.get("/", InstrumentController.instruments_get_all);

//UPDATE INSTRUMENT BY THE USER
router.put("/:id", InstrumentController.instrument_update);

module.exports = router;

