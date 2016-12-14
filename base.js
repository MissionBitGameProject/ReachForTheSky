
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, });

function preload() {

    game.load.image('background','cloud background2.v4.png');
    game.load.image('player', 'pajama boy2.png');
    game.load.image('bullet', 'pillow bullets.png');
    game.load.spritesheet('boss', 'bossenemy.png', 87, 87, 2);
    game.load.spritesheet('explosion', 'betterexplosion3.png', 96, 96, 24);
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

var tryagaintext;

var initBossQuantity = 10;
var BossSpeed = 50;

var faster;

var playerSpeedx = 5;
var playerSpeedy = 3;

var explodeOffsetx = 26;
var explodeOffsety = 36;

var difficultyHard;
var difficultyEasy;

var easy = {
    speedIncrease: 50,
    enemyThreshold: 15
};
var hard = {
    speedIncrease: 100,
    enemyThreshold: 5
};
var difficulty = easy;

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
        player.body.position.y += -playerSpeedy;
    }
    else if (cursors.down.isDown)
    {
        player.body.position.y += playerSpeedy;
    }

    if (cursors.left.isDown)
    {
        player.body.position.x += -playerSpeedx;
    }
    else if (cursors.right.isDown)
    {
        player.body.position.x += playerSpeedx;
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
    
    var sprite = game.add.sprite(player.position.x + explodeOffsetx, player.position.y + explodeOffsety, 'explosion');
    sprite.anchor.setTo(0.5, 0.5);

    sprite.scale.setTo(2,2);
    sprite.animations.add('explode');

    sprite.animations.play('explode', 25, false);

    player.kill ();
    gameover();
}

function updateText() {

    count++;
    text.setText("Score: " + count + " ");

    if (count % difficulty.enemyThreshold == 0){
        faster();
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
        

    tryagaintext = game.add.text((game.width / 2), 400, "Click to try again", {
        font: "40px Arial",
        fill: "#000000",
        align: "center"
    });
        tryagaintext.anchor.setTo(0.5, 0.5);
        tryagaintext.inputEnabled = true;

     tryagaintext.events.onInputUp.add(function() {
         reset();
     });
    
        difficultyEasy = game.add.text(100, 500, "Easy mode", {
        font: "40px Arial",
        fill: "#000000",
        align: "center"
    });
        difficultyEasy.inputEnabled = true;

     difficultyEasy.events.onInputUp.add(function() {
            difficulty = easy;
         reset();         

     });

            difficultyHard = game.add.text(500, 500, "Hard mode", {
        font: "40px Arial",
        fill: "#000000",
        align: "center"
    });
        difficultyHard.inputEnabled = true;

     difficultyHard.events.onInputUp.add(function() {
        difficulty = hard;
     reset() ;
     });
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
    BossSpeed += difficulty.speedIncrease;
}

function reset(){
    isGameOver = false;
    totalCount = 0;
    count = 0;
    BossSpeed = 50;

    game.state.restart();

}