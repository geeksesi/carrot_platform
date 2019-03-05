// import 'phaser';

const config = {
	type            : Phaser.CANVAS,
	width           : window.innerWidth,
	height          : window.innerHeight,
	backgroundColor : 0xefefef,

	// scene: [main_menu,play_game]
	scene   : [play_game],
	physics : {
		default : 'arcade',
		arcade  : {
			gravity : { y : 500 },
			debug   : true,
		},
	},
};


let game = new Phaser.Game(config);
// game.stage.scale.startFullScreen();
// game.scale.scaleMode             = Phaser.ScaleManager.SHOW_ALL;
// game.scale.pageAlignHorizontally = true;
// game.scale.pageAlignVertically   = true;

// import main_menu from './main_menu.js';
import play_game from './play_game.js';


function resize()
{
	let canvas = document.querySelector("canvas");
	let width  = window.innerWidth;
	let height = window.innerHeight;
	let wratio = width / height;
	let ratio  = config.width / config.height;
	if ( wratio < ratio )
	{
		canvas.style.width  = width + "px";
		canvas.style.height = (width / ratio) + "px";
	}
	else
	{
		canvas.style.width  = (height * ratio) + "px";
		canvas.style.height = height + "px";
	}
}


window.onload = () =>
{
	resize();
	window.addEventListener("resize", resize, false);
};
