import { Router } from 'express'
import {
  createRegistrationRequest,
  getRegistrationRequests,
} from '../controllers/registrationRequestController.js'

const router = Router()

router.route('/').get(getRegistrationRequests).post(createRegistrationRequest)

export default router
