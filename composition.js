/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/

'use strict';

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
    this.status = 'uncooked';
    this.ingredients = this.ingredientPars(ingredients);
    this.other_count = 150;
    this.containSugar = this.getSugarStatus(ingredients);
    this.containCrumble = this.getCrumbleStatus(ingredients);
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

  getCrumbleStatus(options) {
    let status = false;
    options.forEach((options) => {
      if (options.split(':')[1].trim().split(' ')[1] == 'crumble') {
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

class ChocolateChipCrumble extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients);
    this.name = name;
    this.choc_chip_count = 200;
  }
}

class PeanutButterCrumble extends Cookie {
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
    produce.forEach((produce) => {
      if (produce[0] === 'Peanut butter') {
        let peanutButter = new PeanutButter(produce[0], produce[1].split(','));
        arr.push(peanutButter);
      } else if (produce[0] === 'Chocolate chip') {
        let chocolateChip = new ChocolateChip(produce[0], produce[1].split(','));
        arr.push(chocolateChip);
      } else if (produce[0] === 'Chocolate chip crumble') {
        let chocolateChocoCrumble = new ChocolateChipCrumble(produce[0], produce[1].split(','));
        arr.push(chocolateChocoCrumble);
      } else if (produce[0] === 'Peanut butter crumble') {
        let peanutButCrumble = new PeanutButterCrumble(produce[0], produce[1].split(','));
        arr.push(peanutButCrumble);
      } else {
        let otherCookies = new OtherCookie(produce[0], produce[1].split(','));
        otherCookies.bake();
        arr.push(otherCookies);
      }
    });
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

  static cookieWithCrumble(cookie) {
    let withCrumble = [];
    cookie.forEach((cookie) => {
      if (cookie.containCrumble == true) {
        withCrumble.push(cookie);
      }
    });
    return withCrumble;
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
let sugarFree = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies);
console.log('Sugar free cake(s):');

sugarFree.forEach((sugarFree) => {
  console.log(sugarFree.name);
});

console.log('=================================');
let withCrumble = CookieFactory.cookieWithCrumble(batch_of_cookies);
console.log('With crumble cake(s):');

withCrumble.forEach((withCrumble) => {
  console.log(withCrumble.name);
});
