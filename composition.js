class Ingredients {
    constructor(options){
        this.name = options[1];
        this.amount = options[0]
    }
    
}

class Cookie {
    constructor(name,ingredients){
        this.name = name
        this.status = 'mentah'
        this.ingredients = ingredients
    }
    
    bake(){
        this.status = 'selesai dimasak'
    }
}

class PeanutButter extends Cookie {
    constructor(name,ingredients){
        super(name,ingredients)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name,ingredients) {
        super(name,ingredients)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor(name,ingredients){
        super(name,ingredients)
        this.other_count = 150
    }
}

class CookieFactory{
    static create(cookies){
          let result = []
        for(let i=0;i<cookies.length;i++){
            let list = []
            let ingredients = cookies[i].split('=')[1].split(',')
            let cookies_name = cookies[i].split('=')[0]
            for(let j=0;j<ingredients.length;j++){
                let list_ingredients = ingredients[j].split(':')
                list.push(new Ingredients(list_ingredients))
            }
            if(cookies_name=='peanut butter '){
                result.push(new PeanutButter(cookies_name,list))
            }
            else if(cookies_name=='chocolate chip '){
                result.push(new ChocolateChip(cookies_name,list))
            }
            else{
                result.push(new OtherCookie(cookies_name,list))
            }
        }
        return result
    }
    static cookieRecommendation(day,cookies){
        let result = []
        for(let i=0;i<cookies.length;i++){
            let checkIngredient = cookies[i].ingredients
            let has_sugar = false
            for(let j=0;j<checkIngredient.length;j++){
                if(checkIngredient[j].name==' sugar'){
                    has_sugar = true
                }
            }
            if(has_sugar==false){
                result.push(cookies[i])
            }
        }
        return result
    }
}

const fs = require('fs');
let options = fs.readFileSync('cookies.txt').toString().split('\n')
let batch_of_cookies =  CookieFactory.create(options)
// console.log(batch_of_cookies)
let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies)
console.log('sugar free cakes are:')
for(let i=0;i<sugarFreeFoods.length;i++){
    console.log(sugarFreeFoods[i].name)
}