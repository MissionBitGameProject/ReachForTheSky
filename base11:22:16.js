
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('background','textures/cyberglow.png');
    game.load.image('player', 'sprites/thrust_ship2.png');
    game.load.image('bullet', 'misc/bullet0.png');

}

var player;
var cursors;


var bullets;

var cursors;
var fireButton;

var bulletTime = 0;
var bullet;

function create() {
 game.add.tileSprite(0, 0, 2000, 600, 'background');

    game.world.setBounds(0, 0, 1920, 600);

    game.physics.startSystem(Phaser.Physics.P2JS);

    player = game.add.sprite(1, 300, 'player');

    game.physics.p2.enable(player);

    player.body.fixedRotation = true;
    player.angle = 90;
   


    cursors = game.input.keyboard.createCursorKeys();

    //  Notice that the sprite doesn't have any momentum at all,
    //  it's all just set by the camera follow type.
    //  0.1 is the amount of linear interpolation to use.
    //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);

    //  Listen for this signal to reset once the fade is over
    game.camera.onFadeComplete.add(resetFade, this);

    game.input.onDown.add(fade, this);
    
    
    bullets = game.add.physicsGroup();
    bullets.createMultiple(32, 'bullet', false);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    player.body.collideWorldBounds = true;

    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function fade() {

    //  You can set your own fade color and duration
    game.camera.fade(0x000000, 4000);

}

function resetFade() {

    game.camera.resetFX();

}

function update() {
    
   player.body.setZeroVelocity();

    if (cursors.up.isDown)
    {
        player.body.moveUp(300);
    }
    else if (cursors.down.isDown)
    {
        player.body.moveDown(300);
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 300;
    }
    if (fireButton.isDown)
    {
        fireBullet();
    }
    


function fireBullet () {

    if (game.time.time > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(player.x + 40, player.y - 8);
            bullet.body.velocity.x = 600;
            bullet.angle = player.angle;
            bulletTime = game.time.time + 100;
        }
    }

    }
}