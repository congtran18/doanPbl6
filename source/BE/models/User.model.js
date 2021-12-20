const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator');

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		validate(value) {
			if (!value.match(/[a-zA-Z]/) || value.length < 5) {
			  throw new Error('Name must contain letter and min length is 5');
			}
		},
	},
	password: {
		type: String,
		required: true,
		validate(value) {
			if (!value.match(/\d/) || !value.match(/[a-zA-Z]/) || value.length < 5) {
			  throw new Error('Password must contain at least one letter and one number and min length is 5');
			}
		},
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('users', UserSchema)
