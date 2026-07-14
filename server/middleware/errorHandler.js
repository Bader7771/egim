export function notFound(req, res, next) {
  const error = new Error(`Not found: ${req.originalUrl}`)
  res.status(404)
  next(error)
}

export function errorHandler(error, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode

  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({ message: error.message })
  }

  if (error.code === 11000) {
    return res.status(409).json({ message: 'Duplicate record or schedule conflict detected' })
  }

  res.status(statusCode).json({
    message: error.message || 'Server error',
  })
}
