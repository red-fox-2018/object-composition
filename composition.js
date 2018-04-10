"use strict"

class Ingredient {
  constructor(nama, amount) {
    this.name = nama
    this.amount = amount
  }
}

class Cookie {
  constructor(param_ings) {
    this.name = null;
    this.status = 'mentah';
    this.ingredients = param_ings
  }

  bake() {
    this.status = 'selesai dimasak';
  }
}

class PeanutButter extends Cookie {
  constructor(param_name, param_ings) {
    super(param_ings)
    this.name = param_name
    this.peanut_count = 100;
  }
}

class ChocholateChip extends Cookie {
  constructor(param_name, param_ings) {
    super(param_ings)
    this.name = param_name
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(param_name, param_ings) {
    super(param_ings)
    this.name = param_name;
    this.other_count = 150;
  }
}

class CookieFactory {
  static create(options) {
    // accepts a list of cookie types and returns those cookies
    let cookies = []
    for (let i of options) {
      var obj = {}
      let temp = i.split(' = ')
      let typeofCookie = temp[0];
      let arr = []
      obj[typeofCookie] = []
      let ingre = obj[typeofCookie]
      temp = temp[1].split(', ')
      for (let j of temp) {
        let tempArr = j.split(': ')
        let amount = tempArr[0]
        let nama = tempArr[1]
        var ings = new Ingredient(nama, amount)
        arr.push(ings)
      }
      if (typeofCookie === 'peanut butter') {
        cookies.push(new PeanutButter(typeofCookie, arr));
      } else if (typeofCookie === 'chocolate chip') {
        cookies.push(new ChocholateChip(typeofCookie, arr))
      } else {
        cookies.push(new OtherCookie(typeofCookie, arr))
      }
    }
    return cookies
  }

  static cookieRecomendation(params_cookies) {
    let arr = []
    for (let i of params_cookies) {
      let isSugar = true;
      for (let j of i.ingredients) {
        if (j.name == 'sugar') {
          isSugar = false
          break;
        }
      }
      if (isSugar == true) {
        arr.push({name: i.name})
      }
    }
    return arr
  }
}



var fs = require('fs');
var options = fs.readFileSync('cookies.txt').toString().split('\n');
let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);
console.log('====================');
let sugarFreeFoods = CookieFactory.cookieRecomendation(batch_of_cookies);
console.log('Sugar free cakes are :');
for (let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name)
}

// Output
// [ PeanutButter {
//     name: 'peanut butter',
//     status: 'mentah',
//     ingredients: [],
//     peanut_count: 100
//   },
//   ChocholateChip {
//     name: 'chocolate chip',
//     status: 'mentah',
//     ingredients: [],
//     choc_chip_count: 200 
//   },
//   OtherCookie {
//     name: 'chocolate cheese',
//     status: 'mentah',
//     ingredients: [],
//     other_count: 150
//   },
//   OtherCookie {
//     name: 'chocolate butter',
//     status: 'mentah',
//     ingredients: [],
//     other_count: 150
//   }
// ]