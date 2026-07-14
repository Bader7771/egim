import mongoose from 'mongoose'

const majorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
  },
  { timestamps: true },
)

export const Major = mongoose.model('Major', majorSchema)
