import Phaser from "phaser";

export function createCharacterAnims(anims: Phaser.Animations.AnimationManager) { 

anims.create({
    key: "character-idle-down",
    frames: anims.generateFrameNumbers("character", { start: 0, end: 0}), 
 });

 anims.create({
     key: "character-idle-up",
     frames: anims.generateFrameNumbers("character", { start: 34, end: 34}), 
  });

  anims.create({
     key: "character-idle-left",
     frames: anims.generateFrameNumbers("character", { start: 51, end: 51}), 
  });

  anims.create({
     key: "character-idle-right",
     frames: anims.generateFrameNumbers("character", { start: 17, end: 17}), 
  });

  
  anims.create({
     key: "character-walk-down",
     frames: anims.generateFrameNumbers("character", { start: 0, end: 3}), 
     frameRate: 8,
     repeat: -1,
 });

anims.create({
     key: "character-walk-up",
     frames: anims.generateFrameNumbers("character", { start: 34, end: 37}), 
     frameRate: 8,
     repeat: -1,
 });

 anims.create({
     key: "character-walk-left",
     frames: anims.generateFrameNumbers("character", { start: 51, end: 54}), 
     frameRate: 8,
     repeat: -1,
 });

 anims.create({
     key: "character-walk-right",
     frames: anims.generateFrameNumbers("character", { start: 17, end: 20}), 
     frameRate: 8,
     repeat: -1,
 });
}