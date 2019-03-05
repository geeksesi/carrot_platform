export function rabbit_update(define)
{
	if ( define.carrot.x === -10 )
	{
		define.rabbit.setVelocityX(0);
	}
	else if ( define.carrot.x - 45 > define.rabbit.x )
	{
		define.rabbit.setVelocityX(250);

		// define.rabbit.anims.play('left', true);
	}
	else if ( define.carrot.x + 45 < define.rabbit.x )
	{
		define.rabbit.setVelocityX(-240);

		// define.rabbit.anims.play('right', true);
	}



	// Fly
	if ( define.carrot.y === -10 )
	{
		// define.rabbit.setVelocityY(0);
	}
	else if ( define.carrot.y + (define.game.config.height * 32 / 100) < define.rabbit.y && define.rabbit.body.touching.down )
	{
		define.rabbit.allowGravity = false;
		define.rabbit.setVelocityY(-330);
	}
}


