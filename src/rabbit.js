export function rabbit_update(define)
{
	if ( define.carrot.x === -10 )
	{
		define.is_move = false;
		define.rabbit.setVelocityX(0);
	}
	else if ( define.carrot.x - 45 > define.rabbit.x )
	{
		define.is_move = true;
		define.rabbit.setVelocityX(250);

		// define.rabbit.anims.play('left', true);
	}
	else if ( define.carrot.x + 45 < define.rabbit.x )
	{
		define.is_move = true;
		define.rabbit.setVelocityX(-240);

		// define.rabbit.anims.play('right', true);
	}


	// console.log(define.fly_time);
	// Fly
	if ( define.carrot.y === -10 )
	{
		// define.rabbit.setVelocityY(0);
	}
	// else if ( define.carrot.y + (define.game.config.height * 40 / 100) < define.rabbit.y )
	else if ( define.carrot.y < (define.game.config.height * 32 / 100) && define.fly_time > 0 )
	{
		if ( define.rabbit.body.touching.down )
		{
			if ( define.fly_time > 0 && !define.is_fly )
			{
				define.is_fly = true;
				define.fly_time -= 3;
			}
			define.rabbit.setVelocityY(-330);
		}
		if ( define.is_move && define.is_fly )
		{
			define.fly_time -= 1;
			if ( define.rabbit.y < (define.game.config.height / 2) )
			{
				// console.log("more than ")
				define.rabbit.setVelocityY(-50);
			}
		}

	}

}


