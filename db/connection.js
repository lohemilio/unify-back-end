const mongoose = require('mongoose')
const config = require('../config.js')
const URI = process.env.CURL || config.connectionURL 

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,     // crear indexes
    useUnifiedTopology: true,
    useFindAndModify: false
  }, (err)=>{
      if (!err){
          console.log('MongoDB connection succeeded')
      }
  })

  require('../models/university.js')