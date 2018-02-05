import * as request from 'request'

const baseUrl = `http://localhost:4000/api/post`

describe('/GET posts', () => {
    it('get all the post', (done) => {
        request.get(`${baseUrl}`, (error, response, body) => {
            const bodyObj = JSON.parse(body)
            // console.log(bodyObj, error)
            expect(response.statusCode).toEqual(200)
            expect(bodyObj.length).toEqual(7)
            done()
        })
    })

    it('get the post id', (done) => {
        request.get(`${baseUrl}/5c8af476-b6f3-46e2-a358-5c2db76506ab`, (error, response, body) => {
            const bodyObj = JSON.parse(body)
            expect(response.statusCode).toEqual(200)
            expect(bodyObj.title).toEqual('post 1')
            expect(bodyObj.content).toEqual('hello world')
            done()
        })
    })
})

describe('/POST posts', () => {
    xit('/POST create post id', (done) => {
        const data = {
            title: 'create post 1',
            content: 'test 1',
        }
        request.post({
            headers: {'content-type' : 'application/json'},
            url: baseUrl,
            json: data,
            }, (error, response, body) => {
                expect(response.statusCode).toEqual(201)
                expect(body.title).toEqual('create post 1')
                expect(body.content).toEqual('test 1')
                done()
            },
        )
    })

    it('/POST create post with empty field', (done) => {
        const data = {}
        request.post({
            headers: {'content-type' : 'application/json'},
            url: baseUrl,
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
    it('/POST update post id', (done) => {
        const data = {
            title: 'update post title 11',
            content: 'update post content 1',
        }
        request.put({
                headers: {'content-type' : 'application/json'},
                url: `${baseUrl}/3b354572-fe6c-424c-a488-a01bc8f8d28d`,
                json: data,
            }, (error, response, body) => {
                expect(response.statusCode).toEqual(200)
                expect(body.title).toEqual('update post title 11')
                expect(body.content).toEqual('update post content 1')
                done()
            },
        )
    })

    it('/post/:id update post not found id', (done) => {
        const data = {
            title: 'update post title 11',
            content: 'update post content 1',
        }
        request.put({
                headers: {'content-type' : 'application/json'},
                url: `${baseUrl}/3b354572-fe6c-424c-a488-a01bc8f8d28qưeqưed`,
                json: data,
            }, (error, response, body) => {
                expect(response.statusCode).toEqual(500)
                expect(body.error).toEqual('update failed')
                done()
            },
        )
    })
})

describe('/DELETE posts', () => {
    xit('delete the post id', (done) => {
        request.delete(`${baseUrl}/95c1d6f9-afc5-43a0-b2a0-46138ce519d8`, (error, response, body) => {
            const bodyObj = JSON.parse(body)
            expect(response.statusCode).toEqual(200)
            done()
        })
    })

    it('delete the post with id empty', (done) => {
        request.delete(baseUrl, (error, response, body) => {
            expect(response.statusCode).toEqual(404)
            done()
        })
    })
})