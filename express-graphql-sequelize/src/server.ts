import * as express from 'express'
import * as bodyParser from 'body-parser'
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express'
import myGraphQLSchema from './schema'

import routerPost from '../rest/routes'

const PORT: number = 4000

const app = express()

app.use(bodyParser.json())

app.use('/api/', routerPost)

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }))

app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(PORT)

export default app
