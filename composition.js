
const fs = require('fs')
const option = fs.readFileSync('./cookies.txt', 'utf8')

'use strict'

class Ingredients {

    constructor(option) {

        this.name = option[1].trim()
        this.amount = option[0].trim()
    }
}

class Cookie {

    constructor(name, status, ingredients) {
        this.name = name
        this.status = status
        this.ingredients = ingredients
        this.has_sugar = null
    }

    bake() {

        this.status = 'selesai di masak'
    }
}

class PeanutButter extends Cookie {

    constructor(name, status, ingredients) {
        super(name, status, ingredients)
        this.peanut_count = 100
    }
}

class ChocholateChip extends Cookie {

    constructor(name, status, ingredients) {
        super(name, status, ingredients)
        this.choc_chip_count = 200
    }
}

class Other extends Cookie {

    constructor(name, status, ingredients) {

        super(name, status, ingredients)
        this.other_count = 150
    }
}

class CookieFactory {

    static create(option) {

        let optionArr = option.split('\n')
        let splitOption = []
        let result = []
        
        for (let i = 0; i < optionArr.length; i++) {
            
            splitOption.push(optionArr[i].split('='))
        }

        for (let i = 0; i < splitOption.length; i++) {
            
            let ingredients = splitOption[i][1].split(',')
            let ingredientsFix = []

            for (let j = 0; j < ingredients.length; j++) {
                    
                let bumbu = ingredients[j].split(':')
                let objBumbu = new Ingredients(bumbu)

                ingredientsFix.push(objBumbu)

            }


            if (splitOption[i][0].trim() == 'peanut butter') {

                let peanutButter = new PeanutButter(splitOption[i][0], 'Matang', ingredientsFix)

                result.push(peanutButter)
            } else if(splitOption[i][0].trim() == 'chocolate chip') {

                let chocholateChip = new ChocholateChip(splitOption[i][0], 'Matang', ingredientsFix)

                result.push(chocholateChip)
            } else {

                let other = new Other(splitOption[i][0], 'Matang', ingredientsFix)

                result.push(other)
            }
        }

        return result
    }

    static cookieRecommendation(day, cookies) {

        this._day = day
        this._cookies = cookies

        this.freeSugarCookie= []

        for (let i = 0; i < this._cookies.length; i++) {
            
            let specialIngredients = this._cookies[i].ingredients

            for (let j = 0; j < specialIngredients.length; j++) {
                
                if(specialIngredients[j].name == 'sugar') {

                    this.freeSugarCookie.push(this._cookies[i].name)
                }
            }
            
        }

        return this.freeSugarCookie
    }

}

let batch_of_cookies = CookieFactory.create(option)
// console.log(batch_of_cookies)
// let freeSugar = CookieFactory.cookieRecommendation()
let freeSugar = CookieFactory.cookieRecommendation('Tuesday',batch_of_cookies)
// console.log(freeSugar)
console.log("The free sugar cookies are")
for (let i = 0; i < freeSugar.length; i++) {
    
    console.log(freeSugar[i])
}