addons.register({
    init: function(events) {
        this.uiContainer = $('.ui-container');
        this.uiCoordinates = $('<div id = "coordinate" class="addon-uiCoordinate"></div>')
            .appendTo(this.uiContainer);
        
        this.uiCoordinates.css({
            'position': "absolute",
            'left': (this.uiContainer[0].clientWidth / 2),
            'top': (this.uiContainer[0].clientHeight / 2) ,
            'background-color': "#3c3f4c",
            'border': "4px solid #505360",
        });
		
        this.uiCoordinates.css("display", "none");
        //events.on('onGetMap', this.onGetMap.bind(this));
        //events.on('onKeyDown', this.onKeyDown.bind(this));
        events.on('onGetObject', this.onGetObject.bind(this));
    },
   /*onGetMap: function(mapData) {
        if (!mapData.collisionMap) {
            return;   
        }
            
        this.collisionMap = mapData.collisionMap;
    },*/
    /*onKeyDown: function(key) {
        if (!key) {
            return;
        } else if (key == "tab") {
            this.toggleMap();
        } else if (key == "13") {
            if (this.mapScale > 1) {
                this.mapScale--;
                this.drawMap();
            }
        } else if (key == "11") {
            if (this.mapScale < 11) {
                this.mapScale++;
                this.drawMap();
            }
        }
    },*/
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
    toggleMap: function() {
        if (!this.collisionMap) {
            return;
        }
        
        if (this.uiMap.css("display") == "block") {
            this.uiContainer.css('background-color', 'transparent');
			this.uiContainer.removeClass('blocking');
            this.uiMap.css("display", "none");
            return;
        } else {
            this.uiMap.css("display", "block");
        }
        
        this.uiContainer.css('background-color', 'rgba(49, 33, 54, 0.5)');
	    this.uiContainer.addClass('blocking');
        this.drawMap();
    },
    drawMap: function() {
        if (!this.collisionMap) {
            return;
        }
        
        this.uiMap[0].width = this.collisionMap[0].length * this.mapScale;
        this.uiMap[0].height = this.collisionMap.length * this.mapScale;
        
        var ctx = this.uiMap[0].getContext('2d');
        ctx.scale(this.mapScale, this.mapScale);
        ctx.clearRect(0, 0, this.uiMap[0].width, this.uiMap[0].height);
        
        for (i = 0; i < this.collisionMap.length; i++) {
            for (j = 0; j < this.collisionMap[i].length; j++) {
                if (this.collisionMap[j][i] == 1) {
                    ctx.fillStyle = "#757b92";
                } else {
                    ctx.fillStyle = "#3c3f4c";
                }
                
                ctx.fillRect(j, i, 1, 1);
            }
        }
        
        this.drawPlayer();
        
        this.uiMap.css({
            'position': "absolute",
            'left': (this.uiContainer[0].clientWidth / 2) - (this.uiMap[0].width / 2),
            'top': (this.uiContainer[0].clientHeight / 2) - (this.uiMap[0].height / 2),
            'background-color': "#3c3f4c",
            'border': "4px solid #505360",
        });
    },
  
});