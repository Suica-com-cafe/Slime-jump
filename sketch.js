var slime, slimecollided, slimeImage;
var playButton,restartButton;
var ground, invisibleGround, groundImage, pontuacao = 0;
var pedra1,pedra2,pedra3,pedra1V, pedra2V, pedra3V;
var Grouppedras;
var playButtonV,restartButtonV;
var jump,die,checkpoint;

const PLAY = 0;
const END = 1;

var GameState = PLAY;

function preload() 
{
  slimeImage = loadImage("slime.png");
  slimeImagedead = loadImage("slime morto.png");
  
  groundImage = loadImage("plataforma2.png");

  pedra1V = loadImage("pedra1ab.png");
  pedra2V = loadImage("pedra2a.png");
  pedra3V = loadImage("pedra3a.png");

  playButtonV = loadImage("restart.png");
  restartButtonV = loadImage("gameOver.png");

  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  checkpoint = loadSound("checkpoint.mp3");
}

function setup() 
{
  createCanvas(600, 200);

  //criar um sprite trex//
  slime = createSprite(50,160,20,50);
  slime.addImage("running",slimeImage);
  slime.addImage("collided",slimeImagedead);
  slime.scale = 1.5;
  slime.setCollider("rectangle",0,0,20,20);
  //slime.debug = true;
  
  //criar um sprite ground (chão)
  ground = createSprite(200,188,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /4;
  ground.scale = 2;
  
  
  //chão invisivel//
  invisibleGround = createSprite(200,188,400,20);
  invisibleGround.visible = false;

  playButton = createSprite(300,70);
  playButton.scale = 0.3;
  playButton.addImage(playButtonV);
  playButton.visible = false;
  restartButton = createSprite(300,100);
  restartButton.scale = 0.3;
  restartButton.addImage(restartButtonV);
  restartButton.visible = false;

  pedra1 = createSprite(700,175);
  pedra1.scale = 1;
  pedra1.addImage(pedra1V);
  pedra1.visible = false;
  pedra2 = createSprite();
  pedra2.scale = 1;
  pedra2.visible = false;
  pedra2.addImage(pedra2V);
  pedra3 = createSprite();
  pedra3.scale = 1;
  pedra3.addImage(pedra3V);
  pedra3.visible = false;

  Grouppedras = new Group();
  
}

function draw() 
{
  background(220);
  
  if(GameState === PLAY)
  {
    ground.velocityX = -4;
    slime.velocityY = slime.velocityY + 0.8
    playButton.visible = false;
    restartButton.visible = false;
    pontuacao += Math.round(getFrameRate()/ 60);
    GerarPedras();

    if(pontuacao%100 === 0 && pontuacao > 0)
    { 
      checkpoint.play();
    }
    if (keyDown("space")&& slime.y >= 154) 
    {
      slime.velocityY = -10;
      jump.play();
    }
    if (ground.x < 0)
    {
      ground.x = ground.width / 2;
    }
    if(Grouppedras.isTouching(slime))
    {
      GameState = END;
      die.play();
      //trex.velocityY = -10;
      //jump.play();
    }
  }
  else if(GameState === END)
  {
    ground.velocityX = 0;
    slime.velocityX = 0;
    slime.velocityY = 0;
    Grouppedras.setVelocityXEach(0);
    Grouppedras.setLifetimeEach(-1);
    slime.changeAnimation("collided");
    restartButton.visible = true;
    playButton.visible = true;
    if(mousePressedOver(playButton))
    {
      reinicia_o_jogo();
    }
  }

  slime.collide(invisibleGround);

  text("pontos:"+ pontuacao,520,20);
  
  drawSprites();
  
}
function reinicia_o_jogo()
{
  GameState = PLAY
  Grouppedras.destroyEach();
  slime.changeAnimation("running");
  pontuacao = 0;
}
function GerarPedras()
{
   if(frameCount%100 === 0)
   {
    var pedra = createSprite(630,170);
    pedra.velocityX = -(4 + pontuacao / 100);
    pedra.scale = 2;
    pedra.lifetime = 200;
    pedra.debug = false;
    var per = Math.round(random(1,6))
    switch(per)
    {
      case 1 : pedra.addImage(pedra1V);
      break
      case 2 : pedra.addImage(pedra2V);
      break
      case 3 : pedra.addImage(pedra3V);
      break
    }
    Grouppedras.add(pedra);
   }
}