import { Router } from 'express'
import {
  createSchedule,
  deleteSchedule,
  getScheduleById,
  getSchedules,
  updateSchedule,
} from '../controllers/scheduleController.js'

const router = Router()

router.route('/').get(getSchedules).post(createSchedule)
router.route('/:id').get(getScheduleById).put(updateSchedule).delete(deleteSchedule)

export default router
