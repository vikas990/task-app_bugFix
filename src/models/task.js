const mongoose = require('mongoose')

const validator = require('validator')

const taskSchema = new mongoose.Schema({
	description:{
		type: String,
		trim: true,
		required: true
	},
	complete:{
		type: Boolean,
		default: false
	},
	owner:{
		type: mongoose.Schema.Types.ObjectId,
		require:true,
		ref:'User'

	}
}, {
	timestamps:true
})

const Task = mongoose.model('task',taskSchema)

module.exports = Task