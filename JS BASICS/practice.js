
let a=10;
console.log(a);

let b=[1,2,3,4,5];
console.log(b);

console.log("Hello World");
/* 
//global variable
c=20;
function display()
{
	console.log(c);
}

function function_scope()
{
	var d=5;
	//function scope
	if(d==5)
	{
		console.log(c);
	}
	
}

function check()
{
	if(d==5)
	{
		console.log(c)
	}
}

function block_scope()
{
	if(c==20)
	{
		//block scope
		let f=100;
		console.log(f);
	}
	console.log(f);
}


square_root(10);
sqrt_n();

//Function hoisting
var sqrt_n=function()
{
	console.log("In first Sqrt function");
	return;
}

function square_root(n)
{
	console.log("In second Sqrt function");
	//console.log(Math.Sqrt(n));
	return "Hello";
}

*/

//Arrays
let arr=["Apple","Mango","Guava"];
console.log(arr);

for(let i=0;i<5;i++)
{
	console.log(arr[i]);
}

arr.push("Banana"); // Insert at back
arr.pop(); //remove from back
arr.shift();//remove from front
arr.unshift("kiwi");//insert at front
arr.indexOf("Kiwi"); //finds the inex
