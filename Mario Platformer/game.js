let config={
    type:Phaser.AUTO,
    scale:{
        mode:Phaser.Scale.FIT,
        width:800,
        height:600
    },
    
    backgroundColor:0xffff11,
    //adding physics engine
    physics:{
        default:'arcade',
        arcade:{
            gravity:{
                //gravity along y axis
                y:1000,
            
            },
            debug:false //to show bounding box around objects
            
        }
    },
    
    scene:{
        preload:preload,
        create:create,
        update:update
        
    }
    
};

let game=new Phaser.Game(config);

let player_config={
    player_speed:150,
    player_jumpspeed:700
}

function preload()
{
    //load background sky
    this.load.image("sky","Assets/background.png");
    
    //load ground
    this.load.image("ground","Assets/topground.png");
    
    //load player
    this.load.spritesheet("player","Assets/dude.png",{frameWidth:32,frameHeight:48});
    
    //load apple
    this.load.image("apple","Assets/apple.png");
    
    //load rays
    this.load.image("ray","Assets/ray.png");
}
 
function create()
{
    W=game.config.width;
    H=game.config.height;
    //add tilesprites
    let ground=this.add.tileSprite(0,H-128,W,H-128,"ground");
    ground.setOrigin(0,0);
    
    //try to create background
    let background=this.add.sprite(0,0,"sky");
    background.setOrigin(0,0);
    background.displayWidth=W;
    background.displayHeight=H;
    
    background.depth=-2;
    
    //create rays on the top of background
    let rays=[];
    
    for(let i=-10;i<=10;i++)
        {
            let ray=this.add.sprite(W/2,H-128,'ray');
            ray.setOrigin(0.5,1);
            ray.displayHeight=1.5*H;
            ray.depth=-1;
            ray.alpha=0.2;
            ray.angle=i*10;
            rays.push(ray);
            
        }
    
    //tweens for rays
    this.tweens.add({
        targets:rays,
        props:{
            angle:{
                value:"+=20",
                
            }
        },
        duration:8000,
        repeat:-1
    });
    
    
    //add player and apply physics
    this.player=this.physics.add.sprite(100,100,"player",4);
    //console.log(this.player);
    
    //set the bouncing effect on player
    this.player.setBounce(0.5);
    //setting collision between boundary and palyer so that it does bnot move out of frame
    this.player.setCollideWorldBounds(true);
    //making ground as static object
    this.physics.add.existing(ground,true);
    //ground.body.allowGravity=false;
    //ground.body.immovable=true;
    //console.log(ground);
    
    
    //Add a group of apples
    let fruits=this.physics.add.group({
        key:"apple",
        repeat:8,
        setScale:{x:0.2,y:0.2},
        setXY:{x:10,y:0,stepX:100}
    });
    
    
    //add bouncing effects to apples
    fruits.children.iterate(function(f){
        f.setBounce(Phaser.Math.FloatBetween(0.4,0.7));
    });
    
    
    //add more platforms
    let platforms=this.physics.add.staticGroup();
    platforms.create(500,350,"ground").setScale(2,0.5).refreshBody();
    //make platfrms more rectangular using setScale and making boundary wall as per new body shape using refreshBody();
    
    platforms.create(700,200,"ground").setScale(2,0.5).refreshBody();
    platforms.create(100,200,"ground").setScale(2,0.5).refreshBody();
    
    //adding ground to platforms for simplicity
    platforms.add(ground);
    
    
    //add a collision detector betwen the player and ground
    //this.physics.add.collider(ground,this.player);
    
    //this.physics.add.collider(ground,fruits);
    
    //add collision detector between platforms and fruits
    this.physics.add.collider(fruits,platforms);
    
    //add collision between platform(ground) and player
    this.physics.add.collider(this.player,platforms);
    
    
    //player animations and movement
    //left movement
    this.anims.create({
        key:'left',
        frames:this.anims.generateFrameNumbers('player',{start:0,end:3}),
        framerate:10,
        repeat:-1
    });
    
    //center 
    this.anims.create({
        key:'center',
        frames:this.anims.generateFrameNumbers('player',{start:4,end:4}),
        framerate:10
    });
    
    
    //right movement
    this.anims.create({
        key:'right',
        frames:this.anims.generateFrameNumbers('player',{start:5,end:8}),
        framerate:10,
        repeat:-1
    });
    
    
    //keyboard controls
    
    this.cursors=this.input.keyboard.createCursorKeys();
    
    
    //checking overrlap between fruit and player
    this.physics.add.overlap(this.player,fruits,eatFruit,null,this);
    

    //create cameras
    this.cameras.main.setBounds(0,0,W,H);
    this.physics.world.setBounds(0,0,W,H);
    //we can have a bigger world size as well
    
    this.cameras.main.startFollow(this.player,true,true);
    this.cameras.main.setZoom(1.5);
    
    
}

function eatFruit(player,fruits)
{
    //make apple invisible on overlap with player
    fruits.disableBody(true,true);
}


function update()
{
     if(this.cursors.left.isDown)
         {
             this.player.setVelocityX(-player_config.player_speed);
             this.player.anims.play('left',true);
         }
    else if(this.cursors.right.isDown)
         {
             this.player.setVelocityX(player_config.player_speed);
             this.player.anims.play('right',true);
         }
    else //when player is still
    {
        this.player.setVelocityX(0);
        this.player.anims.play('center',true);
    }
        
    //Add jumping ability to player, stop the player in air no alternate jumps in air
    if(this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-player_config.player_jumpspeed);
        }
    
}