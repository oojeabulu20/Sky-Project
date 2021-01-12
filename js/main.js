const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); // should give built in canvas methods
canvas.width = innerWidth - 10;
canvas.height = innerHeight -10;

let frame = 0; // keep track of loops - will help with conditions for what obstacles happen
let verticalPosition = canvas.height - 60;
let horizontalPosition = canvas.width / 2;

const waves = []

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();

    waves.forEach(wave => {
        wave.forEach(enemy => {
            enemy.update()
        })
    })

    requestAnimationFrame(animate); // sets up animation loop - recursion
}

function spawnWave() {
    var amount = Math.random() * (4 - 1) + 1
    var wave = []
    
    for (i = 0; i < amount; i++){
        var enemy = new Enemy()
        wave.push(enemy)
    }
    
    waves.push(wave)
}

function spawnEnemies() {
    setInterval(spawnWave, 5000)
}

spawnEnemies()
animate();

window.addEventListener('keydown', function(e){
    console.log(e.code);
    if (e.code === 'ArrowLeft'){
        player.moveLeft();
    }
    else if (e.code === 'ArrowRight'){
        player.moveRight();
    }
});

//window.addEventListener('keyup', function(e){
  //  if (e.code === 'ArrowLeft'){
    //    leftArrowPressed = false;
    //}
    //else if (e.code === 'ArrowRight'){
      //  rightArrowPressed = false;
    //}
//});

