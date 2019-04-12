/**
 * 用户模块
 * 管理登陆用户的信息
 */

 let userId = -1

 function nextId(){
     userId ++
 }

 class User {
    constructor(account,password){
       this.name = account
       this.password = password
       this.id = nextId()
    }
}

 let users = [
    new User('mary','123456'),
    new User('tom','123456'),
    new User('lisa','123456'),
    new User('ben','123456'),
 ]

 module.exports = {
     getUsers : () => {
        return users
     },
     signIn : (account,password) => {
        console.log(`signIn account : ${account} password : ${password}`)
        let user = new User(account,password)
        users.push(user)
        return user
     },
     loginOut : (account) => {
         users.forEach(user => {
             if (typeof account === 'string' && user.account === account) {
                return users.splice(users.findIndex(item => item.account === account),1)
             }
             return null
         })
     },
 }
