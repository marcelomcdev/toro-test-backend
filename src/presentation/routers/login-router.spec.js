
const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')
const UnauthorizedError = require('../helpers/unauthorized-error')

const makeSut = () => {
    class AuthUseCase {
        auth (email, password) {
            this.email = email
            this.password = password
        }
    }
    const authUseCase = new AuthUseCase()
    const sut = new LoginRouter(authUseCase) //system under test
    return { 
        sut, 
        authUseCase 
    }
}

describe('Login router', ()=> {
    test('Should return 400 if no email is provided', ()=>{
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                password: 'any_password'
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })

    test('Should return 400 if no password is provided', ()=>{
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                email: 'any_email@email.com'
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })

    test('Should return 500 if no httpRequest is provided', ()=>{
        const { sut } = makeSut()
        const httpResponse = sut.route()
        expect(httpResponse.statusCode).toBe(500)
        
    })

    test('Should return 500 if has no body', ()=>{
        const { sut } = makeSut()
        const httpResponse = sut.route({})
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should call AuthUseCase with correct params', ()=>{
        const { sut, authUseCase } = makeSut()
        const httpRequest = {
            body: {
                email: 'any_email@email.com',
                password: 'any_password'
            }
        }
        sut.route(httpRequest)
        expect(authUseCase.email).toBe(httpRequest.body.email)
        expect(authUseCase.password).toBe(httpRequest.body.password)
    })

    test('Should return 401 when invalid credentials are provided', ()=>{
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                email: 'invalid_email@email.com',
                password: 'invalid_password'
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(401)
        expect(httpResponse.body).toEqual(new UnauthorizedError())
        
    })

})

