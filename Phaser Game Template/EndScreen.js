
var EndScreen = {
    
    preload : function() {
        
    },
    
    create: function () {
        console.log('You are in the end state');
//        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//        game.scale.pageAlignHorizontally = game.scale.pageAlignVertically = true;
        game.stage.backgroundColor = '#FFFF00';
        game.time.events.add(5000, function(){ changeState('TitleScreen') });

    }
    
};

function changeState(state){
    game.state.start(state);
}