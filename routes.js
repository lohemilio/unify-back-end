const universitiesController = require('./controllers/universities')
const usersController = require('./controllers/users')
const express = require('express')
const auth = require('./middleware/auth')
const router = express.Router()

router.get('/',function(req,res){
    res.send("WELCOME TO THE API, TRY ONE OF THE ROUTES")
})

//UNIVERSITIES ROUTES
router.get('/universities',universitiesController.getUniversities)
router.get('/universities/:id',universitiesController.getUniversity)
router.post('/universities',universitiesController.createUniversity)
router.patch('/universities/:id', universitiesController.updateUniversity)
router.delete('/universities/:id', universitiesController.deleteUniversity)

//USERS ROUTES
router.get('/users', auth,usersController.getUser)
router.post('/login', usersController.login)
router.post('/logout', auth, usersController.logout)
//router.get('/users', auth,usersController.getUsers)
router.post('/users', usersController.createUser) // REGISTER
router.patch('/users/', auth,usersController.updateUser)
router.delete('/users/', auth,usersController.deleteUser)

module.exports = router