const mongoose = require('mongoose')

const validator = require('validator')

const userSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true,
		trim: true,
		default: 'User'
	},
	email:{
		type: String,
		trim: true,
		lowercase: true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error('Email is invalid')
		}
	}
	},
	password:{
		type: String,
		minlength:6,
		trim: true,
		validate(value) {
			if(value.toLowerCase() == 'password'){
				throw new Error('password cna not be a password')
			}
		}

	},
	age:{
		type: Number,
		default: 0

	}
})

userSchema.pre('save', async function(next) {
	const user = this

	console.log('yoyo hommie')

	next()
})

const User = mongoose.model('User', userSchema)

module.exports = User