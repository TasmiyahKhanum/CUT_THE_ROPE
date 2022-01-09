
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
let engine;
let world;

var bgImg;
var char,charImg;
var rope,rope2,rope3,rope4,rope5,rope6,rope7,rope8,rope9;
var button,button2,button3,button4,button5,button6,button7,button8,button9;
var candyImg,bombImg;
var candy_con,bomb_con2,candy_con3,bomb_con4,candy_con5,bomb_con6,candy_con7,bomb_con8,candy_con9;
var candy,candy3,candy5,candy7,candy9;
var bomb, bomb2,bomb3,bomb4;
var gamestate = "initial";
var start;
var move,eat,chew;
var candyDisplay;
var cutCounter=0, pointCounter=0;
var bg_s;
var button,chew,loss,popm,swish,win;

function preload(){
bgImg=loadImage("bg_img.jpg");
charImg=loadImage("om_nom.png");
candyImg=loadImage("Candy.png");
bombImg=loadImage("bomb_.png");

eat=loadAnimation("openmouth.png","chomp.png","om_nom.png"); 
eat2=loadAnimation("openmouth.png","chomp.png","om_nom.png"); 
eat3=loadAnimation("openmouth.png","chomp.png","om_nom.png"); 
eat4=loadAnimation("openmouth.png","chomp.png","om_nom.png"); 
eat5=loadAnimation("openmouth.png","chomp.png","om_nom.png"); 

eat.playing = true; 
eat.looping = false; 
eat2.playing = true; 
eat2.looping = false; 
eat3.playing = true; 
eat3.looping = false; 
eat4.playing = true; 
eat4.looping = false; 
eat5.playing = true; 
eat5.looping = false; 

bg_s=loadSound("backgroundmusic.mp3");
chew=loadSound("chewing.wav");
popm=loadSound("pop.wav");
swish=loadSound("swish.wav");
loss=loadSound("lose.wav")
}


function setup() {
  createCanvas(1250,613);
  angleMode(DEGREES);
  angle = 15;

  engine = Engine.create();
  world = engine.world;
   
  bg_s.loop();

  if(gamestate=="initial"){
    popm.play();
    swal({
      title : "GRR...GRR..!",
      text  : "Om nom's hungry...",
      imageUrl : "https://c.tenor.com/mtMxuPszJPgAAAAC/cut-the-rope-feedme.gif",
      imageSize : "200x200",
      confirmButtonText : "START"
    },
    function (isConfirmed){
      if (isConfirmed){
      }
    })
  }
  
  char = createSprite(69, 500, 160, 310);
  char.addImage(charImg);
  char.scale=0.1+0.05;
  char.velocityX=3.2;

  button = createImg('button.png');
  button.position(123,3);
  button.size(40,40);
  button.mouseClicked(drop);

  button2 = createImg('button.png');
  button2.position(246,3);
  button2.size(40,40);
  button2.mouseClicked(drop2);

  button3 = createImg('button.png');
  button3.position(369,3);
  button3.size(40,40);
  button3.mouseClicked(drop3);

  button4 = createImg('button.png');
  button4.position(492,3);
  button4.size(40,40);
  button4.mouseClicked(drop4);

  button5 = createImg('button.png');
  button5.position(615,3);
  button5.size(40,40);
  button5.mouseClicked(drop5);

  button6 = createImg('button.png');
  button6.position(738,3);
  button6.size(40,40);
  button6.mouseClicked(drop6);

  button7 = createImg('button.png');
  button7.position(861,3);
  button7.size(40,40);
  button7.mouseClicked(drop7);

  button8 = createImg('button.png');
  button8.position(984,3);
  button8.size(40,40);
  button8.mouseClicked(drop8);

  button9 = createImg('button.png');
  button9.position(1107,3);
  button9.size(40,40);
  button9.mouseClicked(drop9);

  rope  = new Rope(5,{x:123+21,y:8});
  rope2 = new Rope(6,{x:246+21,y:8});
  rope3 = new Rope(5,{x:369+21,y:8});
  rope4 = new Rope(6,{x:492+21,y:8});
  rope5 = new Rope(5,{x:615+21,y:8});
  rope6 = new Rope(6,{x:738+21,y:8});
  rope7 = new Rope(5,{x:861+21,y:8});
  rope8 = new Rope(6,{x:984+21,y:8});
  rope9 = new Rope(5,{x:1128,y:8});

  candy = Bodies.circle(70,3,24);
  Matter.Composite.add(rope.body,candy);
  candy_con = new Link(rope,candy);

  bomb = Bodies.circle(70,3,24);
  Matter.Composite.add(rope2.body,bomb);
  bomb_con2 = new Link(rope2,bomb);

  candy3 = Bodies.circle(70,3,24);
  Matter.Composite.add(rope3.body,candy3);
  candy_con3 = new Link(rope3,candy3);

  bomb2 = Bodies.circle(70,3,24);
  Matter.Composite.add(rope4.body,bomb2);
  bomb_con4 = new Link(rope4,bomb2);

  candy5 = Bodies.circle(70,3,24);
  Matter.Composite.add(rope5.body,candy5);
  candy_con5 = new Link(rope5,candy5);

  bomb3 = Bodies.circle(70,3,24);
  Matter.Composite.add(rope6.body,bomb3);
  bomb_con6 = new Link(rope6,bomb3);

  candy7 = Bodies.circle(70,3,24);
  Matter.Composite.add(rope7.body,candy7);
  candy_con7 = new Link(rope7,candy7);

  bomb4 = Bodies.circle(70,3,24);
  Matter.Composite.add(rope8.body,bomb4);
  bomb_con8 = new Link(rope8,bomb4);

  candy9 = Bodies.circle(70,3,24);
  Matter.Composite.add(rope9.body,candy9);
  candy_con9 = new Link(rope9,candy9);

  eat.frameDelay = 10;
  eat2.frameDelay = 10;
  eat3.frameDelay = 10;
  eat4.frameDelay = 10;
  eat5.frameDelay = 10;
  char.addAnimation('eating',eat);
  char.addAnimation('eating2',eat2);
  char.addAnimation('eating3',eat3);
  char.addAnimation('eating4',eat4);
  char.addAnimation('eating5',eat5);

}


