"use strict"



class Cookie {
	constructor(name,ingredients) {
		this.name=name;
		this.status="mentah";
		this.ingredients=ingredients;
	}

	bake() {
		this.status="selesai dimasak"
	}
}

class PeanutButter extends Cookie {
	constructor(name,ingredients) { //composition cuma panggil atribut dari parent
		super(name,ingredients) //tanya super
		this.peanut_count=100;
	}
}

class ChocolateChip extends Cookie {
	constructor(name,ingredients) {
		super(name,ingredients);
		this.choc_chip_count=200;
	}
}

class OtherCookie extends Cookie {
	constructor(param_name,ingredients) {
		super(param_name,ingredients);
		this.name=param_name;
		this.choc_chip_count=150;
	}

}

class CookieFactory {	

	static create(options) { //ini bisa diakses ke method lain?
		let output=[];
		//console.log(options)
		for(let i=0;i<options.length;i++) {
			var cookies=options[i].split(' = ')[0];
			var ingred=options[i].split(' = ')[1].split(',');
			var listIngred=[];
			for(let j=0;j<ingred.length;j++) {
				listIngred.push(new Ingredients(ingred[j].split(':')[1],ingred[j].split(':')[0]))
			}

			if(cookies === 'peanut butter') {
				output.push(new PeanutButter(cookies,listIngred))
			}else if(cookies === 'chocolate chip') {
				output.push(new ChocolateChip(cookies,listIngred))
			}else{
				output.push(new OtherCookie(cookies,listIngred))
			}
		}
		return output;
	}	

		
	static cookieRecomendation(day) {
		var batchCookies=this.create(options);
		//console.log(batchCookies[0].ingredients)
		if(day==='tuesday') {
			console.log('sugar free cakes are:')
			for(let i=0;i<batchCookies.length;i++) {
				for(let j=0;j<batchCookies[i].ingredients.length;j++){
					if(batchCookies[i].ingredients[j].name === ' sugar') {
						console.log(batchCookies[i].name)
					}
				}
			}
		}
	}

}	
			
			




class Ingredients {
	constructor(name,amount){
		this.name=name;
		this.amount=amount
	}
}



//var mango=new Mango()


var fs=require('fs');
var options=fs.readFileSync('cookiesIngredients.txt').toString().split('r\n');
//console.log(options);
//(console.log(CookieFactory.create(options)[0]));
var batchCookies=CookieFactory.create(options);
console.log(batchCookies)
CookieFactory.cookieRecomendation('tuesday');
//let peanutButter=new PeanutButter();
