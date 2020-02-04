const universitiesController = require('./controllers/universities')
const usersController = require('./controllers/users')
const favoritesController = require('./controllers/favorites')
const express = require('express')
const auth = require('./middleware/auth')
const router = express.Router()



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

//FAVORITES ROUTES 
router.get('/favorites/:id',auth,favoritesController.getFavorite)
router.get('/favorites',auth, favoritesController.getFavorites)
router.post('/favorites', auth, favoritesController.createFavorite)
//router.patch('/favorites/:id',auth,favoritesController.updateFavorite)
router.delete('/favorites/:id',auth,favoritesController.deleteFavorite)


module.exports = router