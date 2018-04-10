"use strict"
const fs = require('fs')
//===============import cookies name===============
// let cookies = fs.readFileSync('cookies.txt', 'utf8')
// let array_cookies = cookies.split('\n')
// let options = array_cookies.slice(0, array_cookies.length-1)

//=============import ingredients==================
let ingredients_data = fs.readFileSync('ingredients.txt','utf8');
let array_ingredients = ingredients_data.split('\n')
//looping nama cookie
let options_cookies = []
for(let i = 0; i < array_ingredients.length-1; i++){
  let result = '';
  for(let j = 0; j < array_ingredients[i].length; j++){
    if(array_ingredients[i][j+1] === '='){
      options_cookies.push(result);
    }
    result = result + array_ingredients[i][j];
  }
}

//looping ingredients
let arr_options_ingredients    = [];
for(let i = 0; i < array_ingredients.length-1; i++){
  for(let j = 0; j < array_ingredients[i].length; j++){
    if(array_ingredients[i][j] == "="){
      arr_options_ingredients.push(array_ingredients[i].slice(j+2));
    }
  }
}

let options_ingredients =[]
for(let i = 0; i < arr_options_ingredients.length; i++){
  options_ingredients.push(arr_options_ingredients[i].split(/,|:/));
}

//=============Cookie Class==============
class Cookie {
  constructor(name){
    this.name = name
    this.status = 'mentah'
    this.ingredients = []
  }

  bake(){
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(){
    super('peanut butter')
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(){
    super('chocolate chip')
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name){
    super(name)
    this.other_count = 150
  }
}

//===============Ingredient Class==============
class Ingredient {
  constructor(options){
    this.name = options[1]
    this.amount = options[0]
  }

}

//=============Cookie Factory Class==============
class CookieFactory {
  static create(options_cookies, options_ingredients){
    let cookies_list = []

    for(let i = 0; i < options_cookies.length; i++){
      let cookies = ''
      if(options_cookies[i] == 'peanut butter'){
        cookies = new PeanutButter()
        cookies_list.push(cookies)
      } else if(options_cookies[i] == 'chocolate chip'){
        cookies = new ChocolateChip()
        cookies_list.push(cookies)
      } else {
        cookies = new OtherCookie(options_cookies[i])
        cookies_list.push(cookies)
      }

      let optionsLength = options_ingredients[i].length/2;
      let ingredientsArr = []
      for(var j = 0; j < optionsLength; j++){
        let ingredients = new Ingredient(options_ingredients[i]);
        cookies.ingredients.push(ingredients);
        options_ingredients[i].splice(0,2)
      }
    }
    return cookies_list
  }

  static cookieRecomendation(day, input){
    let sugar_cookies = []

    for(let i = 0; i < input.length; i++){
      for(let j = 0; j < input[j].ingredients.length; j++){
        if(input[i].ingredients[j].name == ' sugar'){
          sugar_cookies.push(input[i].name)
        }
      }
    }

    let sugar_free_cookies = []
    let status = false
    for(let i = 0; i < input.length; i++){
      if(input[i].name !== sugar_cookies[i]){
        sugar_free_cookies.push(input[i])
      }
    }
    return sugar_free_cookies
  }

}



//===============Driver Code====================
let batch_of_cookies = CookieFactory.create(options_cookies, options_ingredients)
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecomendation("tuesday", batch_of_cookies)
console.log('sugar free cakes are :')
for(let i = 0; i < sugarFreeFoods.length; i++){
  console.log(sugarFreeFoods[i].name);
}
