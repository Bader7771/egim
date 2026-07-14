import { Schedule } from '../models/Schedule.js'

function overlaps(startA, endA, startB, endB) {
  return startA < endB && startB < endA
}

async function findScheduleConflict(data, ignoredId) {
  const schedules = await Schedule.find({
    day: data.day,
    _id: { $ne: ignoredId },
    $or: [{ groupId: data.groupId }, { classroom: data.classroom }],
  })

  return schedules.find((schedule) =>
    overlaps(data.startTime, data.endTime, schedule.startTime, schedule.endTime),
  )
}

export async function getSchedules(req, res, next) {
  try {
    const schedules = await Schedule.find().populate('groupId').sort({ day: 1, startTime: 1 })
    res.json(schedules)
  } catch (error) {
    next(error)
  }
}

export async function getScheduleById(req, res, next) {
  try {
    const schedule = await Schedule.findById(req.params.id).populate('groupId')
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' })
    res.json(schedule)
  } catch (error) {
    next(error)
  }
}

export async function createSchedule(req, res, next) {
  try {
    const conflict = await findScheduleConflict(req.body)
    if (conflict) {
      return res.status(409).json({ message: 'Schedule conflict detected for this group or classroom' })
    }

    const schedule = await Schedule.create(req.body)
    res.status(201).json(schedule)
  } catch (error) {
    next(error)
  }
}

export async function updateSchedule(req, res, next) {
  try {
    const conflict = await findScheduleConflict(req.body, req.params.id)
    if (conflict) {
      return res.status(409).json({ message: 'Schedule conflict detected for this group or classroom' })
    }

    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' })
    res.json(schedule)
  } catch (error) {
    next(error)
  }
}

export async function deleteSchedule(req, res, next) {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id)
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
