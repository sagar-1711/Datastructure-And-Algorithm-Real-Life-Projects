//Object Oriented Programming in Javascript

//allows to create objects without defining the class

//One way of creating Javascript Object(JSON)-Javascript Object Notation
 


//one way to create object

var apple={
	taste:"sweet",
	color:"red",
};

/*
var bird={
	x:100,
	y:20,
	color:"blue",
	eggs:["one","two","three"],

	fly:function(){
		console.log("Bird is flying at",this.x,this.y);
	}
};


//For Loop
for(let i=0;i<bird.eggs.length;i++)
{
	console.log(bird.eggs[i]);
}

//For Each Loop
bird.eggs.forEach(function(val,idx){

	console.log(idx,val);


})

*/
//another way of creating object using new keyword

 function Fruit(taste,color){
 	this.taste=taste;
 	this.color=color;
 }

 let mango=new Fruit("sweet","yellow");
 let orange=new Fruit("sour","orange");


//Class keyword (ECMAScript 2015)

//Class Declaration
class FruitClass{
	constructor(taste,color){
		this.color=color;
		this.taste=taste;
	}

};

let kiwi=new FruitClass("sour","green");
 
//Class Expression 
let FruitClass2=class{
	constructor(taste,color){
		this.color=color;
		this.taste=taste;
	}

};

let kiwi2= new FruitClass2("sour","green");
