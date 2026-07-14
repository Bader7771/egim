import { Payment } from '../models/Payment.js'

export async function getPayments(req, res, next) {
  try {
    const filter = req.query.studentId ? { studentId: req.query.studentId } : {}
    const payments = await Payment.find(filter).populate('studentId').sort({ createdAt: -1 })
    res.json(payments)
  } catch (error) {
    next(error)
  }
}

export async function getPaymentById(req, res, next) {
  try {
    const payment = await Payment.findById(req.params.id).populate('studentId')
    if (!payment) return res.status(404).json({ message: 'Payment not found' })
    res.json(payment)
  } catch (error) {
    next(error)
  }
}

export async function createPayment(req, res, next) {
  try {
    const payment = await Payment.create(req.body)
    res.status(201).json(payment)
  } catch (error) {
    next(error)
  }
}

export async function updatePayment(req, res, next) {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!payment) return res.status(404).json({ message: 'Payment not found' })
    res.json(payment)
  } catch (error) {
    next(error)
  }
}

export async function deletePayment(req, res, next) {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id)
    if (!payment) return res.status(404).json({ message: 'Payment not found' })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
