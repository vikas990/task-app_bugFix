const express = require('express')

require('./db/mongoose')
const User = require('./models/users')
const Task = require('./models/task')
const userRouter = require('./router/user')
const taskRouter = require('./router/tasks')
const app = express()

app.use(userRouter)
app.use(taskRouter)


const port = process.env.PORT || 3000

app.use(express.json())


app.listen(port,()=>{
	console.log("Server up on port "+port)
})