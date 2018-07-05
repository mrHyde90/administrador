var mongoose = require("mongoose");
var Request = require("./models/request");

const data = [
			{instrumentName: "Capacitor", cantidad: 6, user_id: "5b383900e9810d1b50eb2d7e", request_type: "pending"},
			{instrumentName: "Diodo", cantidad: 10, user_id: "5b383900e9810d1b50eb2d7e", request_type: "pending"},
			{instrumentName: "Arduino", cantidad: 1, user_id: "5b383900e9810d1b50eb2d7e", request_type: "pending"},
			{instrumentName: "Martillo", cantidad: 1, user_id: "5b383900e9810d1b50eb2d7e", request_type: "pending"},
			{instrumentName: "Capacitor", cantidad: 6, user_id: "5b383900e9810d1b50eb2d7e", request_type: "accept"},
			{instrumentName: "Diodo", cantidad: 10, user_id: "5b383900e9810d1b50eb2d7e", request_type: "accept"},
			{instrumentName: "Arduino", cantidad: 1, user_id: "5b383900e9810d1b50eb2d7e", request_type: "accept"}
		];

function seedRequest() {
	Request.remove({})
		.then(requestRemove => {
			data.forEach( seed => {
				Request.create(seed)
					.then(newRequest => console.log(""))
					.catch(err => console.log(err))
			})
		})
		.catch(err => console.log(err))
}

module.exports = seedRequest;

/*
	
*/