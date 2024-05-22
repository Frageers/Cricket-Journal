let currentMole;
let currPlantTile;
let score = 0;
let gameOver=  false;
let seconds = 60;

window.onload = function(){
    setGame();
    updateTimer();
}

function updateTimer(){

    if (gameOver){
        return;
    }
    seconds --;

    let displaySeconds = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("time").innerText = "Time: " + seconds;

    if(seconds == 0){
        gameOver = true;
    }
}

let timer = setInterval(updateTimer, 1000)

function setGame(){
    for(let i = 0; i < 9; i++){
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    setInterval(setMole, 1000);
    setInterval(setPlant, 2000);
}

function getRandomTile(){
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole(){

    if(gameOver){
        return;
    }

    if(currentMole) {
        currentMole.innerHTML = ""
    }


    let mole = document.createElement("img");
    mole.src = "./cricketsprite.png";

    let num = getRandomTile();
    if(currPlantTile && currPlantTile.id == num){
        return;
    }
    currentMole = document.getElementById(num);
    currentMole.append(mole)
}

function setPlant(){

    if(gameOver){
        return;
    }


    if(currPlantTile){
        currPlantTile.innerHTML = ""
    }

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png"

    let num = getRandomTile();
    if(currentMole && currentMole.id == num){
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile(){

    if(gameOver){
        document.getElementById("score").innerText = "Game Over, Score: " + score.toString()
        window.alert("Game Over");
        return;
    }

    if(this == currentMole){
        score += 1
        document.getElementById("score").innerText = "Score: " + score.toString();
    }

    else if(this == currPlantTile){
        score -= 1
        seconds -= 5
        document.getElementById('score').innerText = "Score: " + score.toString();
    }
}