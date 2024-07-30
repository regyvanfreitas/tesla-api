import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import authRoutes from './routes/authRoutes'
import carRoutes from './routes/carRoutes'
import rentRoutes from './routes/rentRoutes'
import userRouter from './routes/userRoutes'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

async function connectToDatabase() {
  try {
    const url = process.env.MONGODB_URL ?? ''
    await mongoose.connect(url)
    console.log('Conectado ao banco de dados')
  } catch (error) {
    console.error(error)
  }
}

app.use(cors())

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use('/users', userRouter)
app.use('/auth', authRoutes)
app.use('/cars', carRoutes)
app.use('/rent', rentRoutes)

app.use((err, req, res, next) => {
  console.error('Erro:', err)
  res.status(500).json({ error: 'Erro interno do servidor' })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})

connectToDatabase()
