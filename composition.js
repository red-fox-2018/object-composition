/**
 * @author: Iswanul Umam - Red Fox
 */

const fs = require('fs');

class Cookies {
  constructor(name, ingridients) {
    this.name = name;
    this.status = 'mentah';
    this.ingridients = (ingridients == undefined) ? [] : ingridients;
  }
  bake() {
    this.status = 'selesai dimasak';
  }
}

class PeanutButter extends Cookies {
  constructor(name, ingridients) {
    super(name, ingridients);
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookies {
  constructor(name, ingridients) {
    super(name, ingridients);
    this.choc_chip_count = 200;
  }
}

class OtherCookies extends Cookies {
  constructor(name, ingridients) {
    super(name, ingridients);
    this.other_count = 150;
  }
}

// -----------------------------------

class Ingredient {
  constructor(option) {
    this.name = option['name'];
    this.amount = option['amount'];
  }
}

class CookieFactory {
  constructor() {}
  static create(options) {
    let result = [];
    for (let row of options) {
      row = row.split(' = ');
      if (row[0] == 'peanut butter') {
        let newListItem = [];
        let spareLine = row[1].split(',');
        for (let eachItem of spareLine) {
          let item = eachItem.trim().split(': ');
          newListItem.push(new Ingredient({ name: item[1], amount: item[0] }));
        }
        result.push(new PeanutButter(row[0], newListItem));
      } else if (row[0] == 'chocolate chip') {
        let newListItem = [];
        let spareLine = row[1].split(',');
        for (let eachItem of spareLine) {
          let item = eachItem.trim().split(': ');
          newListItem.push(new Ingredient({ name: item[1], amount: item[0] }));
        }
        result.push(new ChocolateChip(row[0], newListItem));
      } else {
        let newListItem = [];
        let spareLine = row[1].split(',');
        for (let eachItem of spareLine) {
          let item = eachItem.trim().split(': ');
          newListItem.push(new Ingredient({ name: item[1], amount: item[0] }));
        }
        result.push(new ChocolateChip(row[0], newListItem));
      }
    }
    return result;
  }
  static cookieRecomendation(day, cookies) {
    let result = ``;
    for (let c of cookies) {
      let sugarIsExist = false;
      for (let i of c.ingridients) {
        if (i.name == 'sugar') {
          sugarIsExist = true;
        }
      }
      if (!sugarIsExist) {
        return c.name;
      }
    }
    return;
  }
}

// driver code -------------------------------------------------------

let options = fs.readFileSync('new_cookies.txt', 'utf8').split('\n');

// console.log(options);

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);

let sugarFreeFood = CookieFactory.cookieRecomendation('tuesday', batch_of_cookies);

console.log('################ SUGAR FREE FOOD ################');
console.log(sugarFreeFood);
// chocolate butter 

/*
[
  PeanutButter {
    name: 'peanut butter',
    status: 'mentah',
    ingridients: [],
    peanut_count: 100,
  },
  ...
]
*/