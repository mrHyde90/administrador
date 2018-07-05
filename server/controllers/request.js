const Request = require("../models/request");

exports.requests_get_all = (req, res, next) => {
	const request_type = req.query.request_type;
	const userId = req.userData.userId;
	Request.find({user_id: userId, request_type: request_type})
		.then(requests => {
			const cleanRequests = requests.map(generateRequest => {
				return {
					_id: generateRequest._id,
					instrumentName: generateRequest.instrumentName,
					cantidad: generateRequest.cantidad,
					user_id: generateRequest.user_id,
					created_at: generateRequest.created_at,
					request_type: generateRequest.request_type,
					instrument_id: generateRequest.instrument_id
				};
			});
			res.status(200).json({
				sendRequests: cleanRequests
			});
		})
		.catch(err => res.status(500).json({error: err}))
}

exports.request_create = (req, res, next) => {
	console.log("Estas dentro del request_create");
	const userId = req.userData.userId;
	const request = new Request({
		instrumentName: req.body.instrumentName,
		cantidad: req.body.cantidad,
		user_id: userId,
		instrument_id: req.body.instrument_id
	});
	request.save()
		.then(newRequest => res.status(201).json({message: "Request created"}))
		.catch(err => res.status(500).json({error: err}))
}

exports.request_update = (req, res, next) => {
	const Id = req.params.id;
	Request.update({_id: Id}, {$set: {request_type: req.body.request_type}})
	.then(result => {
	      res.status(200).json({
	        message: "Request updated"
	      });
	    })
	    .catch(err => res.status(500).json({error: err}));
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
		.catch(err => res.status(500).json({error: err}))
}