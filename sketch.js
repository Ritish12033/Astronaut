var groundImg,ground;
var rocketImg,player;

var asteriod1,asteriod2,asteriod3;
var AsteriodsG1;

var gameOver,gameOverImg;

var coinsG, coinsImg;

var starG, starImg;

var destroy,destroyImg;

var Points = 0;
var star = 0;

var gameState = "PLAY";

var playbutton, pausebutton, exitbutton;
var homebutton, nextlevelbutton; 

function preload(){
  
  groundImg = loadImage("giphy.gif");
  
  rocketImg = loadImage("Rocket1.png");
  
  asteriod1 = loadImage("asteriod1.gif");
  asteriod2 = loadImage("asteriod2.gif");
  asteriod3 = loadImage("asteriod3.gif");
  
  gameOverImg = loadImage("gameover.png");
  
  coinsImg = loadImage("coins.gif");
  
  starImg = loadImage("star1.gif");
  
  destroyS = loadSound("sound1.wav");
  PointS = loadSound("sound2.wav");
  starS = loadSound("sound3.wav");
  musicX = loadSound("music1.mp3");
}

function setup() {
 createCanvas(500,500);
  musicX.loop();
  
  ground = createSprite(250,250);
  ground.addImage("space",groundImg);
  
  player = createSprite(50,250);
  player.addImage("Rocket",rocketImg);
  player.scale = 0.1;
  //player.debug = true;
  
  gameOver = createSprite(250,250);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.4;
  
  coinsG = createGroup();
  starG = createGroup();
  AsteriodsG1 = createGroup();

  playbutton = createSprite(20,20,10,10);
  
  homebutton = createSprite(20,40,10,10);

  exitbutton = createSprite(20,80,10,10);


  
}

function draw() {
  
  if (gameState==="PLAY"){
    background(0);
    gameOver.visible = false;
    //player moves
    if (keyDown("up")){
      
      player.y = player.y -7;
      
    }
    if (keyDown("down")){
      
      player.y = player.y +7;
      
    }
    if (keyDown("left")){
      
      player.x = player.x -7;
      
    }
    if (keyDown("right")){
      
      player.x = player.x +7;
      
    }
    
    //points to collect
    if (coinsG.isTouching(player)){
      coinsG.destroyEach();
      Points = Points+10;
      PointS.play();
    
    }else if (starG.isTouching(player)){
      starG.destroyEach();
      star = star+1;
      starS.play();
    
    }else if (AsteriodsG1.isTouching(player)){
      gameState = "END";
      player.destroy();
      destroyS.play();
      
    }
    
    //player collide edges
    edges = createEdgeSprites();
    player.collide(edges);
    
    //Random placing
    var select_Objects = Math.round(random(1,5))
    
    if (World.frameCount % 80 == 0){
      
      if (select_Objects === 1){
        stars();
        
      }else if (select_Objects === 2){
        coins();
        
      }else if (select_Objects === 3){
        Asteriod1();
        
      }else if (select_Objects === 4){
        Asteriod2();
        
      }else {
        Asteriod3();
        
      }
      
    }
    
  }
  if (gameState === "END"){

    gameOver.visible = true;
    
    if (keyDown("space")){
      reset();
    }
        
  }
  
  
 drawSprites();
  textSize(18);
  fill("red");
  text("Points:"+Points,407,495);
  text("Stars:"+star,415,478);
  
  textSize(12);
  
  text("Use Arrow Keys to Play",3,495);
}

function Asteriod1(){
  
  if (frameCount % 80 === 0){
    
    var asta1 = createSprite(500,(random(50,450)));
    asta1.addImage(asteriod1);
    asta1.velocityX = -(10 + Points/100);//-(1 + star/100);
    asta1.scale = 0.4;
    asta1.lifetime = 400;
    asta1.setCollider("circle",0,0,75);
    //asta1.debug = true;
    
    AsteriodsG1.add(asta1);
  }
}

function Asteriod2(){
  
  if (frameCount % 80 === 0){
    
    var asta2 = createSprite(500,(random(50,450)));
    asta2.addImage(asteriod2);
    asta2.velocityX = -(10 + Points/100);
    asta2.scale = 0.4;
    asta2.lifetime = 400;
    asta2.setCollider("circle",0,0,75);
    //asta2.debug = true;
    
    AsteriodsG1.add(asta2);
  }
}

function Asteriod3(){
  
  if (frameCount % 80 === 0){
    
    var asta3 = createSprite(500,(random(50,450)));
    asta3.addImage(asteriod3);
    asta3.velocityX = -(10 + Points/100);
    asta3.scale = 0.4;
    asta3.lifetime = 400;
    asta3.setCollider("circle",0,0,75);
    //asta3.debug = true;
    
    AsteriodsG1.add(asta3);
  }
}

function reset(){
  
  if (keyDown("space")){
    
    gameState = "PLAY";
    
    player = createSprite(50,250);
    player.addImage("Rocket",rocketImg);
    player.scale = 0.1;
    
    gameOver.visible = false;
    
    Points = 0;
    star = 0;
    
    AsteriodsG1.destroyEach();
    starG.destroyEach();
    coinsG.destroyEach();
  }
  
}
/*function Asteriod(){
  
  if (frameCount % 150 === 0){
    
    var Asteriods = createSprite(500,(random(0,500)));
     Asteriods.velocityX = -5;
    Asteriods.setCollider("circle",0,0,75);
    Asteriods.debug = true;
    
    
    var rand = Math.round(random(1,3));
    switch(rand){
        
      case 1: Asteriods.addImage(asteriod1);
        break;
        case 2: Asteriods.addImage(asteriod2);
        break;
        case 3: Asteriods.addImage(asteriod3)
        break;
        default:break;
    }
    Asteriods.scale = 0.4;
    Asteriods.lifetime = 400;
    
    AsteriodsG.add(Asteriods);
    
    
  } 
}*/

function coins(){
  
  if (frameCount % 80 === 0){
    
    var coin = createSprite(500,(random(50,450)));
    coin.addImage(coinsImg);
    coin.velocityX = -(10 + Points/100);
    coin.scale = 0.15;
    
    coin.setCollider("circle",0,0,95);
    //coin.debug = true;
    
    coinsG.add(coin);
  } 
}

function stars(){
  
  if (frameCount % 80 === 0){
    
    var star = createSprite(500,(random(50,450)));
    star.addImage(starImg);
    star.velocityX = -(10+Points/100);//-(5+Points/50);
    star.scale = 0.05;
    
    star.setCollider("circle",0,0,200);
    //star.debug = true;
    
    starG.add(star);
  } 
}


