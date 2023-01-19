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


class TomaShip {
    //Ship has 3 types of resources
    constructor(name, age=0, supplies=30, rest=20, entertainment=25){
        this.name = name
        this.age = age //max 120
        this.supplies = supplies //max 30
        this.rest = rest //max 20
        this.entertainment = entertainment //max 25
        this.gameover = false;
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
        if(this.supplies < 70) {
            this.supplies += 5
            this.animateStatInc()
        } else {return} 
        
    }

    addRest(){
        if(this.rest < 20) {
            this.rest += 3
            this.animateStatInc()
        } else {return}
    }

    addEntertainment() {
        if(this.entertainment < 70) {
            this.entertainment += 3
            this.animateRoll()
        } else {return}
    }

    startTimers(){
        //user activates this onClick of 'start' button after startGame runs (ideally)
        //Starts the timers for all 4 resources (2 minutes each)
    }

    startGame(){
        let shipName = prompt("What is the name of your ship, Captain?")
        this.setName(shipName)
    }

    displayVitals(){
        supplyBar.innerText = this.supplies
        restBar.innerText = this.rest
        funBar.innerText = this.entertainment
    }

    checkLoss(){
        //If entertainment|sleep|supply === 0, GAME OVER
        //If age === 120, GAME OVER
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

// let timer = 0
//SET INTERVAL HERE TO START THE GAME
// setInterval(() => {
//     timer += 1
//     console.log(timer)
    
// },1000)

//if timer is 120 //clearInterval() and gameends if no winner

// DOM EVENTS // 
supplyBtn.addEventListener('click', ship.addSupplies.bind(ship))
shoreBtn.addEventListener('click', ship.addRest.bind(ship))
rollBtn.addEventListener('click', ship.addEntertainment.bind(ship))


