require('./db/connection.js')
const express = require ('express')
const app = express()
const port = process.env.PORT || 3000

const router = require('./routes.js')

var cors = require('cors')


app.use(cors())
app.use(express.json())
//app.use('./models/universities.js',require('./routes'))
//app.unsubscribe(router)

app.use(router)
app.listen(port, function() {
    console.log('Server up and running on port ' + port)
  })

