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

// driver code ----------------------------------

class Ingredient {
  constructor(option) {
    this.name = option['name'];
    this.amount = option['amount'];
  }
}

// function formatter(line) {
//   let result = {};
//   let comp = line.split(',');
//   for (let prop of comp) {
//     let item = prop.trim().split(': ');
//     result[item[1]] = item[0];
//   }
//   return result;
// }

// let format = formatter('1 cup: flour, 2 cups (gluten): sugar, 2 cups: peanut butter, 1 cup: cinnamon, 2 tsp: butter');
// console.log('>>>', format);

// 1 cup: flour, 2 cups (gluten): sugar, 2 cups: peanut butter, 1 cup: cinnamon, 2 tsp: butter

class CookieFactory {
  constructor() {}
  static create(options) {

    let result = [];
    for (let row of options) {
      row = row.split(' = ');

      if (row[0] == 'peanut butter') {
        let obj = {};
        let comp = row[1].split(',');
        for (let prop of comp) {
          let item = prop.trim().split(': ');
          obj[item[1]] = item[0];
        }  
        result.push(new PeanutButter(row[0], obj));

      } else if (row[0] == 'chocolate chip') {
        let obj = {};
        let comp = row[1].split(',');
        for (let prop of comp) {
          let item = prop.trim().split(': ');
          obj[item[1]] = item[0];
        } 
        result.push(new ChocolateChip(row[0], obj));

      } else {
        let obj = {};
        let comp = row[1].split(',');
        for (let prop of comp) {
          let item = prop.trim().split(': ');
          obj[item[1]] = item[0];
        }
        result.push(new OtherCookies(row[0], obj));
      }
    }
    return result;
  }
  hello() {
    return `Hello!`;
  }
  _formatter(line) {
    let result = {};
    let comp = line.split(',');
    for (let prop of comp) {
      let item = prop.trim().split(': ');
      result[item[1]] = item[0];
    }
    return result;
  }
}

let options = fs.readFileSync('new_cookies.txt', 'utf8').split('\n');

// console.log(options);

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);

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