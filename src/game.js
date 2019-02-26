// import 'phaser';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0xefefef,
    // scene: [main_menu,play_game]
    scene: [play_game],
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {y:500},
            debug: false
        }
    }
};

let game = new Phaser.Game(config);

// import main_menu from './main_menu.js';
import play_game from './play_game.js';
