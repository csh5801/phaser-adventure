import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  character!: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super("game")
  }

  preload() {
    this.load.image("tiles", "/overworld.png");
    this.load.tilemapTiledJSON("adventure", "/phaser-adventure.json");
    this.load.spritesheet("character", "/character.png", { frameWidth: 16, frameHeight: 32});
}

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    const map = this.make.tilemap({ key: "adventure" });
    const tileset = map.addTilesetImage("overworld", "tiles");

    map.createLayer("ground", tileset);

    this.anims.create({
       key: "character-idle-down",
       frames: this.anims.generateFrameNumbers("character", { start: 0, end: 0}), 
    });

    this.anims.create({
        key: "character-idle-up",
        frames: this.anims.generateFrameNumbers("character", { start: 34, end: 34}), 
     });

     this.anims.create({
        key: "character-idle-left",
        frames: this.anims.generateFrameNumbers("character", { start: 51, end: 51}), 
     });

     this.anims.create({
        key: "character-idle-right",
        frames: this.anims.generateFrameNumbers("character", { start: 17, end: 17}), 
     });

     
     this.anims.create({
        key: "character-walk-down",
        frames: this.anims.generateFrameNumbers("character", { start: 0, end: 3}), 
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "character-walk-up",
        frames: this.anims.generateFrameNumbers("character", { start: 34, end: 37}), 
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "character-walk-left",
        frames: this.anims.generateFrameNumbers("character", { start: 51, end: 54}), 
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "character-walk-right",
        frames: this.anims.generateFrameNumbers("character", { start: 17, end: 20}), 
        frameRate: 8,
        repeat: -1,
    });

    this.character = this.physics.add.sprite(50, 50, "character");
  }
  
    update() {
     if (!this.cursors || !this.character){
         return;
     }

    const speed = 50;

     if (this.cursors.down.isDown) {
         this.character.play("character-walk-down", true);
         this.character.setVelocity(0, speed);
     } else if (this.cursors.up.isDown) {
        this.character.play("character-walk-up", true);
        this.character.setVelocity(0, -speed);
    } else if (this.cursors.right.isDown) {
        this.character.play("character-walk-right", true);
        this.character.setVelocity(speed, 0);
    } else if (this.cursors.left.isDown) {
        this.character.play("character-walk-left", true);
        this.character.setVelocity(-speed, 0);
    } else {
        this.character.play("character-idle-down");
        this.character.setVelocity(0, 0);
    }
    }
}
