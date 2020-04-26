const express = require('express')

require('./db/mongoose')
const User = require('./models/users')
const Task = require('./models/task')
const userRouter = require('./router/user')
const taskRouter = require('./router/tasks')
const app = express()

// app.use((req,res,next)=>{
// 	if(req.method === 'GET'){
// 		res.send('Get request is diabled')
// 	}else{
// 		next()
// 	}
// })

// app.use((req, res, next)=>{
// 		res.status(503).send('Site is under maintanace! Please try again later :)')

// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


const port = process.env.PORT 




app.listen(port,()=>{
	console.log("Server up on port "+port)
})