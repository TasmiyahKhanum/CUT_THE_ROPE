class Link{
    constructor (bodyA,bodyB) {
        var lastLink = bodyA.body.bodies.length-2
        this.link = Constraint.create({
            bodyA:bodyA.body.bodies[lastLink],
            pointA : {
                x:0,
                y:0,
            },
            bodyB:bodyB,
            pointB : {
                x:0,
                y:0,
            },
            length : -19,stiffness : 0.1,
        })
        World.add(world,this.link);
    }
    dettach()
    {
      World.remove(engine.world,this.link);
     
    }
}