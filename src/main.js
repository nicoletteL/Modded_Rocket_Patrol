let config = {
  type: Phaser.CANVAS,
  width: 640,
  height: 480,
  scene: [ Menu, Play ]
}
console.log("test2");
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;


/* Points Breakdown

Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) 
- I created and added new artwork for the rocket, ships, and the explosion. 
  The ships are now a different shape and purple, the rocket is blue, purple, and white,
  and the explosion is closer to a real explosion than the original in Rocket Patrol.

Display the time remaining (in seconds) on the screen (10)
- I created a textbox to display the timer, set it up in create(), and updated in in update().

Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)
- I added the ability to add time to the timer when hitting ships: 
  2 seconds for the bottom, 4 seconds for the middle, and 8 seconds for the top.

Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (20)
- I added two particle emmiters to emit two different colored balls of light when a ship is hit.


*/
