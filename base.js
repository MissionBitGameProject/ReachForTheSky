
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, });

function preload() {

    game.load.image('background','textures/cyberglow.png');
    game.load.image('player', 'pajama boy.png');
    game.load.image('bullet', 'pillow bullets.png');
    game.load.image('boss', 'boss.gif');
    game.load.spritesheet('explosion', 'explosion17.png', 64, 64, 25);

}

var player;
var cursors;


var bullets;

var cursors;
var fireButton;

var bulletTime = 0;
var bullet;

var background;

var boss;
var boss_group;

var BossImageWidth;
var BossImageHeight;

var text;
var count;

function create() {
    
        game.physics.startSystem(Phaser.Physics.ARCADE);

 background = game.add.tileSprite(0, 0, 8000, 2000, 'background');
    
    game.world.setBounds(0, 0, 800, 600);

    player = game.add.sprite(400, 600, 'player');

    game.physics.enable(player, Phaser.Physics.ARCADE);

//    player.body.fixedRotation = true;
    
    BossImageWidth = game.cache.getImage('boss').width;
    BossImageHeight = game.cache.getImage('boss').height;
    
    boss_group = game.add.group();
    boss_group.enableBody = true;
    boss_group.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 5; i++)
    {
        var boss = boss_group.create(Math.random() * (game.world.width - BossImageWidth), Math.random() * (game.world.height - BossImageHeight - 100), 'boss');
        boss.body.immovable = true;
        
        boss.body.velocity.y = 50;
        boss.checkWorldBounds = true;
        boss.events.onOutOfBounds.add(resetBoss, this);
    }
    
    cursors = game.input.keyboard.createCursorKeys();

    //  Notice that the sprite doesn't have any momentum at all,
    //  it's all just set by the camera follow type.
    //  0.1 is the amount of linear interpolation to use.
    //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.00, 0.00);

    bullets = game.add.physicsGroup();
    bullets.createMultiple(5, 'bullet', false);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    player.body.collideWorldBounds = true;

    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    count = 0;

    text = game.add.text(100, 30, "Score: 0", {
        font: "40px Arial",
        fill: "#ffffff",
        align: "center"
    });

    text.anchor.setTo(0.5, 0.5);
}

function update() {
    
            background.tilePosition.y += 2;

    
    game.physics.arcade.overlap(bullets, boss_group, bulletHitBossHandler, null, this); 
    
    game.physics.arcade.overlap(player, boss_group, playerHitBossHandler, null, this); 
    
    if (cursors.up.isDown)
    {
        player.body.position.y += -3;
    }
    else if (cursors.down.isDown)
    {
        player.body.position.y += 3;
    }

    if (cursors.left.isDown)
    {
        player.body.position.x += -3;
    }
    else if (cursors.right.isDown)
    {
        player.body.position.x += 3;
    }
    if (fireButton.isDown)
    {
        fireBullet();
    }
    
    boss = boss_group.getFirstExists(false);
    if (boss) {
        boss.reset(Math.random() * (game.world.width - BossImageWidth), Math.random() * (game.world.height - BossImageHeight - 100));
        boss.body.velocity.y = 30;
    }
}
function fireBullet () {

    if (game.time.time > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(player.x + 6, player.y - 37);
            bullet.body.velocity.y = -600;
            bullet.angle = player.angle;
            bulletTime = game.time.time + 250;
        }
    }
    
}

function resetBoss (boss) {
    boss.kill();
}
function bulletHitBossHandler (bullet, boss){
    bullet.kill();
    boss.kill();
    updateText ();

}

function playerHitBossHandler (player, boss){
    
    var sprite = game.add.sprite(player.position.x, player.position.y, 'explosion');

    sprite.animations.add('explode');

    sprite.animations.play('explode', 50, false);
    player.kill ();
    gameover();
}

function updateText() {

    count++;

    text.setText("Score: " + count + " ");

}

function gameover () {
        text = game.add.text(game.world.centerX, game.world.centerY, "-GAME OVER-", {
        font: "65px Arial",
        fill: "#ffffff",
        align: "center"
    });

    text.anchor.setTo(0.5, 0.5);
}
