
//var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update});

var s;
var camSpeed = 4;
var platforms;
var player;

function preload() {
    game.load.image('sky', 'level_assets/background.jpg');
    //Load ground and platforms (Need image)
    game.load.image('ground', 'level_assets/temp_ground.png');
    game.load.spritesheet('hero', 'level_assets/temp_hero.png', 32, 48);
}

function create() {
game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Make our world big ...
    game.world.setBounds(0,0, 1920, 1080);

    //  Scrolling background
    //s = game.add.tileSprite(0, 0, 1920, 1080, 'stars');
    s = game.add.tileSprite(0, 0, 1920, 1080, 'sky');
    
      game.add.sprite(0, 0, 'sky');
      game.add.sprite(0, 0, 'hero');
    
    platforms = game.add.group();
    platforms.enableBody = true;
    
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    
    
    var ground2 = platforms.create(0, game.world.height - 30, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    
    
    //Creating hero sprite
    player = game.add.sprite(32, game.world.height - 150, 'hero');
    game.physics.arcade.enable(player);
    player.body.gravity.y = 400;
    
    //Walking animations
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    
    this.game.camera.follow(player);
    player.body.collideWorldBounds = true;
    
}

function update() {
  game.physics.arcade.collide(player, platforms);
    
  player.body.velocity.x = 0;
  var heroSpeed = 300;
  cursors = game.input.keyboard.createCursorKeys();
    
    //Controls movement
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = heroSpeed * -1;

        player.animations.play('left');
    }
    
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = heroSpeed;

        player.animations.play('right');
    }
    
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
}
