import Phaser from "phaser";
import { createCharacterAnims } from "../anims/character";
import { createNpcAnims } from "../anims/npc";

export default class GameScene extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  character!: Phaser.Physics.Arcade.Sprite;
  takingDamage = false;
  damageTime = 0; 

  constructor() {
    super("game")
  }

  hitNpc(character, npc) {
    this.takingDamage = true
    this.character.setTint(0xff0000);
    
    const dx = character.x - npc.x;
    const dy = character.y - npc.y;
    const vec = new Phaser.Math.Vector2(dx, dy).normalize().scale(100);

    this.character.setVelocityX(vec.x, vec.y)
    npc.setVelocity(0, 0)
  }

  preload() {
    this.load.image("tiles", "/overworld.png");
    this.load.tilemapTiledJSON("adventure", "/phaser-adventure.json");
    this.load.spritesheet("character", "/character.png", { frameWidth: 16, frameHeight: 32});
    this.load.spritesheet("npc", "/npc.png", { frameWidth: 16, frameHeight: 32});
  }

  create() {
    createNpcAnims(this.anims);
    createCharacterAnims(this.anims);

    this.cursors = this.input.keyboard.createCursorKeys();

    const map = this.make.tilemap({ key: "adventure" });
    const tileset = map.addTilesetImage("overworld", "tiles");
    
    map.createLayer("ground", tileset);

    const treesLayer = map.createLayer("trees", tileset);
    treesLayer.setCollisionByProperty( { collides : true} );
    
    const housesLayer = map.createLayer("houses", tileset);
    housesLayer.setCollisionByProperty( { collides : true} );

    this.character = this.physics.add.sprite(50, 50, "character");
    this.cameras.main.startFollow(this.character, true);

    const npcGroup = this.physics.add.group();
    
    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(20, 400);
      const y = Phaser.Math.Between(20, 400);
      npcGroup.get(x, y,"npc")
    }

    this.time.addEvent ({
      delay: 1000,
      callback: () => {
       npcGroup.children.each((npc) => {
        const n = Phaser.Math.Between(1, 4);
         switch (n) {
         case 1: 
           npc.setVelocity(0, -25);
           npc.play("npc-walk-up");
           break;
         case 2: 
           npc.setVelocity(0, 25);
           npc.play("npc-walk-down");
           break;
          case 3:
           npc.setVelocity(-25, 0);
           npc.play("npc-walk-left"); 
            break;
          case 4:
           npc.setVelocity(25, 0);
           npc.play("npc-walk-right"); 
            break;
         }
      });
    },
      loop: true
    });

    this.physics.add.collider(housesLayer, this.character);
    this.physics.add.collider(treesLayer, this.character);
    this.physics.add.collider(housesLayer, npcGroup);
    this.physics.add.collider(treesLayer, npcGroup);
    this.physics.add.collider(this.character, npcGroup, this.hitNpc, null, this);
  }
  
    update(t: number, dt: number) {
     if (!this.cursors || !this.character){
         return;
     }

     this.damageTime += dt;

     if (this.damageTime > 250) {
       this.damageTime = 0;
       this.takingDamage = false;
       this.character.setTint(0xffffff);
     }

    if(this.takingDamage) {
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
