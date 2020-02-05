const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
    universityName:{
        type: String,
    },
    universityId:{
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Favorite = mongoose.model('Favorite', favoriteSchema)

module.exports = Favorite