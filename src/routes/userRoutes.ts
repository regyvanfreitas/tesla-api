import { Router } from 'express'
import { createUser, resetPassword } from '../controllers/userController'

const router = Router()

router.post('/', createUser)
router.post('/resetPassword', resetPassword)

export default router
