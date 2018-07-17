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

exports.instrument_show = (req, res, next) => {
	const instrument_id = req.params.id;
	Instrument.findById(instrument_id)
	.then(foundInstrument => {
		console.log("Dentro del instrument_show");
		console.log(foundInstrument);
		res.status(200).json({instrument: {
					_id: foundInstrument._id,
					name: foundInstrument.name,
					instrumentImage: foundInstrument.instrumentImage,
					cantidad: foundInstrument.cantidad,
					categories: foundInstrument.categories,
					created_at: foundInstrument.created_at
				}});
	})
	.catch(err => res.status(500).json({error: err}))
}

exports.increase_instrument = (req, res, next) => {
	const increase = req.body.cantidad;
	const id = req.params.id;
	Instrument.findById(id)
		.then(foundInstrument => {
			const nuevaCantidad = foundInstrument.cantidad + increase;
			Instrument.update({_id: id}, {$set: {cantidad: nuevaCantidad}})
			.exec()
			.then(result => res.status(200).json({message: "Update successful", exito: true}))
			.catch(err => res.status(500).json({error: err}))
		})
} 

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

exports.instrument_good_update = (req, res, next) => {
	const id = req.params.id;
	const newInstrument = {
		name: req.body.name,
		instrumentImage: req.body.instrumentImage,
		cantidad: req.body.cantidad,
		categories: req.body.categories
	}	
	Instrument.update({_id: id}, {$set: newInstrument})
		.then(result => res.status(200).json({message: "Update succesful"}))
		.catch(err => res.status(500).json({error: err}))
}

exports.instrument_create = (req, res, next) => {
	const instrument = new Instrument({
		name: req.body.name,
		instrumentImage: req.body.instrumentImage,
		cantidad: req.body.cantidad,
		categories: req.body.categories
	});
	instrument.save()
		.then(newInstrument => res.status(201).json({message: "Instrument created"}))
		.catch(err => res.status(500).json({error: err}));
}

exports.instrument_delete = (req, res, next) => {
	const Id = req.params.id;
	Instrument.deleteOne({_id: Id})
		.then(result => {
			if(result.n > 0){
				res.status(200).json({ message: "Deletion successful!" });
			} else {
				res.status(401).json({ message: "Not authorized!" });
			}
		})
		.catch(err => res.status(500).json({error: err}));
}
