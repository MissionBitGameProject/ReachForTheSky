
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, });

function preload() {

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

var background;

function create() {
 background = game.add.tileSprite(0, 0, 8000, 2000, 'background');

    game.world.setBounds(0, 0, 800, 600);

    game.physics.startSystem(Phaser.Physics.P2JS);

    player = game.add.sprite(400, 2000, 'player');

    game.physics.p2.enable(player);

    player.body.fixedRotation = true;
   


    cursors = game.input.keyboard.createCursorKeys();

    //  Notice that the sprite doesn't have any momentum at all,
    //  it's all just set by the camera follow type.
    //  0.1 is the amount of linear interpolation to use.
    //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.00, 0.00);

    bullets = game.add.physicsGroup();
    bullets.createMultiple(32, 'bullet', false);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    player.body.collideWorldBounds = true;

    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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
            bullet.reset(player.x - 8, player.y - 37);
            bullet.body.velocity.y = -600;
            bullet.angle = player.angle;
            bulletTime = game.time.time + 200;
        }
    }

    }
    
    background.tilePosition.y += 2;
    
}