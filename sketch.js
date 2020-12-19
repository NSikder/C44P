
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var level = 0;
var canJump = true;
var goalLeft,goalRight,goalUp,goalDown;
var lives = 3;

function preload()
{
	
}

function setup() {
	createCanvas(1600, 700);


	engine = Engine.create();
	world = engine.world;
	fill(255,0,0);

	//Create the Bodies Here.
	ground = Bodies.rectangle(800, 700, 1600, 1 , {friction:1.0, isStatic:true} );
	leftwall = Bodies.rectangle(0, 350, 1, 1000 , {friction:1.0, isStatic:true} );
	World.add(world, ground);
	World.add(world, leftwall);

	player = new Square(100,600);
	platform1 = new Box(700,695,700,50);
	platform2 = new Box(1200,495,350,50);
	platform3 = new Box(2000,350,100,50);
	platform4 = new Box(2000,350,100,50);
	platform5 = new Box(2000,350,100,50);
	platform6 = new Box(2000,350,100,50);
	platform7 = new Box(2000,350,100,50);
	platform8 = new Box(2000,350,100,50);
	platform9 = new Box(2000,350,100,50);
	goal = new GoalBox(1500,200);
	//box2 = new Box(1100,655,10,90);
	//box3 = new Box(1300,655,10,90);
	getGoal();
	Engine.run(engine);
}


function draw() {
	background(100,100,100);
	collisionCheck();
	//console.log(player.body.position.y);
	movement();
	//console.log(Matter.Detector.canCollide(player.body, platform1.body));
	player.display();
	platforms();
	goal.display();
	textSize(48);
	text("Lives: "+lives,100,75);
	//box2.display();
	//box3.display();
}
function platforms(){
	platform2.display();
	platform3.display();
	platform4.display();
	platform5.display();
	platform6.display();
	platform7.display();
	platform8.display();
	platform9.display();
	platform1.display();
}

function collisionCheck(){
	if(level===0){ // Test Stage Completed
		if (player.body.position.x > goalLeft && player.body.position.x < goalRight){
			//console.log(player.body.position.y);
			if (player.body.position.y > goalUp && player.body.position.y < goalDown){
			console.log("GOAL");
			level = level + 1;
			updateStage();
			}
		}
	} else if (level === 1){ // Stage 1 Completed
		if (player.body.position.x > goalLeft && player.body.position.x < goalRight){
			//console.log(player.body.position.y);
			if (player.body.position.y > goalUp && player.body.position.y < goalDown){
			console.log("GOAL");
			level = level + 1;
			updateStage();
			}
		}
		if (player.body.position.x > 450 && player.body.position.y > 632){
			respawnPlayer();
			lives = lives - 1;
			reset();
		}
	} else if (level === 2){ // Stage 2 WIP
		
	}
}

function updateStage(){
	respawnPlayer();
	resetPlatforms();
	if (level === 0 ){
		Matter.Body.setPosition(goal.body,{x:1500,y:200});
		Matter.Body.setPosition(platform1.body,{x:700,y:platform1.body.position.y});
		Matter.Body.setPosition(platform2.body,{x:1200,y:platform2.body.position.y});
	}else if (level === 1){
		Matter.Body.setPosition(goal.body,{x:850,y:50});
		Matter.Body.setPosition(platform1.body,{x:100,y:platform1.body.position.y});
		Matter.Body.setPosition(platform2.body,{x:900,y:platform2.body.position.y});
		Matter.Body.setPosition(platform3.body,{x:400,y:300});
		Matter.Body.setPosition(platform4.body,{x:750,y:700});
		platform4.height = 25;
		platform4.width = 2000;
		platform4.color = color(255,1,1);
	}
	//console.log(platform3.body.position.y)
	getGoal();
}

function reset(){
	if (lives === 0){
		level = 0;
		updateStage();
		lives = 3;
	}
}

function resetPlatforms(){
	Matter.Body.setPosition(platform1.body,{x:10000,y:platform1.body.position.y});
	Matter.Body.setPosition(platform2.body,{x:10000,y:platform2.body.position.y});
	Matter.Body.setPosition(platform3.body,{x:10000,y:platform3.body.position.y});
	Matter.Body.setPosition(platform4.body,{x:10000,y:platform4.body.position.y});
	Matter.Body.setPosition(platform5.body,{x:10000,y:platform5.body.position.y});
	Matter.Body.setPosition(platform6.body,{x:10000,y:platform6.body.position.y});
	Matter.Body.setPosition(platform7.body,{x:10000,y:platform7.body.position.y});
	Matter.Body.setPosition(platform8.body,{x:10000,y:platform8.body.position.y});
	Matter.Body.setPosition(platform9.body,{x:10000,y:platform9.body.position.y});
}

function respawnPlayer(){
	Matter.Body.setPosition(player.body,{x:100,y:550})
	console.log("Player Reset");
}

function getGoal(){
	goalDown = goal.body.position.y + 100;
	goalUp = goal.body.position.y - 100;
	goalLeft = goal.body.position.x - 87.5;
	goalRight = goal.body.position.x + 87.5;
}

function movement(){
	if (keyWentDown(UP_ARROW)){
		jump();
	}
	if (player.body.velocity.y <0.05 && player.body.velocity.y>-0.05){
		if (player.body.velocity.y >-0.05 && player.body.velocity.y<-0.01){
		canJump = true;
		} else if (player.body.velocity.y >0.01 && player.body.velocity.y<0.05){
					canJump = true;
					}
	}
	if (keyDown(LEFT_ARROW)){
		Matter.Body.applyForce(player.body,player.body.position,{x:-12.5,y:0});
	}
	if (keyDown(RIGHT_ARROW)){
		Matter.Body.applyForce(player.body,player.body.position,{x:12.5,y:0});
	}
}

function jump(){
	if (player.body.velocity.y>-0.075&&player.body.velocity.y<0.075&&canJump===true){
		console.log("JUMPED")
		//console.log(player.body.velocity.y)
		Matter.Body.applyForce(player.body,player.body.position,{x:0,y:-550});
		canJump = false;
	}
}

function mouseDragged(){
	Matter.Body.setPosition(player.body,{x:mouseX,y:mouseY})
}

function mouseReleased(){
	//console.log(mouseX+", "+mouseY);
	var bodies1 = Matter.Composite.allBodies(engine.world);
	var temp = Matter.Query.ray(bodies1, goal.body.position, player.body.position)
	if (temp.length <= 2){
		console.log("LINE OF SIGHT")
	} else{
		console.log("NO LINE OF SIGHT")
	}
}

/* ASCII JUMP
function keyPressed(){
	if (keyCode===38){
		console.log("TEST")
		jump();
	}
}//*/

/* COLLISION TEST
	Matter.Events.on(engine, 'collisionStart', function(event) {
		let a = event.pairs.bodyA;
		let b = event.pairs.bodyB;
		console.log("BODYA "+ a);
		console.log("BODYB "+ b);
		// check bodies, do whatever...
	  });//*/