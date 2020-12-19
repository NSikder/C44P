class Square {
    constructor(x,y){
        var options = {
            'isStatic':false,
            'restitution':0,
            'friction':0.5,
            'density':1.2

        }
        this.body = Bodies.rectangle(x, y, 100,100, options);
        
        World.add(world, this.body);
    }
    display(){
        var pos = this.body.position;
        push();
        rectMode(CENTER);
        stroke("Yellow");
        fill(255,0,0);
        rect(pos.x,pos.y, 100, 100);
        pop();
    }
};