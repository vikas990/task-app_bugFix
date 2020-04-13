require('../db/mongoose')
const User= require('../models/users')

// User.findByIdAndUpdate('5e84e7bcdf070a9c0ab0c23e',{age:21}).then((user)=>{
// 	console.log(user)
// 	return User.countDocuments({age:21})
// }).then((user)=>{
// 	console.log(user)
// }).catch((e)=>{
// 	console.log(e)
// })


const updateAndCount= async (id,age)=>{
	const update = await User.findByIdAndUpdate(id,{age})
	const count = await User.countDocuments({age})
	return count
}

updateAndCount('5e84e7bcdf070a9c0ab0c23e',45).then((user)=>{
	console.log('user',user)
}).catch((e)=>{
	console.log('error',e)
})