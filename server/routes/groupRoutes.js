import { Router } from 'express'
import {
  createGroup,
  deleteGroup,
  getGroupById,
  getGroups,
  updateGroup,
} from '../controllers/groupController.js'

const router = Router()

router.route('/').get(getGroups).post(createGroup)
router.route('/:id').get(getGroupById).put(updateGroup).delete(deleteGroup)

export default router
