import crypto from 'crypto'

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  if (leftBuffer.length !== rightBuffer.length) return false
  return crypto.timingSafeEqual(leftBuffer, rightBuffer)
}

function createToken(email) {
  const secret = process.env.ADMIN_TOKEN_SECRET || process.env.ADMIN_PASSWORD
  const payload = {
    email,
    exp: Date.now() + 1000 * 60 * 60 * 8,
  }
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = crypto
    .createHmac('sha256', secret)
    .update(encodedPayload)
    .digest('base64url')

  return `${encodedPayload}.${signature}`
}

export async function loginAdmin(req, res) {
  const configuredEmail = process.env.ADMIN_EMAIL
  const configuredPassword = process.env.ADMIN_PASSWORD

  if (!configuredEmail || !configuredPassword) {
    return res.status(500).json({ message: 'Admin authentication is not configured' })
  }

  const { email = '', password = '' } = req.body
  const emailMatches = safeEqual(String(email).toLowerCase(), configuredEmail.toLowerCase())
  const passwordMatches = safeEqual(String(password), configuredPassword)

  if (!emailMatches || !passwordMatches) {
    return res.status(401).json({ message: 'Invalid admin credentials' })
  }

  res.json({
    token: createToken(configuredEmail),
    admin: { email: configuredEmail },
  })
}
