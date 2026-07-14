import { RegistrationRequest } from '../models/RegistrationRequest.js'

export async function createRegistrationRequest(req, res, next) {
  try {
    const request = await RegistrationRequest.create({
      ...req.body,
      status: 'Pending',
    })
    res.status(201).json(request)
  } catch (error) {
    next(error)
  }
}

export async function getRegistrationRequests(req, res, next) {
  try {
    const requests = await RegistrationRequest.find()
      .populate('majorId', 'name')
      .sort({ createdAt: -1 })
    res.json(requests)
  } catch (error) {
    next(error)
  }
}
