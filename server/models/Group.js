import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    majorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Major', required: true },
    classroom: { type: String, default: '', trim: true },
  },
  { timestamps: true },
)

export const Group = mongoose.model('Group', groupSchema)
