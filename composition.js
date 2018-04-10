var fs = require('fs')
var data = fs.readFileSync('./cookies.txt','utf8')
var options = data.split('\n')
//var result = options[0].split('=')







class Cookie {
  constructor(name,ingridient) {
    this.name = name
    this.status = 'mentah'
    this.ingridient = ingridient//JSON.stringify(ingridient)
  }

  bake(){
    this.status = 'matang'
  }

}

class PeanutButter extends Cookie{
  constructor(name, ingridient) {
    super(name, ingridient)
    this.peanut_count =100
  }
}

class ChoclateChip extends Cookie{
  constructor(name, ingridient) {
    super(name, ingridient)
    this.choc_chip_count =100
  }
}

class OtherCookies extends Cookie{
  constructor(name, ingridient) {
    super(name, ingridient)
    this.other_count =150
  }
}


class Ingredient {
  constructor(options){
    this.name = options['name']
    this.amount = options['amount']
  }
}




class CookieFactory {
  static create(options) {
    var cookies = []
    var sugar = false
    var arrCookie = []
    for (let i = 0; i < options.length - 1; i++) {
      var arrCookie = []
      let kue = options[i].split(' = ')
      let ingridients = kue[1].split(', ')
      let resep = String(kue[1]).split(', ')

      if (kue[0] == 'Peanut Butter') {
        for (let j = 0; j < resep.length; j++) {
          let bahan = resep[j].split(' : ')
          let objBahan = {
            name: bahan[1],
            amount: bahan[0]
          }
          var ingridient = new Ingredient(objBahan)
          arrCookie.push(ingridient)
        }
        var peanutbutter = new PeanutButter(kue[0], arrCookie)
        cookies.push(peanutbutter)

      } else if (kue[0] === 'Choclate Chip') {
        for (let j = 0; j < resep.length; j++) {
          let bahan = resep[j].split(' : ')
          let objBahan = {
            name: bahan[1],
            amount: bahan[0]
          }
          var ingridient = new Ingredient(objBahan)
          arrCookie.push(ingridient)
        }
        var chocolateChip = new ChoclateChip(kue[0], arrCookie)
        cookies.push(chocolateChip)
      } else {
        for (let j = 0; j < resep.length; j++) {
          let bahan = resep[j].split(' : ')
          let objBahan = {
            name: bahan[1],
            amount: bahan[0]
          }
          var ingridient = new Ingredient(objBahan)
          arrCookie.push(ingridient)
        }
        var chocolateOther = new OtherCookies(kue[0], arrCookie)
        cookies.push(chocolateOther)
      }

    }
    //console.log(require('util').inspect(cookies), {
    //   depth: null
    // });
    return cookies
  }

  static cookieRecomendation(day, cookies) {
    //console.log(cookies.length);
    var freeSugarCookies = []
    for (let i = 0; i < cookies.length; i++) {
      let bahan = cookies[i].ingridient
      // console.log(i,bahan.length)
      let sugarCounter = 0
      for (let j = 0; j < bahan.length; j++) {
        //console.log(bahan[j].name)
        //console.log(bahan[j]);
        if (bahan[j].name == 'sugar') {
          sugarCounter++
        }
      }
      //console.log(cookies[i].name,sugarCounter)
      if (sugarCounter == 0) {
        freeSugarCookies.push(cookies[i].name)
        console.log(cookies[i].name);
      }
      // console.log();
    }
    //console.log('-----------', freeSugarCookies)
    return freeSugarCookies.join('')
  }
}




var batch_of_cookies = CookieFactory.create(options)
var freeSugarCookies= CookieFactory.cookieRecomendation('tuesday',batch_of_cookies)