function draw() 
{
  background("darkGrey");
  image(bgImg,0,0,width,height);
  Engine.update(engine);
  if(char.x>width+40){
    char.x = 59;
  }

  push();
  if(candy!=null)
  image(candyImg,candy.position.x,candy.position.y,38,38);
  pop();

  push();
  if(bomb!=null)
  image(bombImg,bomb.position.x,bomb.position.y,45,45);
  pop();

  push();
  if(candy3!=null)
  image(candyImg,candy3.position.x,candy3.position.y,38,38);
  pop();

  push();
  if(bomb2!=null)
  image(bombImg,bomb2.position.x,bomb2.position.y,45,45);
  pop();

  push();
  if(candy5!=null)
  image(candyImg,candy5.position.x,candy5.position.y,38,38);
  pop();

  push();
  if(bomb3!=null)
  image(bombImg,bomb3.position.x,bomb3.position.y,45,45);
  pop();

  push();
  if(candy7!=null)
  image(candyImg,candy7.position.x,candy7.position.y,38,38);
  pop();

  push();
  if(bomb4!=null)
  image(bombImg,bomb4.position.x,bomb4.position.y,45,45);
  pop();

  push();
  if(candy9!=null)
  image(candyImg,candy9.position.x,candy9.position.y,38,38);
  pop();

  rope.show();
  rope2.show();
  rope3.show();
  rope4.show();
  rope5.show();
  rope6.show();
  rope7.show();
  rope8.show();
  rope9.show();

  drawSprites();

  if(collide(candy,char,85)==true)
  {
    World.remove(engine.world,candy);
    char.changeAnimation('eating');
    candy = null;
    pointCounter++;
    chew.play();
  }

   if(collide(candy3,char,85)==true)
  {
    World.remove(engine.world,candy3);
    char.changeAnimation('eating2');
    candy3 = null;
    pointCounter++;
    chew.play();
  }

   if(collide(candy5,char,85)==true)
  {
    World.remove(engine.world,candy5);
    char.changeAnimation('eating3');
    candy5 = null;
    pointCounter++;
    chew.play();
  }

   if(collide(candy7,char,85)==true)
  {
    World.remove(engine.world,candy7);
    char.changeAnimation('eating4');
    candy7 = null;
    pointCounter++;
    chew.play();
  }

   if(collide(candy9,char,85)==true)
  {
    World.remove(engine.world,candy9);
    char.changeAnimation('eating5');
    candy9 = null;
    pointCounter++;
    chew.play();
  }

   if(collide(bomb,char,85)==true)
  {
    World.remove(engine.world,candy);
    bomb = null;
    char.x=width/2;
    char.velocityX=0;
    loss.play();
    gamestate="end";
  }

   if(collide(bomb2,char,85)==true)
  {
    World.remove(engine.world,bomb2);
    bomb2 = null;
    char.x=width/2;
    char.velocityX=0;
    loss.play();
    gamestate="end";
  }

   if(collide(bomb3,char,85)==true)
  {
    World.remove(engine.world,bomb3);
    bomb3 = null;
    char.x=width/2;
    char.velocityX=0;
    loss.play();
    gamestate="end";
  }

   if(collide(bomb4,char,85)==true)
  {
    World.remove(engine.world,bomb4);
    bomb4 = null;
    char.x=width/2;
    char.velocityX=0;
    loss.play();
    gamestate="end";
  }

  if(gamestate=="end"){
    bg_s.stop();
    swal({
      title : "GAMEOVER!",
      text  : "Better luck next time...",
      imageUrl : "https://pixy.org/src/147/1472822.png",
      imageSize : "150x150",
      confirmButtonText : "RESET"
    },
    function (isConfirmed){
      if (isConfirmed){
        location.reload();
      }
    })
   }

   if(cutCounter==5){
   gamestate="complete";
   }

   if(gamestate=="complete"){
     if(pointCounter==0){
      swal({
        title : "STILL...HUNGRY..!!",
        text  : "Need...candies...",
        imageUrl : "https://media.istockphoto.com/vectors/flat-silver-rounded-5-star-rating-symbol-vector-id1297578378?k=20&m=1297578378&s=612x612&w=0&h=NeqHot4oCJn3A9LvnpUib_tS2fHtALgN7GbHmyjAsjc=",
        imageSize : "150x150",
        confirmButtonText : "RESET"
        
      },
      function (isConfirmed){
        if (isConfirmed){
          location.reload();
        }
      })
     }
     if(pointCounter==1){
      swal({
        title : "NEED...MORE...CANDIES!!",
        text  : "Feed me more,please",
        imageUrl : "https://media.istockphoto.com/vectors/flat-golden-rounded-1-star-rating-symbol-vector-id1297578214?k=20&m=1297578214&s=612x612&w=0&h=lA_Wd3HTCNT4hb799_8JtxQe6FyEUu41rt0Zt0sQdIw=",
        imageSize : "150x150",
        confirmButtonText : "RESET"
      },
      function (isConfirmed){
        if (isConfirmed){
          location.reload();
        }
      })
     }
     if(pointCounter==2){
      swal({
        title : "OM NOM NEEDS MORE...",
        text  : "I feel incomplete",
        imageUrl : "https://media.istockphoto.com/vectors/flat-golden-rounded-2-star-rating-symbol-vector-id1297578232?k=20&m=1297578232&s=612x612&w=0&h=Ofwa2HWRVHT36GQSKBKtYL0oc2Eo7UuNMzaipiPJfXs=",
        imageSize : "150x150",
        confirmButtonText : "RESET"
      },
      function (isConfirmed){
        if (isConfirmed){
          location.reload();
        }
      })
     }
     if(pointCounter==3){
      swal({
        title : "MMM...",
        text  : "Can I have more?",
        imageUrl : "https://media.istockphoto.com/vectors/flat-golden-rounded-3-star-rating-symbol-vector-id1297578357?k=20&m=1297578357&s=612x612&w=0&h=21vMFRHT9eOa5JPXFyAk4d9Knz0rV2Ylu7sUtrewwIU=",
        imageSize : "150x150",
        confirmButtonText : "RESET"
      },
      function (isConfirmed){
        if (isConfirmed){
          location.reload();
        }
      })
     }
     if(pointCounter==4){
      swal({
        title : "SO FULLING!",
        text  : "Feel like i can have one more",
        imageUrl : "https://media.istockphoto.com/vectors/flat-golden-rounded-4-star-rating-symbol-vector-id1297578246?k=20&m=1297578246&s=612x612&w=0&h=548Lnjl8mDcVSmYXiGT0daTHClpBWaZYrW77pgfLHwU=",
        imageSize : "150x150",
        confirmButtonText : "RESET"
      },
      function (isConfirmed){
        if (isConfirmed){
          location.reload();
        }
      })
     }
     if(pointCounter==5){
      swal({
        title : "*BURP*",
        text  : "Can never not be hungry for candies!",
        imageUrl : "https://media.istockphoto.com/vectors/flat-golden-rounded-5-star-rating-symbol-vector-id1297578331?k=20&m=1297578331&s=612x612&w=0&h=eC8Jhy0_HuBpIzApgNkPxD1MYoKtY9jOmZM0UAkEHLs=",
        imageSize : "150x150",
        confirmButtonText : "RESET"
      },
      function (isConfirmed){
        if (isConfirmed){
          location.reload();
        }
      })
     }
   }
  }


