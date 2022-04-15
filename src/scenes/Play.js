class Play extends Phaser.Scene {
  constructor() {
      super("playScene");
  }

  preload() {
    // load images/tile sprites
    this.load.image('rocket', './assets/rocket.png');
    this.load.image('spaceship', './assets/spaceship.png');
    this.load.image('starfield', './assets/starfield2.png');

    // load particles
    this.load.image('spark0', './assets/white.png');
    this.load.image('spark1', './assets/yellow.png');

    // load spritesheet
    this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32,
      startFrame: 0, endFrame: 9});
  }

  create() {
    // place tile sprite
    this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

    // add rocket (p1)
    this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

    // add spaceships (x3)
    this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*3, 'spaceship', 0, 30, 8000).setOrigin(0,0);
    this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*4 + borderPadding*2, 'spaceship', 0, 20, 4000).setOrigin(0,0);
    this.ship03 = new Spaceship(this, game.config.width, borderUISize*5 + borderPadding*4, 'spaceship', 0, 10, 2000).setOrigin(0,0);

  //   // define keys
   keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  
    // animation config
    this.anims.create({
    key: 'explode',
    frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
    frameRate: 30
    });


    // Particle emitters
    this.emitter0 = this.add.particles('spark0').createEmitter({
      x: 0,
      y: 0,
      active: false,
      speed: {min: 0, max: 200},
      angle: {min: 0, max: 180},
      scale: {start: 0.3, end: 0},
      blendMode: 'SCREEN',
      lifespan: 800,
      gravityY: 200,
    });

    this.emitter1 = this.add.particles('spark0').createEmitter({
      x: 0,
      y: 0,
      active: false,
      speed: {min: 0, max: 200},
      angle: {min: 0, max: 180},
      scale: {start: 0.3, end: 0},
      blendMode: 'SCREEN',
      lifespan: 800,
      gravityY: 200,
    });

    // initialize score
    this.p1Score = 0;

     // display score
    let scoreConfig = {
      fontFamily: 'Courier',
      fontSize: '26px',
      color: '#FFFFFF',
      align: 'left',
      fixedWidth: 200
    }

    // display timer
    let timerConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      color: '#FFFFFF',
      align: 'center',
      fixedWidth: 100
    }

    // display player
    let playerConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      color: '#FFFFFF',
      align: 'left',
      fixedWidth: 100
    }

    this.scoreLeft = this.add.text(borderUISize, borderUISize, "Score: ".concat(this.p1Score), scoreConfig);
    
    if (game.settings.playerMode == 2) {
      if (game.settings.whichPlayer == 1) {
        this.player = this.add.text(borderUISize*15, borderUISize, "Player 1", scoreConfig);
      
      } else if (game.settings.whichPlayer == 2) {
        this.player = this.add.text(borderUISize*15, borderUISize, "Player 2", scoreConfig);
      }
    }

    // GAME OVER flag
    this.gameOver = false;

    // 60-second play clock
    scoreConfig.fixedWidth = 0;
    this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
      this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu',
        scoreConfig).setOrigin(0.5);
      this.gameOver = true;
      }, null, this);

    this.timer = this.add.text(game.config.width/2, borderPadding*2, game.settings.gameTimer/1000, timerConfig).setOrigin(0.5, 0);

    console.log(game.settings.whichPlayer);
  }

  update() {
  //  console.log(this.gameOver);

    if (this.gameOver && game.settings.playerMode == 2 && game.settings.whichPlayer == 1) {
      game.settings.whichPlayer = 2;
      this.scene.restart();
    }

    // check input for restart
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
      this.scene.restart();
    }

    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      this.scene.start("menuScene");
    }

    this.starfield.tilePositionX -= 2;
    this.timer.text = Math.round((this.clock.delay - this.clock.elapsed) / 1000 );

    if (!this.gameOver) {
      this.p1Rocket.update();
      this.ship01.update();               // update spaceships (x3)
      this.ship02.update();
      this.ship03.update();
    }

    // check collisions
    if(this.checkCollision(this.p1Rocket, this.ship03)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship03);
    }

    if (this.checkCollision(this.p1Rocket, this.ship02)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship02);
    }

    if (this.checkCollision(this.p1Rocket, this.ship01)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship01);
    }
  }

  checkCollision(rocket, ship) {
    // simple AABB checking
    if (rocket.x < ship.x + ship.width && 
        rocket.x + rocket.width > ship.x && 
        rocket.y < ship.y + ship.height &&
        rocket.height + rocket.y > ship. y) {
          return true;
    } else {
      return false;
    }
  }

  shipExplode(ship) {
    // temporarily hide ship
    ship.alpha = 0;
    // create explosion sprite at ship's position
    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    boom.anims.play('explode');             // play explode animation
    this.sound.play('sfx_explosion');

    this.emitter0.setPosition(ship.x, ship.y);
    this.emitter1.setPosition(ship.x, ship.y);
    this.emitter1.active = true;
    this.emitter0.active = true;
    this.emitter0.explode();
    this.emitter1.explode();

    boom.on('animationcomplete', () => {    // callback after anim completes
      ship.reset();                         // reset ship position
      ship.alpha = 1;                       // make ship visible again
      boom.destroy();                       // remove explosion sprite
    });   

    // score add and repaint
    this.p1Score += ship.points;
    this.scoreLeft.text = "Score: ".concat(this.p1Score); 

    // add time
    this.clock.delay += ship.timeAdded;
  }
}