// console.log("sanity check")

// DOM VARIABLES //
//game display area
let gameArea = document.querySelector(".main-game") 
//modal
let modalSection = document.querySelector(".modal")
let modalCloseBtn = document.getElementById("modal-close")
//ship's name banner
let nameBanner = document.getElementById('name-banner')
//buttons
let instructionBtn = document.getElementById('button-instruct')
let startBtn = document.getElementById('button-start')
let supplyBtn = document.getElementById('resupply')
let shoreBtn = document.getElementById('shoreleave')
let rollBtn = document.getElementById('barrelRoll')
//ship
let playerShip = document.getElementById('player-ship')
let shipAudio = document.getElementById('shipSound')
let shipAge = document.getElementById('age')
//status bar containers
let supplyBox = document.getElementById('supply-stat')
let restBox = document.getElementById('rest-stat')
let funBox = document.getElementById('entertainment-stat')
//status bars
let supplyHealth = document.getElementById('supply-bar')
let restHealth = document.getElementById('rest-bar')
let funHealth = document.getElementById('entertainment-bar')
//status percentages
let supplyPerc = document.getElementById('supply-percent')
let restPerc = document.getElementById('rest-percent')
let funPerc = document.getElementById('entertainment-percent')

// SHIP CLASS - Which is really just the Game
class TomaShip {
    //Ship has 3 types of "resources"
    constructor(name, age=0, supplies=30, rest=20, entertainment=25){
        this.name = name
        this.age = age //max 120
        this.supplies = supplies //max 30
        this.rest = rest //max 20
        this.entertainment = entertainment //max 25
        this.gameover = true;
        this.supplyTimer;
        this.restTimer;
        this.funTimer;
    }

    setName(){
        let shipName = prompt("What is the name of your ship, Captain?")
        nameBanner.innerText = `SS ${shipName}`   
    }

    incAge(){
        if(this.age >= 30 && this.age <= 75){console.log("30-75")}//transform ship
        if(this.age > 75 && this.age < 120){console.log("76 - 119")}//transform ship}
        if(this.age === 120) {
            console.log("120")
            // ship dies
        }
    }

    addSupplies(){
        if(this.supplies + 5 > 30){this.supplies = 30}
        if(this.supplies <= 0){this.supplies = 0}
        if(this.supplies < 30) {
            this.supplies += 5
            this.animateStatInc()
        } else {return} 
        
    }

    addRest(){
        if(this.rest + 3 > 20){this.rest = 20}
        if(this.rest <= 0){this.rest = 0}

        if(this.rest < 20) {
            this.rest += 3
            this.animateFlyOut()
        } else {return}
    }

    addEntertainment() {
        if(this.entertainment + 3 > 25){this.entertainment = 25}
        if(this.entertainment <= 0){this.entertainment = 0}

        if(this.entertainment < 25) {
            this.entertainment += 3
            this.animateRoll()
        } else {return}
    }

    startGame(){
        this.gameover = false;
        console.log(this)
        this.startTimers()
    }

    endGame(timerInt){
        if(this.gameover === true){
            clearInterval(timerInt)
        }
    }

    startTimers(){
        //user activates this onClick of 'start' button after startGame runs (ideally)
        this.supplyTimer = setInterval(()=>{
            this.supplies -= 3
        }, 1000)
        this.restTimer = setInterval(()=>{
            this.rest -=4
        }, 2000)
        this.funTimer = setInterval(()=>{
            this.entertainment -= 2
        }, 1500)
        this.ageTimer = setInterval(()=>{
            this.age += 1
        }, 1500)
    }

    checkSupplies(){
        let supplyPercentage = Math.floor(this.supplies/30*100) 
        supplyHealth.style.width = `${supplyPercentage}%`
        supplyPerc.innerText = `${supplyPercentage}%`
        if( supplyPercentage > 75){ 
            supplyBox.style.border = '2px solid green'
            supplyBox.style.boxShadow = '0 0 10px green'
            supplyHealth.style.backgroundColor = 'green'
            supplyPerc.classList.remove(...supplyPerc.classList)
            supplyPerc.classList.add('good-health')
        }
        if( supplyPercentage <= 75 && supplyPercentage > 30){ 
            supplyBox.style.border = '2px solid yellow'
            supplyBox.style.boxShadow = '0 0 10px yellow'
            supplyHealth.style.backgroundColor = 'yellow'
            supplyPerc.classList.remove(...supplyPerc.classList)
            supplyPerc.classList.add('okay-health')
        }
        if( supplyPercentage <= 30 && supplyPercentage >= 0){ 
            supplyBox.style.border = '2px solid red'
            supplyBox.style.boxShadow = '0 0 10px red'
            supplyHealth.style.backgroundColor = 'red'
            supplyPerc.classList.remove(...supplyPerc.classList)
            supplyPerc.classList.add('bad-health')
        }
    }

