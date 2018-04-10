"use strict"

const fs = require('fs');
const options = fs.readFileSync('cookies.txt', 'utf8')

class Ingredient {
  constructor(options) {
    this.name = options['name']
    this.amount = options['amount']
  }
}

class CookieFactory {
  constructor() {

  }

  static create(cookies){

    const objCakes = []
    const dataCakes = cookies.trim().split('\n')

    for (var i = 0; i < dataCakes.length; i++) {

      const cookies_name = dataCakes[i].split(' = ')
      const ingredients = String(cookies_name.slice(1)).split(', ')
      const recipes = CookieFactory.generateIngradients(ingredients)

      if (cookies_name[0] == 'peanut butter') {
        objCakes.push(new PeanutButter(recipes))
      } else if (cookies_name[0] == 'chocolate chip') {
        objCakes.push(new ChocolateChip(recipes))
      } else {
        objCakes.push(new OtherCookie(cookies_name[0], recipes))
      }

    }

    CookieFactory.isHasSugar(objCakes)

    console.log(require('util').inspect(objCakes, { depth: null }));

    return objCakes

  }

  static generateIngradients(recipes){

    let option = []
    let ingredient = []

    for (let j = 0; j < recipes.length; j++) {

      const ingredient_name = recipes[j].split(' : ')[1]
      const ingredient_amount = recipes[j].split(' : ')[0]
      const recipe = {name : ingredient_name, amount : ingredient_amount}

      option.push(recipe)

    }

    for (let j = 0; j < option.length; j++) {

      ingredient.push(new Ingredient(option[j]))

    }

    return ingredient;

  }

  static isHasSugar(cookies){

    for (var i = 0; i < cookies.length; i++) {

      const ingredient = cookies[i].ingredients

      for (var j = 0; j < ingredient.length; j++) {

        if (ingredient[j].name == 'sugar') {

          cookies[i].has_sugar = ingredient[j].amount

        }

      }

    }

  }

  static cookieRecomendation(day, cookies){

    const cookieRecomendation = []

    if (day == 'tuesday') {

      CookieFactory.isHasSugar(cookies)

      for (var i = 0; i < cookies.length; i++) {

        if (cookies[i].has_sugar == null) {

          cookieRecomendation.push(cookies[i])

        }

      }

    }

    return cookieRecomendation

  }

}

class Cookie {
  constructor(name, ingredient) {
    this.name = name
    this.status = "mentah"
    this.ingredients = ingredient
    this.has_sugar = null
  }

  bake(){

  }

}

class PeanutButter extends Cookie{
  constructor(ingredient) {
    super('peanut butter', ingredient)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie{
  constructor(ingredient) {
    super('chocolate chip', ingredient)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie{
  constructor(cookie_name, ingredient) {
    super(cookie_name, ingredient)
    this.other_count = 150
  }
}

let batch_of_cookies = CookieFactory.create(options)
// console.log(batch_of_cookies);

console.log(' ================================================================== ');

let sugarFreeFoods = CookieFactory.cookieRecomendation("tuesday", batch_of_cookies);

console.log("sugar free cakes are : ");

for (var i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name);
}
