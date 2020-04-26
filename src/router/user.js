const express = require('express')

const { sendWelcomeEmail,sendCancelEmail } = require('../emails/account')
const auth = require('../middleware/Auth')
const User = require('../models/users')
const multer = require('multer')
const sharp =  require('sharp')


const router = new express.Router()

router.post('/user',async (req,res)=>{
	const user = new User(req.body)
	

	try{
		
		 await user.save()
		 sendWelcomeEmail(user.email,user.name)
		 const token = await user.generateAuthToken()
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



router.post('/user/login', async(req,res)=>{
	try{

		const user = await User.findByCredentials(req.body.email,req.body.password)
		const token = await user.generateAuthToken()
		
		res.send({ user, token })

	}catch(error){
		res.status(400).send(error)
	}
})

router.post('/user/logout', auth , async(req,res)=>{
	try{

		req.user.tokens = req.user.tokens.filter((token)=>{
			return token.token !== req.token
		})

		await req.user.save()
		res.send()

	}catch(e){
		res.status(500).send()
	}
})

router.post('/user/logoutAll' , auth , async (req,res)=>{
try{

		req.user.tokens = []
		await req.user.save()
		res.send()
	
}catch(e){
	res.status(500).send()
}
})

router.get('/user/me', auth ,async(req,res)=>{
		res.send(req.user)

	// User.find({}).then((users)=>{c
	// 	res.send(users)
	// }).catch((e)=>{
	// 	res.status(500).send()
	// })
})



router.patch('/user/me', auth, async (req,res) => {
   	const updates = Object.keys(req.body)
	const validOpration = ['name','password','email','age']
	const isvaildOperation = updates.every((update)=>validOpration.includes(update))

	if(!isvaildOperation){
		return res.status(404).send({error:'Invaild attempt to Update'})
	}
	try{
		updates.forEach((update) => {
			req.user[update] = req.body[update]
		})

		await req.user.save()

		return res.send(req.user)

		
	}catch(e){
		res.status(400).send(e)
	}
})


router.delete('/user/me',auth, async(req,res)=>{
	try{
		await req.user.remove()
		sendCancelEmail(req.user.email,req.user.name)
	 res.send(req.user)
	}catch(e){
		res.status(400).send(e)
	}
})

const upload = multer({
	// dest:'avatars',     This part is used when u hav to give a destination for a pic or a file to get saved but when storing in database no need to use this.
	limits:{
		fileSize:1000000
	} ,
	fileFilter(req,file,cb) {
		if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
			return cb(new Error('Please upload a Image!'))
		}

		cb(undefined,true)
	}
})
router.post('/user/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
	const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
	req.user.avatar = buffer
	await req.user.save()
	res.send()
},(error,req,res,next)=>{
	res.status(400).send({error: error.message})
})

router.delete('/user/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
	req.user.avatar = undefined
	 await req.user.save()
	res.send()

},(error,req,res,next)=>{
	res.status(400).send({error: error.message})
})

router.get('/user/:id/avatar',async (req,res)=>{
	try{
		 
		const user = await  User.findById(req.params.id)
		console.log('test')

		if( !user || !user.avatar ){
			throw new Error()
		}

		res.set('Content-Type','image/png')
		res.send(user.avatar)

	}catch(e){
		res.status(404).send()
	}
})

module.exports = router