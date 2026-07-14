import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    type: { type: String, enum: ['Monthly', 'Full year'], required: true },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['Paid', 'Partial', 'Not Paid'], required: true },
    month: { type: String, default: '', trim: true },
    year: { type: Number, required: true },
    paymentDate: { type: Date },
  },
  { timestamps: true },
)

export const Payment = mongoose.model('Payment', paymentSchema)
