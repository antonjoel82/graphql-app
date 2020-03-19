const express = require('express')
const GraphQLHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const { dbUser, pwd } = require('./connectionInfo')
const cors = require('cors')

const APP_PORT = 8080
const app = express()

// allow cross-origin requests
app.use(cors())

mongoose.connect(
  `mongodb+srv://${dbUser}:${pwd}@joel-dev-cluster-k4tai.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB via Mongoose + Atlas!')
})

app.use(
  '/graphql',
  GraphQLHTTP({
    schema,
    graphiql: true
  })
)

app.listen(APP_PORT, () => {
  console.log(`Now listening on ${APP_PORT}`)
})
