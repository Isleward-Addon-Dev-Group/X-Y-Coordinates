addons.register({
    init: function(events) {
        this.uiContainer = $('.ui-container');
        this.uiCoordinates = $('<div id = "coordinate" class="addon-uiCoordinate"></div>')
            .appendTo(this.uiContainer);
		this.uiDPS = $('<div id = "dps" class="addon-uiCoordinate"></div>')
            .appendTo(this.uiContainer);
		this.uiTotalDamage = $('<div id = "totaldmg" class="addon-uiCoordinate"></div>')
            .appendTo(this.uiContainer);
			
        this.startdpstime = new Date;
		//this.totaldamage;
		
        this.uiCoordinates.css({
            'position': "absolute",
            'left': (this.uiContainer[0].clientWidth / 4.5),
            'top':  (this.uiContainer[0].clientHeight / 32) ,
            'background-color': "#3c3f4c",
            'border': "4px solid #3c3f4c",
            'color':"white",
        });
		this.uiTotalDamage.css({
            'position': "absolute",
            'left': (this.uiContainer[0].clientWidth / 4.5),
            'top':  (this.uiContainer[0].clientHeight / 10) ,
            'background-color': "#3c3f4c",
            'border': "4px solid #3c3f4c",
            'color':"white",
        });
		this.uiDPS.css({
            'position': "absolute",
            'left': (this.uiContainer[0].clientWidth / 4.5),
            'top':  (this.uiContainer[0].clientHeight / 16),
            'background-color': "#3c3f4c",
            'border': "4px solid #3c3f4c",
            'color':"white",
        });
		
        this.uiCoordinates.css("display", "none");
		this.uiDPS.css("display", "none");
		this.uiTotalDamage.css("display", "none");
        events.on('onGetMap', this.onGetMap.bind(this));
        //events.on('onKeyDown', this.onKeyDown.bind(this));
        events.on('onGetObject', this.onGetObject.bind(this));
		events.on('onGetDamage', this.onGetDamage.bind(this));
    },
	onGetMap: function(mapData) {
        if (!mapData.collisionMap) {
            return;   
        }
        
        this.uiCoordinates.css("display", "block");
		this.uiDPS.css("display", "block");
		this.uiTotalDamage.css("display", "block");
    },
	onGetDamage: function(args) {
        if (!window.player) {
            return;
        }
        console.log("source " + args.source);
		console.log("player " + window.player.id);
		var nowTime = +new Date;
        if (args.source == window.player.id) {
			 console.log("start " + this.startdpstime);
			 var DPS = args.amount/(((Number(nowTime) - Number(this.startdpstime))/1000));
			 this.totaldamage += args.amount;
			 console.log(DPS);
			 document.getElementById('dps').textContent = "DPS = " + DPS.toFixed(2);
			 document.getElementById('totaldmg').textContent = "Total Damage = " + this.totaldamage;
			 this.startdpstime = new Date;
		}
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