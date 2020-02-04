const mongoose = require('mongoose')

const universitySchema = new mongoose.Schema({
    name:{
        type: String
    },
    price:{
        type: Number
    },
    calendar: {
        type: String
    },
    type:{
        type: String
    },
    programs:{
        type: [String]
    },
    graduates:{
        type: [String]
    },
    phone:{
        type: String
    },
    address:{
        type: String
    },
    photos:{
        type:[String]
    },
    places:{
        type:[String]
    },
    difficulty:{
        type: String
    },
    description:{
        type: String
    },
    logo: {
        type: String
    }

})

module.exports = University = mongoose.model('university',universitySchema)