    checkRest(){
        let restPercentage = Math.floor(this.rest/20*100)
        restHealth.style.width = `${restPercentage}%`
        restPerc.innerText = `${restPercentage}%`
        if( restPercentage > 75){ 
            restBox.style.border = '2px solid green'
            restBox.style.boxShadow = '0 0 10px green'
            restHealth.style.backgroundColor = 'green'
            restPerc.classList.remove(...restPerc.classList)
            restPerc.classList.add('good-health')
        }
        if( restPercentage <= 75 && restPercentage > 30){ 
            restBox.style.border = '2px solid yellow'
            restBox.style.boxShadow = '0 0 10px yellow'
            restHealth.style.backgroundColor = 'yellow'
            restPerc.classList.remove(...restPerc.classList)
            restPerc.classList.add('okay-health')
        }
        if( restPercentage <= 30 && restPercentage >= 0){
            restBox.style.border = '2px solid red'
            restBox.style.boxShadow = '0 0 10px red'
            restHealth.style.backgroundColor = 'red' 
            restPerc.classList.remove(...restPerc.classList)
            restPerc.classList.add('bad-health')
        }
    }

    checkFun(){
        let funPercentage = Math.floor(this.entertainment/25*100)
        funHealth.style.width = `${funPercentage}%`
        funPerc.innerText = `${funPercentage}%`
        if( funPercentage > 75){ 
            funBox.style.border = '2px solid green'
            funBox.style.boxShadow = '0 0 10px green'
            funHealth.style.backgroundColor = 'green'
            funPerc.classList.remove(...funPerc.classList)
            funPerc.classList.add('good-health')
        }
        if( funPercentage <= 75 && funPercentage > 30){ 
            funBox.style.border = '2px solid yellow'
            funBox.style.boxShadow = '0 0 10px yellow'
            funHealth.style.backgroundColor = 'yellow'
            funPerc.classList.remove(...funPerc.classList)
            funPerc.classList.add('okay-health')
        }
        if( funPercentage <= 30 && funPercentage >= 0){
            funBox.style.border = '2px solid red'
            funBox.style.boxShadow = '0 0 10px red'
            funHealth.style.backgroundColor = 'red' 
            funPerc.classList.remove(...funPerc.classList)
            funPerc.classList.add('bad-health')
        }
    }

    displayVitals(){
        this.checkSupplies()
        this.checkRest()
        this.checkFun()
        shipAge.innerText = `${this.age}`
    }

    checkLoss(){
        //If entertainment|sleep|supply === 0, GAME OVER
        //If age === 120, GAME OVER
        if(this.entertainment <= 0 || this.rest <= 0 || this.supplies <= 0){
            console.log("GAME OVER")
            return true
        }
    }

    animateStatInc(){
        playerShip.classList.add('animateStatInc')
        shipAudio.play()
        // RESET ANIMATIONS AFTER COMPLETION // 
        playerShip.addEventListener('animationend', ()=> {playerShip.classList.remove('animateStatInc')})
    }

    animateRoll(){
        playerShip.classList.add('animateRoll')
        shipAudio.play()
        // RESET ANIMATIONS AFTER COMPLETION // 
        playerShip.addEventListener('animationend', ()=> {playerShip.classList.remove('animateRoll')})
    }

    animateFlyOut(){
        playerShip.classList.add('animateFlyOut')
        shipAudio.play()
        playerShip.addEventListener('animationend', ()=> {playerShip.classList.remove('animateFlyOut')})
    }
}

const displayInstructions = () => {
    gameArea.classList.add('is-hidden')
    modalSection.classList.remove('is-hidden')
}

const hideInstructions = () => {
    modalSection.classList.add('is-hidden')
    gameArea.classList.remove('is-hidden')
}

let ship = new TomaShip()
ship.setName()

let timer = 0
//SET INTERVAL HERE TO START THE GAME
const timerInt = setInterval(() => {
    timer += 1
},1000)

//CONSTANTLY CHECKS FOR GAME STATUS UPDATES
const checkGameStats = setInterval(()=>{
    ship.displayVitals()
    if(timer >= 120){
        //stop the game
        ship.gameover = true;
        ship.endGame(timerInt)
        ship.endGame(checkGameStats)
        ship.endGame(ship.supplyTimer)
        ship.endGame(ship.restTimer)
        ship.endGame(ship.funTimer)
    }
    if(ship.checkLoss()){
        ship.gameover = true
        ship.endGame(timerInt)
        ship.endGame(checkGameStats)
        ship.endGame(ship.supplyTimer)
        ship.endGame(ship.restTimer)
        ship.endGame(ship.funTimer)
    }
},100)


// DOM EVENTS // 

//resource buttons
supplyBtn.addEventListener('click', ship.addSupplies.bind(ship))
shoreBtn.addEventListener('click', ship.addRest.bind(ship))
rollBtn.addEventListener('click', ship.addEntertainment.bind(ship))

//start button
startBtn.addEventListener('click', ship.startGame.bind(ship))
//instructions button
instructionBtn.addEventListener('click', displayInstructions)
modalCloseBtn.addEventListener('click', hideInstructions)