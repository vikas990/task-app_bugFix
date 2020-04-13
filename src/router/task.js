const express = require('express')
const User = require('../models/task')

const router = new express.Router()


router.post('/task',async(req,res)=>{
	const task = new Task(req.body)

	try{
		task.save()
		res.status(201).send()
	}catch(e){
		res.status(400).send()
	}

	// task.save().then(()=>{
	// 	res.send(task)
	// }).catch((e)=>{
	// 	res.status(400)
	// 	res.send(e)
	// })
})


router.get('/task',async (req,res)=>{
		try{
		 	const task = await Task.find({})
		 	res.status(200).send(task)
		}catch(e){
		 	res.status(500).send(e)
		}

	// Task.find({}).then((tasks)=>{
	// 	res.send(tasks)
	// }).catch((e)=>{
	// 	res.status(500).send()
	// })
})

router.get('/task/:id', async (req,res)=>{
	const id = req.params.id

	try{
		const task = await Task.findById(id)
		if(!task){
			return res.status(404).send()
		}
		res.status(200).send(task)
	}catch(e){
		res.status(500).send(e)
	}

	// Task.findById(id).then((task)=>{
	// 	if(!task){
	// 		req.status(404).send()
	// 	}
	// 	res.send(task)
	// }).catch((e)=>{
	// 	res.status(500).send()
	// })
})

router.patch('/task/:id', async(req,res)=>{
	const update = Object.keys(req.body)
	const validOpration = ['description','complete']
	const isvaildOperation = update.every((update)=>validOpration.includes(update))

	if(!isvaildOperation){
		return res.status(400).send({error:'Ivalid attempt to update!'})
	}

	try{
		const upadte = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
		if(!task){
			res.status(404).send()
		}
		res.status(200).send(update)
	}catch(e){
		res.status(400).send(e)
	}
})


router.delete('/task/:id', async(req,res)=>{
	try{
		const task = await Task.findByIdAndDelete(req.params.id)

		if(!task){
			return res.status(404).send()
		}
		res.status(200).send(task)

	}catch(e){
		res.status(400).send(e)
	}
})


module.exports = router