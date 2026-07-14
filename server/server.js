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
const allowedOrigins = [
  'http://localhost:5173',
  'https://egim.vercel.app',
  ...(process.env.CLIENT_URL || '').split(','),
]
  .map((origin) => origin.trim())
  .filter(Boolean)

console.log('Production env status:', {
  mongoUri: Boolean(process.env.MONGO_URI),
  clientUrl: Boolean(process.env.CLIENT_URL),
  adminEmail: Boolean(process.env.ADMIN_EMAIL?.trim()),
  adminPassword: Boolean(process.env.ADMIN_PASSWORD?.trim()),
  adminTokenSecret: Boolean(process.env.ADMIN_TOKEN_SECRET?.trim()),
})

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('CORS blocked'))
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}

app.use((req, res, next) => {
  const origin = req.headers.origin

  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
  } else {
    res.header('Access-Control-Allow-Origin', 'https://egim.vercel.app')
  }

  res.header('Vary', 'Origin')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }

  next()
})

app.use(cors(corsOptions))
app.options('/{*splat}', cors(corsOptions))
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

app.get('/api/health', async (req, res) => {
  try {
    await connectDB()
  } catch (error) {
    console.error('MongoDB health check failed:')
    console.error(error)
  }

  res.json({
    status: 'ok',
    service: 'egim-api',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

app.get('/api/test-cors', (req, res) => {
  res.json({
    message: 'cors working',
  })
})

app.get('/api/test', (req, res) => {
  res.json({
    message: 'Backend working',
  })
})

app.use('/api/auth', authRoutes)

app.use('/api', async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (error) {
    console.error('MongoDB request connection failed:')
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
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

if (!process.env.VERCEL) {
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
}

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
