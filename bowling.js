AFRAME.registerComponent("bowling",{
    init:function(){
        this.throwBall()
    },
    throwBall:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key==="z"){
                var ball = document.createElement("a-entity")
                ball.setAttribute("geometry",{primitive:"sphere",radius:0.1})
                ball.setAttribute("gltf-model","./models/bowling_ball/scene.gltf")
                ball.setAttribute("scale", { x: 3, y: 3,  z: 3});
                var cam = document.querySelector("#camera")
                pos = cam.getAttribute("position")
                ball.setAttribute("position",{x:pos.x,y:pos.y,z:pos.z})
                var camera = cam.object3D
                var direction = new THREE.Vector3()
                camera.getWorldDirection(direction)
                ball.setAttribute("velocity",direction.multiplyScalar(-10))
                ball.setAttribute("dynamic-body",{shape:"sphere",mass:0})
                ball.addEventListener("collide",this.removeBall)
                var scene = document.querySelector('#scene')
                scene.appendChild(ball)
            }
        })
    },
    removeBall:function(e){
        console.log(e.detail.target.el);
        console.log(e.detail.body.el);
        var element = e.detail.target.element
        var elementHit = e.detail.body.element
        if (elementHit.id.includes("pin")) 
      {

        var impulse = new CANNON.Vec3(-2,2,1)
        var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute("position"))
        elementHit.body.applyImpulse(impulse,worldPoint)

        element.removeEventListener("collide",this.removeBall)
        
        //remove the bullets from the scene
        var scene = document.querySelector("#scene")
        scene.removeChild(element)
    }
}})