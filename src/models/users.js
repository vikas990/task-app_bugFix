const mongoose = require('mongoose')

const validator = require('validator')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const Task = require('../models/task')
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
	},
	unique: false
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

	},
	tokens:[{
		token:{
			type:String,
			required:true
		}
	}],
	avatar:{
		type:Buffer
	}
}, {
	timestamps:true
})

userSchema.virtual('task', {
	ref:'task',
	localField:'_id',
	foreignField:'owner'
})

userSchema.methods.toJSON = function(){
	const user = this
	const userObject = user.toObject()

	delete userObject.password
	delete userObject.tokens
	delete userObject.avatar
	return userObject
}

userSchema.methods.generateAuthToken = async function () {
	const user = this

	const token = jwt.sign({ _id: user._id.toString() }, process.env.AUTH)
	
	user.tokens = user.tokens.concat({token})
	await user.save()

	return token
}

userSchema.statics.findByCredentials = async(email,password)=>{

		const user = await User.findOne({email})

		if(!user){
			throw new Error('unable to login')
		}

		const isMatch = await bcrypt.compare(password, user.password)

		if(!isMatch){
			throw new Error('unable to login')

		}

		return user

}

userSchema.pre('save', async function(next) {
	const user = this

	if(user.isModified('password')){
		user.password = await bcrypt.hash(user.password,8)
	}

	next()
})

userSchema.pre('remove', async function(next){
	const user = this
	await Task.deleteMany({owner: user._id})  
	next()
})

const User = mongoose.model('User', userSchema)

module.exports = User