const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Nota solo cambiar las cadenas de email y password a minusculas

exports.user_signup = (req, res, next) => {
	//Nos aseguramos de que el usuario sea unico
	User.find({email: req.body.email})
	.exec()
	.then(users => {

		if(users.length >= 1){
			return res.status(409).json({
				message: "mail exist"
			})
		} else {
			//encryptamos el password
			bcrypt.hash(req.body.password, 10).then(hash => {
				const user = new User({
					email: req.body.email,
					password: hash,
					matricula: req.body.matricula,
					carrera: req.body.carrera,
					name: req.body.name
				});
				//Salvamos al usuario
				user.save()
					.then(result => {
						res.status(201).json({
							message: "User created",
							result: result
						});
					})
					.catch(err => {
						res.status(500).json({
							error: err
						});
					})
			});

		}

	})
	.catch(err => {
		res.status(409).json({
			error: err
		});
	})
}

exports.user_signin = (req, res, next) => {
	let fetchedUser;
	User.findOne({email: req.body.email})
		.then(user => {
			if(!user){
				return res.status(401).json({
					message: "Auth failded email does not recognized"
				});
			}
			fetchedUser = user;
			return bcrypt.compare(req.body.password, user.password);
		})
		.then(result => {
			if(!result){
				return res.status(401).json({
					message: "Auth failed password incorrect"
				});
			}
			const token = jwt.sign(
				{
					email: fetchedUser.email,
					userId: fetchedUser._id
				},
				"secret_this_should_be_longer",
        		{ expiresIn: "1h" }
			);
			res.status(200).json({
				token: token,
				expiresIn: 3600
			});
		})
		.catch(err => {
			res.status(401).json({
				message: "Auth failed"
			})
		})
}