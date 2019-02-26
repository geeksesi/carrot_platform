!function(t){var s={};function e(i){if(s[i])return s[i].exports;var r=s[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=s,e.d=function(t,s,i){e.o(t,s)||Object.defineProperty(t,s,{enumerable:!0,get:i})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,s){if(1&s&&(t=e(t)),8&s)return t;if(4&s&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(e.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&s&&"string"!=typeof t)for(var r in t)e.d(i,r,function(s){return t[s]}.bind(null,r));return i},e.n=function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(s,"a",s),s},e.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},e.p="/build/",e(e.s=0)}([function(t,s,e){"use strict";e.r(s);var i=Phaser.Class({Extends:Phaser.Physics.Arcade.Sprite,initialize:function(t,s,e){Phaser.Physics.Arcade.Sprite.call(this,t,s,500,"enemy"),this.from_x=s,this.to_x=e,this.way=1,this.x_place=s,this.setPosition(this.x_place,500)},preUpdate:function(){1===this.way?(this.x_place+=2.5,this.x_place>this.to_x&&(this.way=-1)):(this.x_place-=2.5,this.x_place<this.from_x&&(this.way=1)),this.setPosition(this.x_place,500)}});var r=class extends Phaser.Scene{constructor(){super({key:"play_game"}),this.Enemy=i}preload(){this.load.image("out_way","assets/carrot.png"),this.load.image("rabbit","assets/rabbit.png"),this.load.image("enemy","assets/enemy.png"),this.load.image("ground","assets/ground.jpg"),this.load.image("platform","assets/platforms.jpg"),this.load.image("hole","assets/hole.jpg")}create(){this.cameras.main.setBounds(0,0,3840,600),this.physics.world.setBounds(0,0,3840,600),this.finish=this.physics.add.staticGroup(),this.finish.create(3600,480,"out_way"),this.holes=this.physics.add.staticGroup(),this.holes.create(850,590,"hole"),this.holes.create(1750,590,"hole"),this.holes.create(1850,590,"hole"),this.platforms=this.physics.add.staticGroup(),this.platforms.create(400,568,"ground"),this.platforms.create(1300,568,"ground"),this.platforms.create(2280,568,"ground"),this.platforms.create(3080,568,"ground"),this.platforms.create(3880,568,"ground"),this.platforms.create(4580,568,"ground"),this.enemys=this.physics.add.group(),this.enemys.add(new this.Enemy(this,400,600),!0),this.enemys.add(new this.Enemy(this,1100,1300),!0),this.enemys.add(new this.Enemy(this,1250,1600),!0),this.enemys.add(new this.Enemy(this,3e3,3300),!0),this.player=this.physics.add.image(250,450,"rabbit").setActive().setVelocity(0,0),this.player.setBounce(.2),this.player.setCollideWorldBounds(!0),this.cursors=this.input.keyboard.createCursorKeys(),this.physics.add.collider(this.player,this.platforms),this.physics.add.collider(this.enemys,this.platforms),this.physics.add.overlap(this.player,this.enemys,this.lose,null,this),this.physics.add.overlap(this.player,this.finish,this.win,null,this),this.cameras.main.startFollow(this.player,!0,.05,.05)}lose(){alert("ooops you lose"),this.player.x=250,this.player.y=450}win(){alert("you win"),this.player.x=250,this.player.y=450}update(){this.player.y>560&&(console.log("lose"),this.lose()),this.cursors.left.isDown?this.player.setVelocityX(-160):this.cursors.right.isDown?this.player.setVelocityX(500):this.player.setVelocityX(0),this.cursors.up.isDown&&this.player.body.touching.down&&this.player.setVelocityY(-330)}};const a={type:Phaser.AUTO,width:800,height:600,backgroundColor:15724527,scene:[r],physics:{default:"arcade",arcade:{gravity:{y:500},debug:!1}}};new Phaser.Game(a)}]);