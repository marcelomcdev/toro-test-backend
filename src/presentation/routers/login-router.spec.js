class LoginRouter {
    route(httpRequest){
        if(!httpRequest || !httpRequest.body) {
            return { 
                statusCode: 500
            }
        }
        const {email, password} = httpRequest.body
        if(!email || !password){
            return{
                statusCode: 400
            } 
        }
    }
}

describe('Login router', ()=> {
    test('Should return 400 if no email is provided', ()=>{
        const sut = new LoginRouter() //system under test
        const httpRequest = {
            body: {
                password: 'any_password'
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })


    test('Should return 400 if no password is provided', ()=>{
        const sut = new LoginRouter() //system under test
        const httpRequest = {
            body: {
                email: 'any_email@email.com'
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 500 if no httpRequest is provided', ()=>{
        const sut = new LoginRouter() //system under test
        const httpResponse = sut.route()
        expect(httpResponse.statusCode).toBe(500)
        
    })


    test('Should return 500 if has no body', ()=>{
        const sut = new LoginRouter() //system under test
        const httpResponse = sut.route({})
        expect(httpResponse.statusCode).toBe(500)
    })


})

