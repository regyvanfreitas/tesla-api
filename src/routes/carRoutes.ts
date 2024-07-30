import { Router } from 'express'
import { createCar, deleteCar, findCarList } from '../controllers/carController'
import verifyUser from '../middlewares/authMiddleware'
import upload from '../middlewares/uploadMiddleware'

const router = Router()

router.get('/', findCarList)
router.post('/create', upload.single('carImage'), verifyUser, createCar)
router.delete('/delete', verifyUser, deleteCar)

export default router
