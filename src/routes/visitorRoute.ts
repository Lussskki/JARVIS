import { Router } from 'express'
import { trackVisitor, getStats } from '../controllers/visitorController.js'
const router = Router()

router.post('/track', trackVisitor)
router.get('/admin/stats', getStats)

export default router