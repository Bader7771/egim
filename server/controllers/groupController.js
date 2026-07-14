import { Group } from '../models/Group.js'

export async function getGroups(req, res, next) {
  try {
    const groups = await Group.find().populate('majorId').sort({ createdAt: -1 })
    res.json(groups)
  } catch (error) {
    next(error)
  }
}

export async function getGroupById(req, res, next) {
  try {
    const group = await Group.findById(req.params.id).populate('majorId')
    if (!group) return res.status(404).json({ message: 'Group not found' })
    res.json(group)
  } catch (error) {
    next(error)
  }
}

export async function createGroup(req, res, next) {
  try {
    const group = await Group.create(req.body)
    res.status(201).json(group)
  } catch (error) {
    next(error)
  }
}

export async function updateGroup(req, res, next) {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!group) return res.status(404).json({ message: 'Group not found' })
    res.json(group)
  } catch (error) {
    next(error)
  }
}

export async function deleteGroup(req, res, next) {
  try {
    const group = await Group.findByIdAndDelete(req.params.id)
    if (!group) return res.status(404).json({ message: 'Group not found' })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
