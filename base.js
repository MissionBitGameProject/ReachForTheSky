
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, });

function preload() {

    game.load.image('background','cloud background2.v4.png');
    game.load.image('player', 'pajama boy.png');
    game.load.image('bullet', 'pillow bullets.png');
    game.load.spritesheet('boss', 'octoboss ss.png', 96, 96, 2);
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
var totalCount=0;

var isGameOver;

var tryagain;
var tryagaintext;

var initBossQuantity = 10;
var BossSpeed = 50;

var faster;

function create() {
    
        game.physics.startSystem(Phaser.Physics.ARCADE);

 background = game.add.tileSprite(0, 0, 8000, 2000, 'background');
    
    game.world.setBounds(0, 0, 800, 600);

    player = game.add.sprite(400, 600, 'player');

    game.physics.enable(player, Phaser.Physics.ARCADE);
    
    BossImageWidth = game.cache.getImage('boss').width;
    BossImageHeight = game.cache.getImage('boss').height;
    
    boss_group = game.add.group();
    boss_group.enableBody = true;
    boss_group.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < initBossQuantity; i++)
    {
        addBoss();
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
        fill: "#000000",
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
        boss.reset(Math.random() * (game.world.width - BossImageWidth), Math.random() * (game.world.height - BossImageHeight - 550));
        boss.body.velocity.x = rendSpeed(BossSpeed);
        boss.body.velocity.y = Math.abs(rendSpeed(BossSpeed));
    }
}
function fireBullet () {

    if (!isGameOver && game.time.time > bulletTime)
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
    sprite.scale.setTo(2,2);
    sprite.animations.add('explode');

    sprite.animations.play('explode', 50, false);
    player.kill ();
    gameover();
}

function updateText() {

    count++;
    totalCount++;
    text.setText("Score: " + count + " ");

    if (totalCount == 10){
        faster();
        totalCount=0;
    }
}

function gameover () {
        gameovertext = game.add.text((game.width / 2), 200, "-GAME OVER-", {
        font: "65px Arial",
        fill: "#000000",
        align: "center"
    });
    isGameOver = true;
    gameovertext.anchor.setTo(0.5, 0.5);
}

function addBoss(){
        var boss = boss_group.create(Math.random() * (game.world.width - BossImageWidth), Math.random() * (game.world.height - BossImageHeight - 500), 'boss');
        boss.body.immovable = true;
        boss.animations.add('move', [0, 1], 5, true);
        boss.animations.play('move');
        boss.body.velocity.x = rendSpeed(BossSpeed);
        boss.body.velocity.y = Math.abs(rendSpeed(BossSpeed));
        boss.checkWorldBounds = true;
        boss.events.onOutOfBounds.add(resetBoss, this);
}

function rendSpeed (bossVelocity){
    var redVelocity = Math.floor (Math.random()*bossVelocity) + 1;
    redVelocity *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    return redVelocity;
}

function faster(){
    BossSpeed += 50;

}