addons.register({
    init: function(events) {
        this.uiContainer = $('.ui-container');
        this.uiCoordinates = $('<div id = "coordinate" class="addon-uiCoordinate"></div>')
            .appendTo(this.uiContainer);
        
        this.uiCoordinates.css({
            'position': "absolute",
            'left': (this.uiContainer[0].clientWidth / 4.5),
            'top':  (this.uiContainer[0].clientHeight / 32) ,
            'background-color': "#3c3f4c",
            'border': "4px solid #3c3f4c",
            'color':"white",
        });
		
        this.uiCoordinates.css("display", "none");
        events.on('onGetMap', this.onGetMap.bind(this));
        //events.on('onKeyDown', this.onKeyDown.bind(this));
        events.on('onGetObject', this.onGetObject.bind(this));
    },
	onGetMap: function(mapData) {
        if (!mapData.collisionMap) {
            return;   
        }
            
        this.uiCoordinates.css("display", "block");
    },
    onGetObject: function(object) {
        if (!object.id) {
            return;
        }
        
        if (!window.player) {
            return;
        }
        
        if (object.id == window.player.id) {
			
            document.getElementById('coordinate').textContent = "X = " + window.player.x + " Y = " + window.player.y;
			
        }
    },
});