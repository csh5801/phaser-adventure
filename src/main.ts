import Phaser from "phaser";
import Game from "./scenes/Game";

export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 16 * 35,
  height: 16 * 25,
  zoom: 2,
  physics: {
    default: "arcade",
  },
  scene: [Game],
});