function drop()
{
  swish.play();
  rope.break();
  candy_con.dettach();
  candy_con = null; 
  cutCounter++;
}

function drop2()
{
  swish.play();
  rope2.break();
  bomb_con2.dettach();
  bomb_con2 = null; 
}

function drop3()
{
  swish.play();
  rope3.break();
  candy_con3.dettach();
  candy_con3 = null; 
  cutCounter++;
}

function drop4()
{
  swish.play();
  rope4.break();
  bomb_con4.dettach();
  bomb_con4 = null; 
}

function drop5()
{
  swish.play();
  rope5.break();
  candy_con5.dettach();
  candy_con5 = null; 
  cutCounter++;
}

function drop6()
{
  swish.play();
  rope6.break();
  bomb_con6.dettach();
  bomb_con6 = null; 
}

function drop7()
{
  swish.play();
  rope7.break();
  candy_con7.dettach();
  candy_con7 = null; 
  cutCounter++;
}

function drop8()
{
  swish.play();
  rope8.break();
  bomb_con8.dettach();
  bomb_con8 = null; 
}

function drop9()
{
  swish.play();
  rope9.break();
  candy_con9.dettach();
  candy_con9 = null; 
  cutCounter++;
}

function collide(body,sprite,x){
  if(body!=null){
    var d= dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=x){
      return true;
    }
    else
    return false;
  }
}

