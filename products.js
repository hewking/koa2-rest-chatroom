let id = 0

function nextId(){
    id ++
    return 'p' + id
}

class Product {
    constructor(name,manufacturer,price){
        this.name = name
        this.manufacturer = manufacturer
        this.price = price
        this.id = nextId()
    }
}

let products = [
    new Product('iPhone7','Apple',6800),
    new Product('huawei p30','Huawei',4888),
    new Product('mi 9','xiaomi',2999)
]

module.exports = {
    getProducts : () => {
        console.log(products);        
        return products
    },

    getProduct : (id) => {
        console.log('getProdt')
        let i
        for (i = 0 ; i < products.length ; i ++) {
            if (products[i].id === id) {
                return products[i]
            }
        }
        return null
    },

    createProduct : (name,manufacturer,price) => {
        console.log('createProduct')
        let p = new Product(name,manufacturer,price)
        products.push(p)
        return p
    },

    deleteProduct : (id) => {
        let index = -1,i
        for (i = 0 ; i < products.length ; i ++) {
            if (products[i].id === id) {
                index = i
                break
            }
        }
        if (index > 0) {
            return products.splice(index,1)[0]
        }
        
    }


}