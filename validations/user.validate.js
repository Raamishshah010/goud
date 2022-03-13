const Joi = require('joi');

const authSignUp = Joi.object({
	// _id: mongoose.Types.ObjectId(),
	email: Joi.string().email().lowercase().required(),
	password: Joi.string().min(6).required(),
	name: Joi.string().required(),
});

const authLogin = Joi.object({
	// _id: mongoose.Types.ObjectId(),
	email: Joi.string().email().lowercase().required(),
	password: Joi.string().min(6).required(),
});

module.exports = { authSignUp, authLogin };
