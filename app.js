const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')

const graphQlSchema = require('./graphql/schema')
const graphQlResolvers = require('./graphql/resolvers')

const app = express()

app.use(bodyParser.json())


app.use('/graphql', graphqlHttp({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true,
}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-spppf.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, {
  useNewUrlParser: true
})
  .then(() => {
    app.listen(3000, () => {
      console.log(`server running on port 3000`)
    })
  })
  .catch(err => {
    console.log(err)
  })