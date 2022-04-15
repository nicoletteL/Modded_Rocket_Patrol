class Spaceship extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, pointValue, timeAdded) {
    super(scene, x, y, texture, frame, pointValue, timeAdded);
    scene.add.existing(this);        // add to existing scene
    this.points = pointValue;        // store pointValue
    this.moveSpeed = game.settings.spaceshipSpeed;              // pixels per frame
    this.timeAdded = timeAdded;
  }

  update() {
    // move spacecship left
    this.x -= this.moveSpeed;

    // wrap around from left to right (reset position)
    if (this.x <= 0 - this.width) {
      this.reset();
    }
  }

  reset() {
    this.x = game.config.width;
  }
}