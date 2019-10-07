var faker=require("faker");
function find(){
	console.log(faker.name.findName());
	console.log("here are 10 elements \n");
	for(var i=0;i<10;i++){
		var name=faker.commerce.productName();
	  var price=faker.commerce.price();
		console.log("\nname: ");
			console.log(name);
		console.log(" , price: ");
			console.log(price);
	}
}


find();