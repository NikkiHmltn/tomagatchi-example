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


// SHIP CLASS
class TomaShip {
    //Ship has 3 types of "resources"
    constructor(name, age=0, supplies=30, rest=20, entertainment=25){
        this.name = name
        this.age = age //max 120
        this.supplies = supplies //max 30
        this.rest = rest //max 20
        this.entertainment = entertainment //max 25
        this.gameover = true;
        this.win = false;
        this.loss = false;
        this.supplyTimer;
        this.restTimer;
        this.funTimer;
        this.ageTimer;
    }
    // Ask and set player's ship name
    setName(){
        let shipName = prompt("What is the name of your ship, Captain?")
        this.name = shipName;
        nameBanner.innerText = `SS ${this.name.toUpperCase()}`   
    }
    // Increase supplies and keep within range
    addSupplies(){
        if(this.supplies + 5 > 30){this.supplies = 30}
        if(this.supplies <= 0){this.supplies = 0}
        if(this.supplies < 30) {
            this.supplies += 5
            this.animateStatInc()
        } else {return} 
    }
    // Increase rest and keep within range
    addRest(){
        if(this.rest + 3 > 20){this.rest = 20}
        if(this.rest <= 0){this.rest = 0}
        if(this.rest < 20) {
            this.rest += 3
            this.animateFlyOut()
        } else {return}
    }
    // Increase entertainment (fun) and keep within range
    addEntertainment() {
        if(this.entertainment + 3 > 25){this.entertainment = 25}
        if(this.entertainment <= 0){this.entertainment = 0}
        if(this.entertainment < 25) {
            this.entertainment += 3
            this.animateRoll()
        } else {return}
    }
    //Game starts by starting the timers
    startGame(){
        this.gameover = false;
        this.startTimers()
    }
    //When the game is done, stop all timers passed in
    endGame(timerInt){
        if(this.gameover === true){
            clearInterval(timerInt)
        }
    }

    startTimers(){
        //Activated by "startGame()"
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
    //This is certainly one way to do styling. What would be a way you could do it differently? 
    checkSupplies(){ 
        let supplyPercentage = Math.floor(this.supplies/30*100) 
        supplyHealth.style.width = `${supplyPercentage}%`
        supplyPerc.innerText = `${supplyPercentage}%`
        //Green bar
        if( supplyPercentage > 75){ 
            supplyBox.style.border = '2px solid green'
            supplyBox.style.boxShadow = '0 0 10px green'
            supplyHealth.style.backgroundColor = 'green'
            supplyPerc.classList.remove(...supplyPerc.classList)
            supplyPerc.classList.add('good-health')
        }
        //Yellow bar
        if( supplyPercentage <= 75 && supplyPercentage > 30){ 
            supplyBox.style.border = '2px solid yellow'
            supplyBox.style.boxShadow = '0 0 10px yellow'
            supplyHealth.style.backgroundColor = 'yellow'
            supplyPerc.classList.remove(...supplyPerc.classList)
            supplyPerc.classList.add('okay-health')
        }
        //Red bar
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
        //Green bar
        if( restPercentage > 75){ 
            restBox.style.border = '2px solid green'
            restBox.style.boxShadow = '0 0 10px green'
            restHealth.style.backgroundColor = 'green'
            restPerc.classList.remove(...restPerc.classList)
            restPerc.classList.add('good-health')
        }
        //Yellow bar
        if( restPercentage <= 75 && restPercentage > 30){ 
            restBox.style.border = '2px solid yellow'
            restBox.style.boxShadow = '0 0 10px yellow'
            restHealth.style.backgroundColor = 'yellow'
            restPerc.classList.remove(...restPerc.classList)
            restPerc.classList.add('okay-health')
        }
        //Yelow bar
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
        //Green bar
        if( funPercentage > 75){ 
            funBox.style.border = '2px solid green'
            funBox.style.boxShadow = '0 0 10px green'
            funHealth.style.backgroundColor = 'green'
            funPerc.classList.remove(...funPerc.classList)
            funPerc.classList.add('good-health')
        }
        //Yellow bar
        if( funPercentage <= 75 && funPercentage > 30){ 
            funBox.style.border = '2px solid yellow'
            funBox.style.boxShadow = '0 0 10px yellow'
            funHealth.style.backgroundColor = 'yellow'
            funPerc.classList.remove(...funPerc.classList)
            funPerc.classList.add('okay-health')
        }
        //Red bar
        if( funPercentage <= 30 && funPercentage >= 0){
            funBox.style.border = '2px solid red'
            funBox.style.boxShadow = '0 0 10px red'
            funHealth.style.backgroundColor = 'red' 
            funPerc.classList.remove(...funPerc.classList)
            funPerc.classList.add('bad-health')
        }
    }

    // Alters ship appearance based on age
    checkAge(){
        if(this.age >= 30 && this.age <= 75){
            playerShip.style.filter = "contrast(5)"
        }
        if(this.age > 75 && this.age < 120){
            playerShip.style.filter = "invert(1)"
        }
    }
    //Displays ship vitals for the user to see
    displayVitals(){
        this.checkSupplies()
        this.checkRest()
        this.checkFun()
        this.checkAge()
        shipAge.innerText = `${this.age}`
    }

    checkLoss(){
        //If entertainment|sleep|supply === 0, GAME OVER - LOSS
        //If age === 120, GAME OVER - WIN
        if(this.entertainment <= 0 || this.rest <= 0 || this.supplies <= 0){
            displayLossMsg()
            return true;
        } else if (this.age >= 120) {
            displayWinMsg()
            return true;
        }
    }

    //ANIMATIONS

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
        // RESET ANIMATIONS AFTER COMPLETION // 
        playerShip.addEventListener('animationend', ()=> {playerShip.classList.remove('animateFlyOut')})
    }
}

