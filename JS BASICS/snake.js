


//canvas is used to draw graphics

/*
pen=canvas.getContext('2d');
pen.fillStyle="red";
pen.fillRect(20,20,50,50);
pen.arc(80,80,50,0,2*Math.PI);
pen.stroke();
pen.fill();
*/





function init(){
	canvas=document.getElementById("mycanvas");
	W=canvas.width=500;
	H=canvas.height=500;
	pen=canvas.getContext('2d');
	pen.fillStyle="red";
	game_over=false;
	rect={
	x:20,
	y:20,
	w:40,
	h:40,
	speed:20
	};
}

function draw(){
	//erase previous output
	pen.clearRect(0,0,W,H);
	pen.fillRect(rect.x,rect.y,rect.w,rect.h);
}

function update(){
	rect.x+=rect.speed;
	if(rect.x>W-rect.w || rect.x<0)
	{
		rect.speed*=-1;
	}
}

function gameloop(){
	if(game_over==true)
	{
		clearInterval(f);
	}
	draw();
	update();
}


init(); 
var f=setInterval(gameloop,100);
