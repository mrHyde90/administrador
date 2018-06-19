const express = require("express");
const router = express.Router();
const InstrumentController = require("../controllers/instrument");

//INDEX
router.get("/", InstrumentController.instruments_get_all);

module.exports = router;

