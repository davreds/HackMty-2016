var gamestate=function(game){};

        var shoot;
        var background;
        var meteorite;
        var bullets;
        var enemie1Bullet;
        var firstenemy=0;
        var menor=0;
        var mayor=0;
        var lastenemy=0;
        var livingEnemies=[];
        var btnpause;

        var score = 0;
        var scoreText;
        var highscore=0;
        var highscoreText;

        var bulletTime=0;
        var enemie1firingtime=0;


gamestate.prototype={
	preload: function(){
            //game.load.image('spaceship','assets/spaceship.png');
            game.load.image('space1','assets/space1.jpg');
            game.load.image('meteorite','assets/meteorite.png');
            game.load.spritesheet('player', 'assets/player.png',130,130,26);
            game.load.image('TitleGameOver','assets/GameOverTitle.png');
            game.load.spritesheet('btnrestar','assets/RestartBtn.png',400,100);
            game.load.spritesheet('btnstart','assets/btnStart.png',400,100);
            game.load.spritesheet('btnpause','assets/btnPause.png',92,100);
            game.load.image('bullet1','assets/bullet1.png');
            game.load.image('enemie1','assets/enemie1.png');
            game.load.image('enemies1Bullets','assets/enemie1Bullet.png');
            game.load.bitmapFont('TR2N','assets/TR2N.png','assets/TR2N.xml');
        },


        create: function(){
            game.world.setBounds(0,0,800,600);
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.physics.startSystem(Phaser.Physics.P2JS);
            background=game.add.tileSprite(0,0,game.width,game.height,'space1');
            background.autoScroll(-40,0);
            
            player = game.add.sprite(80,game.world.height/2,'player');
            player.anchor.setTo(0.5);
            player.scale.setTo(0.6);
            player.enableBody=true;
            player.animations.add('death');
            player.health=10;
            game.physics.p2.enable(player);
            player.body.collideWorldBounds=true;
            gamepad = game.input.keyboard.createCursorKeys();
            shoot = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            
            meteorites = game.add.group();
            meteorites.enableBody = true;
            meteorites.outOfBoundsKill=true;
            for(var i=0; i<5; i++){
                meteorite = meteorites.create(game.rnd.integerInRange(800,1600),game.rnd.integerInRange(56, 544),'meteorite');
                meteorite.body.velocity.x=-100;
                meteorite.health=3;
            }
            
            bullets=game.add.group();
            bullets.enableBody=true;
            bullets.physicsBodyType=Phaser.Physics.ARCADE;
            bullets.createMultiple(50, 'bullet1');
            bullets.setAll('checkWorldBounds',true);
            bullets.setAll('outOfBoundsKill',true);
            bullets.setAll('anchor.x',0.5);
            bullets.setAll('anchor.y',1);
            
            scoreText=game.add.text(16,16,'Score: 0', {font: 'TR2N', fontSize: '32px', fill: '#00ffff'});
            
            enemies1=game.add.group();
            enemies1.enableBody=true;
            enemies1.outOfBoundsKill=true;
            enemies1.physicsBodyType=Phaser.Physics.ARCADE;
            for(i=0;i<10;i++){
                enemie1=enemies1.create(game.rnd.integerInRange(2400,4000),game.rnd.integerInRange(0,522), 'enemie1');
                enemie1.health=2;
                enemie1.body.velocity.x=-100;
                enemie1.scale.setTo(.5);
            }
            /*menor=enemies1.getAt(0).body.x;
            mayor=enemies1.getAt(0).body.x;
            for(i=1;i<10;i++){
                if(menor>enemies1.getAt(i).body.x){
                    menor=enemies1.getAt(i).body.x;
                    firstenemy=i;
                }
                if(mayor<enemies1.getAt(i).body.x){
                    mayor=enemies1.getAt(i).body.x;
                    lastenemy=i;
                }
            }*/
            
            enemie1Bullets=game.add.group();
            enemie1Bullets.enableBody=true;
            enemie1Bullets.physicsBodyType=Phaser.Physics.ARCADE;
            enemie1Bullets.createMultiple(30,'enemies1Bullets');
            enemie1Bullets.setAll('outOfBoundsKill',true);
            enemie1Bullets.setAll('checkWorldBounds',true);

            btnpause=game.add.button(730,20,'btnpause',pause,this,1,0,2);
            btnpause.scale.setTo(0.5,0.5);
            game.input.onDown.add(unpause,self);

        },

        update: function(){
            game.physics.arcade.overlap(bullets, meteorites, bulletVSmeteorite, null, this);
            game.physics.arcade.overlap(bullets, enemies1, bulletVSenemies1, null, this);
            //player.body.acceleration.x=0;
            //player.body.acceleration.y=0;
            player.body.thrust(0);
            player.body.reverse(0);
            player.body.fixedRotation = true;
            if(gamepad.up.isDown){
                //player.body.acceleration.y=-300;
                player.body.moveUp(400);
                
            }
            else if(gamepad.down.isDown){
                //player.body.acceleration.y=300;
                player.body.moveDown(400);
            }
            else{
                //player.body.acceleration.y=0;
                player.body.moveUp(0);
            }  
            if(gamepad.left.isDown){
                //player.body.acceleration.x=-300;
                player.body.moveLeft(400);
            }
            else if(gamepad.right.isDown){
                //player.body.acceleration.x=300;
                player.body.moveRight(400);
            }
            else{
                //player.body.acceleration.x=0;
                player.body.moveRight(0);
            }
            
            if(shoot.isDown && player.alive==true){
                fire();
                //fireenemy();
            }
            if(enemies1.countLiving()>0 && game.time.now>enemie1firingtime){
                fireenemy();
            }

            
            game.physics.arcade.overlap(player, meteorites, playerKill, null, this);
            game.physics.arcade.overlap(player, enemies1, playerKill, null, this);
            game.physics.arcade.overlap(player, enemie1Bullets, playerKill, null, this);
        }
}










        function playerKill(player, meteorite){
            player.animations.play('death',10,false,true);
            game.time.events.add(Phaser.Timer.SECOND * 4, death, this);
            gameover=game.add.sprite(game.width/2, 60,'TitleGameOver');
            gameover.anchor.setTo(0.5,0);
            gameover.alpha=0;
            btnrestart=game.add.button(100,450,'btnrestar',Restart,this,1,0,2);
            btnrestart.scale.setTo(0.5);
            btnrestart.alpha=0;
            game.add.tween(gameover).to( { alpha: 1 }, 10000, Phaser.Easing.Linear.None, true, 500 );
            game.add.tween(btnrestart).to( { alpha: 1 }, 10000, Phaser.Easing.Linear.None, true, 500 );
            highscoreText=game.add.text(400,450,'HS: ', {font: 'TR2N', fontSize: '32px', fill: '#00ffff'});
            if(score>highscore){
                highscore=score;
            }

            highscoreText.text="High-Score: "+highscore;

        }

        function death(){
            player.kill();
        }

        function Restart(){
            game.state.start(game.state.current);
            score=0;

            //player.revive();
            //player.resetPosition();
        }

        function fire(){
            if(game.time.now>bulletTime){
                bullet=bullets.getFirstExists(false);
                if(bullet){
                    bullet.reset(player.x+40,player.y+3);
                    bullet.body.velocity.x=600;
                    bulletTime=game.time.now+100;
                }
            }
        }
        

        function bulletVSmeteorite(bullet, meteorite){
            //bullet.kill();
            //meteorite.kill();
            //score+=10;
            //scoreText.text= 'Score: '+score;
            meteorite.health-=1;
            bullet.kill();
            if(meteorite.health==0){
                meteorite.kill();
                score+=10;
                scoreText.text= 'Score: '+score;
            }
        }

        function bulletVSenemies1(bullet, enemie1){
            enemie1.health-=1;
            bullet.kill();
            if(enemie1.health==0){
                enemie1.kill();
                score+=20;
                scoreText.text='Score: '+score;
            }
        }

        function fireenemy(){
            enemie1Bullet=enemie1Bullets.getFirstExists(false);
            livingEnemies.length=0;
            enemies1.forEachAlive(function(enemie1){
                livingEnemies.push(enemie1);
            });

            if(enemie1Bullet && enemies1.countLiving()>0){
                var random = game.rnd.integerInRange(0,livingEnemies.length-1);
                var shooter=livingEnemies[random];
                enemie1Bullet.reset(shooter.body.x-20, shooter.body.y+16);
                enemie1Bullet.body.velocity.x=-300;
                enemie1firingtime=game.time.now+700;
            }

        }

        function pause(event){
            game.paused=true;
        }

        function unpause(event){
            game.paused=false;
        }