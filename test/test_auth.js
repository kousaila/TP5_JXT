const chai = require('chai')
const chaiHttp = require('chai-http')
const {app} = require('../app')


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
                res.body.should.includes.all.keys(['access_token', 'expirity'])
                done()
            })
    })
    it('should have acces denied', done => {
        chai
            .request(app)
            .post('/v1/auth/login')
            .send({login: 'pedro', password: 'kouci'})
            .end((err, res) => {
                res.should.have.status(401)
                res.should.be.json
                res.body.should.includes.all.keys(['code', 'type', 'message'])
                res.body.message.should.eql('Unauthorized')
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
                    .get('v1/auth/verifyaccess')
                    .set('ACCESS_TOKEN', 'otherkoukoustoken')
                    .end((err, res) => {
                        res.should.have.status(401)
                        res.should.be.json
                        res.body.should.includes.all.keys(['code', 'type', 'message'])
                        res.body.message.should.eql('Unauthorized')
                    })
            })
    })
    it('should have access', done => {
        chai
            .request(app)
            .post('/v1/auth/login')
            .send({login: 'pedro', password: 'koukou'})
            .end((err, res) => {
                chai.request(app)
                    .get('v1/auth/verifyaccess')
                    .set('ACCES_TOKEN', res.body.acces_token)
                    .end((error, response) => {
                        response.should.have.status(200)
                        response.should.be.json
                        response.body.message.should.eql('OK')
                    })
            })
    })
})