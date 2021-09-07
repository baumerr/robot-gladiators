// Game States
window.alert("Welcome to Robot Gladiators!");

//  * Defeat each enemy-robot
// "LOSE" - Play robot's health is zero or less

var fightOrSkip = function () {
    // ask player if they'd like to right or run
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    console.log (promptFight);

    if (!promptFight) {
        window.alert("You need to provide an answer! Please try again.");
        return fightOrSkip();
    } else {
        promptFight = promptFight.toLowerCase();
    }

    //if player chooses to skip
    if (promptFight === "skip") {
        //confirm player wants to skip
         var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
         if (confirmSkip) {
             window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
             // subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                return true;
            }
    }
    return false;
}

// creates function called "fight"
var fight = function (enemy) {

    var isPlayerTurn = true;

    if (Math.random() > .5) {
        isPlayerTurn = false;
    }
    
    // repeat and execute as long as the enemy-robot is alive
    while(playerInfo.health > 0 && enemy.health > 0) {
        // Determines if the player or the enemy attacks first
        if (isPlayerTurn) {
            //ask player if they'd like to skip using the fightOrSkip function
            if (fightOrSkip()) {
                // if true, leave fight by breaking loop
                break;
            }
        
            // Subtract the value of 'playerInfo.attack' from the value of 'enemy.health' and use that result to update the value in the 'enemy.health' variable
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.health = Math.max(0, enemy.health - damage);

            // Log a resulting message to the console so we know that it worked 
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );

            // Check enemies health
            if(enemy.health <=0) {
                window.alert(enemy.name + " has died!");

                //award player money for winning
                playerInfo.money = playerInfo.money + 20;

                //leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        //player gets attacked first
        } else {

            // Subtract the value of 'enemy.attack' from the value of 'playerInfo.health' and use that result to update the value in the 'playerInfo.health' variable
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);

            // Log a resulting message to the console so we know that it worked
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            // Check player's health
            if(playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        //switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
        
    }
}

// "WIN" - Player robot has defeated all enemy-robots
//  * Fight all enemy-robots

// function to start a new game
var startGame = function (enemy) {
    // reset player stats
    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // lets the player know what round they are on
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );
            // pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            // reset enemy health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);
            console.log(playerInfo.name, playerInfo.health, playerInfo.attack);
            console.log(enemyInfo[i], enemyInfo.health, enemyInfo.attack);
            // use debugger to pause script from running and check what's going on at that moment in the code
            // debugger

            // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);
            // calls shop function after a fight if there are more robots to defeat
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                //ask if player wants to go into store
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                //if yes, take them into
                if (storeConfirm) {
                    shop ();
                }
            }
        } else {
            window.alert("You have lose your robot in battle! Game Over!");
            break;
        }
    } 
    // after loop ends, playuer is either of of health or enemues to fight, so run endGame function
    endGame ();
}

 // show player score
var endGame = function () {
    window.alert("The game has now ended. Let's see how you did!");

    //check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }
    // if playuer has more money than the high score, player has new high score
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame ();
    } else {
        window.alert("Thank you for playing Robot Gladiators!");
    }

}

var shop = function () {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Refill: 1. Upgrade: 2. Leave: 3."
    );

    // Convert String to Integer
    shopOptionPrompt = parseInt(shopOptionPrompt);

    // use switch to determine the value
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;

        case 2:
            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert("Leaving the store.");
            
            //do nothing, so function will end
            break;

        default:
            window.alert("you did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop ();
            break;
    }
}

// function to generate random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min +1) + min);

    return value;
}

// Get player Name function
var getPlayerName = function () {
    var name = "";

    //Loop here
    while (name === "" || name === null) {
        name = window.prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
}
// Get Player Info
var playerInfo = {
    name: getPlayerName (),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
};
console.log(playerInfo.name, playerInfo.health, playerInfo.attack);

// Enemy Info
var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber (10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber (10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber (10, 14)
    }
];

// start the game when the page loads
startGame ();



//ask if they want to fight again

// ask player if they want to go to the store, where they can buy refills of health, upgrade their robot or leave the store