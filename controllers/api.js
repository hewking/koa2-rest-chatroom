let products = require('../products')

const users = require('../user')

const APIError = require('../rest').APIError

module.exports = {
    'GET /api/products' : async(ctx,next) => {
        console.log('api/products')
        ctx.response.type = 'application/json'
        ctx.response.body = {
            products:products.getProducts()
        }
    },
    'POST /api/products' : async(ctx,next) => {
        let p = products.createProduct(ctx.request.body.name,ctx.request.body.manufacturer,parseFloat(ctx.request.body.price))
        ctx.rest(p)
    },
    'DELETE /api/products/:id' : async (ctx,next) => {
        console.log(`delete product ${ctx.params.id}...`)
        let p = products.deleteProduct(ctx.params.id)
        if (p) {
            ctx.rest(p)
        } else {
            throw new APIError(`product : not_found`,`product not found by id`)
        }
    },
    'POST /api/signIn': async(ctx,next) => {
        console.log(`api signIn account : ${ctx.request.body.account} pasword : ${ctx.request.body.password}`)
        let user = users.signIn(ctx.request.body.account,ctx.request.body.password)
        let value = Buffer.from(JSON.stringify(user)).toString('base64');
        console.log(`Set cookie value: ${value}`);
        ctx.cookies.set('name', value);
        ctx.rest(user)
    },
    'POST /api/loginOut' : async(ctx,next) => {
        let user = users.loginOut(ctx.request.body.account)
        if (user) {
            ctx.rest(user)
        } else {
            throw new APIError('user : not find','user not find by account')
        }
    },
    'GET /api/users' : (ctx,next) => {
        let useerArr = users.getUsers()
        ctx.response.type = 'application/json'
        ctx.response.body = {
            users : useerArr
        }
    }
}