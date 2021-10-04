const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1;
var backgroundImg,platform;
var  injection, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";


function preload() {
    getTime();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

   
   
  
    injection = new Injection(200,500,20,40);

    
    slingshot = new SlingShot(injection.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);      
    Engine.update(engine);
    //strokeWeight(4);
    var select_virus = Math.round(random(1,4));
   
    
    if (World.frameCount % 80 == 0) {
      if (select_virus == 1) {
        virus1();
      } else if (select_virus == 2) {
        virus2();
      } else if (select_virus == 3) {
        virus3();
      } else {
       virus4();
      }
    }
  
    
injection.display();
    
    platform.display();
   
    slingshot.display();    
}

function mouseDragged(){
    if(slingshot.sling.bodyA==injection.body){
    Matter.Body.setPosition(injection.body, {x: mouseX , y: mouseY});
}
}

function mouseReleased(){
    slingshot.fly();
}
function keyPressed(){
    if(keyCode===32)
    injection.trajectory=[];
    Matter.Body.setPosition(injection.body,{x:200,y:50});
    slingshot.attach(injection.body);
}

async function getTime(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    console.log(responseJSON)
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    console.log(datetime);
    console.log(hour);
  
    if(hour>=06 && hour<=19){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
}
function virus1() {
    virus1 = new Virus(0,Math.round(random(10, 370)), 10, 10);
   virus1.body.velocityX = 3;
}
 
 function virus3() {
   virus3 = new Virus(0,Math.round(random(80, 370)), 10, 10);
    virus3.body.velocityX = 3;
 }
 
 function virus2() {
   virus2 = new Virus(0,Math.round(random(50, 370)), 10, 10);
   virus2.body.velocityX = 3;
 }
 
 function virus4() {
   virus4 = new Virus(0,Math.round(random(60, 370)), 10, 10);
   virus4.body.velocityX = 3;
 }
