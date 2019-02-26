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
		this.load.image('out_way', 'assets/carrot.png');
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

		// this.physics.add.overlap(this.player, this.platforms)
		// holes.create(1750, 590, 'hole');
		// this.physics.add.overlap(this.player, holes, );
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
		// console.log(this.player.y);
		if ( this.player.y > 560 )
		{
			console.log("lose");
			this.lose();
		}

		if ( this.cursors.left.isDown )
		{
			this.player.setVelocityX(-160);

			// this.player.anims.play('left', true);
		}
		else if ( this.cursors.right.isDown )
		{
			this.player.setVelocityX(500);

			// this.player.anims.play('right', true);
		}
		else
		{
			this.player.setVelocityX(0);

			// this.player.anims.play('turn');
		}

		if ( this.cursors.up.isDown && this.player.body.touching.down )
		{
			this.player.setVelocityY(-330);
		}
	}
}


export default play_game;
