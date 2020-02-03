const universitiesController = require('./controllers/universities')
const express = require('express')
const router = express.Router()

router.get('/',function(req,res){
    res.send("WELCOME TO THE API, TRY ONE OF THE ROUTES")
})
router.get('/universities',universitiesController.getUniversities)
router.get('/universities/:id',universitiesController.getUniversity)
router.post('/universities',universitiesController.createUniversity)
router.patch('/universities/:id', universitiesController.updateUniversity)
router.delete('/universities/:id', universitiesController.deleteUniversity)


module.exports = router