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
						res.status(500).json({message: "User  Save Failed!"});
					})
			});

		}

	})
	.catch(err => {
		res.status(409).json({message: "User  SignUp Failed!"});
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
					userId: fetchedUser._id,
					user_type: fetchedUser.user_type
				},
				"secret_this_should_be_longer",
        		{ expiresIn: "1h" }
			);
			res.status(200).json({
				token: token,
				expiresIn: 3600,
				userData: {
					_id: fetchedUser._id,
					email: fetchedUser.email,
					matricula: fetchedUser.matricula,
					carrera: fetchedUser.carrera,
					name: fetchedUser.name,
					user_type: fetchedUser.user_type
				}
			});
		})
		.catch(err => {
			res.status(401).json({
				message: "Auth failed"
			})
		})
}

exports.search_users = (req, res, next) => {
	const matricula = req.query.matricula;
	User.findOne({matricula: matricula})
		.then(userFound => {
			res.status(200).json({
				user: {
					_id: userFound._id,
					carrera: userFound.carrera,
					matricula: userFound.matricula,
					email: userFound.email,
					name: userFound.name,
					user_type: userFound.user_type
				}
			});
		}) 
		.catch(err => res.status(500).json({message: "User Get Failed!"}))
}

exports.search_user_id = (req, res, next) => {
	const userId = req.params.id;
	User.findById(userId)
		.then(userFound => {
			res.status(200).json({
				user: {
					_id: userFound._id,
					carrera: userFound.carrera,
					matricula: userFound.matricula,
					email: userFound.email,
					name: userFound.name,
					user_type: userFound.user_type
				}
			});
		}) 
		.catch(err => res.status(500).json({message: "User Get Failed!"}))
}

exports.edit_user = (req, res, next) => {
	const userId = req.params.id;
	console.log(req.body);
	console.log(userId);
	const user = new User({
		_id: req.body._id,
		email: req.body.email,
		matricula: req.body.matricula,
		carrera: req.body.carrera,
		name: req.body.name, 
	});
	User.updateOne({_id: userId}, user)
		 .then(result => {
		 	console.log("Dentro del updateOne");
	      if (result.nModified > 0) {
	        res.status(200).json({ message: "Update successful!" });
	      } else {
	        res.status(401).json({ message: "Not authorized!" });
	      }
	    })
		 .catch(err => res.status(500).json({message: "User Put Failed!"}))
}

exports.delete_user = (req, res, next) => {
	const userId = req.params.id;
	User.remove({_id: userId})
		.then(results => res.status(200).json({
			message: "User deleted"
		}))
		.catch(err => res.status(500).json({message: "User Delete Failed!"}))
}