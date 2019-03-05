import Enemy             from './Enemy';
import { rabbit_update } from './rabbit';


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
		this.is_down  = false;
		this.is_fly   = false;
		this.fly_time = 80;
		this.cameras.main.setBounds(0, 0, 1920 * 2, this.sys.game.config.height);
		this.physics.world.setBounds(0, 0, 1920 * 2, this.sys.game.config.height);

		this.finish = this.physics.add.staticGroup();
		this.finish.create(3600, this.sys.game.config.height - 150, 'out_way');

		this.holes = this.physics.add.staticGroup();
		this.holes.create(850, this.sys.game.config.height - 10, 'hole');
		this.holes.create(1750, this.sys.game.config.height - 10, 'hole');
		this.holes.create(1850, this.sys.game.config.height - 10, 'hole');

		this.platforms = this.physics.add.staticGroup();
		this.platforms.create(400, this.sys.game.config.height - 20, 'ground');
		this.platforms.create(1300, this.sys.game.config.height - 20, 'ground');
		this.platforms.create(2280, this.sys.game.config.height - 20, 'ground');
		this.platforms.create(3080, this.sys.game.config.height - 20, 'ground');
		this.platforms.create(3880, this.sys.game.config.height - 20, 'ground');
		this.platforms.create(4580, this.sys.game.config.height - 20, 'ground');

		const enemy_height = this.sys.game.config.height - 89;
		this.enemys        = this.physics.add.group({ allowGravity : false });
		this.enemys.add(new this.Enemy(this, 400, 600, enemy_height), true);
		this.enemys.add(new this.Enemy(this, 1100, 1300, enemy_height), true);
		this.enemys.add(new this.Enemy(this, 1250, 1600, enemy_height), true);
		this.enemys.add(new this.Enemy(this, 3000, 3300, enemy_height), true);
		// this.platforms.create(700, 492, 'platform');
		// this.platforms.create(100, 400, 'platform');

		this.rabbit = this.physics.add.image(250, this.sys.game.config.height - 140, 'rabbit').setActive().setVelocity(0, 0);
		this.rabbit.setBounce(0.2);
		this.rabbit.setCollideWorldBounds(true);

		// this.cursors = this.input.keyboard.createCursorKeys();

		this.physics.add.collider(this.rabbit, this.platforms);
		this.physics.add.collider(this.enemys, this.platforms);

		this.physics.add.overlap(this.rabbit, this.enemys, this.lose, null, this);
		this.physics.add.overlap(this.rabbit, this.finish, this.win, null, this);
		this.physics.add.overlap(this.rabbit, this.holes, this.lose, null, this);


		this.cameras.main.startFollow(this.rabbit, true, 0.05, 0.05);

		this.carrot = this.add.image(-10, -10, 'carrot');
		// this.carrot = this.add.image(0, 0, 'carrot').setInteractive();
		this.input.on('pointerdown', (pointer) =>
		{
			this.is_down  = true;
			this.carrot.x = pointer.worldX;
			this.carrot.y = pointer.worldY + (this.carrot.height / 2);
		});

		this.input.on('pointerup', () =>
		{
			this.is_down  = false;
			this.is_fly   = false;
			this.carrot.x = -10;
			this.carrot.y = -10;
		});
	}


	lose()
	{
		alert("ooops you lose");
		this.rabbit.x = 250;
		this.rabbit.y = this.sys.game.config.height - 140;
		this.is_fly   = true;

	}

	win()
	{
		alert("you win");
		this.rabbit.x = 250;
		this.rabbit.y = this.sys.game.config.height - 140;
		this.is_fly   = true;

	}

	update()
	{

		if ( !this.is_fly && this.fly_time < 80 )
		{
			this.fly_time += 1;
			// console.log("add time")
		}
		rabbit_update(this);


		let pointer = this.input.activePointer.positionToCamera(this.cameras.main);
		if ( this.is_down )
		{
			this.carrot.x = pointer.x;
			this.carrot.y = pointer.y + (this.carrot.height / 2);
		}


	}
}


export default play_game;
