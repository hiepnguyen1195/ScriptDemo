process.env.NODE_ENV = 'test'

import {} from 'jest'
import * as request from 'request'
import seed from './seed'
import * as sequelize from '../models/index'
import * as crypto from 'crypto'
import Server from '../src/server'

import { graphql } from 'graphql'
import schema from '../src/schema'

const app = new Server()
app.start()
const Posts = sequelize[`Post`]

beforeAll((done) => {
    Posts.sync({ force: true })
    .then(() => {
        return seed(Posts)
    }).then(() => {
        done()
    })
})

// afterAll(() => {
//     return Posts.drop()
// })

const dtUpdate = {
    title: 'update post title',
    content: 'update post content',
}

describe('RESTful API test', () => {
    it('GET /posts should return all post', (done) => {
        request.get('http://localhost:4000/api/posts', (error, response, body) => {
            const bodyObj = JSON.parse(body)
            // console.log(bodyObj)
            expect(response.statusCode).toEqual(200)
            expect(bodyObj.length).toBeGreaterThan(0)
            done()
        })
    })

    xit('GET /posts should return empty post', (done) => {
        request.get('http://localhost:4000/api/posts', (error, response, body) => {
            const bodyObj = JSON.parse(body)
            expect(response.statusCode).toEqual(200)
            expect(bodyObj.length).toBe(0)
            done()
        })
    })

    it('GET /posts/:id should return post id', (done) => {
        Posts.findAll()
        .then((result) => {
            const id = result[0].id
            request.get(`http://localhost:4000/api/posts/${id}`, (error, response, body) => {
            const bodyObj = JSON.parse(body)
            expect(response.statusCode).toEqual(200)
            expect(bodyObj.id).toEqual(id)
            done()
            })
        })
    })

    it('GET /posts/:id should post id not found', (done) => {
        request.get(`http://localhost:4000/api/posts/1`, (error, response, body) => {
            const bodyObj = JSON.parse(body)
            expect(response.statusCode).toEqual(404)
            expect(bodyObj.error).toEqual('Post not found!')
            done()
        })
    })

    it('POST /posts should add new post', (done) => {
        const data = {
            title: 'create post 1',
            content: 'test 1',
        }
        request.post({
            headers: {'content-type' : 'application/json'},
            url: 'http://localhost:4000/api/posts',
            json: data,
            }, (error, response, body) => {
                expect(response.statusCode).toEqual(201)
                expect(body.title).toEqual(data.title)
                expect(body.content).toEqual(data.content)
                done()
            },
        )
    })

    it('/POST create post with empty field', (done) => {
        const data = {}
        request.post({
            headers: {'content-type' : 'application/json'},
            url: 'http://localhost:4000/api/posts',
            json: data,
            }, (error, response, body) => {
                expect(response.statusCode).toEqual(400)
                expect(body.Error).toEqual('Create request body is empty')
                done()
            },
        )
    })

    it('/PUT should update post id', (done) => {
        Posts.findAll()
        .then((result) => {
            const id = result[0].id
            request.put({
                headers: {'content-type' : 'application/json'},
                url: `http://localhost:4000/api/posts/${id}`,
                json: dtUpdate,
            }, (error, response, body) => {
                expect(response.statusCode).toEqual(200)
                expect(body.title).toEqual(dtUpdate.title)
                expect(body.content).toEqual(dtUpdate.content)
                done()
            },
            )
        })
    })

    it('/PUT/:id update post not found id', (done) => {
        const id = crypto.randomBytes(20).toString('hex')
        request.put({
                headers: {'content-type' : 'application/json'},
                url: `http://localhost:4000/api/posts/${id}`,
                json: dtUpdate,
            }, (error, response, body) => {
                expect(response.statusCode).toEqual(500)
                expect(body.error).toEqual('update failed')
                done()
            },
        )
    })

    it('DELETE the post id', (done) => {
        Posts.findAll()
        .then((result) => {
            const id = result[0].id
            request.delete(`http://localhost:4000/api/posts/${id}`, (error, response, body) => {
                const bodyObj = JSON.parse(body)
                expect(response.statusCode).toEqual(200)
                done()
            })
        })
    })

    it('DELETE the post with id empty', (done) => {
        const id = crypto.randomBytes(20).toString('hex')
        request.delete(`http://localhost:4000/api/posts/${id}`, (error, response, body) => {
            expect(response.statusCode).toEqual(404)
            done()
        })
    })
})

describe('Graphql test', () => {
    it('Query test posts', async () => {
        const query = `
            query {
                posts {
                    id
                    title
                    content
                }
            }
        `
        const result = await graphql(schema, query)
        const { data } = result
        expect(data).toHaveProperty('posts')
    })

    it('Query test get posts/:id', async () => {
        const rid = Posts.findAll()
        .then((post) => {
            console.log(post)
            return post[0].id
        })
        const query = `
            query {
                post(id: "${rid}") {
                    id
                    title
                }
            }
        `
        const result = await graphql(schema, query)
        const { data } = result
        expect(data).toHaveProperty('post', null)
    })

    it('test query not found id posts/:id', async () => {
        Posts.findAll()
        .then((post) => {
            const id = post[0].id
        })
        const query = `
            query {
                post(id: "") {
                    id
                    title
                }
            }
        `
        const result = await graphql(schema, query)
        const { data } = result
        expect(data).toHaveProperty('post', null)
    })

    it('Mutation create posts done', async () => {
        const query = `
            mutation {
                createPost (title: "test create", content: "content post") {
                    id
                    title
                    content
                }
            }
        `
        const result = await graphql(schema, query)
        const { data } = result
        expect(data).toHaveProperty('createPost')
        expect(data.createPost.title).toBe('test create')
        expect(data.createPost.content).toBe('content post')
    })

    it('Mutation create posts error', async () => {
        const query = `
            mutation {
                createPost (content: "content post") {
                    id
                    title
                    content
                }
            }
        `
        const result = await graphql(schema, query)
        const { errors } = result
        expect(errors).toHaveProperty('graphQLErrors')
    })
})
