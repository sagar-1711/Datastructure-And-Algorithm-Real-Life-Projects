counter=2;
let prizes_config={
    count:12,
    prize_names:["3000 Credits","35% OFF","Hard Luck","70% OFF","Swag Pack","100% OFF","Netflix","50% OFF","Amazon Voucher","2 Extra Spin","CB Tshirt","CB Book"]
}
let config={
    type:Phaser.CANVAS,
    width:800,
    height:800,
    backgroundColor:0xffcc00,
    
    scene:{
        preload:preload,
        create:create,
        update:update
    
    }
};

let game=new Phaser.Game(config);

function preload()
{
    //this refers to scene object
    //console.log(this);
    //load images
    this.load.image("background","./Assets/back.jpg");
    this.load.image("wheel","./Assets/wheel.png");
    this.load.image("pin","./Assets/pin.png");
    this.load.image("stand","./Assets/stand.png");
    this.load.image("yougot","./Assets/yougot.png");
   //load button
    this.load.image("myButton","./Assets/spin.png");
    //load music
    this.load.audio("spinSound","./Assets/wheel-audio.mp3");
    this.load.audio("congrats","./Assets/coffinDance.mp3");
    
    
}


function create()
{
    //create the backgroud image
    W=game.config.width;
    H=game.config.height;
    let background=this.add.sprite(0,0,"background");
    background.setPosition(W/2,H/2);
    //shrink everythong by 20 percent
    background.setScale(0.50);
    
    
    
    //create stand object
    
    this.stand=this.add.sprite(W/2+200,H/2+50,"stand");
    this.stand.setScale(0.20);
    
    //create a Wheel object as a part of scene
    this.wheel=this.add.sprite(W/2+200,H/2-100,"wheel");
    this.wheel.setScale(0.15);
    
    //create a pin object
    this.pin=this.add.sprite(W/2+200,H/2-250,"pin");
    this.pin.setScale(0.20);
    //pin.scaleX=2
    //pin.scaleY=0.5;
    //pin.depth=1; by default depth is 0
    
    //create button
    this.myButton=this.add.sprite(W/2-300,H/2,"myButton");
    this.myButton.setScale(0.40);
    
    //congratulations
    //this.yougot = this.add.sprite(W/2, H/2, 'yougot');
    //this.yougot.visible = false;
    
    //create sound
    this.spinSound=this.sound.add("spinSound");
    this.congrats=this.sound.add("congrats");
    
    
    
    //button functions
    if(counter!=0)
        {
            this.myButton.setInteractive({cursor:'pointer'});
            this.myButton.on('pointerdown',spinwheel,this);
            this.myButton.on('pointerover',mouseOver,this);
            this.myButton.on('pointerout',mouseOut,this);
    
        }
    
    
    //lets create a text object
    font_style={
        font:"bold 30px Arial",
        align:"center",
        color:"red"
    }
    
    att_font_style={
        font:"bold 25px Arial",
        align:"center",
        color:"red"
    }
    
    this.game_text=this.add.text(250,10,"Welcome To Spin & Win",font_style);
    
    this.attempt=this.add.text(20,450,counter+" SPINS LEFT",att_font_style);
   
    
    
}

//Game Loop
function update()
{
    //this.wheel.angle+=1;
    //this.wheel.alpha=0.5;// transparency
    //this.wheel.scaleX+=0.01;
    //this.wheel.scaleY+=0.01;
   
    
}
function mouseOver()
{
    console.log("mouseover");
    this.myButton.setScale(0.50);
}

function mouseOut()
{
    console.log("mouseout");
    this.myButton.setScale(0.40);
}
 i=10;
function spinwheel()
{
     this.congrats.stop();
    //update attempts
    counter--;
    if(counter==0)
        {
            this.attempt.setText("NO SPINS LEFT");
            
        }
   
    else
    {
        this.attempt.setText(counter+ " SPINS LEFT");
        
    }
    
    
    //Disable button
    this.myButton.disableInteractive();
    
    
    console.log("You clicked the button");
    let rounds=Phaser.Math.Between(2,4);
    let deg=Phaser.Math.Between(0,11)*30;
    let total_angle=rounds*360+deg;
    console.log(total_angle);
    let idx=prizes_config.count-1-Math.floor(deg/(360/prizes_config.count));
    
    //Adding tween to the button to fade it
    this.tweens.add({
        targets:this.myButton,
        alpha:0.5,
        duration:500
    });
   
    
    //play spinSound
    this.spinSound.play();
    tween=this.tweens.add({
        targets:this.wheel,
        angle:total_angle ,
        ease:"Cubic.easeOut",
        duration:6000,
        callbackScope:this,
        onComplete:function()
        {
            if(idx==2)
                {
                    this.game_text.setText("Sorry !"+prizes_config.prize_names[idx]);
                }
            else
            {
                this.tweens.add({
                    targets:this.congrats.play(),
                    duration:300,
                    callbackScope:this
                })
                this.congrats_text=this.add.text(W/ 2 - 75, 500 + i, `${prizes_config.prize_names[idx]}`, {
                fontSize: '40px',
                fontFamily: 'Times New Roman',
                color: 'rgb(221, 148, 29)',
                
                
            });
        
                
            }
            
            
        i+=50;
            if(counter>0)
                {
                    this.myButton.setInteractive({cursor:'pointer'});
                    //unfading button after spin
                    this.tweens.add({
                    targets:this.myButton,
                    alpha:1,
                    duration:400
                });
                
                }
            
           
        }
        });
    
    
}