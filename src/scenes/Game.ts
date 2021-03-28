import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game")
  }

  preload() {
    this.load.image("tiles", "/overworld.png");
    this.load.tilemapTiledJSON("adventure", "/phaser-adventure.json");
  }

  create() {
    const map = this.make.tilemap({ key: "adventure" });
    const tileset = map.addTilesetImage("overworld", "tiles");

    map.createLayer("ground", tileset);
  }
}
