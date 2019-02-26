const Enemy = Phaser.Class({
	Extends : Phaser.Physics.Arcade.Sprite,

	initialize :
		function (scene, from_x, to_x)
		{
			Phaser.Physics.Arcade.Sprite.call(this, scene, from_x, 500, 'enemy');
			this.from_x  = from_x;
			this.to_x    = to_x;
			this.way     = 1;
			this.x_place = from_x;
			this.setPosition(this.x_place, 500);

		},

	preUpdate :
		function ()
		{
			if ( this.way === 1 )
			{
				this.x_place += 2.5;
				if ( this.x_place > this.to_x )
				{
					this.way = -1;
				}
			}
			else
			{
				this.x_place -= 2.5;
				if ( this.x_place < this.from_x )
				{
					this.way = 1;
				}
			}
			// console.log("hello");
			this.setPosition(this.x_place, 500);
		},

});
export default Enemy;
