// Initialize Phaser game with screen size 650 x 480 in the gameDiv tag
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

//adds the TitleScreen object as a Phaser state to the game
game.state.add('TitleScreen', TitleScreen);

//adds the GameScreen object as a Phaser state to the game
game.state.add('GameScreen', GameScreen);

//to add more states
//game.state.add('what the state will be named', the object that the state is contained within)
game.state.add('EndScreen', EndScreen);

//begins the game at the TitleScreen state
game.state.start('TitleScreen');