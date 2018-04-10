class Ingredient{
    constructor(name, amount){
        this.name = name
        this.amount = amount
    }
}

class Cookie{
    constructor(name){
        this.name = name
        this.status = "mentah"
        this.ingredients = []
        this.ingredient()
    }

    ingredient(){
        let ingredients = fs.readFileSync('ingredient.txt', 'utf8').split("\n");
        for (let i=0;i<ingredients.length;i++){
            let tampung = []
            ingredients[i] = ingredients[i].split("=")
            ingredients[i][1] = ingredients[i][1].split(",")
            for (let k=0;k<ingredients[i][1].length;k++){
                tampung.push(new Ingredient(ingredients[i][1][k].split(":")[1], ingredients[i][1][k].split(":")[0]));
            }
            if (this.name.trim() == ingredients[i][0].trim()) {
                this.ingredients = tampung
            }
        }
    }

    bake(){
        this.status = "selesai dimasak"
    }
}

class PeanutButter extends Cookie {
    constructor(name){
        super(name)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name) {
        super(name)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie{
    constructor(name) {
        super(name)
        this.choc_chip_count = 150
    }
}

class CookieFactory{
    static create(options){
        let cookies = []
        for(let i=0;i<options.length;i++){
            if(options[i]=='chocolate chip'){
                cookies.push(new ChocolateChip(options[i]))
            }else if(options[i]=='peanut butter'){
                cookies.push(new PeanutButter(options[i]))
            }else{
                cookies.push(new OtherCookie(options[i]))
            }
        }
        return cookies
    }

    static cookieRecommendation(day, listCookies){
        let result = []

        if(day=="tuesday"){
            for(let i=0;i<listCookies.length;i++){
                for(let k=0;k<listCookies[i].ingredients.length;k++){
                    if(listCookies[i].ingredients[k].name.trim()=="sugar"){
                        result.push(listCookies[i])
                    }
                }
            }
        }

        return result
    }
}
const fs = require('fs')
let options = fs.readFileSync('cookies.txt', 'utf8').split("\n")

let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies)

let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);

console.log("\nsugar free cakes are :")

for(let i=0;i<sugarFreeFoods.length;i++){
    console.log(sugarFreeFoods[i].name)
}