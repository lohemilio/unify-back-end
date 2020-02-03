const express = require('express')
var router = express.Router()
const University = require('../models/university.js')



//GET UNIVERSITIES
const getUniversities = function(req, res) {
  University.find({}).then(function(universities) {
    res.send(universities)
    console.log(universities)
  }).catch(function(error){
    res.status(500).send({ error })
  })
}

//GET UNIVERSITY BY ID
const getUniversity = function(req, res) {
  _id = req.params.id
  University.findById(_id).then(function(university) {
    if ( !university ) {
      return res.send({ error : 'University not found' })
    }
    return res.send(university)
  }).catch(function(error) {
    return res.status(404).send({ error })
  })
}

//CREATE UNIVERSIY
const createUniversity = function(req, res) {
  const university = new University(req.body)
  university.save().then(function() {
    return res.send(university)
  }).catch(function(error) {
    return res.status(400).send({ error })
  })
}

//UPDATE UNIVERSITY
const updateUniversity = function(req, res) {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'price', 'calendar', 'type','programs','graduates','phone','address','photos','places','difficulty','description','logo']
  // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if( !isValidUpdate ) {
    return res.status(400).send({
      error: 'Invalid update, only allowed to update: ' + allowedUpdates
    })
  }
  University.findByIdAndUpdate(_id, req.body ).then(function(university) {
    if (!university) {
      return res.status(404).send({})
    }
    return res.send(university)
  }).catch(function(error) {
    res.status(500).send({ error })
  })
}

//DELETE UNIVERSITY
const deleteUniversity = function(req, res) {
  const _id = req.params.id
  University.findByIdAndDelete(_id).then(function(university){
    if(!university) {
      return res.status(404).send({})
    }
    return res.send(university)
  }).catch(function(error) {
    res.status(505).send({ error })
  })
}

module.exports = {
  getUniversities,
  getUniversity,
  createUniversity,
  updateUniversity,
  deleteUniversity
}

