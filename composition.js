const fs = require('fs')

class CookieFactory{
  static create(options){
        const cookiesOptions = fs.readFileSync(`./${options}`,'UTF8','\n').trim()
        let cookiesList = cookiesOptions.split('\n')
        let cookiesSplited = []
        let cookiesResult = []
        let ingredientsList = []

        cookiesList.forEach((dataCookies)=>{
          cookiesSplited.push(dataCookies.split('='))
        })
        cookiesSplited.forEach((dataSplited)=>{
          var ingredient = []
          var sugar = false
          let kue = dataSplited[0].trim()
          let receiptSplited = dataSplited[1].trim().split(',')
          // console.log(receiptSplited)
          receiptSplited.forEach((bumbu,idx)=>{
              let receiptSplited2 = bumbu.split(' : ')
              if(receiptSplited2[1] === 'sugar'){
                sugar = true
              }
              ingredient.push(new Ingredient(receiptSplited2))
          })
          let newKue = ''
          if(kue == 'peanut butter'){
             newKue = new PeanutButter(ingredient,sugar)
           }else if(kue == 'chocolate chip'){
             newKue = new ChocolateChip(ingredient,sugar)
           }else{
             newKue = new OtherCookie(kue,ingredient,sugar)
           }
           cookiesResult.push(newKue)
         })
        return cookiesResult
  }
  static cookieRecommendation(day,cookiesList){
        let recommendation = []
        cookiesList.forEach(dataCookies =>{
          if(dataCookies.has_sugar === false){
            recommendation.push(dataCookies)
          }
        })
        if(day === 'tuesday'){
          return recommendation
        }else{
          return cookiesList
        }
  }
}

class Cookie{
  constructor(name,ingredients,sugar){
    this.name = name
    this.status = 'mentah'
    this.ingredients = ingredients
    this.has_sugar = sugar
  }

  bake(){
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie{
  constructor(ingredients,sugar){
    super('peanut butter',ingredients,sugar)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie{
  constructor(ingredients,sugar){
    super('chocolate chip',ingredients,sugar)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie{
  constructor(name,ingredients,sugar){
    super(name,ingredients,sugar)
    this.other_count = 150
  }
}

class Ingredient{
  constructor(options){
    this.name = options[1]
    this.amount = options[0]
  }
}

const options = 'cookies.txt'
let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies)

let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies);
console.log('sugar free cakes are : ')
for(let i =0; i<sugarFreeFoods.length;i++){
  console.log(sugarFreeFoods[i].name)
}
