function Map() {
	this.ways = [];
	this.currentWay = -1;
}

Map.prototype.addWay = function(way) {
	this.ways.push(way);
	this.currentWay = this.ways.length - 1;
};

Map.prototype.start = function() {
	for (var i = 0; i < this.ways.length; i++) {
		this.ways[i].runBots();
	}
};