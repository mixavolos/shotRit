function Point(x,y,damage=0,povVector=-1) {
	this.x = x;
	this.y = y;
	this.damage = damage;
	this.currentDamage = damage;
	this.houses = [];
	this.povVector = povVector;
};
Point.prototype.addDamage = function(damage) {
	this.damage = this.damage + damage;
	this.currentDamage = this.currentDamage + damage;
};

Point.prototype.addHouse = function(house) {
	this.houses.push(house);
};

Point.prototype.shotRits = function(bot) {
	for (var i = 0; i < this.houses.length; i++) {
		//console.log("z_vect = "+this.houses[i].startZ_vect);
		this.houses[i].shotRit(bot);
	}
};

//Way
function Way(startX,startY,damage=0,lineZglaz=1) { 
	this.points = [];
	this.bots = [];
	var newPoint = new Point(startX,startY,damage); //!!! not damage
	this.points.push(newPoint);
	this.lineZglaz = lineZglaz;
};

Way.prototype.runBots = function(map) {
	console.log("runBots");
	for (var i = 0; i < this.bots.length; i++) {
		this.bots[i].x = this.points[0].x;
		this.bots[i].y = this.points[0].y;
		this.bots[i].appendBot(constModule.parrentDiv);
		this.bots[i].refresh();
		runBot(this.bots[i],this,map);
	}
};

function runBot(bot,way,map,i=0) {
	var timePause = bot.isRun?bot.speed:bot.pauseOut;
	//console.log(way);
	//console.log(timePause);
	bot.myTimer = setTimeout(function(){
		bot.isRun = true;
		i++;

		if((i+1)===way.points.length) {
			console.log("the end -"+way);
			var hpBeforeDestroy = bot.hp;
			bot.destroy(constModule.parrentDiv);
			map.changeHp(hpBeforeDestroy); 
			//bot.destroy(constModule.parrentDiv);
			
			clearTimeout(bot.myTimer);
			return;
		}
		bot.x = way.points[i].x;
		bot.y = way.points[i].y;
		bot.changed();
		way.points[i].shotRits(bot);

		//console.log(bot.hp);
		
		if(bot.hp<=0) {
			console.log("the end hp<=0"+way);
			bot.isRun = false;
			map.changeHp(0); 
			//map.money += bot.startHp;
			map.changeMoney(bot.startHp);
			bot.destroy(constModule.parrentDiv);
			//map.checkIfFinishMap();
			clearTimeout(bot.myTimer);
			return;
		}

		//bot.pauseOut=-1;
		
		// console.log(bot.x);
		// console.log(bot.y);
		// console.log(bot.z_vect);
		// console.log("next ----");
		runBot(bot,way,map,i);
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
		    		for (var i = startX - 1; i >= lastX; i-=this.lineZglaz) {
		    			//console.log("if");
		    			var newPoint;
		    			if (i===startX-1)
		    				newPoint = new Point(i,startY,0,constModule.gorizontalLine);
		    			else
							newPoint = new Point(i,startY); //!!! not damage

						this.addPoint(newPoint);
					}
		    	} else {
			    	for (var i = startX + 1; i <= lastX; i+=this.lineZglaz) {
			    		//console.log("else");
			    		var newPoint;
			    		if (i===startX+1)
		    				newPoint = new Point(i,startY,0,constModule.gorizontalLine);
		    			else
							newPoint = new Point(i,startY); //!!! not damage
						this.addPoint(newPoint);
					}
				}
				if(constModule.isDebug) {
					createLine(startX,startY,(lastX - startX),constModule.gorizontalLine,constModule.parrentDiv);
				}
				//console.log(this);
	   			break;
		    case constModule.verticalLine:
		    	if (lastY<startY) {
		    		for (var i = startY - 1; i >= lastY; i-=this.lineZglaz) {
		    			var newPoint;
			    		if (i===startY-1)
		    				newPoint = new Point(startX,i,0,constModule.verticalLine);
		    			else
							newPoint = new Point(startX,i);
						//console.log(this);
						this.addPoint(newPoint);
					}
		    	} else {
			    	for (var i = startY + 1; i <= lastY; i+=this.lineZglaz) {
			    		var newPoint;
			    		if (i===startY+1)
		    				newPoint = new Point(startX,i,0,constModule.verticalLine);
		    			else
							newPoint = new Point(startX,i);
						//console.log(this);
						this.addPoint(newPoint);
					}
				}
				if(constModule.isDebug) {
					createLine(startX,startY,(lastY - startY),constModule.verticalLine,constModule.parrentDiv);
				}
				//console.log(this);
		    	break;
		     default:
		     	console.log("not lineVector!");
		}
	// }
};