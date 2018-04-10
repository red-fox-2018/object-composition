/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/

'use strict';

const fs = require("fs");


class Ingredient {
  constructor(options) {
    this.name = options[1];
    this.amount = options[0];
  }
}


class Cookie {
  constructor(name, ingredients) {
    this.name = name;
    this.status = 'uncooked';
    this.ingredients = this.ingredientPars(ingredients);
    this.other_count = 150;
    this.containSugar = this.getSugarStatus(ingredients);
  }

  ingredientPars(options) {
    let objIngredient = [];
    options.forEach((options) => {
      objIngredient.push(new Ingredient(options.split(':')));
    });
    return objIngredient;
  }

  bake() {
    this.status = 'cooked';
  }

  getSugarStatus(options) {
    let status = false;
    options.forEach((options) => {
      if (options.split(':')[1].trim() == 'sugar') {
        status = true;
      }
    });
    return status;
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients);
    this.name = name;
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients);
    this.name = name;
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients);
    this.name = name;
  }
}

class CookieFactory {
  static create(produce) {
    let arr = [];
    for (let i = 0; i < produce.length; i++) {
      if (produce[i][0] === 'Peanut butter') {
        let peanutBut = new PeanutButter(produce[i][0], produce[i][1].split(','));
        arr.push(peanutBut);
      } else if (produce[i][0] === 'Chocolate chip') {
        let chocolateCh = new ChocolateChip(produce[i][0], produce[i][1].split(','));
        arr.push(chocolateCh);
      } else {
        let otherCookies = new OtherCookie(produce[i][0], produce[i][1].split(','));
        otherCookies.bake();
        arr.push(otherCookies);
      }
    }
    return arr;
  }

  static cookieRecommendation(day, cookie) {
    let noSugar = [];
    cookie.forEach((cookie) => {
      if (cookie.containSugar == false) {
        noSugar.push(cookie);
      }
    });
    return noSugar;
  }
}

let options = fs.readFileSync('cookies.txt', 'utf-8').trim().split('\n');
let produce = [];

options.forEach((options) => {
  produce.push(options.split(' = '));
});

let batch_of_cookies = CookieFactory.create(produce);

console.log(batch_of_cookies);
console.log('=================================');

let sugarFree = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);
console.log('Sugar free cake(s):');

sugarFree.forEach((sugarFree)=>{
  console.log(sugarFree.name);
});
