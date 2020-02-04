const validator = require('validator')
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

var secret = process.env.SECRET || require('../config.js').secret

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if( !validator.isEmail(value) ) {
              throw new Error('Email invalido')
            }
        }
    },
    password:{
        type: String,
        trim: true,
        required: true,
        minlength: 6
    },
    admin:
    {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
          type: String,
          required: true 
        }
      }]
},{
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true 
    }
  })

  // una relacion entre dos Schemas, no lo guarda, es virtual 
userSchema.virtual('favorites', {
    ref: 'Favorite',
    localField: '_id',
    foreignField: 'createdBy'
  })

  userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
  
    delete userObject.password
    delete userObject.tokens
  
    return userObject
  }


userSchema.methods.generateToken = function(){
    const user = this
    const token = jwt.sign({ _id: user._id.toString()},
    secret,{expiresIn: '7 days'})
    user.tokens = user.tokens.concat({token})
    user.save().then(function(user){
        return resolve(token)
      }).catch(function(error){
        return reject(error)
      })
    
}

userSchema.statics.findByCredentials = function(email, password) 
{
  return new Promise( function(resolve, reject) {
    User.findOne({ email }).then(function(user) {
      if (!user) {
        return reject('User does not exist')
      }
      bcryptjs.compare(password, user.password).then(function (match) {
        if( match ) {
          return resolve(user)
        }
        return reject('Wrong password')
      }).catch( function(error) {
        return reject('Wrong password')
      })
    })
  })
}


userSchema.pre('save', function(next) {
    const user = this
    if (user.isModified('password') ) {
      bcryptjs.hash(user.password, 8).then(function(hash) {
        user.password = hash
        next()
      }).catch(function(error) {
        return next(error)
      })
    } else {
      next()
    }
  })


  const User = mongoose.model('User', userSchema)

  module.exports = User
  