const { expect } = require('chai')
const request = require('./utils/request')

const username = 'Test User'
const email = 'test@test.com'
const password = 'testuser123'

describe('Authentication endpoints', () => {
    describe('Register', () => {
        it('should fail register if no body is sent', async () => {
            return request('post', '/auth/register', {})
                .then(res => {
                    expect(res).to.be.equal(undefined)
                }).catch(err => {
                    expect(err).to.be.a('object')
                    expect(err).to.has.property('errors')
                    expect(err.errors).to.be.a('array')
                    expect(err.errors).length(5)

                    expect(err.errors[0].msg).to.be.a('string')
                    expect(err.errors[0].param).to.be.equal('username')
                    expect(err.errors[0].msg).to.be.equal('Username is required')

                    expect(err.errors[1].msg).to.be.a('string')
                    expect(err.errors[1].param).to.be.equal('username')
                    expect(err.errors[1].msg).to.be.equal('Username length may be between 4 and 20 characters')

                    expect(err.errors[2].msg).to.be.a('string')
                    expect(err.errors[2].param).to.be.equal('email')
                    expect(err.errors[2].msg).to.be.equal('Email is not a valid email address')

                    expect(err.errors[3].msg).to.be.a('string')
                    expect(err.errors[3].param).to.be.equal('password')
                    expect(err.errors[3].msg).to.be.equal('Password is required')

                    expect(err.errors[4].msg).to.be.a('string')
                    expect(err.errors[4].param).to.be.equal('password')
                    expect(err.errors[4].msg).to.be.equal('Password is too small')
                })
        })

        it('should fail register if no username is sent', async () => {
            return request('post', '/auth/register', {
                email,
                password
            }).then(res => {
                expect(res).to.be.equal(undefined)
            }).catch(err => {
                expect(err).to.be.a('object')
                expect(err).to.has.property('errors')
                expect(err.errors).to.be.a('array')
                expect(err.errors).length(2)

                expect(err.errors[0].msg).to.be.a('string')
                expect(err.errors[0].param).to.be.equal('username')
                expect(err.errors[0].msg).to.be.equal('Username is required')

                expect(err.errors[1].msg).to.be.a('string')
                expect(err.errors[1].param).to.be.equal('username')
                expect(err.errors[1].msg).to.be.equal('Username length may be between 4 and 20 characters')
            })
        })

        it('should fail register if no email is sent', async () => {
            return request('post', '/auth/register', {
                username,
                password
            }).then(res => {
                expect(res).to.be.equal(undefined)
            }).catch(err => {
                expect(err).to.be.a('object')
                expect(err).to.has.property('errors')
                expect(err.errors).to.be.a('array')
                expect(err.errors).length(1)

                expect(err.errors[0].msg).to.be.a('string')
                expect(err.errors[0].param).to.be.equal('email')
                expect(err.errors[0].msg).to.be.equal('Email is not a valid email address')
            })
        })

        it('should fail register if no username is sent', async () => {
            return request('post', '/auth/register', {
                email,
                password
            }).then(res => {
                expect(res).to.be.equal(undefined)
            }).catch(err => {
                expect(err).to.be.a('object')
                expect(err).to.has.property('errors')
                expect(err.errors).to.be.a('array')
                expect(err.errors).length(2)

                expect(err.errors[0].msg).to.be.a('string')
                expect(err.errors[0].param).to.be.equal('username')
                expect(err.errors[0].msg).to.be.equal('Username is required')

                expect(err.errors[1].msg).to.be.a('string')
                expect(err.errors[1].param).to.be.equal('username')
                expect(err.errors[1].msg).to.be.equal('Username length may be between 4 and 20 characters')
            })
        })

        it('should fail register if password is too small', async () => {
            return request('post', '/auth/register', {
                username,
                email,
                password: 'a'
            }).then(res => {
                expect(res).to.be.equal(undefined)
            }).catch(err => {
                expect(err).to.be.a('object')
                expect(err).to.has.property('errors')
                expect(err.errors).to.be.a('array')
                expect(err.errors).length(1)

                expect(err.errors[0].msg).to.be.a('string')
                expect(err.errors[0].param).to.be.equal('password')
                expect(err.errors[0].msg).to.be.equal('Password is too small')
            })
        })

        it('should fail register if email is not a valid address', async () => {
            return request('post', '/auth/register', {
                username,
                email: 'abcd',
                password
            }).then(res => {
                expect(res).to.be.equal(undefined)
            }).catch(err => {
                expect(err).to.be.a('object')
                expect(err).to.has.property('errors')
                expect(err.errors).to.be.a('array')
                expect(err.errors).length(1)

                expect(err.errors[0].msg).to.be.a('string')
                expect(err.errors[0].param).to.be.equal('email')
                expect(err.errors[0].msg).to.be.equal('Email is not a valid email address')
            })
        })

        it('should register if valid body is sent', async () => {
            return request('post', '/auth/register', {
                username,
                email,
                password
            }).then(res => {
                    expect(res.data.token).to.be.a('string')
                    expect(res.data.user).to.be.a('object')
                    expect(res.status).to.be.equal(201)
            }).catch(err => {
                expect(err).to.be.equal(undefined)
            })
        })

        it('should fail register if username is already in use', async () => {
            return request('post', '/auth/register', {
                username,
                email,
                password
            }).then(res => {
                expect(res).to.be.equal(undefined)
            }).catch(err => {
                expect(err).to.be.a('object')
                expect(err.errors).to.be.a('array')
                expect(err.errors).length(2)
                expect(err.errors[0].param).to.be.equal('username')
                expect(err.errors[0].msg).to.be.equal('Username is already in use')
                expect(err.errors[1].param).to.be.equal('email')
                expect(err.errors[1].msg).to.be.equal('Email is already in use')
            })
        })
    })

    describe('Login', () => {
        it('should fail login if no username and password are sent', async () => {
            return request('post', '/auth/login', {}).then(res => {
                expect(res).to.be.equal(undefined)
            }).catch(err => {
                expect(err).to.be.a('object')
                expect(err.errors).to.be.a('array')
                expect(err.errors[0].param).to.be.equal('username')
                expect(err.errors[0].msg).to.be.equal('Username is required')
                expect(err.errors[1].param).to.be.equal('password')
                expect(err.errors[1].msg).to.be.equal('Password is required')
            })
        })

        it('should fail login if no username is sent', async () => {
            return request('post', '/auth/login', { password }).then(res => {
                expect(res).to.be.equal(undefined)
            }).catch(err => {
                expect(err).to.be.a('object')
                expect(err.errors).to.be.a('array')
                expect(err.errors[0].param).to.be.equal('username')
                expect(err.errors[0].msg).to.be.equal('Username is required')
            })
        })


        it('should fail login if no password is sent', async () => {
            return request('post', '/auth/login', { username }).then(res => {
                expect(res).to.be.equal(undefined)
            }).catch(err => {
                expect(err).to.be.a('object')
                expect(err.errors).to.be.a('array')
                expect(err.errors[0].param).to.be.equal('password')
                expect(err.errors[0].msg).to.be.equal('Password is required')
            })
        })

        it('should fail login if password is incorrect', async () => {
            return request('post', '/auth/login', { username, password: 'abde' }).then(res => {
                expect(res).to.be.equal(undefined)
            }).catch(err => {
                expect(err).to.be.a('object')
                expect(err).to.has.property('message')
                expect(err.message).to.be.a('string')
                expect(err.message).to.be.equal('Invalid password')
            })
        })

        it('should login with success', async () => {
            return request('post', '/auth/login', { username, password }).then(res => {
                expect(res.data.token).to.be.a('string')
                expect(res.data.user).to.be.a('object')
                expect(res.status).to.be.equal(200)
            }).catch(err => {
                expect(err).to.be.equal('array')
            })
        })
    })

})
