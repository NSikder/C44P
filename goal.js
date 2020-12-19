class GoalBox {
    constructor(x, y) {
      var options = {
          'friction':1.0,
          'isStatic':true,
          'isNonColliding':true
      }
      this.body = Bodies.rectangle(x, y, 50, 50, options);
      this.width = 50;
      this.height = 50;
      
      World.add(world, this.body);
    }
    display(){
      var pos = this.body.position;
      push();
      rectMode(CENTER);
      fill(0,255,0);
      rect(pos.x,pos.y, this.width, this.height);
      pop();
    }
  };
  