require('../db/mongoose')
const Task= require('../models/task')


// Task.findByIdAndRemove('5e83db50cb6e709693e8aef2').then((task)=>{
// 	console.log(task)
// 	return Task.countDocuments({complete:false})
// }).then((task)=>{
// 	console.log(task)
// }).catch((e)=>{
// 	console.log(e)
// })


const removeAndCount = async (id,complete)=>{
	const remove = await Task.findByIdAndRemove(id)
	const count = await Task.countDocuments({complete})
	return count
}


removeAndCount('5e83db01c020ca9687d5a648',false).then((task)=>{
	console.log(task)
}).catch((e)=>{
	console.log(e)
})