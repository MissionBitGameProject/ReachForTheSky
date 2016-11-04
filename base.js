//This is where things like movement and shooting is controlled
//No idea if this works

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    //Load background (Need image)
    game.load.image()
    //Load ground and platforms
    game.load.image()
    //Load sprite
    game.load.image()
}

function create() {
}

function update() {
}