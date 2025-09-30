import express from 'express'
import { submitData, submitFeedback } from '../controllers/userController.js'

const userRoute = express.Router()

userRoute.post('/submit',submitData)

userRoute.post('/feedback',submitFeedback)

export default userRoute