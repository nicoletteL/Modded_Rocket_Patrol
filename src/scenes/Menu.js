class Menu extends Phaser.Scene {
  constructor() {
      super("menuScene");
  }

  preload() {
    // load audio
    this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
    this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
    this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
  }

  create() {
  // define keys
  keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  game.settings = {
    playerMode: 1,
    whichPlayer: 1,
  };

  // menu text configuration
    let menuConfig = {
      fontFamily: 'Courier',
      fontSize: '26px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 0
    }

    // show menu text
    this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
      borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move & (F) to fire',
      menuConfig).setOrigin(0.5);
    menuConfig.backgroundColor = '#80FF00';
    menuConfig.color = '#000';
    this.add.text(game.config.width/2, game.config.height/2 + borderUISize +
      borderPadding, 'Press A for 1 Player or D for 2 Players', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 +
      borderPadding *2, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
  }

  update() {

    if (Phaser.Input.Keyboard.JustDown(keyA)) {
      game.settings.playerMode = 1;
      console.log(game.settings.playerMode);
    }

    if (Phaser.Input.Keyboard.JustDown(keyD)) {
      game.settings.playerMode = 2;
      console.log(game.settings.playerMode);
    }

    if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      // easy mode
      game.settings.spaceshipSpeed = 3;
      game.settings.gameTimer = 60000;    
      
      this.sound.play('sfx_select');
      this.scene.start('playScene');    
    }
    if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
      // hard mode
      game.settings.spaceshipSpeed = 4;
      game.settings.gameTimer = 45000;
      this.sound.play('sfx_select');
      this.scene.start('playScene');    
    }
  }
}