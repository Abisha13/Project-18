var player ,player_running,ground,invisibleGround;
var banana ,bananaImage, obstacle, obstacleImage,bg,backImage;
var FoodGroup, obstacleGroup;
var score = 0;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  
 player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  backImage = loadImage("jungle.jpg")
 
}

function setup() {
  createCanvas(400,400);

  
   = createSprite(200,200)
  tower.addImage(towerImage)
  tower.scale = 1.5;
  tower.velocityY = 1.2;
  tower.y= tower.height/4;
   
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  //Monkey
player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
 //Ground
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  
 invisibleGround = createSprite(400,350,900,10);
  invisibleGround.visible = false;
  
}
function draw() {
  background (backImage);
  
  stroke("black");
    fill("black");
      textSize(20);
   score = Math.ceil(frameCount/frameRate());
  text("score:"+  score, 100, 50);

  player.collide(ground);
  //PLAY
  if(gameState === PLAY){
      player.changeAnimation("running", player_running);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")) {
        player.velocityY = -12;
    }    
    
    if(FoodGroup.isTouching(player)) {
      FoodGroup.destroyEach();
    }
   
  
  player.velocityY = player.velocityY + 0.8;
   obstacleGroup.setLifetimeEach(12);
    
    
  Food();
  obstacles();
    
  if(obstacleGroup.isTouching(player)){
          gameState = END;
       }
  }
   if (gameState === END) {
     obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
     score.visible = false
     stroke("black")
     fill("white")
     text("Game Over",300,300)
     textSize(180)
   }
   player.collide(invisibleGround);
  
  drawSprites();
}
function Food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}

//Obstacles
function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }

}


 
 


