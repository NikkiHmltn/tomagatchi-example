console.log("sanity check")

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
        this.supplies += 5
    }

    addRest(){
        this.rest += 3
    }

    addEntertainment() {
        this.entertainment += 4
    }

    startTimers(){
        //user activates this onClick of 'start' button after startGame runs (ideally)
        //Starts the timers for all 4 resources (2 minutes each)
    }

    startGame(){
        //prompt the user to enter the ship's name
            //this.setname(userInput)
    }

    displayVitals(){
        //Manipulate DOM to reflect class resource changes
    }

    checkLoss(){
        //If entertainment|sleep|supply === 0, GAME OVER
        //If age === 120, GAME OVER
    }

    

}
let timer = 0
//SET INTERVAL HERE TO START THE GAME
setInterval(() => {
    timer += 1
    console.log(timer)
    
},1000)

//if timer is 120 //clearInterval() and gameends if no winner

