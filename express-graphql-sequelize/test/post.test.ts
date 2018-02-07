process.env.NODE_ENV = 'test'

import {} from 'jest'
import * as request from 'request'
import seed from './seed'
import * as sequelize from '../models/index'
import * as crypto from 'crypto'
import Server from '../src/server'

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

afterAll(() => {
    return Posts.drop()
})

const dtUpdate = {
    title: 'update post title',
    content: 'update post content',
}

describe('/GET posts', () => {
    it('GET should return all post', (done) => {
        request.get('http://localhost:4000/api/posts', (error, response, body) => {
            const bodyObj = JSON.parse(body)
            // console.log(bodyObj)
            expect(response.statusCode).toEqual(200)
            expect(bodyObj.length).toBeGreaterThan(0)
            done()
        })
    })

    xit('GET should return empty post', (done) => {
        request.get('http://localhost:4000/api/posts', (error, response, body) => {
            const bodyObj = JSON.parse(body)
            expect(response.statusCode).toEqual(200)
            expect(bodyObj.length).toBe(0)
            done()
        })
    })

    it('GET/:id should return post id', (done) => {
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

    it('GET/:id should post id not found', (done) => {
        request.get(`http://localhost:4000/api/posts/1`, (error, response, body) => {
            const bodyObj = JSON.parse(body)
            expect(response.statusCode).toEqual(404)
            expect(bodyObj.error).toEqual('Post not found!')
            done()
        })
    })
})

describe('/POST posts', () => {
    it('POST should add new post', (done) => {
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
})

describe('/PUT posts', () => {
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

    it('/put/:id update post not found id', (done) => {
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
})

describe('/DELETE posts', () => {
    it('delete the post id', (done) => {
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

    it('delete the post with id empty', (done) => {
        const id = crypto.randomBytes(20).toString('hex')
        request.delete(`http://localhost:4000/api/posts/${id}`, (error, response, body) => {
            expect(response.statusCode).toEqual(404)
            done()
        })
    })
})
