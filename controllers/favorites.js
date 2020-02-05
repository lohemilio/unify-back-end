const Favorite = require('../models/favorite')

const getFavorites = function(req, res) {
    // solo podemos hacer GET de los todos del usuario que hizo login
    Favorite.find({ createdBy: req.user._id}).then(function(favorites) {
      res.send(favorites)
    }).catch(function(error){
      res.status(500).send(error)
    })
  }

  const getFavorite = function(req, res) {
    // solo podemos traer el todo si es que es del usuario que hizo login
    const _id = req.params.id
    Favorite.findOne({ _id, createdBy: req.user._id }).then(function(favorite) {
      if(!favorite){
        return res.status(404).send({ error: `Favorite with id ${_id} not found.`})
      }
      return res.send(favorite)
    }).catch(function(error) {
      return res.status(500).send({ error: error })
    })
  }

  const createFavorite = function(req, res){
    // los ... son para copiar todo el req.body
    // modificar aqui
    const favorite = new Favorite({
      //...req.body.description
      universityName: req.body.universityName,
      universityId: req.body.universityId,
      createdBy: req.user._id
    })
    favorite.save().then(function() {
      return res.send(favorite)
    }).catch(function(error) {
      return res.status(400).send({ error: "LA UNIVERSIDAD: " + favorite.universityName + " Ya está en tu lista de favoritos" })
    })
  }

  const deleteFavorite = function(req, res) {
    const _id = req.params.id
    Favorite.findOneAndDelete({ _id, createdBy: req.user._id }).then(function(favorite){
      if(!favorite) {
        return res.status(404).send({ error: `Task with id ${_id} not found.`})
      }
      return res.send(favorite)
    }).catch(function(error) {
      res.status(505).send({ error: error })
    })
  }

module.exports = {
    getFavorites,
    getFavorite,
    createFavorite,
    deleteFavorite
}