function Map(mapNode) {
	this.ways = [];
	this.currentWay = -1;
	this.house = [];
	this.modRun = false;
	this.mapNode = mapNode;
}

Map.prototype.addWay = function(way) {
	this.ways.push(way);
	this.currentWay = this.ways.length - 1;
};

Map.prototype.start = function() {
	this.updateAllDamageOnPx(); //test
	for (var i = 0; i < this.ways.length; i++) {
		this.ways[i].runBots();
	}
};
Map.prototype.updateAllDamageOnPx = function() {
	console.log("updateAllDamageOnPx");
	for (var i = 0; i < this.ways.length; i++) {
		for (var n = 0; n < this.ways[i].points.length; n++) {
			//var tmpPoint = this.ways[i].points[n];
			for (var h = 0; h < this.house.length; h++) {
				var isPointTrue =this.house[h].isHasPoint(this.ways[i].points[n]);
				if (isPointTrue) {
					//this.ways[i].points[n].addDamage(this.house[h].damage);
					this.house[h].addZvector(n);
					this.ways[i].points[n].addHouse(this.house[h]);
				}
				//console.log(isPointTrue+" aoe");
			}
		}
	}
	console.log(this);
};

Map.prototype.addHouse = function(house) {
	console.log(house);
	this.house.push(house);

	if(this.modRun) {
		//do it
	}
};