// GLOBAL FUNCTIONS //

//Instructions modal display/hide
const displayInstructions = () => {
    gameArea.classList.add('is-hidden')
    modalSection.classList.remove('is-hidden')
}

const hideInstructions = () => {
    modalSection.classList.add('is-hidden')
    gameArea.classList.remove('is-hidden')
}

// Game Over display messages
const displayLossMsg = () => {
    ship.loss = true;
    if(ship.loss){
        alert(":( So Long Space Cowboy... ")
    }
    ship.loss = false;
}

const displayWinMsg = () => {
    ship.win = true;
    if(ship.win){
        alert("Congratulations! Your cruiser has reached the end of it's legally allowed user consumption contract and will now be impounded. Have a nice day!")
    }
    ship.win = false;
}

//Create new instance of ship after the Class
let ship = new TomaShip()
//Get the ship's name and then starts the game for us
ship.setName()

//CONSTANTLY CHECKS FOR GAME STATUS UPDATES
const checkGameStats = setInterval(()=>{
    ship.displayVitals()
    if(ship.checkLoss()){
        ship.gameover = true
        ship.endGame(checkGameStats)
        ship.endGame(ship.supplyTimer)
        ship.endGame(ship.restTimer)
        ship.endGame(ship.funTimer)
        ship.endGame(ship.ageTimer)
    }
},100)

// DOM EVENTS // 

//resource buttons
supplyBtn.addEventListener('click', ship.addSupplies.bind(ship)) //if we don't bind 'ship' here, 'this' inside the Class object turns into the element we put the event listener on! To retain the context of the ship object using 'this' we must bind in this case.
shoreBtn.addEventListener('click', ship.addRest.bind(ship))
rollBtn.addEventListener('click', ship.addEntertainment.bind(ship))

//start button
startBtn.addEventListener('click', ship.startGame.bind(ship))
//instructions button
instructionBtn.addEventListener('click', displayInstructions)
modalCloseBtn.addEventListener('click', hideInstructions)