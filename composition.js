var fs = require('fs')
var cookieData = fs.readFileSync('./cookies.txt', 'utf-8')
var options = cookieData.trim().split('\n')


class Cookie{
  constructor(name, ingredients) {
    this.name = name
    this.status = "mentah"
    this.ingredients = ingredients
    this.has_sugar = null
  }

  bake() {
    this.status = "selesai dimasak"
  }
}



class Ingredient {
  constructor(objIngredient) {
    this.name = objIngredient["name"]
    this.amount = objIngredient["amount"]
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.choco_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.other_count = 150
  }
}

class CookieFactory {
  static create(options) {
    var cookies = []
    var nameOfCookies = []
    var recipes = []
    for(let i in options) {
      var splitted = options[i].split(" = ")
      var cookieNames = splitted[0]
      var cookieRecipes = splitted[1]
      var perRecipes = cookieRecipes.split(',')
      var recipesPerCookies = []

      for(let j in perRecipes) {
        var recipesAmount = perRecipes[j].split(' : ')
        var objIngredient = new Ingredient({name: recipesAmount[1], amount: recipesAmount[0]})
        recipesPerCookies.push(objIngredient)
      }
      var objCookie;
      var cookieList = []
      if(cookieNames == 'peanut butter') {
        objCookie = new PeanutButter(cookieNames, recipesPerCookies)
        console.log(cookieNames);
      } else if(cookieNames == 'chocolate chip') {
        objCookie = new PeanutButter(cookieNames, recipesPerCookies)
      } else {
        objCookie = new OtherCookie(cookieNames, recipesPerCookies)
      }
      cookies.push(objCookie)
    }
    return cookies
  }

  static cookieRecommendation(day, cookies) {
    var sugarFree = []
    if(day == 'tuesday') {
      for(let i in cookies) {
        var hasSugar = false
        for(let j in cookies[i].ingredients) {
          if(cookies[i].ingredients[j].name == "sugar") {
            hasSugar = true
          }
        }
        if(!hasSugar) {
          sugarFree.push(cookies[i])
        }
      }
    }
    return sugarFree
  }

}

let batch_of_cookies = CookieFactory.create(options)
// console.log(batch_of_cookies);
let sugarFreeCookies = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies)
console.log(sugarFreeCookies);
