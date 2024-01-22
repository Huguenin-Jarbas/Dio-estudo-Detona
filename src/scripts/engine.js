const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")

    },
    values: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        gamevelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    }
}

function countDown( ){ 
    state.values.currentTime--;
    if(state.values.currentTime <= 0 ){
        clearInterval(state.values.countDownTimerId)
        clearInterval(state.values.timerId)

        alert("Game Over! O resultafo foi : " + state.values.result)
    }
    state.view.timeLeft.textContent = state.values.currentTime
}

function randomSquare(){
    state.view.squares.forEach((squares) => {
     squares.classList.remove("enemy")
    })

    let randonNumber = Math.floor(Math.random()*9)
    let randomSquare = state.view.squares[randonNumber];
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id

}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gamevelocity)
}

function addListennerHit(){
    state.view.squares.forEach((squares) => {
        squares.addEventListener("mousedown", () => {
            if(squares.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound()
                
            }
            
        })
    })
}

function playSound(){ 
    let audio = new Audio("./src/audios/hit.m4a")
    audio.volume = 0.1
    audio.play()
}

function init() {
   moveEnemy()
   addListennerHit()
}

init()