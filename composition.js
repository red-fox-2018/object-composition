/*jshint esversion:6*/
var fs = require("fs");
var str = fs.readFileSync("cookies.txt", 'utf8');
var options = str.split("\n");


class Cookie{
  constructor(ingredients, name){
    this.name = name;
    this.status = "mentah";
    this.ingredients = ingredients;
    this.SugarFree = this.SugarFree();
  }

  bake(){
    this.status = "selesai dimasak";
  }

  SugarFree(){
    for (var i = 0; i < this.ingredients.length; i++) {
      if (this.ingredients[i].name.trim() === "sugar") {
        return true;
      }
    }
    return false;
  }
}

class PeanutButter extends Cookie{
  constructor(ingredients, name){
    super(ingredients, name);
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie{
  constructor(ingredients, name){
    super(ingredients, name);
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie{
  constructor(ingredients, name){
    super(ingredients, name);
    this.other_count = 150;
  }
}

class Ingredients{
  constructor(options){
    this.name = options['name'];
    this.amount = options['amount'];
  }
}

class CookieFactory{
  static create(options){
    let cookies = [];
    let cookiesList = [];
    let bahanList = [];
    for (var i = 0; i < options.length; i++) {
      var tmp = options[i].split("=");
      if (tmp[0]) {
        cookiesList.push(tmp[0]);
        bahanList.push(tmp[1]);
      }
    }

    for (let i = 0; i < cookiesList.length; i++) {
      var ingridientsArr = [];
      var splittedBahanList = bahanList[i].split(",");

      for (var j = 0; j < splittedBahanList.length; j++) {
        var elementIngredients = splittedBahanList[j].split(":");
        var tmpObj = {};
        tmpObj.name = elementIngredients[1];
        tmpObj.amount = elementIngredients[0];
        var newIngredients = new Ingredients(tmpObj);
        ingridientsArr.push(newIngredients);
      }

      var newCookie;
      if (cookiesList[i].trim() === "peanut butter") {
        newCookie = new PeanutButter(ingridientsArr, cookiesList[i].trim());
      }else if(cookiesList[i].trim() === "chocolate chip"){
        newCookie = new ChocolateChip(ingridientsArr, cookiesList[i].trim());
      }else{
        newCookie = new OtherCookie(ingridientsArr, cookiesList[i].trim());
      }
      cookies.push(newCookie);
    }
    return cookies;
  }

  static cookieRecommendation(day, batch_of_cookies){
    let sugarFreeCakes = [];
    if (day === "tuesday") {
      for (var i = 0; i < batch_of_cookies.length; i++) {
        if (batch_of_cookies[i].SugarFree === false) {
          sugarFreeCakes.push(batch_of_cookies[i]);
        }
      }
    }
    return sugarFreeCakes;
  }
}



let batch_of_cookies = CookieFactory.create(options);
let sugarFreeCookies = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);
console.log("sugar free cakes");
console.log("================");
for (let i = 0; i < sugarFreeCookies.length; i++) {
  console.log(sugarFreeCookies[i].name);
}
