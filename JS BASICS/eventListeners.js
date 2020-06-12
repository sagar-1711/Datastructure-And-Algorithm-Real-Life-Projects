//Event Listeners
function f1(){
	console.log("You clicked on the canvas");
}

function f2(e){
	console.log("A key got Pressed",e.key);
}

canvas=document.getElementById("mycanvas");

canvas.addEventListener('click',f1);

document.addEventListener('keydown',f2);
