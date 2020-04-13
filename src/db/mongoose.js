const mongoose = require('mongoose')

const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-app',{
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology:true
})
/* cretaing user model and storing data in database*/

/* the above part is in users.js. below to as to remmber the method*/
// const me = new User({
// 	name: 'Vikas Kumar   ',
// 	email: 'VikaskumarP66@gmail.com   ',
// 	age:21,
// 	password: 'Vikas1234',
	

// })

// me.save().then((me)=>{
// 	console.log(me)

// }).catch((error)=>{
//  console.log('U have an error',error)
// })
/*END*/

/* the above part is in task.js. below to as to remmber the method*/


// const taskinfo = new Task({
// 	description: 'Code At Least one hour a day'
	
// })
// taskinfo.save().then((taskinfo)=>{
// 	console.log(taskinfo)

// }).catch((error)=>{
// 	console.log('u have an error',error)
// })