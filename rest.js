
module.exports = {

    APIError : class {
        constructor(code,message){
            this.code = code || 'internal:unknown_error'
            this.message = message || ''
        }
    },

    restify : (pathPrefix) => {
        // 校验rest api前缀 默认为api
        pathPrefix = pathPrefix || '/api'
        return async (ctx,next) => {
            if (ctx.request.path.startsWith(pathPrefix)) {
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json'
                    ctx.response.body = data
                }
                try{    
                    await next()
                }catch (e) {
                    ctx.response.status = 400
                    ctx.response.type = 'application/json'
                    ctx.response.body = {
                        code : e.code || 'internal:unknown_error',
                        message : e.message || ''
                    }
                }
            } else {
                await next()
            }
        }
    }
}