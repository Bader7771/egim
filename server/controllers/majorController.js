import { Major } from '../models/Major.js'

export async function getMajors(req, res, next) {
  try {
    const majors = await Major.find().sort({ createdAt: -1 })
    res.json(majors)
  } catch (error) {
    next(error)
  }
}

export async function getMajorById(req, res, next) {
  try {
    const major = await Major.findById(req.params.id)
    if (!major) return res.status(404).json({ message: 'Major not found' })
    res.json(major)
  } catch (error) {
    next(error)
  }
}

export async function createMajor(req, res, next) {
  try {
    const major = await Major.create(req.body)
    res.status(201).json(major)
  } catch (error) {
    next(error)
  }
}

export async function updateMajor(req, res, next) {
  try {
    const major = await Major.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!major) return res.status(404).json({ message: 'Major not found' })
    res.json(major)
  } catch (error) {
    next(error)
  }
}

export async function deleteMajor(req, res, next) {
  try {
    const major = await Major.findByIdAndDelete(req.params.id)
    if (!major) return res.status(404).json({ message: 'Major not found' })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
