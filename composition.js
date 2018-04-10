"use strict"
const fs = require('fs');

class Ingredient {
    constructor(options) {
        this.name = options[1];
        this.amount = options[0];
    }
}

class Cookie {
    constructor(name, ingredients) {
        this.name = name;
        this.ingredients = this.addIngredient(ingredients);
        this.status = 'mentah';
    }

    bake() {
        this.status = 'selesai dimasak';
    }

    addIngredient(options) {
        let result = [];

        options.forEach(ingredient => {
            result.push(new Ingredient(ingredient.split(' : ')));
        });

        return result;
    }
}

class PeanutButter extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.peanut_count = 100;
        
    }
}

class ChocholateChip extends Cookie {
    constructor(name, ingredients) {
        
        super(name, ingredients)
        this.choc_chip_count = 200;
    }
}

class OtherCookie extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.other_count = 150;
    }
}

class CookieFactory {
    static create(options) {
        let cookies = [];

        options.forEach(dataCookie => {
            if (dataCookie[0] === 'Peanut butter') {
                cookies.push(new PeanutButter(dataCookie[0], dataCookie[1].split(',')));
            } else if (dataCookie[0] === 'Chocolate chip') {
                cookies.push(new ChocholateChip(dataCookie[0], dataCookie[1].split(',')));
            } else {
                cookies.push(new OtherCookie(dataCookie[0], dataCookie[1].split(',')));
            }
        });

        return cookies;
    }

    static cookieRecommendation(day, cookies) {
        let result = [];

        if (day === 'tuesday') {
            cookies.forEach(cookie => {
                let counter = 0;
                cookie.ingredients.forEach(ingredient => {
                    if (ingredient.name === 'sugar') {
                        counter++;
                    }
                })

                if (counter === 0) {
                    result.push(cookie);
                }
            });
        }

        return result;
    }
}

let data = fs.readFileSync('./cookies.txt', 'utf8').split('\n');
let allDataCookie = [];

data.forEach(file => {
    allDataCookie.push(file.split('='));
});


let batch_of_cookies = CookieFactory.create(allDataCookie);
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies);
console.log('sugar free cakes are :')
sugarFreeFoods.forEach(cake => {
    console.log(cake.name);
});