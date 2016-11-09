//creates a GameScreen object
var GameScreen = {
    
    //the preload method runs first
    //it is where we load our assets
    preload : function() {
        //loads an image named 'logo'
        game.load.image('logo', '/assets/images/mission_bit_logo.png');
    },
    
    //the create method is run after the preload method
    //it is where we set up the basics of the game, essentially what it will look like when we start the game
    create: function () {
        //adds an image with image 'logo' at (290, 200)
        this.add.image(290, 200, 'logo');
        //makes the background color of the whole screen black
        game.stage.backgroundColor = '#000000';

        game.input.onDown.add(function(){
            changeState('EndScreen');
        }); 
    }
    
};

function changeState(state){
    game.state.start(state);
}