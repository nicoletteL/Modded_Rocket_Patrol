let config = {
  type: Phaser.CANVAS,
  width: 640,
  height: 480,
  scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyA, keyD;

game.settings = {
  playerMode: 1,
  whichPlayer: 1,
  highscore: 0,
};
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

Implement an alternating two-player mode (20)
- I created a two-player mode where once player 1's turn has ended it is player 2's turn.
  Since they're aren't any lives in this game (once timer runs out the game is over),
  once player 1's timer has run out they're done and it's player 2's turn.

Implement the speed increase that happens after 30 seconds in the original game (5)
- I increased the spaceship's speed by 2 halfway through the game.

Track a high score that persists across scenes and display it in the UI (5)
- Tracks a single highscore across both difficulty modes (by restarting a game and going back to menu)
*/
