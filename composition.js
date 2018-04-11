const fs = require('fs');
let option = fs.readFileSync('cookies.txt','utf8')

class Ingredients{
    constructor(option){
        this.name = option[1]
        this.amount = option[0]
    }

}

class Cookie{
    constructor(){
        this.name = ''
        this.status = 'mentah'
        this.ingredients = []
    }
    
    bake(){
        this.status = 'selesai dimasak'
    }

}

class PeanutButter extends Cookie{
    constructor(){
        super()
        this.name = ''
        this.peanut_count = 100;
    }
}

class ChocholateChip extends Cookie{
    constructor(){
        super()
        this.name = ''
        this.choc_chip_count = 200
    }
}

class OtherCookies extends Cookie{
    constructor(){
        super()
        this.name = ''
        this.choc_chip_count = 150
    }
}

class CookieFactory{
    static create(option){
        let peanutbutter = new PeanutButter()
        let chocolatechip = new ChocholateChip()        
        let optionCookies = option.split('\n');
        let arrCookies = []
        let step1 = [];
        for(let i=0;i<optionCookies.length;i++){
            step1.push(optionCookies[i].split('='))
        }
        for(let i=0;i<step1.length;i++){
            if(step1[i][0] === 'peanut butter '){
                let step2 = step1[i][1].split(',');
                peanutbutter.name = step1[i][0]
                for(let i=0;i<step2.length;i++){
                    peanutbutter.ingredients.push(new Ingredients(step2[i].split(':')))
                }
                arrCookies.push(peanutbutter)
            }
            else if(step1[i][0] === 'chocolate chip '){
                let step2 = step1[i][1].split(',');
                chocolatechip.name = step1[i][0]
                for(let i=0;i<step2.length;i++){
                    chocolatechip.ingredients.push(new Ingredients(step2[i].split(':')))
                }
                arrCookies.push(chocolatechip)
            }
            else{
                let othercookies = new OtherCookies()
                // console.log(i)
                let step2 = step1[i][1].split(',');
                othercookies.name = '';
                othercookies.name = step1[i][0];
                othercookies.ingredients = [];
                for(let i=0;i<step2.length;i++){
                    othercookies.ingredients.push(new Ingredients(step2[i].split(':')))
                }
                arrCookies.push(othercookies);
            }
        }
        return arrCookies
    }

    static cookieRecommendation(day,data){
        let recommendcookies = []
        for(let i=0;i<data.length;i++){
            let next = data[i].ingredients;
            let status = 0;
            for (let j = 0; j < next.length; j++) {
                if (next[j].name.trim() === 'sugar') {
                    status += 1;
                }
            }
            if(status === 0){
                recommendcookies.push(data[i].name)
            }
        }
        return recommendcookies
    }
}

// let result = new PeanutButter();
// console.log(result.ingredients[0])

let batch_of_cookies = CookieFactory.create(option)
// console.log(batch_of_cookies)

let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday',batch_of_cookies)
console.log('sugar free cakes are :')
for(let i=0;i<sugarFreeFoods.length;i++){
    console.log(sugarFreeFoods[i])
}