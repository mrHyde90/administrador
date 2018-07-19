const Request = require("../models/request");
const User = require("../models/user");
//Se duplica el codigo, eliminar request_get_all, pero hazlo en la limpieza
//Para el usuario
exports.requests_get_all = (req, res, next) => {
	const request_type = req.query.request_type;
	const userId = req.userData.userId;
	Request.find({"owner.id": userId, request_type: request_type})
		.then(requests => {
			console.log(requests);
			const cleanRequests = requests.map(generateRequest => {
				return {
					_id: generateRequest._id,
					instrumentName: generateRequest.instrumentName,
					cantidad: generateRequest.cantidad,
					owner: generateRequest.owner,
					created_at: generateRequest.created_at,
					request_type: generateRequest.request_type,
					instrument_id: generateRequest.instrument_id
				};
			});
			res.status(200).json({
				sendRequests: cleanRequests
			});
		})
		.catch(err => res.status(500).json({message: "Request Get Failed!!"}))
}
//Para el admin
exports.search_user_requests = (req, res, next) => {
	const request_type = req.query.request_type;
	const pageSize = +req.query.pageSize;
	const currentPage = +req.query.page;
	const userId = req.params.userId;
	let fetchedRequest;
	const requestQuery = Request.find({"owner.id": userId, request_type: request_type});

	if(pageSize && currentPage ){
		requestQuery
			.skip(pageSize * (currentPage - 1))
			.limit(pageSize);
	}
	
	requestQuery.then(documents => {
		fetchedRequest = documents;
		return Request.count({request_type: request_type});
	})
	.then(count => {
			const cleanRequests = fetchedRequest.map(generateRequest => {
				return {
					_id: generateRequest._id,
					instrumentName: generateRequest.instrumentName,
					cantidad: generateRequest.cantidad,
					owner: generateRequest.owner,
					created_at: generateRequest.created_at,
					request_type: generateRequest.request_type,
					instrument_id: generateRequest.instrument_id
				};
			});
			res.status(200).json({
				sendRequests: cleanRequests,
				maxRequests: count
			});
		})
		.catch(err => res.status(500).json({message: "Request Get Failed!!"}))
}

//Para el admin
exports.search_all_requests = (req, res, next) => {
	const request_type = req.query.request_type;
	const pageSize = +req.query.pageSize;
	const currentPage = +req.query.page;
	let fetchedRequest;
	const requestQuery = Request.find({request_type: request_type});

	if(pageSize && currentPage ){
		requestQuery
			.skip(pageSize * (currentPage - 1))
			.limit(pageSize);
	}
	requestQuery
		.then(documents => {
			fetchedRequest = documents;
			return Request.count({request_type: request_type});
		})
		.then(count => {
			const cleanRequests = fetchedRequest.map(generateRequest => {
				return {
					_id: generateRequest._id,
					instrumentName: generateRequest.instrumentName,
					cantidad: generateRequest.cantidad,
					owner: generateRequest.owner,
					created_at: generateRequest.created_at,
					request_type: generateRequest.request_type,
					instrument_id: generateRequest.instrument_id
				};
			});
			res.status(200).json({
				sendRequests: cleanRequests,
				maxRequests: count
			});
		})
		.catch(err => res.status(500).json({message: "Request Get Failed!!"}))
}

exports.request_create = (req, res, next) => {
	console.log("Estas dentro del request_create");
	const userId = req.userData.userId;
	User.findById(userId)
		.then(foundUser => {
			const request = new Request({
				instrumentName: req.body.instrumentName,
				cantidad: req.body.cantidad,
				owner: {
					id: foundUser._id,
					matricula: foundUser.matricula
				},
				instrument_id: req.body.instrument_id
			});
			request.save()
				.then(newRequest => res.status(201).json({message: "Request created"}))
				.catch(err => res.status(500).json({message: "Request Save Failed!!"}))
		})
		.catch(err => res.status(500).json({message: "Request Post Failed!!"}))
	
}

exports.request_update = (req, res, next) => {
	const Id = req.params.id;
	Request.update({_id: Id}, {$set: {request_type: req.body.request_type}})
	.then(result => {
	      res.status(200).json({
	        message: "Request updated"
	      });
	    })
	    .catch(err => res.status(500).json({message: "Request Put Failed!!"}));
}

exports.request_delete = (req, res, next) => {
	const Id = req.params.id;
	Request.deleteOne({_id: Id})
		.then(result => {
			if(result.n > 0){
				res.status(200).json({ message: "Deletion successful!" });
			} else {
				res.status(401).json({ message: "Not authorized!" });
			}
		})
		.catch(err => res.status(500).json({message: "Request Delete Failed!!"}))
}