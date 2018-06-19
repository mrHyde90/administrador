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

exports.instrument_update = (req, res, next) => {
	const restar = req.body.cantidad;
	const id = req.params.id;
	Instrument.findById(id)
	.exec()
	.then(foundInstrument => {
		if(restar <= foundInstrument.cantidad){
			const nuevaCantidad = foundInstrument.cantidad - restar;
			Instrument.update({_id: id}, {$set: {cantidad: nuevaCantidad}})
			.exec()
			.then(result => res.status(200).json({message: "Update successful", exito: true}))
			.catch(err => res.status(500).json({error: err}))
		} else {
			res.status(400).json({message: "La cantidad es menor a lo que se esperaba", exito: false})
		}
	})
	.catch(err => res.status(500).json({error: err}))
};

