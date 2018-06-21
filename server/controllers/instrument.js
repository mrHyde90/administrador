const mongoose = require("mongoose");
const Instrument = require("../models/instrument");


exports.instrument_categories = (req, res, next) => {
	const pageSize = +req.query.pageSize;
	const currentPage = +req.query.page;
	const categoria = req.query.categoria;
	let fetchedIntruments;
	const instrumentQuery = Instrument.find({categories : categoria});

	if(pageSize && currentPage ){
		instrumentQuery
			.skip(pageSize * (currentPage - 1))
			.limit(pageSize);
	}

	instrumentQuery.then(documents => {
		fetchedIntruments = documents;
		return Instrument.count({categories : categoria});
	})
	.then(count => {
		const newInstruments = fetchedIntruments.map(foundInstrument => {
			return {
				_id: foundInstrument._id,
				name: foundInstrument.name,
				instrumentImage: foundInstrument.instrumentImage,
				categories: foundInstrument.categories,
				cantidad: foundInstrument.cantidad,
				created_at: foundInstrument.created_at
			}
		});
		res.status(200).json({
			instruments: newInstruments,
			maxInstruments: count
		});
	})
	.catch(err => res.status(500).json({error: err}))
}

exports.instruments_get_all = (req, res, next) => {
	const pageSize = +req.query.pageSize;
	const currentPage = +req.query.page;
	const instrumentQuery = Instrument.find();
	let fetchedIntruments;
	console.log(pageSize);
	console.log(currentPage);
	if(pageSize && currentPage ){
		console.log("Si entro aqui");

		instrumentQuery
			.skip(pageSize * (currentPage - 1))
			.limit(pageSize);
	}
	instrumentQuery
	.then(documents => {
		fetchedIntruments = documents;
		return Instrument.count();
	})
	.then(count => {
		const newInstruments = fetchedIntruments.map(foundInstrument => {
			return {
				_id: foundInstrument._id,
				name: foundInstrument.name,
				instrumentImage: foundInstrument.instrumentImage,
				categories: foundInstrument.categories,
				cantidad: foundInstrument.cantidad,
				created_at: foundInstrument.created_at
			}
		});
		res.status(200).json({
			instruments: newInstruments,
			maxInstruments: count
		});
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


