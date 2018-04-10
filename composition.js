"use strict"

class Cookie {
  constructor(name, ingredients) {
    this.name = name,
    this.status = "mentah",
    this.ingredients = ingredients
  }

  bake() {
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.choc_chip_count = 200
  }
}

class OtherCookie  extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.other_count = 150
  }
}

class Ingredient {
  constructor(options){
    this.name = options[1]
    this.amount = options[0]
  }
}

class CookieFactory {
  static create(options) {
    var cookies = []
    var sugar = false
    for(let i=0; i<options.length; i++){
      var arrCookie = []
      let kue = options[i][0]
      // console.log(kue)

      let ingridients = options[i][1].split(', ')
      let baris = []
      if(kue === 'peanut butter'){
        for(let j=0; j<ingridients.length; j++){
          let objBahan = {}
          let bahan = ingridients[j].split(' : ')
          var ingredient = new Ingredient(bahan)
          arrCookie.push(ingredient)
        }
        var peanut = new PeanutButter(kue, arrCookie)
        cookies.push(peanut)
      }
      else if(kue === 'chocolate chip'){
        for(let j=0; j<ingridients.length; j++){
          let objBahan = {}
          let bahan = ingridients[j].split(' : ')
          var ingredient = new Ingredient(bahan)
          arrCookie.push(ingredient)
        }
        var chocolateChip = new ChocholateChip(kue, arrCookie)
        cookies.push(chocolateChip)
      }
      else {
        for(let j=0; j<ingridients.length; j++){
          let objBahan = {}
          let bahan = ingridients[j].split(' : ')
          var ingredient = new Ingredient(bahan)
          arrCookie.push(ingredient)
        }
        var chocolateOther = new OtherCookie(kue, arrCookie)
        cookies.push(chocolateOther)
      }

    }
    return cookies
  }

  static cookieRecomendation(day, cookies){
    var freeSugarCookies = []
    for(let i=0; i<cookies.length; i++){
      let bahan2 = cookies[i].ingredients
      // console.log(bahan2)
      let sugarCounter = 0
      for(let j=0; j<bahan2.length; j++){
        if(bahan2[j].name == 'sugar'){
          sugarCounter++
        }
      }
      // console.log(cookies[i].name,sugarCounter)
      if(sugarCounter == 0){
        freeSugarCookies.push(cookies[i])
      }
    }
    // console.log('-----------', freeSugarCookies)
    return freeSugarCookies
  }

}

// DRIVER CODE
const fs = require('fs');
let cookiestxt = fs.readFileSync('./cookies.txt','utf8')
let splitBaris = cookiestxt.split('\n')
let options = []
for(let i=0; i<splitBaris.length-1; i++){
  // console.log(splitIngridient[i].split(' = '))
  options.push(splitBaris[i].split(' = '))
}
// console.log(options)
let batch_of_cookies = CookieFactory.create(options)
// console.log(batch_of_cookies)

let sugarFreeFoods = CookieFactory.cookieRecomendation("tuesday",batch_of_cookies)
console.log("sugar free cakes area:")
for(let i = 0; i < sugarFreeFoods.length; i++){
  console.log(sugarFreeFoods[i].name)
}
