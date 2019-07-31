const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config();

const app = express()

mongoose.connect(`mongodb://${ process.env.DB_HOST }:${ process.env.DB_PORT }/${ process.env.DB_NAME }`, { useNewUrlParser: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  
  const port = process.env.PORT || 3100

  app.use(cors())
  app.use(morgan('dev'))
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json())

  app.use('/api/member', require('./routes/member.route'))

  app.listen(port, () => {
    console.log('server is running or port : ' + port)
  })
})
