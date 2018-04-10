const fs = require('fs');
var options = fs.readFileSync('./cookies.txt').toString().split('\n');
options.pop()
var arrNamaKue = [];
var arrIngredients = [];
options.forEach((options) => {
  arrIngredients.push(options.split(' = ')[1].split(','));
  arrNamaKue.push(options.split(' = ')[0]);
})

class Cookie {
  constructor(name, ingredient) {
    this.name = name;
    this.status = 'mentah';
    this.ingredients = ingredient;
  }

  bake() {
    this.status = 'selesai dimasak';
  }

  addIngredients() {

  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredient) {
    super(name, ingredient)
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor (name, ingredient) {
    super(name, ingredient);
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredient) {
    super(name, ingredient)
    this.other_count = 150;
  }
}

class Ingredients {
  constructor(ingredient, amount) {
    this.name = ingredient
    this.amount = amount
  }
}

class CookieFactory {
  static create(options) {
    var cookies = [];
    for (var i = 0; i < options.length; i++) {

      // [1 cup : flour,
      // 2 cups (gluten) : sugar,
      // 2 cups : peanut butter,
      // 1 cup : cinnamon,
      // 2 tsp : butter]
      //
      // looping arr_ingredients
      //   - var ingredient = new Ingredients(name, amount)
      //   - arr_tmp.push(ingredient)


      //dapetin ingredients_arr nya
      // [Ingreients{
      //   name: flour
      //   amount: 1 cup
      // }, Ingreients {
      //   name: sugar
      //   amount: 1 cup
      // },Ingreients{
      //   name:
      //   amount:
      // }]

      let cookieIng = options[i].split('=');
      // console.log("====", cookieIng[1]);

      if (cookieIng[0].trim() == 'peanut butter') {
        let ingre = CookieFactory.amountIngredient(cookieIng[1]);
        cookies.push(new PeanutButter(cookieIng[0].trim(), ingre));
        // console.log('===========', options[i].split(' = ')[1]);
      } else if (cookieIng[0].trim() == 'chocolate chip') {
        let ingre = CookieFactory.amountIngredient(cookieIng[1]);
        cookies.push(new ChocolateChip(cookieIng[0].trim(), ingre));
      } else {
        let ingre = CookieFactory.amountIngredient(cookieIng[1]);
        cookies.push(new OtherCookie(cookieIng[0].trim(), ingre))
      }
    }
    return cookies;
  }

  static amountIngredient(arrIngredients) {
    // console.log('&&&&&&&&&&&', arrIngredients);
    var arrSplitComa = arrIngredients.split(',');
    var arrIngre = [];
    for (var i = 0; i < arrSplitComa.length; i++) {
      let ingre = arrSplitComa[i].split(':');
      var amount = ingre[0];
      var ingredient = ingre[1];
      arrIngre.push(new Ingredients(ingredient, amount))
    }
    return arrIngre
  }

  static cookieRecommendation(hari, batch_of_cookies) {
    // console.log('&&&&&&&&&&&&&&&&', batch_of_cookies[0].ingredients[0]);
    var arrHasil = [];
    if (hari == 'tuesday') {
      for (var i = 0; i < batch_of_cookies.length; i++) {
        var flag = false;
        for (var j = 0; j < batch_of_cookies[i].ingredients.length; j++) {
          if (batch_of_cookies[i].ingredients[j].name == ' sugar') {
            flag = true;
          }
        }
        if (flag == false) {
          arrHasil.push(batch_of_cookies[i]);
        }
      }
      return arrHasil;
    } else {
      return batch_of_cookies;
    }
  }
}

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);
var cookies = new Cookie(options);
// console.log(cookies.addIngredients(options));
// console.log(options);
let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies);

for (let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name);
}
