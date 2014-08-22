window.onload = function() {
    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var W = canvas.width, H = canvas.height;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, W, H);
    var particles = [];
    var mouse = {};
    function particle() {
        this.speed = {x: -5 + Math.random() * 10,
                      y: -5 + Math.random() * -10};
        this.radius =  5 + Math.random() * 20;
        if(mouse.x && mouse.y)
            this.locat = {x: mouse.x, y: mouse.y};
        else
            this.locat = {x: W / 2, y: H / 2};
        this.life = 40+Math.random()*10;
        this.remaining_life = this.life;
        this.r = Math.round(230+(Math.random()*15));
        this.g = Math.round(Math.random()*165);
        this.b = Math.round(Math.random()*128);
    }

//set each particles speed,size,life,color
    for (var i = 0; i < 100; i++) {
        particles.push(new particle());
    }

    function onMouseMove(e){
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    }
    window.onmousemove = onMouseMove;

    function draw() {
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, W, H);
        for (var i = 0; i < 100; i++) {
            var p = particles[i];
            ctx.beginPath();
            ctx.arc(p.locat.x, p.locat.y, p.radius, 0, 2 * Math.PI, false);
            ctx.globalCompositeOperation = "lighter";
//          ctx.closePath();
            p.opacity = Math.round((p.remaining_life/ p.life)*100)/100;

            var grd = ctx.createRadialGradient(p.locat.x, p.locat.y, 0,p.locat.x, p.locat.y, p.radius);
            grd.addColorStop(0, "rgba("+p.r+","+p.g+","+p.b+","+p.opacity+")");
            grd.addColorStop(0.5, "rgba("+p.r+","+p.g+","+p.b+","+p.opacity+")");
            grd.addColorStop(1, "rgba("+p.r+","+p.g+","+p.b+",0)");
            ctx.fillStyle = grd;
            ctx.fill();
            p.radius --;
            p.remaining_life --;
            if(p.radius < 0 || p.remaining_life <0){
                particles[i] = new particle();
            }
            p.locat.x += p.speed.x;
            p.locat.y += p.speed.y;
        }

    }

    setInterval(draw, 100);
}