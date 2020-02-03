require('./db/connection.js')
const express = require ('express')
const app = express()
const Port = process.env.Port || 3000

const router = require('./routes.js')



app.use(express.json())
//app.use('./models/universities.js',require('./routes'))
//app.unsubscribe(router)

app.use(router)
app.listen(Port, () => console.log('Server started'))

