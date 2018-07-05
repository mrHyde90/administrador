var mongoose = require("mongoose");
//Poner la categoria del objeto
var requestSchema = new mongoose.Schema({
	instrumentName: {type: String, required: true},
	cantidad: {type: Number, required: true, default: 0},
	request_type: {type: String, enum: ["pending", "accept"], default: "pending"},
	created_at: {type: Date, default: Date.now()},
	user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	instrument_id: {type: mongoose.Schema.Types.ObjectId, ref: "Instrument", required: true}
});

module.exports = mongoose.model("Request", requestSchema);