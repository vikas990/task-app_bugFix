const express = require('express')
const User = require('../models/users')

const router = new express.Router()

router.post('/user',async (req,res)=>{
	const user = new User(req.body)
	console.log(req.body)

	try{
		 await user.save()
		 res.status(201).send(user)
	}catch(e){
		res.status(400).send(e)
	}

	// user.save().then(()=>{
	// 	res.send(user)
	// }).catch((e)=>{
	// 	res.status(400)
	// 	res.send(e)
	// })
	
})

router.get('/user', async(req,res)=>{
		try{
			const user = await User.find({})
			res.status(200).send(user)
		}catch(e){
			res.status(500).send(e)
		}

	// User.find({}).then((users)=>{
	// 	res.send(users)
	// }).catch((e)=>{
	// 	res.status(500).send()
	// })
})

router.get('/user/:id', async(req,res)=>{
	const _id = req.params.id

	try{
		const user = await User.findById(_id)
		if(!user){
			return res.status(404).send()
		}

		res.status(200).send(user)

	}catch(e){
		res.status(500).send(e)
	}

	// User.findById(_id).then((user)=>{
	// 	if(!user){
	// 		return res.status(404).send()
	// 	}

	// 	res.send(user)

	// }).catch((e)=>{
	// 	res.status(500).send()
	// })
} )

router.patch('/user/:id',async(req,res) => {
   	const updates = Object.keys(req.body)
	const validOpration = ['name','password','email','age']
	const isvaildOperation = updates.every((update)=>validOpration.includes(update))

	if(!isvaildOperation){
		return res.status(404).send({error:'Invaild attempt to Update'})
	}
	try{

		const user = await User.findById(req.params.id)


		updates.forEach((update) => {
			user[update] = req.body[update]
		})

		await user.save()
		// const update = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
		if(!user){
			return res.status(404).send()
		}

		res.status(201).send(update)
	}catch(e){
		res.status(400).send(e)
	}
})


router.delete('/user/:id', async(req,res)=>{
	try{
		const user = await User.findByIdAndDelete(req.params.id)

		if(!user){
			return res.status(404).send()
		}
		res.status(200).send(user)

	}catch(e){
		res.status(400).send(e)
	}
})


module.exports = router