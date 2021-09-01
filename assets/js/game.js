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
    } else {
        window.alert("You have lose your robot in battle! Game Over!");
        break;
    }
}