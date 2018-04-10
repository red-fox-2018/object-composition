"use strict"
const fs = require('fs');

class Cookie {
  constructor(CookieName, ingredients, hasSugar){
    this.name = CookieName,
    this.status = "mentah",
    this.ingredients = ingredients || []
    this.has_sugar = hasSugar || null
  }

  bake(){
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients, hasSugar) {
    super(name, ingredients, hasSugar)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredients, hasSugar) {
    super(name, ingredients, hasSugar)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredients, hasSugar) {
    super(name, ingredients, hasSugar)
    this.other_count = 150
  }
}

class ChocolateChipCrumbled extends Cookie {
  constructor(name, ingredients, hasSugar) {
    super(name, ingredients, hasSugar)
    this.choc_chip_count = 125
  }
}

class PeanutButterCrumbled extends Cookie {
  constructor(name, ingredients, hasSugar) {
    super(name, ingredients, hasSugar)
    this.other_count = 95
  }
}

class CookieFactory  {

  static create(options){
    let listOfCookie = []
    options.forEach(function(cookie, idx){
      let arrCookie = cookie.split(" = ")
      let arrIngredient = CookieFactory.CreateIngredients(arrCookie[1])
      let objOption;

      if(arrCookie[0] === 'peanut butter'){
        objOption = new PeanutButter(arrCookie[0], arrIngredient[0], arrIngredient[1])
      } else if(arrCookie[0] === 'chocolate chip'){
        objOption = new ChocolateChip(arrCookie[0], arrIngredient[0], arrIngredient[1])
      } else if(arrCookie[0] === 'peanut butter crumbled'){
        objOption = new PeanutButterCrumbled(arrCookie[0], arrIngredient[0], arrIngredient[1])
      } else if(arrCookie[0] === 'chocolate chip crumbled'){
        objOption = new ChocolateChipCrumbled(arrCookie[0], arrIngredient[0], arrIngredient[1])
      } else {
        objOption = new OtherCookie(arrCookie[0], arrIngredient[0], arrIngredient[1])
      }
      listOfCookie.push(objOption)
    })

    return listOfCookie
  }

  static CreateIngredients (ingredients){
    let isHasSugar = false
    let arrIngredient=[]
    let splitIngredients = ingredients.split(", ")

    splitIngredients.forEach( function(ingredient, idx){
      let split = ingredient.split(" : ")
      if(split[1].toLowerCase() === "sugar"){
        isHasSugar = true
      }

      let objIngredient = new Ingredient(split)
      arrIngredient.push(objIngredient)
    })

    return [arrIngredient, isHasSugar]
  }

  static cookieRecommendation(day, cookieOptions){
    let foundCookie=[];
    if(day.toLowerCase() === "tuesday"){
      for(let i=0; i<cookieOptions.length; i++){
        if(!cookieOptions[i].has_sugar){
          foundCookie.push(cookieOptions[i])
        }
      }
    }else{
      console.log('tidak ada kue bebas gula');
    }
    return foundCookie
  }

}

class Ingredient {
  constructor(options) {
    this.name = options[1]
    this.amount = options[0]
  }
}





const options = fs.readFileSync('./cookies.txt', 'utf8').trim().split("\n")
let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);
let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies)
for(let i=0; i<sugarFreeFoods.length; i++){
  console.log(sugarFreeFoods[i].name);
}
