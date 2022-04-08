class Spaceship extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, pointValue) {
    super(scene, x, y, texture, frame, pointValue);
    scene.add.existing(this);        // add to existing scene
    this.points = pointValue;        // store pointValue
    this.moveSpeed = 3;              // pixels per frame
  }

  update() {
    // move spacecship left
    this.x -= this.moveSpeed;

    // wrap around from left to right
    if (this.x <= 0 - this.width) {
      this.x = game.config.width;
    }
  }
}