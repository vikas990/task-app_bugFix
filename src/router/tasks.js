const express = require('express')
const auth = require('../middleware/Auth')
const Task = require('../models/task')

const router = new express.Router()


router.post('/task',auth,async(req,res)=>{
	const task = new Task({
		...req.body,
		owner: req.user._id
	})

	try{
		task.save()
		res.status(201).send(task)
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


router.get('/task',auth,async (req,res)=>{
const match = {}
const sort = {}

if(req.query.complete){
	match.complete = req.query.complete === 'true'
}

if(req.query.sortBy){
	const parts = req.query.sortBy.split(':')
	sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
}

try{
 	await req.user.populate({
		 path: 'task',
		 match,
		 options:{
			 limit: parseInt(req.query.limit),
			 skip:parseInt(req.query.skip),
			 sort
		 }
	 }).execPopulate()
 	res.send(req.user.task)
}catch(e){
 	res.status(500).send(e)
}

	// Task.find({}).then((tasks)=>{
	// 	res.send(tasks)
	// }).catch((e)=>{
	// 	res.status(500).send()
	// })
})

router.get('/task/:id', auth,async (req,res)=>{
	const _id = req.params.id

	try{
		const task = await Task.findOne({_id,owner:req.user._id})
		if(!task){
			return res.status(404).send()
		}
		res.send(task)
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

router.patch('/task/:id',auth, async(req,res)=>{
	const updates = Object.keys(req.body)
	const validOpration = ['description','complete']
	const isvaildOperation = updates.every((update)=>validOpration.includes(update))

	if(!isvaildOperation){
		return res.status(400).send({error:'Ivalid attempt to update!'})
	}

	try{
		const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
		if(!task){
			res.status(404).send()
		}

		updates.forEach((update)=>{
			task[update] = req.body[update]
		})

		await task.save()
		//const upadte = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
		
		res.status(200).send(task)
	}catch(e){
		res.status(400).send(e)
	}
})


router.delete('/task/:id', auth, async(req,res)=>{
	try{
		const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})

		if(!task){
			return res.status(404).send()
		}
		res.status(200).send(task)

	}catch(e){
		res.status(400).send(e)
	}
})


module.exports = router