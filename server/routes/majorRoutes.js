import { Router } from 'express'
import {
  createMajor,
  deleteMajor,
  getMajorById,
  getMajors,
  updateMajor,
} from '../controllers/majorController.js'

const router = Router()

router.route('/').get(getMajors).post(createMajor)
router.route('/:id').get(getMajorById).put(updateMajor).delete(deleteMajor)

export default router
