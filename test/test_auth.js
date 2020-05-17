const chai = require('chai')
const chaiHttp = require('chai-http')
const {app} = require('../app')
const bcrypt = require('bcrypt')


chai.should()
chai.use(chaiHttp)

describe('Authentification tests', () => {
    it('should login succzsfuly', done => {
        chai
            .request(app)
            .post('/v1/auth/login')
            .send({login: 'pedro', password: 'koukou'})
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.json
                res.body.should.have.property('message')
                res.body.should.have.property('access_token')
                res.body.message.should.be.eql('OK')
                done()
            })
    })
    it('should not have token', done => {
        chai
            .request(app)
            .post('/v1/auth/login')
            .send({login: 'pedro', password: 'kouci'})
            .end((err, res) => {
                res.should.have.status(401)
                res.should.be.json
                res.body.should.have.property('message')
                res.body.message.should.eql('Unauthorized pas de token')
                done()
            })
    })
    it('should not have access', done => {
        chai
            .request(app)
            .post('/v1/auth/login')
            .send({login: 'pedro', password: 'koukou'})
            .end((err, res) => {
                chai
                    .request(app)
                    .get('/v1/auth/verifyaccess')
                    .set('ACCESS_TOKEN', 'otherImaginarykoukoustoken')
                    .end((errr, ress) => {
                        ress.should.have.status(401)
                        ress.should.be.json
                        ress.body.should.have.property('message')
                        ress.body.message.should.eql('Unauthorized')
                        done()
                    })
            })
    })
    it('should have access', done => {
       chai
        .request(app)
        .post('/v1/auth/login')
        .send({login: 'pedro', password: 'koukou'})
        .end((err, res) => {
            chai
                .request(app)
                .get('/v1/auth/verifyaccess')
                .end((error, response) => {
                    response.should.have.status(401)
                    response.should.be.json
                    response.body.should.have.property('message')
                    response.body.message.should.eql('Unauthorized')
                    done()
                })
        })
})
})