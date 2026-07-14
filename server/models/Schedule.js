import mongoose from 'mongoose'

const scheduleSchema = new mongoose.Schema(
  {
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    day: { type: String, required: true, trim: true },
    startTime: { type: String, required: true, trim: true },
    endTime: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    classroom: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

scheduleSchema.index({ groupId: 1, day: 1, startTime: 1 }, { unique: true })
scheduleSchema.index({ classroom: 1, day: 1, startTime: 1 }, { unique: true })

export const Schedule = mongoose.model('Schedule', scheduleSchema)
