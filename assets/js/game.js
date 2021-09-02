// Game States
window.alert("Welcome to Robot Gladiators!");

//  * Defeat each enemy-robot
// "LOSE" - Play robot's health is zero or less

// creates function called "fight"
var fight = function (enemy) {
    
    // repeat and execute as long as the enemy-robot is alive
    while(playerInfo.health > 0 && enemy.health > 0) {
        // ask player if they'd like to right or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log (promptFight);

        //if player chooses to skip
        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm player wants to skip
             var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    
            // if yes (true), leave fight
             if (confirmSkip) {
                 window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                 // subtract money from playerInfo.money for skipping
                    playerInfo.money = Math.max(0, playerInfo.money - 10);
                    console.log("playerInfo.money", playerInfo.money);
                    break;
                }
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
    // if player is still alove, player wins
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + "!");
    } else {
        window.alert("You've just lost your robot in battle.");
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
        "would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice"
    );

    // use switch to determine the value
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;

        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;

        case "LEAVE":
        case "leave":
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

// Get Player Info
var playerInfo = {
    name: window.prompt("What is your robot's name?"),
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