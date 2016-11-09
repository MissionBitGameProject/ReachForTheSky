//Different ways to create objects and the resulting prototype chain
//Objects created with a constructor
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
//creates a TitleScreen object

//function startGame() {}   //just for "this" test function and method

var TitleScreen = {
    
    //the preload method runs first
    //it is where we load our assets
    preload : function() {
        //loads an image named 'logo' and 'start'
        game.load.image('logo', '/assets/images/mission_bit_logo.png');
        game.load.image('start', '/assets/images/start.png');
    },
    
    //the create method is run after the preload method
    //it is where we set up the basics of the game, essentially what it will look like when we start the game
    create: function () {
        // full screen
//        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//        game.scale.pageAlignHorizontally = game.scale.pageAlignVertically = true;
        //adds an image with image 'logo' at (290, 100)
        this.add.image(290, 100, 'logo');
        //adds a button with image 'start' at (200, 180) that calls the method startGame when it is clicked on
        this.add.button(200, 180, 'start', this.startGame, this);
//        console.log("start test");    //just for "this" test function and method
//        console.log(this.startGame);  //just for "this" test function and method
//        console.log(TitleScreen.startGame);   //just for "this" test function and method
//        console.log(startGame);   //just for "this" test function and method
//        console.log("end test");  //just for "this" test function and method
        //makes the background color of the whole screen periwinkle
        game.stage.backgroundColor = '#CCCFFF';
    },

    //this is a method we created and named ourselves
    //it will only run when it is told to by some other method
    startGame: function() {
//        console.log(this.state);  //just for "this" test function and method
//        console.log(TitleScreen.state);   //just for "this" test function and method
//        console.log(game.state);  //just for "this" test function and method
        //start the state 'GameScreen', as defined in the directory
        this.state.start('GameScreen');
    }
    
};