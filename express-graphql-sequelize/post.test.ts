import * as express from 'express';
import * as sequelize from './models/index';

const request = require('request');

const baseUrl = "http://localhost:4000/api/v1";

describe('test api post', () => {
    it('Get /:id test',()=>{
        request.get(`${baseUrl}/post/84821000-0e39-4ad8-928c-ffcaf360f32e`, 
            (error, response, body) => {
                console.log(body.title, response.statusCode);
                expect(response.statusCode).toEqual(200);
                expect(body.title).toEqual("test create post");
                expect(body.content).toEqual("hello world");
            }
        )
    })

});