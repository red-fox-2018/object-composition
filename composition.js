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

class OtherCookies extends Cookies {
  constructor(name) {
    super(name);
    this.other_count = 150;
  }
}

// driver code ----------------------------------

class CookieFactory {

  static create(options) {
    let result = [];
    for (let row of options) {
      if (row == 'peanut butter') {
        result.push(new PeanutButter(row));
      } else if (row == 'chocolate chip') {
        result.push(new ChocolateChip(row));
      } else {
        result.push(new OtherCookies(row));
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