import { Router } from 'express'
import verifyUser from '../middlewares/authMiddleware'
import { buyCar } from '../controllers/buyCarController'

const router = Router()

router.post('/create', verifyUser, buyCar)

export default router
