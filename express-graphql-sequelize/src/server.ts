import * as express from 'express'
import * as bodyParser from 'body-parser'
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express'
import myGraphQLSchema from './schema'

import routerPost from '../rest/routes'

const app = express()

app.use(bodyParser.json())

app.use('/api/', routerPost)

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }))

app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(4000)

// console.log('GraphQL Server running on localhost:4000')
