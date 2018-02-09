process.env.NODE_ENV = 'test'
import {} from 'jest'
import * as req from 'request'
import * as request from 'supertest'
import seed from './seed'
import * as sequelize from '../models/index'
import { graphql } from 'graphql'
import schema from '../src/schema'
import app from '../src/server'

const Posts = sequelize[`Post`]

beforeAll((done) => {
    Posts.sync({ force: true })
    .then(() => seed(Posts))
    .then(() => {
        done()
    })
})

afterAll(() => {
    return Posts.drop()
})

describe('RESTful API test', () => {
    it('GET /posts should return all post', (done) => {
        request(app)
        .get('/api/posts/')
        .then((response) => {
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual(expect.any(Array))
            done()
        })
    })

    xit('GET /posts should return empty post', (done) => {
        Posts.truncate()
        request(app)
        .get('/api/posts/')
        .then((response) => {
            expect(response.statusCode).toBe(200)
            expect(response.body).toHaveLength(0)
        })
        .then(() => seed(Posts))
        done()
    })

    it('GET /posts/:id should return post id', async (done) => {
        const id = await Posts.findAll().then( (post) => post[0].id)
        await request(app)
        .get(`/api/posts/${id}`)
        .then((response) => {
            expect(response.statusCode).toBe(200)
            expect(response.body.content).toBe('Post content demo')
            done()
        })
    })

    it('GET /posts/:id post id not found', (done) => {
        request(app)
        .get(`/api/posts/1`)
        .then((response) => {
            expect(response.statusCode).toBe(404)
            expect(response.body.error).toBe('Post not found!')
            done()
        })
    })

    it('POST/ posts should add new post', (done) => {
        const data = {
            title: 'create post 1',
            content: 'test 1',
        }
        request(app)
        .post(`/api/posts/`)
        .send(data)
        .then((response) => {
            expect(response.statusCode).toBe(201)
            expect(response.body.title).toEqual(data.title)
            expect(response.body.content).toEqual(data.content)
            done()
        })
    })

    it('POST/ create post with empty field', (done) => {
        const data = {}
        request(app)
        .post(`/api/posts/`)
        .send(data)
        .then((response) => {
            expect(response.statusCode).toBe(400)
            expect(response.body.Error).toEqual('Create request body is empty')
            done()
        })
    })

    it('/PUT/:id update post id', async (done) => {
        const dtUpdate = {
            title: 'update post title',
            content: 'update post content',
        }
        const id = await Posts.findAll().then( (post) => post[0].id)
        await request(app)
        .put(`/api/posts/${id}`)
        .send(dtUpdate)
        .then((response) => {
            expect(response.statusCode).toEqual(200)
            expect(response.body.title).toEqual(dtUpdate.title)
            expect(response.body.content).toEqual(dtUpdate.content)
            done()
        })
    })

    it('/PUT should update post empty id', (done) => {
        const dtUpdate = {
            title: 'update post title',
            content: 'update post content',
        }
        request(app)
        .put(`/api/posts/`)
        .send(dtUpdate)
        .then((response) => {
            expect(response.statusCode).toEqual(404)
            done()
        })
    })

    it('/PUT/:id update post id wrong', (done) => {
        const dtUpdate = {
            title: 'update post title',
            content: 'update post content',
        }
        const id = Math.random().toString(36).substr(2, 5)
        request(app)
        .put(`/api/posts/${id}`)
        .send(dtUpdate)
        .then((response) => {
            expect(response.statusCode).toEqual(500)
            expect(response.body.error).toEqual('update failed')
            done()
        })
    })

    it('DELETE the post id', async (done) => {
        const id = await Posts.findAll().then( (post) => post[0].id)
        await request(app).del(`/api/posts/${id}`)
        .then((response) => {
            expect(response.statusCode).toEqual(200)
            expect(response.body.message).toEqual('Deleted successfully')
            done()
        })
    })

    it('DELETE the post with empty id', (done) => {
        request(app).del(`/api/posts/`)
        .then((response) => {
            expect(response.statusCode).toEqual(404)
            done()
        })
    })

    it('DELETE the post with id wrong', (done) => {
        const id = Math.random().toString(36).substr(2, 5)
        request(app).del(`/api/posts/${id}`)
        .then((response) => {
            expect(response.statusCode).toEqual(500)
            expect(response.body.error).toEqual('delete failed')
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
        expect(data.posts).toEqual(expect.any(Array))
    })

    it('Query test get posts/:id', async () => {
        const id = await Posts.findAll().then( (post) => post[0].id)
        const query = `
            query {
                post(id: "${id}") {
                    id
                    title
                }
            }
        `
        const result = await graphql(schema, query)
        const { data } = result
        expect(data).toHaveProperty('post')
        expect(data).toEqual(expect.any(Object))
    })

    it('Query test posts not found id', async () => {
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
        expect(result).toHaveProperty('errors')
    })

    it('Mutation update posts done', async () => {
        const id = await Posts.findAll().then( (post) => post[0].id)
        const query = `
            mutation {
                updatePost (id: "${id}",title: "graphql update", content: "graphql post") {
                    id
                    title
                    content
                }
            }
        `
        const result = await graphql(schema, query)
        const { data } = result
        expect(data).toHaveProperty('updatePost')
        expect(data.updatePost.title).toBe('graphql update')
        expect(data.updatePost.content).toBe('graphql post')
    })

    it('Mutation update posts not found id', async () => {
        const query = `
            mutation {
                updatePost (id: "",title: "test update", content: "update post") {
                    id
                    title
                    content
                }
            }
        `
        const result = await graphql(schema, query)
        const { data } = result
        expect(data).toHaveProperty('updatePost', null)
    })

    it('Mutation delete posts done', async () => {
        const id = await Posts.findAll().then( (post) => post[0].id)
        const query = `
            mutation {
                deletePost (id: "${id}") {
                    status
                }
            }
        `
        const result = await graphql(schema, query)
        const { data } = result
        expect(data.deletePost).toEqual({ status: 'success' })
    })

    it('Mutation delete posts not found id', async () => {
        const id = Math.random().toString(36)
        const query = `
            mutation {
                deletePost (id: "") {
                    status
                }
            }
        `
        const result = await graphql(schema, query)
        const { data } = result
        expect(data.deletePost).toEqual({ status: 'failed' })
    })

    it('Mutation delete posts systax error', async () => {
        const id = Math.random().toString(36)
        const query = `
            mutation {
                deletePost (id: "") {
                    title
                }
            }
        `
        const result = await graphql(schema, query)
        expect(result).toHaveProperty('errors')
    })
})
