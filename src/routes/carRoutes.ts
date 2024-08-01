import { Router } from 'express'
import {
  createCar,
  deleteCar,
  findCarList,
  uploadImageCar,
} from '../controllers/carController'
import verifyUser from '../middlewares/authMiddleware'
import upload from '../middlewares/uploadMiddleware'

const router = Router()

router.get('/', findCarList)
router.post('/create', upload.single('carImage'), verifyUser, createCar)
router.delete('/delete', verifyUser, deleteCar)
router.post('/upload', upload.single('carImage'), verifyUser, uploadImageCar)

export default router
