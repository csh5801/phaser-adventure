import Phaser from "phaser";
import Game from "./scenes/Game";

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 400,
    height: 250,
    zoom: 2,
    physics: {
        default: "arcade",
    },
    scene: [Game],
});