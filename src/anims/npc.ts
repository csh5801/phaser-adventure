import Phaser from "phaser";

export function createNpcAnims(anims: Phaser.Animations.AnimationManager) { 

anims.create({
    key: "npc-idle-down",
    frames: anims.generateFrameNumbers("npc", { start: 0, end: 0}), 
 });

 anims.create({
     key: "npc-idle-up",
     frames: anims.generateFrameNumbers("npc", { start: 8, end: 8}), 
  });

  anims.create({
     key: "npc-idle-left",
     frames: anims.generateFrameNumbers("npc", { start: 12, end: 12}), 
  });

  anims.create({
     key: "npc-idle-right",
     frames: anims.generateFrameNumbers("npc", { start: 4, end: 4}), 
  });

  
  anims.create({
     key: "npc-walk-down",
     frames: anims.generateFrameNumbers("npc", { start: 0, end: 3}), 
     frameRate: 8,
     repeat: -1,
 });

anims.create({
     key: "npc-walk-up",
     frames: anims.generateFrameNumbers("npc", { start: 8, end: 11}), 
     frameRate: 8,
     repeat: -1,
 });

 anims.create({
     key: "npc-walk-left",
     frames: anims.generateFrameNumbers("npc", { start: 12, end: 15}), 
     frameRate: 8,
     repeat: -1,
 });

 anims.create({
     key: "npc-walk-right",
     frames: anims.generateFrameNumbers("npc", { start: 4, end: 7}), 
     frameRate: 8,
     repeat: -1,
 });
}