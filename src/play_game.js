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
		this.cameras.main.setBounds(0, 0, 1920 * 2, 600);
		this.physics.world.setBounds(0, 0, 1920 * 2, 600);

		this.finish = this.physics.add.staticGroup();
		this.finish.create(3600, 480, 'out_way');

		this.holes = this.physics.add.staticGroup();
		this.holes.create(850, 590, 'hole');
		this.holes.create(1750, 590, 'hole');
		this.holes.create(1850, 590, 'hole');

		this.platforms = this.physics.add.staticGroup();
		this.platforms.create(400, 568, 'ground');
		this.platforms.create(1300, 568, 'ground');
		this.platforms.create(2280, 568, 'ground');
		this.platforms.create(3080, 568, 'ground');
		this.platforms.create(3880, 568, 'ground');
		this.platforms.create(4580, 568, 'ground');

		this.enemys = this.physics.add.group();
		this.enemys.add(new this.Enemy(this, 400, 600), true);
		this.enemys.add(new this.Enemy(this, 1100, 1300), true);
		this.enemys.add(new this.Enemy(this, 1250, 1600), true);
		this.enemys.add(new this.Enemy(this, 3000, 3300), true);
		// this.platforms.create(700, 492, 'platform');
		// this.platforms.create(100, 400, 'platform');

		this.player = this.physics.add.image(250, 450, 'rabbit').setActive().setVelocity(0, 0);
		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);

		this.cursors = this.input.keyboard.createCursorKeys();

		this.physics.add.collider(this.player, this.platforms);
		this.physics.add.collider(this.enemys, this.platforms);
		this.physics.add.overlap(this.player, this.enemys, this.lose, null, this);

		this.physics.add.overlap(this.player, this.finish, this.win, null, this);


		this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

		this.carrot = this.add.image(-10, -10, 'carrot');
		this.input.on('pointerdown', (pointer) =>
		{
			this.carrot.x = pointer.worldX;
			this.carrot.y = pointer.worldY;
		});
		// this.carrot = this.add.image(0, 0, 'carrot').setInteractive();
		this.input.on('pointerdown', (pointer) =>
		{
			this.is_down  = true;
			this.carrot.x = pointer.worldX;
			this.carrot.y = pointer.worldY;
		});

		this.input.on('pointermove', (pointer) =>
		{
			if ( this.is_down )
			{
				this.carrot.x = pointer.worldX;
				this.carrot.y = pointer.worldY;
			}
		});

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
		this.player.y = 450;


	}

	win()
	{
		alert("you win");
		this.player.x = 250;
		this.player.y = 450;


	}

	update()
	{
		let pointer = this.input.activePointer.positionToCamera(this.cameras.main);
		if ( this.is_down )
		{
			this.carrot.x = pointer.x;
			this.carrot.y = pointer.y;
		}
		// console.log(this.input.x+":::::"+this.input.y);

		// console.log(this.player.y);
		if ( this.player.y > 560 )
		{
			console.log("lose");
			this.lose();
		}
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
		else if ( this.carrot.y + 80 < this.player.y && this.player.body.touching.down )
		{
			this.player.setVelocityY(-330);
		}
	}
}


export default play_game;
