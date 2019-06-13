import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import './workers/crawlQueue'

import configs from './configs'

// app
const app = express()

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev')) // loger
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, x-access-token')
  res.setHeader('Content-Type', 'application/json')
  next()
})

// parse Content-Type: application/json
app.use(bodyParser.json())

// parse Content-Type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(configs.PORT, () => console.log("Ok")) // eslint-disable-line

// keep server running
process.on('uncaughtException', err => console.log('uncaughtException', err)) // eslint-disable-line
process.on('unhandledRejection', err => console.log('unhandledRejection', err)) // eslint-disable-line
