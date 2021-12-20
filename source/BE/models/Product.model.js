const mongoose = require('mongoose')
const validator = require('validator');
const Schema = mongoose.Schema

const ProductSchema = new Schema({
	realname: {
		type: String,
		required: true
	},
	code: {
		type: String,
		required: true,
		unique: true
	},
	type: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'producttypes',
		required: true
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'productcategoris',
		required: true
	},
	cost: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	image:{
        type: Array,
    },
	// imageslide: {
    //     type: Array
    // },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
}, {
    timestamps: true,
})

module.exports = mongoose.model('products', ProductSchema)
