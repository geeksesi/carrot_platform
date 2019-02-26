class main_menu extends Phaser.Scene
{
	constructor()
	{
		super({ key : 'main_menu', active : true });

	}

	preload()
	{

	}

	create()
	{

		this.logo = this.add.text(120, 100, "HEllow", { fontSize : "100px", color : "#22222" });
		this.playGame_botton = this.add.text(70, 300, "Play Game :) ", {
			fontSize : "70px",
			color    : "#2f2f2f",
			height   : 500,
			width    : 500,
		});
		this.playGame_botton.setInteractive();
		this.playGame_botton.on('pointerdown', this.playGame_now, this);
	}

	update()
	{
	}

	playGame_now()
	{
		console.log("helloooo");
		this.scene.start('playGame');
	}
}


export default main_menu;
