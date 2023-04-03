import express from 'express'
import UserRouter from './router/user.routes.js'

const app = express()

const userRouter = new UserRouter()
app.use('/users', userRouter.getRouter())

app.listen(8080, () => console.log('Server Up'))