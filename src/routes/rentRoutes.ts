import { Router } from 'express'
import verifyUser from '../middlewares/authMiddleware'
import {
  createRent,
  deleteRent,
  findRentListByEmail,
} from '../controllers/rentController'

const router = Router()

router.get('/', verifyUser, findRentListByEmail)
router.post('/create', verifyUser, createRent)
router.delete('/delete', verifyUser, deleteRent)

export default router
