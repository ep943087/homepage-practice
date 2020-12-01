const c = document.querySelector("#myCanvas");
const ctx = c.getContext('2d');
let balls = [];

window.onload = () => {
    balls = Ball.init_balls();
    draw();
}

class Ball{
    constructor(x,y){
        this.x = x;
        this.y = y;
        // this.x = c.width/2;
        // this.y = c.height/2;
        this.angle = 2*Math.PI*Math.random();
        this.vel = 0;
        this.xv = this.vel*Math.cos(this.angle);
        this.yv = this.vel*Math.sin(this.angle);
        this.radius = 2+Math.random()*1;
        this.color = Ball.random_color();
    }
    static force = 5;
    static random_color(){
        const colors = ["red","blue","rgb(0,255,0)"];
        const r = Math.floor(Math.random()*colors.length);
        return "white";
    }
    static init_balls(){
        c.width = c.offsetWidth;
        c.height = c.offsetHeight;
        const list = [];
        const size = 80;
        for(let i=0;i<size;i++){
            const x = c.width*Math.random();
            const y = c.height*Math.random();
            list.push(new Ball(x,y));
        }
        return list;
    }
    move(){
        this.x += this.xv;
        this.y += this.yv;
        if(this.x < 0){
            this.x = 0;
            this.xv = Math.abs(this.xv);
        } else if(this.x > c.width){
            this.x = c.width;
            this.xv = -Math.abs(this.xv);
        }
        if(this.y < 0){
            this.y = 0;
            this.yv = Math.abs(this.yv);
        } else if(this.y > c.height){
            this.y = c.height;
            this.yv = -Math.abs(this.yv);
        }
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        ctx.fill();
    }
    add_force(acc,angle){
        this.xv += acc*Math.cos(angle);
        this.yv += acc*Math.sin(angle);
    }
    static distance(a,b){
        let d = Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2);
        return Math.sqrt(d);
    }
    static get_angle(a,b){
        return Math.atan2(b.y-a.y,b.x-a.x);
    }
    static update_force(balls){
        for(let i=0;i<balls.length;i++){
            for(let j=i+1;j<balls.length;j++){
                const distance = Ball.distance(balls[i],balls[j]);
                if(distance > 15){
                    const acc = Ball.force*(balls[i].radius)/(distance*distance);
                    const ang1 = Ball.get_angle(balls[i],balls[j]);
                    const ang2 = Ball.get_angle(balls[j],balls[i]);
                    balls[i].add_force(acc,ang1);
                    balls[j].add_force(acc,ang2);
                }
            }
        }
    }
}

const draw = () => {
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;

    requestAnimationFrame(draw);

    ctx.clearRect(0,0,c.width,c.height);
    //ctx.fillRect(0,0,c.width,c.height);

    Ball.update_force(balls);

    for(let i=0;i<balls.length;i++){
        balls[i].move();
        balls[i].draw();
    }
}