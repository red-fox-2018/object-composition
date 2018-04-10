/**
 * @author: Iswanul Umam - Red Fox
 */

const fs = require('fs');

class Cookies {
  constructor(name) {
    this.name = name;
    this.status = 'mentah';
    this.ingridients = [];
  }
  bake() {
    this.status = 'selesai dimasak';
  }
}

class PeanutButter extends Cookies {
  constructor(name) {
    super(name);
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookies {
  constructor(name) {
    super(name);
    this.choc_chip_count = 200;
  }
}

// driver code ----------------------------------

class CookieFactory {

  static create(options) {
    let result = [];
    for (let row of options) {
      let name = row;
      row = row.split(' ');
      if (row[0] == 'peanut') {
        result.push(new PeanutButter(name));
      } else if (row[0] == 'chocolate') {
        result.push(new ChocolateChip(name));
      }
    }
    return result;
  }

}

let line = fs.readFileSync('cookies.txt', 'utf8');
let options = line.split('\n');

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