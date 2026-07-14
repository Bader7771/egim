import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, default: '', trim: true },
    email: { type: String, default: '', trim: true, lowercase: true },
    birthDate: { type: Date },
    majorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Major', required: true },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  },
  { timestamps: true },
)

export const Student = mongoose.model('Student', studentSchema)
