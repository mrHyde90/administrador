const mongoose = require("mongoose");
const Instrument = require("../models/instrument");

exports.instruments_get_all = (req, res, next) => {
	Instrument.find({})
	.exec()
	.then(findInstruments => {
		const newInstruments = findInstruments.map(foundInstrument => {
			return {
				_id: foundInstrument._id,
				name: foundInstrument.name,
				instrumentImage: foundInstrument.instrumentImage,
				categories: foundInstrument.categories,
				cantidad: foundInstrument.cantidad,
				created_at: foundInstrument.created_at
			}
		});
		res.status(200).json(newInstruments);
	})
	.catch(err => res.status(500).json({error: err}))
};