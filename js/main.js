const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); // should give built in canvas methods
canvas.width = innerWidth - 10;
canvas.height = innerHeight -10;
ctx.font = "30px Comic Sans MS";
ctx.fillStyle = "white";
ctx.textAlign = "center";

let frame = 0; // keep track of loops - will help with conditions for what obstacles happen
// let verticalPosition = canvas.height - 60;
// let horizontalPosition = canvas.width / 2;
let leftArrowPressed = false;
let rightArrowPressed = false;
let upArrowPressed = false;
let downArrowPressed = false;
let startingScreen = true;
let mainGamePlayScreen = false;
let gameOverScreen = false;

const collectables = []
const waves = []
let currentFuel

function animate(){
    let frameID = requestAnimationFrame(animate); // sets up animation loop - recursion
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    playerMovement();
    player.draw();
    // start
    if (startingScreen){
        displayStartGame();
    }
    else if (mainGamePlayScreen){
        // ctx.fillText("SCORE: " + player.score, canvas.width/2.2, canvas.height/10);
        waves.forEach((wave, outIndex) => {
            wave.forEach((enemy, inIndex) => {
                if (player.collision(enemy)) {
                    mainGamePlayScreen = false;
                    gameOverScreen = true;
                }
    
                if (enemy.y - enemy.radius > canvas.height){
                    setTimeout(() => {
                        wave.splice(inIndex, 1)
                        player.addScoreForAvoidedObjects();
                        if (wave.length == 0){
                            waves.splice(outIndex, 1)
                        }
                    }, 0)
                }
                enemy.update()
            })
        })

        collectables.forEach((coll, index) => {
            coll.update()
            if (player.collision(coll)){
                setTimeout(() => {
                    collectables.splice(index, 1)
                    player.addScoreForCollectable()
                }, 0)
            }
        })
        
        player.drawFuel()
        player.fuel-=1

        if(currentFuel.show){
            currentFuel.update()
            if (player.collision(currentFuel)){
                player.fuel += 500
                currentFuel.show = false
            }
        }

        spawnWall();
        gameOverScreen = checkForWallCollision();
        frame++;
        ctx.fillStyle = "white";
        ctx.fillText("SCORE: " + player.score, canvas.width/2.2, canvas.height/10);
    }
    else if (gameOverScreen){
        displayGameOver();
    }
    // end
}

function checkForWallCollision(){
    for (let i = 0; i < wallArray.length; i++){
        if ((player.y + player.height < wallArray[i].y + wallArray[i].height && player.y + player.height > wallArray[i].y) && // check if player is in y coordinates of the wall
        ((player.x < wallArray[i].leftSide) || (player.x > wallArray[i].rightSide))){ // checks if less than less side width or more than right hand side width
            mainGamePlayScreen = false;
            return true;
        }
    }
}

animate();

// addEventListeners
window.addEventListener('keydown', function(e){
    console.log(e.code);
    if (e.code === 'ArrowLeft'){
        // player.moveLeft();
        leftArrowPressed = true;
    }
    else if (e.code === 'ArrowRight'){
        // player.moveRight();
        rightArrowPressed = true;
    }
    else if (e.code === 'ArrowUp'){
        // player.moveUp();
        upArrowPressed = true;
    }
    else if(e.code === 'ArrowDown'){
        // player.moveDown();
        downArrowPressed = true;
    }
});

window.addEventListener('keyup', function(e){
    if (e.code === 'ArrowLeft'){
        leftArrowPressed = false;
    }
    else if (e.code === 'ArrowRight'){
        rightArrowPressed = false;
    }
    else if (e.code === 'ArrowUp'){
        upArrowPressed = false;
    }
    else if(e.code === 'ArrowDown'){
        downArrowPressed = false;
    }
});

window.addEventListener('keydown', function(e){
    if (e.code === 'Enter'){
        if (startingScreen){
            startingScreen = false;
            mainGamePlayScreen = true;
            spawnEnemies();
            spawnCollectables()
            spawnFuel()
        }
        else if (gameOverScreen){
            window.location.reload();
        }
    }
})

// player movement function
function playerMovement(){
    if (startingScreen || gameOverScreen || player.fuel <= 0) {
        return
    }

    // going to the left
    if (leftArrowPressed && (!upArrowPressed && !downArrowPressed)){
        player.moveLeft();
    }
    else if (leftArrowPressed && upArrowPressed){
        player.moveLeft();
        player.moveUp();
    }
    else if (leftArrowPressed && downArrowPressed){
        player.moveLeft();
        player.moveDown();
    } // going to the right
    else if (rightArrowPressed && (!upArrowPressed && !downArrowPressed)){
        player.moveRight();
    }
    else if (rightArrowPressed && upArrowPressed){
        player.moveRight();
        player.moveUp();
    }
    else if (rightArrowPressed && downArrowPressed){
        player.moveRight();
        player.moveDown();
    } // going up
    else if (upArrowPressed){
        player.moveUp();
    } // going down
    else if (downArrowPressed){
        player.moveDown();
    }
}

// display start of the game function
function displayStartGame(){
    ctx.font = "60px Comic Sans MS";
    ctx.fillText("GAME TITLE", canvas.width / 2, canvas.height / 6);
    ctx.font = "30px Comic Sans MS";
    ctx.fillText("PRESS ENTER", canvas.width / 2, canvas.height / 2);
}

// display end of the game function
function displayGameOver(){
    ctx.font = "60px Comic Sans MS";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 6);
    ctx.font = "30px Comic Sans MS";
    ctx.fillText("YOUR SCORE: " + player.score, canvas.width / 2, canvas.height / 2);
    ctx.font = "15px Comic Sans MS";
    ctx.fillText("PRESS ENTER TO CONTINUE", canvas.width / 2, canvas.height / 1.5);
    ctx.font = "30px Comic Sans MS";
}