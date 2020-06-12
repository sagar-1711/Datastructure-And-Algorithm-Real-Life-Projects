
function init(){
	canvas=document.getElementById('mycanvas');
	W=H=canvas.width=canvas.height=1000;
	pen=canvas.getContext('2d');
	cs=67;
	game_over=false;
	//score as length of snake 
	score=5;
	food=getRandomFood();
	//create a image object for food;
	food_img=new Image();
	food_img.src="apple.png";
	//create new image for trophy
	trophy=new Image();
	trophy.src="trophy.png";

	snake={
		init_len:5,
		color:"blue",
		cells:[],
		direction:"right",


		createSnake:function()
		{
			for(var i=this.init_len;i>0;i--)
			{
				this.cells.push({x:i,y:0});

			}

		},

		drawSnake:function()
		{
			pen.fillStyle="blue";
			for(var i=0;i<this.cells.length;i++)
			{
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
			}
		},
		updateSnake:function()
		{
			//console.log("updating snake");
			//check if the snake has eaten food or not, 
			//increase the length of snake and generate new food object
			var headX=this.cells[0].x;
			var headY=this.cells[0].y;

			if(food.x==headX && food.y==headY)
			{
				console.log("Food Eaten By Snake");
				score++;
				food=getRandomFood();
			}
			else
			{
				//Do not remove in case of collision
				this.cells.pop();
			}

			
			
			var nextX,nextY;
			if(this.direction=="right")
			{
				nextX=headX+1;
				nextY=headY;
			}
			else if(this.direction=="left")
			{
				nextX=headX-1;
				nextY=headY;
			}
			else if(this.direction=="up")
			{
				nextX=headX;
				nextY=headY-1;
			}
			else
			{
				nextX=headX;
				nextY=headY+1;
			}
			
			this.cells.unshift({x:nextX,y:nextY});

			var lastX=Math.round(W/cs);
			var lastY=Math.round(H/cs);

			if(this.cells[0].x<0 || this.cells[0].y<0 || this.cells[0].x>lastX ||this.cells[0].y>lastY)
			{
				game_over=true;
			}



		}
	};
	snake.createSnake();
	function KeyPressed(e)
	{
		
		if(e.key=="ArrowRight")
		{
			snake.direction="right";
		}
		else if(e.key=="ArrowLeft")
		{
			snake.direction="left";
		}
		else if(e.key=="ArrowDown")
		{
			snake.direction="down";
		}
		else
		{
			snake.direction="up";
		}
		console.log(snake.direction);
	}

	//Add a Event listener on the doc object
	document.addEventListener('keydown',KeyPressed);
}


function draw()
{
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	pen.fillStyle=food.color;
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs); 

	pen.drawImage(trophy,20,20,cs,cs);
	pen.fillStyle="blue";
	pen.font="30px Roboto";
	pen.fillText(score,50,50);
}

function update()
{ 
	snake.updateSnake();
}
function getRandomFood()
{
 	var foodX=Math.round(Math.random()*(W-cs)/cs);
 	var foodY =Math.round(Math.random()*(H-cs)/cs);
 	var food={
 		x:foodX,
 		y:foodY,
 		color:"red"
 	};

 	return food;
 }

function gameloop()
{
	if(game_over==true)
	{
		clearInterval(f);
		alert("Game Is Over");
		return;
	}
	draw();
	update();
}

init();

var f=setInterval(gameloop,100);