// const requireCookies = require("./cookies.txt")
const fs = require ("fs")
const options= fs.readFileSync("cookies.txt","utf8")


class Ingredients{
    constructor(ingredient){
        this.ingredient = ingredient
        this.ingredientsList = this.parseIngredients()
    }

    readFile(fileName){
        let fileStr = fs.readFileSync(fileName,"utf-8")
        return fileStr.split("\n")
    }

    parseIngredients(){
        var array =[]
        //var ingObj={}
        var rowCookies = this.readFile('ingredients.txt') 
        console.log('-----', rowCookies)

        for(var i=0; i<rowCookies.length; i++){
            let objCookie = {}
            let row = rowCookies[i]
            let cookie = row.split("=")
            let cookieName = cookie[0]
            let cookieIngredients = cookie[1].split(",")
            let ingredients = [] //gakepake kynya kalo gakpake hapus, biar gak pusing bacanya wkwk
            for(let i=0; i < cookieIngredients.length; i++){
                let ingredient = cookieIngredients[i].split(":")
                let ing = {}
                let amount = ingredient[0]
                let ingName = ingredient[1]
                ing[ingName] = amount
                ingredients.push(ing)
            }
            objCookie[cookieName] = ingredients           
            array.push(objCookie)
        }
        //console.log("===>  ",JSON.stringify(array))
        for(var k=0;k<array.length;k++){    
            for(i in array[k]){
                console.log(this.ingredient)
                console.log(i)
                console.log(i==this.ingredient+" ")
                if(i==this.ingredient+" "){
                    return array[k][i].map(JSON.stringify)
                }
            }//save 
        }
        return 'gak ketemu'//saveeeeeee
    }
}


class Cookie{
    constructor(name,ingredients){
        this.name=name
        this.status="mentah"
        this.ingredients=ingredients
        this.has_sugar=null
    } 
    bake(){ 
        this.status= "selesai dimasak"
    }
}

class PeanutButter extends Cookie{
    constructor(name,ingredients){
        super()
        this.name=name
        this.peanut_count=100
        this.ingredients=ingredients
    }
}

class ChocolateChipCrumbled extends Cookie{
    constructor(name,ingredients){
        super()
        this.name=name
        this.peanut_count=100
        this.ingredients=ingredients
    }
}

class PeanutButterCrumbled extends Cookie{
    constructor(name,ingredients){
        super()
        this.name=name
        this.peanut_count=100
        this.ingredients=ingredients
    }
}

class ChocolateChip extends Cookie{
    constructor(name,ingredients){
        super()
        this.name=name
        this.choc_chip_count = 200
        this.ingredients=ingredients
    }
}

class OtherCookie extends Cookie{
    constructor(name,ingredients){
        super()
        this.name=name
        this.other_count=150
        this.ingredients=ingredients
    }

}

class CookieFactory{
    static create(options){
        var arrOfObjects=[]
        var splitOptions= options.split("\n")
        console.log(splitOptions)
        var str=""
        for(var i=0; i<splitOptions.length; i++){
            if(splitOptions[i]==="peanut butter"){
                var ingredients = new Ingredients('peanut butter')
                arrOfObjects.push(new PeanutButter("Peanut Butter",ingredients.ingredientsList))
            }
            else if(splitOptions[i]==="chocolate chip"){
                var ingredients = new Ingredients('chocolate chip')
                arrOfObjects.push(new ChocolateChip("Chocolate Chip",ingredients.ingredientsList))
            }
            else{
                console.log("=======> aaaaaaa  ",splitOptions[i])
                var ingredients = new Ingredients(splitOptions[i])
                arrOfObjects.push(new OtherCookie(splitOptions[i],ingredients.ingredientsList))
            }
        }
        console.log(arrOfObjects)
    }
}

let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies)
//lw coba parseint ingredients nya hah yg mana? lw kan ada bwt class namanya ingredients
//gw dah taro returnya lw coba panggil di sini
//di console.log 
// console.log("sugar free cakes are : ")
// for(let i=0; i<sugarFreeFoods.length; i++){
//     console.log(sugarFreeFoods[i].name)
// }