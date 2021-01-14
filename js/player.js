class Player {
    constructor(){
        this.x = innerWidth / 2;
        this.y = innerHeight - 100;
        // this.x = canvas.width / 2;
        // this.y = canvas.height - 100;
        this.width = 20;
        this.height = 20;
        this.score = 0;
        this.fuel = 2000

        console.log(innerHeight, innerWidth)
        this.widthSpeedFactor = innerWidth / 140
        this.heightSpeedFactor = innerHeight / 80
    }
    draw(){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    drawFuelGauge(){
        ctx.fillStyle = 'green'
        ctx.fillRect(innerWidth - 50, innerHeight - (this.fuel / 10), 50, this.fuel / 10)
    }
    moveLeft(){
        if (this.x > 8){
            this.x -= this.widthSpeedFactor;
        }
    }
    moveRight(){
        if (this.x < (canvas.width - 28)){
            this.x += this.widthSpeedFactor;
        }
    }
    moveUp(){
        if (this.y > 8){
            this.y -= this.heightSpeedFactor;
        }
    }
    moveDown(){
        if (this.y < (canvas.height - 28)){
            this.y += this.heightSpeedFactor;
        }
    }
    distanceTo(obj) {
        if (obj.radius == null){
            obj = {
                x: obj.x + obj.width / 2,
                y: obj.y + obj.height / 2
            }
        }

        const mid = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }
        return Math.hypot(mid.x - obj.x, mid.y - obj.y)
    }

    collision(obj) {
        const dist = this.distanceTo(obj)
        let radius = obj.radius

        if (radius == null){
            radius = obj.width / 2
        }

        return dist - radius - (player.width / 2) <= 0
    }

    addScoreForAvoidedObjects(){
        this.score += 5;
    }
    addScoreForCollectable(){
        this.score += 25
    }
}

const player = new Player();
