import { Student } from '../models/Student.js'

export async function getStudents(req, res, next) {
  try {
    const students = await Student.find().populate('majorId groupId').sort({ createdAt: -1 })
    res.json(students)
  } catch (error) {
    next(error)
  }
}

export async function getStudentById(req, res, next) {
  try {
    const student = await Student.findById(req.params.id).populate('majorId groupId')
    if (!student) return res.status(404).json({ message: 'Student not found' })
    res.json(student)
  } catch (error) {
    next(error)
  }
}

export async function createStudent(req, res, next) {
  try {
    const student = await Student.create(req.body)
    res.status(201).json(student)
  } catch (error) {
    next(error)
  }
}

export async function updateStudent(req, res, next) {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!student) return res.status(404).json({ message: 'Student not found' })
    res.json(student)
  } catch (error) {
    next(error)
  }
}

export async function deleteStudent(req, res, next) {
  try {
    const student = await Student.findByIdAndDelete(req.params.id)
    if (!student) return res.status(404).json({ message: 'Student not found' })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
