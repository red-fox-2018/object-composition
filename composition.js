'use strict'
const fs = require('fs');
const option = fs.readFileSync('cookies.txt').toString().split('\n')
option.pop()
const ingredient = fs.readFileSync('ingredient.txt').toString().split('\n')
ingredient.pop()


class Ingredient {
  constructor(nameParam, amountParam) {
    this.name = nameParam;
    this.amount = amountParam
  }
}


for (var i = 0; i < ingredient.length; i++) {
  ingredient[i] = ingredient[i].split(' = ');
  ingredient[i][1] = ingredient[i][1].split(', ')
  for (var j = 0; j < ingredient[i][1].length; j++) {
    ingredient[i][1][j] = ingredient[i][1][j].split(' : ')
    let name = ingredient[i][1][j][0]
    let amount = ingredient[i][1][j][1]
    var obj = new Ingredient(name, amount)
    ingredient[i][1][j] = obj
  }
}

class Cookie {
  constructor(nameParam, ingParam) {
    this.name = nameParam;
    this.status = 'mentah'
    this.ingredient = ingParam;
  }

  bake() {
    this.status = 'selesai dimasak';
  }
}

class PeanutButter extends Cookie {
  constructor(nameParam, ingParam) {
    super(nameParam, ingParam)
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(nameParam, ingParam) {
    super(nameParam, ingParam)
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(nameParam, ingParam) {
    super(nameParam, ingParam);
    this.other_count = 150;
  }
}

class CookieFactory {
  constructor() {

  }

  static create(option) {
    let toProccess = [];
    for (var i = 0; i < option.length; i++) {
      for (var j = 0; j < ingredient.length; j++) {
        if (option[i] === 'peanut butter' && option[i] === ingredient[j][0]) {
          toProccess.push(new PeanutButter(option[i], ingredient[j][1]))
        } else if (option[i] === 'chocolate chip' && option[i] === ingredient[j][0]) {
          toProccess.push(new ChocolateChip(option[i], ingredient[j][1]))
        } else if (option[i] === ingredient[j][0]){
          toProccess.push(new OtherCookie(option[i], ingredient[j][1]))
        }
      }
    }
    return toProccess;
  }

  static cookieRecommendation(day, cookies) {
    let lessSugarCookie = []
    for (var i = 0; i < cookies.length; i++) {
      let isSugarFree = true;
      let ingred = cookies[i].ingredient
      for (var j = 0; j < ingred.length; j++) {
        if (ingred[j].name === 'sugar') {
          isSugarFree = false
        }
      }
      if (isSugarFree) {
        lessSugarCookie.push(cookies[i].name);
      }
    }
    return lessSugarCookie;
  }
}



let batch_of_cookies = CookieFactory.create(option);
console.log(batch_of_cookies[0]);
console.log('\nList of sugar free food:\n');
let sugarFreeFoods = CookieFactory.cookieRecommendation('Tuesday', batch_of_cookies)
for (var i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i]);
}
