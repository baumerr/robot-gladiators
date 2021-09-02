// Game States
window.alert("Welcome to Robot Gladiators!");
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerHealth, playerAttack);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 10;
var enemyAttack = 12;


//  * Defeat each enemy-robot
// "LOSE" - Play robot's health is zero or less

// creates function called "fight"
var fight = function (enemyName) {
    // repeat and execute as long as the enemy-robot is alive
    while(playerHealth > 0 && enemyHealth > 0) {
        // ask player if they'd like to right or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log (promptFight);

        //if player chooses to skip
        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm player wants to skip
             var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    
            // if yes (true), leave fight
             if (confirmSkip) {
                 window.alert(playerName + " has decided to skip this fight. Goodbye!");
                 // subtract money from playerMoney for skipping
                    playerMoney = playerMoney - 10;
                    console.log("playerMoney", playerMoney);
                    break;
                }
        }
        
        // Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable
        enemyHealth = enemyHealth - playerAttack;

        // Log a resulting message to the console so we know that it worked 
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // Check enemies health
        if(enemyHealth <=0) {
            window.alert(enemyName + " has died!");

            //award player money for winning
            playerMoney = playerMoney + 20;

            //leave while() loop since enemy is dead
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable
        playerHealth = playerHealth - enemyAttack;

        // Log a resulting message to the console so we know that it worked
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        // Check player's health
        if(playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
        
    }
}

// "WIN" - Player robot has defeated all enemy-robots
//  * Fight all enemy-robots

// function to start a new game
var startGame = function () {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // lets the player know what round they are on
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );

            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];

            // reset enemy health before starting new fight
            enemyHealth = 50;

            // use debugger to pause script from running and check what's going on at that moment in the code
            // debugger

            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);
            // calls shop function after a fight if there are more robots to defeat
            if (playerHealth > 0 && i < enemyNames.length - 1) {
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
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + "!");
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
            if (playerMoney >= 7) {
                window.alert("refilling player's health by 20 for 7 dollars.");

                //increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }
            break;

        case "UPGRADE":
        case "upgrade":
            if (playerMoney >=7 ) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney -7;
            } else {
                window.alert("You don't have enough money!");
            }
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

// start the game when the page loads
startGame ();



//ask if they want to fight again

// ask player if they want to go to the store, where they can buy refills of health, upgrade their robot or leave the store