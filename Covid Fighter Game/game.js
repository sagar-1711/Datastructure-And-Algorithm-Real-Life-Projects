function load_images()
{
    //enemy image
    enemy_image=new Image;
    enemy_image.src="Assets/v1.png";
    
    //load player image
    player_image=new Image;
    player_image.src="Assets/superhero.png";
    
    //load the gem image
    gem_image=new Image;
    gem_image.src="Assets/gem.png";
    
    
}
function detectCollision(rect1,rect2)
{
    if(rect1.x-rect2.x<rect2.w && rect2.x-rect1.x<rect1.w && rect1.y-rect2.y<rect2.h && rect2.y-rect1.y<rect1.w )
        {
             return true;
        }
       
    return false;
}
function init()
{
    canvas=document.getElementById("mycanvas");
    
    W=700;
    H=400;
    game_over=false;
    canvas.width=W;
    canvas.height=H;
    
    //create a context
    pen=canvas.getContext('2d');
    
    e1={
        x:150,
        y:50,
        w:60,
        h:60 ,
        speed:20
    };
    
    e2={
        x:300,
        y:150,
        w:60,
        h:60 ,
        speed:30
    };
    
    e3={
        x:450,
        y:20,
        w:60,
        h:60 ,
        speed:40
    };
    
    enemy=[e1,e2,e3];
    
    player={
        x:20,
        y:H/2,
        w:60,
        h:60,
        speed:20,
        moving:false,
        health:100
    };
    
    gem={
        x:W-100,
        y:H/2,
        w:60,
        h:60
    };
    
    //creating event listener on the canvas
    
   //When mouse is pressed move player 
    canvas.addEventListener("mousedown",function(){
        console.log("Mouse Pressed");
        player.moving=true;
    });
    
     //When mouse is released do not move player
    canvas.addEventListener("mouseup",function(){
        console.log("Mouse Released");
        player.moving=false;
    });
    
}

function draw()
{
    //clear the canvas area for old frame
    pen.clearRect(0,0,W,H);
   
   //draw the player
    pen.drawImage(player_image,player.x,player.y,player.w,player.h);
    
    //darw the gem
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    //Draw the enemies
   for(let i=0;i<enemy.length;i++)
   {
       pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
   }
    //display score
    pen.fillStyle="white";
    pen.fillText("Score "+ player.health,10,10)
}

function update()
{
    //if the player is moving move it by changing x
    if(player.moving==true)
        {
            player.x+=player.speed;
            player.health+=20;
        }
    //check overlap between player and gem
    if(detectCollision(player,gem))
        {
            console.log("You Won The Game");
            alert("You Won The Game");
            game_over=true;
            return;
        }
    //check for overlap with enemies
    for(let i=0;i<enemy.length;i++)
        {
            if(detectCollision(enemy[i],player))
                {
                    player.health-=50;
                    if(player.health<=0)
                    {
                        console.log(player.health);
                        game_over=true;
                        alert("Game Over"+player.health);
                    }

                }
        }
    
    //update each enemy
    for(let i=0;i<enemy.length;i++)
        {
            enemy[i].y+=enemy[i].speed;
      
            if(enemy[i].y>H-enemy[i].h || enemy[i].y<0)
                {
                    enemy[i].speed*=-1;
                }
        }
   
}

function gameloop()
{
    if(game_over==true)
        {
            clearInterval(f);
        }
    draw();
    update();
    console.log("In Game Loop");
    
}
load_images();
init();


var f=setInterval(gameloop,100);