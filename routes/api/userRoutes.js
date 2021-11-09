const router = require('express').Router();
const asyncHandler = require('express-async-handler')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()


router.post('/',asyncHandler(async(req, res) => {
    const {name, password} = req.body

    const user = await prisma.create({
        data: {
            name,
            password
        }
    })
    res.json(user)
}))


module.exports = router
