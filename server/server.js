import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { connectDB } from './config/db.js'
import { notFound } from './middleware/errorHandler.js'
import authRoutes from './routes/authRoutes.js'
import groupRoutes from './routes/groupRoutes.js'
import majorRoutes from './routes/majorRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import registrationRequestRoutes from './routes/registrationRequestRoutes.js'
import scheduleRoutes from './routes/scheduleRoutes.js'
import studentRoutes from './routes/studentRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const host = process.env.HOST
const allowedOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'EGIM API is running' })
})

app.get('/test-cors', (req, res) => {
  res.json({
    success: true,
    message: 'CORS works',
  })
})

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'egim-api',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

app.use('/api/auth', authRoutes)

app.use('/api', (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({ message: 'Server error' })
  }

  next()
})

app.use('/api/majors', majorRoutes)
app.use('/api/groups', groupRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/schedules', scheduleRoutes)
app.use('/api/registration-requests', registrationRequestRoutes)

app.use(notFound)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({
    message: 'Server error',
  })
})

const server = host
  ? app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`)
  })
  : app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })

server.on('error', (error) => {
  console.error(`Server failed to start on port ${port}: ${error.message}`)
  process.exit(1)
})

connectDB()
  .then(() => {
    console.log('MongoDB Connected')
  })
  .catch((error) => {
    console.log('Mongo URI exists:', !!process.env.MONGO_URI)
    console.error('MongoDB connection failed:')
    console.error(error)
  })

export default app
