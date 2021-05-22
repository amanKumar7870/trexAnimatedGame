var ground,groundImage,dino,dinoImage,g,obs,obsImage,obstacle,obstacleImage,score,trexOut,outObs,out,game,gameOver,a,b;

var obsGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  groundImage=loadImage('download.jfif');
  dinoImage=loadAnimation('1.png','2.png');
  obsImage=loadAnimation('ob.png','obs.png');
  obstacleImage=loadAnimation('o.png','ok.png');
  trexOut=loadAnimation('dino.png');
  gameOver=loadImage('peppa pig (1).png');
  a=loadSound('pacman-die.mp3');
  b=loadSound('gameover.mp3');
  
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  ground=createSprite(width/2,height-400,10,10);
  ground.addImage(groundImage);
  ground.scale=5
  
  dino=createSprite(50,height-90,10,10);
  dino.addAnimation('running',dinoImage);
  dino.scale=0.8
  dino.debug=false;
 dino.setCollider("rectangle",0,0,dino.width,dino.height);
  
  g=createSprite(width/2,height-50,height+700,3);
  g.visible=false;
  
  score=0;
  
  obsGroup=createGroup();
  
  
  game=createSprite(width/2,height/2,1,1);
  game.addImage(gameOver);
  game.visible=false;
  
  b.loop();
}

function draw (){
  background(220);
  

   
  
  if(gameState===PLAY){
    if(getFrameRate()/1){
    score=score+1;
  }
    
    
     ground.velocityX=-(4+score/1000);
    
      if((touches.length > 0 || keyDown("SPACE")) && dino.y >= height-120) {
dino.velocityY = -10;
touches = [];
}
    
      dino.velocityY=dino.velocityY+0.5;
    
    if(ground.x<0){
    ground.x=ground.width/2;
  }
    
      if(frameCount%100===0){
       
      obs=createSprite(width+10,height-90,200,200);
  obs.addAnimation('cut',obsImage);
    obs.velocityX=-(6+score/500);
    obs.scale=0.3
    var rand=Math.round(random(1,2));
    switch(rand){
      case 1:obs.addAnimation('cut',obsImage);
        break ;
        case 2:obs.addAnimation('cut',obstacleImage);
        break;
        default:break;
        
        
    }
   
    obs.liftime=500;
       
         obsGroup.add(obs);
  }
    
    if(obsGroup.isTouching(dino)){
      gameState=END;
      a.play();
    }
    
  }else
    if(gameState===END){
      
      ground.velocityX=0;
      obsGroup.setVelocityXEach(0);
      
      dino.addAnimation('running',trexOut);
      
      game.visible=true;
      
            dino.velocityY=dino.velocityY+0.5;
      
     b.setVolume(0.0);
      
      if(mousePressedOver(game)){
        reset();
        
      }
    }

  dino.collide(g);
  
  drawSprites();
  
  
  
  text('SCORE :'+score,1,10);
  
  
}

 function reset(){
  gameState=PLAY;
   obsGroup.destroyEach();
   game.visible=false;
   dino.addAnimation('running',dinoImage);
   score=0;
   b.setVolume(1);


}