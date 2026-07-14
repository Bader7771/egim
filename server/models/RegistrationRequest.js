import mongoose from 'mongoose'

const registrationRequestSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, default: '', trim: true, lowercase: true },
    birthDate: { type: Date },
    majorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Major', required: true },
    message: { type: String, default: '', trim: true },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true },
)

export const RegistrationRequest = mongoose.model('RegistrationRequest', registrationRequestSchema)
