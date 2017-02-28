function Point(x,y,damage=0) {
	this.x = x;
	this.y = y;
	this.damage = damage;
};

function Way(startX,startY,damage=0) { 
	this.points = [];
	this.bots = [];
	var newPoint = new Point(startX,startY,damage); //!!! not damage
	this.points.push(newPoint);
};

Way.prototype.runBots = function() {
	for (var i = 0; i < this.bots.length; i++) {
		this.bots[i].x = this.points[0].x;
		this.bots[i].y = this.points[0].y;
		runBot(this.bots[i],this);
	}
};

function runBot(bot,way,i=0) {
	var timePause = (bot.pauseOut===-1)?bot.speed:bot.pauseOut;
	var myTimer = setTimeout(function(){
		i++;

		if((i+1)==way.points.length) {
			
			clearTimeout(myTimer);
			return;
		}
		
		bot.z_vect = i;
		bot.x = way.points[i].x;
		bot.y = way.points[i].y;

		bot.pauseOut=-1;
		console.log(bot.x);
		console.log(bot.y);
		console.log(bot.z_vect);
		console.log("next ----");
		runBot(bot,way,i);
	}, timePause);
}




Way.prototype.addPoint = function(point) {
	this.points.push(point);
};
Way.prototype.addBot = function(bot) {
	this.bots.push(bot);
};
Way.prototype.addPointsFromLine = function(lastX,lastY,lineVector) {
	var startX = this.points[this.points.length-1].x;
	var startY = this.points[this.points.length-1].y;
	// if((lastX<=startX&&lineVector==constModule.gorizontalLine)||(lastY<=startY&&lineVector==constModule.verticalLine)) {
	// 	alert("cordinates must be better!");
	// } else {
		switch(lineVector) {
		    case constModule.gorizontalLine:
		    	if(lastX<startX) {
		    		for (var i = startX - 1; i >= lastX; i--) {
						var newPoint = new Point(i,startY); //!!! not damage
						this.addPoint(newPoint);
					}
		    	} else {
			    	for (var i = startX + 1; i <= lastX; i++) {
						var newPoint = new Point(i,startY); //!!! not damage
						this.addPoint(newPoint);
					}
				}
				if(constModule.isDebug) {
					createLine(startX,startY,(lastX - startX),constModule.gorizontalLine,constModule.parrentDiv);
				}
				console.log(this);
	   			break;
		    case constModule.verticalLine:
		    	if (lastY<startY) {
		    		for (var i = startY - 1; i >= lastY; i--) {
						var newPoint = new Point(startX,i);
						//console.log(this);
						this.addPoint(newPoint);
					}
		    	} else {
			    	for (var i = startY + 1; i <= lastY; i++) {
						var newPoint = new Point(startX,i);
						//console.log(this);
						this.addPoint(newPoint);
					}
				}
				if(constModule.isDebug) {
					createLine(startX,startY,(lastY - startY),constModule.verticalLine,constModule.parrentDiv);
				}
				console.log(this);
		    	break;
		     default:
		     	console.log("not lineVector!");
		}
	// }
};