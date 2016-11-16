//This is where things like movement and shooting is controlled
//No idea if this works

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    //Load background (Need image)
    game.load.image('sky', 'level_assets/temp_sky.png');
    //Load ground and platforms (Need image)
    game.load.image('ground', 'level_assets/temp_ground.png');
    //Load enemy (Need spritesheet)
    //game.load.spritesheet();
    //Load hero (Need spritesheet)
    game.load.spritesheet('hero', 'level_assets/temp_hero.png', 32, 48);
}

function create() {
    game.add.sprite(0, 0, 'hero');
}

function update() {
}