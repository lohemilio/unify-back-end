const User = require('../models/user')


//LOGOUT

const logout = function(req, res) {
    req.user.tokens = req.user.tokens.filter(function(token) {
      return token.token !== req.token
    })
    req.user.save().then(function() {
      return res.send()
    }).catch(function(error) {
      return res.status(500).send({ error: error } )
    })
  }

// GET USERS

const getUsers = function(req, res) {
    User.find({}).then(function(users) {
      res.send(users)
    }).catch(function(error){
      res.status(500).send(error)
    })
  }

// GET USER 

const getUser = function(req, res) {
    // cualquier usuario no deberia ser capaz de ver la info de otro usuario
    // a menos que sea un admin. Aqui yo ya no admitire que me pasen el :id como
    // parametro. Solo usare el id de la request-> req.user._id
    // como ya tenemos toda la info del usuario gracias a auth
    // ya no necesitamos hacer un User.findOne de nuevo!,
    // todo esta en req.user
    // solo nos faltaria agregar los todos del Schema Todo
    // y eso se usa con lo siguiente:
    // req.user.populate() Donde
  
    User.findById( req.user._id ).populate('todos').exec(function(error, user) {
    // req.user.populate('todos').exec(function(error, user) {  
      // user ya tiene la info de req.user y req.user.todos
      return res.send(user)
    })
    // }).catch(function(error) {
    //   return res.status(500).send(error)
  }

// CREATE USER / REGISTER

const createUser = function(req, res){
    const user = new User(req.body)
    user.save().then(function() {
      return res.send(user)
    }).catch(function(error) {
      return res.status(400).send(error)
    })
  }


  
//LOGIN 

const login = function(req, res) {
    console.log(req.body)
    User.findByCredentials(req.body.email, req.body.password).then(function(user){
      user.generateToken().then(function(token){
        return res.send({user, token})
      }).catch(function(error){
        return res.status(401).send({ error: error })
      })
    }).catch(function(error) {
      return res.status(401).send({ error: error })
    })
  }
// UPDATE USER

const updateUser = function(req, res) {
    // solo admitire hacer update de mi usuario que hizo login
    // quité la ruta de PATCH users/:id y la cambie por PATCH /users
    // const _id = req.params.id
    const _id = req.user._id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
  
    if( !isValidUpdate ) {
      return res.status(400).send({
        error: 'Invalid update, only allowed to update: ' + allowedUpdates
      })
    }
    User.findByIdAndUpdate(_id, req.body ).then(function(user) {
      if (!user) {
        return res.status(404).send()
      }
      return res.send(user)
    }).catch(function(error) {
      res.status(500).send(error)
    })
  }

// DELETE USER

const deleteUser = function(req, res) {
    // const _id = req.params.id
    const _id = req.user._id
    User.findByIdAndDelete(_id).then(function(user){
      if(!user) {
        return res.status(404).send()
      }
      return res.send(user)
    }).catch(function(error) {
      res.status(505).send(error)
    })
  }


module.exports = {
    login,
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    logout
}