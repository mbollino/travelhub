const express = require('express')
const router = express.Router()

const User = require('../models/user.js')

router.get('/',  async (req, res) => {
   try {
    const currentUser = await User.findById(req.session.user._id)
    res.render('clients/index.ejs', {
        clients: currentUser.clients,
    })
   } catch (error) {
    console.log(error)
    res.redirect('/')
   }
})

router.get('/new', async (req, res) => {
    res.render('clients/new.ejs')
})


router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        if(req.body.phonePreferred === 'on') {
            req.body.phonePreferred = true
        } else {
            req.body.phonePreferred = false
        }
        if(req.body.emailPreferred === 'on') {
            req.body.emailPreferred = true
        } else {
            req.body.emailPreferred = false
        }
        const phoneNumber = {
            phoneNumber: req.body.phoneNumber,
            category: req.body.category
        }
        currentUser.clients.push(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/clients`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/:clientId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const client = currentUser.clients.id(req.params.clientId)
        res.render('clients/show.ejs', {
            client: client
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router