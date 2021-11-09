const router = require('express').Router()

const notesRouter = require('./notesRoutes')
const userRouter = require('./userRoutes')

router.use('/users', userRouter)
router.use('/notes', notesRouter)

module.exports = router
