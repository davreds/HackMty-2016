var menu = function (game) {};

var gamepad;
var menuGroup;
var menuButton;
var starGame;
var thankYou;
var lvlSelect;
var infinityrun;
var selectPlayer;

menu.prototype={
	preload: function(){
		game.load.spritesheet('btnMenu','assets/menu.png',100,100,5);
		game.load.image('btnStartGame','assets/btnStartGame.png');
		game.load.image('btnSelectlvl','assets/btnSelectLVL.png');
		game.load.image('btnInfinity','assets/btnInfinity.png');
		game.load.image('btnCredit','assets/btnCredit.png');
        game.load.image('btnSelectPlayer','assets/btnSelectPlayer.png');
		game.load.spritesheet('player', 'assets/player.png',130,130,26);
		game.load.image('background','assets/men.jpg');
	},
	create: function(){
		//game.world.setBounds(0,0,1920,1200);
		game.add.sprite(0,0,'background');

		player = game.add.sprite((game.world.width/2)+5,(game.world.height/2)-5,'player');
        player.anchor.setTo(0.5);
        player.scale.setTo(0.6);
        player.enableBody=true;
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds=true;

        gamepad = game.input.keyboard.createCursorKeys();

        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);

        var spacetrooper = game.add.text((game.world.width/2),(game.world.height/2)-150,'Space\nTopper',{font: 'TR2N', fontSize: '70px', fill: '#00ffff', align: "center"});
		spacetrooper.anchor.setTo(0.5);
		spacetrooper.fixedToCamera=true;
		spacetrooper.cameraOffset.setTo(400,150);
		//game.add.button(0,0,'menu',start,this);

        menuButton=game.add.button(730,70,'btnMenu',togglemenu);
        menuButton.anchor.set(0.5);
        menuButton.animations.add('open',[0,1,2,3,4],game.frameRate);
        menuButton.animations.add('close',[4,3,2,1,0],game.frameRate);
        
        menuGroup=game.add.group();
        starGame = game.add.button(400, 600, "btnStartGame", start);
        starGame.anchor.setTo(0.5);
        menuGroup.add(starGame);

        thankYou = game.add.button(600, 700, "btnCredit", function(){});
        thankYou.anchor.setTo(0.5);
        menuGroup.add(thankYou);

        lvlSelect = game.add.button((game.height)-133,600,'btnSelectlvl', function(){});
        lvlSelect.anchor.setTo(0.5);
        menuGroup.add(lvlSelect);

        infinityrun = game.add.button(400, 600, 'btnInfinity',function(){});
        infinityrun.anchor.setTo(0.5);
        menuGroup.add(infinityrun);

        selectPlayer = game.add.button(200,700,'btnSelectPlayer',function(){});
        selectPlayer.anchor.setTo(0.5);
        menuGroup.add(selectPlayer);

	},
	update: function(){
		if(gamepad.up.isDown){
            player.body.acceleration.y=-300;
        }
        else if(gamepad.down.isDown){
            player.body.acceleration.y=300;
        }
        else{
            player.body.acceleration.y=0;
        }  
        if(gamepad.left.isDown){
            player.body.acceleration.x=-300;
        }
        else if(gamepad.right.isDown){
            player.body.acceleration.x=300;
        }
        else{
            player.body.acceleration.x=0;
        }
	}
}

function start(){
	game.state.start('game');
}

function togglemenu(){
    if(menuGroup.y==0){
        menuButton.animations.play('open',30,false,false);
        var menutween=game.add.tween(menuGroup).to({y:-180},500,Phaser.Easing.Bounce.Out,true);
    }
    if(menuGroup.y==-180){
        menuButton.animations.play('close',30,false,false);
        var menutween=game.add.tween(menuGroup).to({y:0},500,Phaser.Easing.Bounce.Out,true);
    }
}