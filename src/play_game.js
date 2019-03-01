import Enemy from './Enemy';


class play_game extends Phaser.Scene
{

	constructor()
	{
		super({ key : 'play_game' });
		this.Enemy = Enemy;
	}

	preload()
	{
		this.load.image('out_way', 'assets/finish.png');
		this.load.image('carrot', 'assets/carrot.png');
		this.load.image('rabbit', 'assets/rabbit.png');
		this.load.image('enemy', 'assets/enemy.png');
		this.load.image('ground', 'assets/ground.jpg');
		this.load.image('platform', 'assets/platforms.jpg');
		this.load.image('hole', 'assets/hole.jpg');
	}

	create()
	{
		this.cameras.main.setBounds(0, 0, 1920 * 2, this.sys.game.config.height);
		this.physics.world.setBounds(0, 0, 1920 * 2, this.sys.game.config.height);

		this.finish = this.physics.add.staticGroup();
		this.finish.create(3600, this.sys.game.config.height - 150, 'out_way');

		this.holes = this.physics.add.staticGroup();
		this.holes.create(850, this.sys.game.config.height - 10, 'hole');
		this.holes.create(1750, this.sys.game.config.height - 10, 'hole');
		this.holes.create(1850, this.sys.game.config.height - 10, 'hole');

		this.platforms = this.physics.add.staticGroup();
		this.platforms.create(400, this.sys.game.config.height - 50, 'ground');
		this.platforms.create(1300, this.sys.game.config.height - 50, 'ground');
		this.platforms.create(2280, this.sys.game.config.height - 50, 'ground');
		this.platforms.create(3080, this.sys.game.config.height - 50, 'ground');
		this.platforms.create(3880, this.sys.game.config.height - 50, 'ground');
		this.platforms.create(4580, this.sys.game.config.height - 50, 'ground');

		const enemy_height = this.sys.game.config.height - 119;
		this.enemys        = this.physics.add.group({ allowGravity: false });
		this.enemys.add(new this.Enemy(this, 400, 600, enemy_height), true);
		this.enemys.add(new this.Enemy(this, 1100, 1300, enemy_height), true);
		this.enemys.add(new this.Enemy(this, 1250, 1600, enemy_height), true);
		this.enemys.add(new this.Enemy(this, 3000, 3300, enemy_height), true);
		// this.platforms.create(700, 492, 'platform');
		// this.platforms.create(100, 400, 'platform');

		this.player = this.physics.add.image(250, this.sys.game.config.height - 140, 'rabbit').setActive().setVelocity(0, 0);
		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);

		// this.cursors = this.input.keyboard.createCursorKeys();

		this.physics.add.collider(this.player, this.platforms);
		this.physics.add.collider(this.enemys, this.platforms);

		this.physics.add.overlap(this.player, this.enemys, this.lose, null, this);
		this.physics.add.overlap(this.player, this.finish, this.win, null, this);
		this.physics.add.overlap(this.player, this.holes, this.lose, null, this);


		this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

		this.carrot = this.add.image(-10, -10, 'carrot');
		// this.carrot = this.add.image(0, 0, 'carrot').setInteractive();
		this.input.on('pointerdown', (pointer) =>
		{
			this.is_down  = true;
			this.carrot.x = pointer.worldX;
			this.carrot.y = pointer.worldY + (this.carrot.height / 2);
		});

		// this.input.on('pointermove', (pointer) =>
		// {
		// 	if ( this.is_down )
		// 	{
		// 		this.carrot.x = pointer.worldX + (this.carrot.height / 2);
		// 		this.carrot.y = pointer.worldY;
		// 	}
		// });

		this.input.on('pointerup', () =>
		{
			this.is_down  = false;
			this.carrot.x = -10;
			this.carrot.y = -10;
		});
	}


	lose()
	{
		alert("ooops you lose");
		this.player.x = 250;
		this.player.y = this.sys.game.config.height - 140;


	}

	win()
	{
		alert("you win");
		this.player.x = 250;
		this.player.y = this.sys.game.config.height - 140;


	}

	update()
	{
		let pointer = this.input.activePointer.positionToCamera(this.cameras.main);
		if ( this.is_down )
		{
			this.carrot.x = pointer.x;
			this.carrot.y = pointer.y + (this.carrot.height / 2);
		}
		// console.log(this.input.x+":::::"+this.input.y);

		// console.log(this.player.y);
		// if ( this.player.y > 560 )
		// {
		// 	console.log("lose");
		// 	this.lose();
		// }
		if ( this.carrot.x === -10 )
		{
			this.player.setVelocityX(0);
		}
		else if ( this.carrot.x - 45 > this.player.x )
		{
			this.player.setVelocityX(250);

			// this.player.anims.play('left', true);
		}
		else if ( this.carrot.x + 45 < this.player.x )
		{
			this.player.setVelocityX(-240);

			// this.player.anims.play('right', true);
		}

		if ( this.carrot.y === -10 )
		{
			// this.player.setVelocityY(0);
		}
		else if ( this.carrot.y + (this.game.config.height * 20 / 100) < this.player.y && this.player.body.touching.down )
		{
			this.player.setVelocityY(-330);
		}
	}
}


export default play_game;
