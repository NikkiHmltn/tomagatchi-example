// console.log("sanity check")

// DOM VARIABLES // 

//buttons
let supplyBtn = document.getElementById('resupply')
let shoreBtn = document.getElementById('shoreleave')
let rollBtn = document.getElementById('barrelRoll')
//ship
let playerShip = document.getElementById('player-ship')
let shipAudio = document.getElementById('shipSound')
//status bars
let supplyBar = document.getElementById('supply-stat')
let restBar = document.getElementById('rest-stat')
let funBar = document.getElementById('entertainment-stat')
let supplyHealth = document.getElementById('supply-bar')
let restHealth = document.getElementById('rest-bar')
let funHealth = document.getElementById('entertainment-bar')


class TomaShip {
    //Ship has 3 types of "resources"
    constructor(name, age=0, supplies=30, rest=20, entertainment=25){
        this.name = name
        this.age = age //max 120
        this.supplies = supplies //max 30
        this.rest = rest //max 20
        this.entertainment = entertainment //max 25
        this.gameover = false;
        this.supplyTimer;
        this.restTimer;
        this.funTimer;
    }

    setName(input){
        this.name = input
    }

    incAge(){
        this.age += 1
            //if age == 30 ---> filter effect
            //if age == 75 "   "
            //if age == 120 ---> Dead Ship
    }

    addSupplies(){
        if(this.supplies + 5 > 30){this.supplies = 30}
        if(this.supplies < 30) {
            this.supplies += 5
            this.animateStatInc()
        } else {return} 
        
    }

    addRest(){
        if(this.rest + 3 > 20){this.rest = 20}

        if(this.rest < 20) {
            this.rest += 3
            this.animateStatInc()
        } else {return}
    }

    addEntertainment() {
        if(this.entertainment + 3 > 25){this.entertainment = 25}

        if(this.entertainment < 25) {
            this.entertainment += 3
            this.animateRoll()
        } else {return}
    }

    startTimers(){
        //user activates this onClick of 'start' button after startGame runs (ideally)
        //Starts the timers for all 4 resources (2 minutes each)
        this.supplyTimer = setInterval(()=>{
            this.supplies -= 3
        }, 1000)
        this.restTimer = setInterval(()=>{
            this.rest -=4

        }, 2000)
        this.funTimer = setInterval(()=>{
            this.entertainment -= 2

        }, 2500)
    }

    startGame(){
        let shipName = prompt("What is the name of your ship, Captain?")
        this.setName(shipName)   
        this.startTimers()   
    }

    endGame(timerInt){
        if(this.gameover === true){
            clearInterval(timerInt)
        }
    }

    displayVitals(){
        supplyHealth.innerText = this.supplies
        supplyHealth.style.width = `${Math.floor(this.supplies/30*100)}%`
        
        restHealth.innerText = this.rest
        restHealth.style.width = `${Math.floor(this.rest/20*100)}%`

        funHealth.innerText = this.entertainment
        funHealth.style.width = `${Math.floor(this.entertainment/25*100)}%`

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

}

let ship = new TomaShip()
ship.startGame()

let timer = 0
//SET INTERVAL HERE TO START THE GAME
const timerInt = setInterval(() => {
    timer += 1
    // console.log(timer)
    
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


// if timer is 120 //clearInterval() and gameends if no winner

// DOM EVENTS // 
supplyBtn.addEventListener('click', ship.addSupplies.bind(ship))
shoreBtn.addEventListener('click', ship.addRest.bind(ship))
rollBtn.addEventListener('click', ship.addEntertainment.bind(ship))


