import Phaser from "phaser";
import { createCharacterAnims } from "../anims/character";

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

    const treesLayer = map.createLayer("trees", tileset);
    treesLayer.setCollisionByProperty( { collides : true} );
    
    this.character = this.physics.add.sprite(50, 50, "character");
    this.cameras.main.startFollow(this.character, true);

    const housesLayer = map.createLayer("houses", tileset);
    housesLayer.setCollisionByProperty( { collides : true} );

    createCharacterAnims(this.anims);

    this.physics.add.collider(housesLayer, this.character);
    this.physics.add.collider(treesLayer, this.character);
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
