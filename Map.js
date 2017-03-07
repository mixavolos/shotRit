function Map(mapNode,hp,lblHpMap,money,lblMoney) {
	this.ways = [];
	this.currentWay = -1;
	this.house = [];
	//this.modRun = false;
	this.mapNode = mapNode;
	this.isFinish = true;
	this.hp = hp;
	this.startHp = hp;
	this.lblHpMap = lblHpMap;
	this.money = money;
	this.lblMoney = lblMoney;
}
Map.prototype.changeMoney = function(money) {
	this.money += money;
	this.lblMoney.innerHTML = this.money;
	this.lblMoney.style.color = "black";
};
Map.prototype.changeStartHp = function(hp) {
	this.hp = hp;
	this.startHp = hp;
};
Map.prototype.changeHp = function(hp) {
	this.hp -= hp;
	this.lblHpMap.innerHTML = this.hp;
	//console.log(this.hp);
	var isFinish = false;
	var isLive = false;
	for (var i = 0; i < this.ways.length; i++) {
		for (var n = 0; n < this.ways[i].bots.length; n++) {
			if(!this.ways[i].bots[n].isRun)
				isFinish = true;
			if(this.ways[i].bots[n].hp>0)
				isLive = true;
		}
	}
	//console.log(this.isFinish);
	console.log(isLive);
	//if (isFinish&&this.hp<=0&&!this.isFinish) {
	if (this.hp<=0&&!this.isFinish) {
		this.isFinish = true;
		alert("You Lose!!!");
		for (var i = 0; i < this.ways.length; i++) {
			for (var n = 0; n < this.ways[i].bots.length; n++) {
				//if (this.ways[i].bots[n].hp>0)
					//this.ways[i].bots[n].destroy(this.mapNode);
				if (this.ways[i].bots[n].hp>0) {
					this.ways[i].bots[n].destroy(constModule.parrentDiv);
					clearTimeout(this.ways[i].bots[n].myTimer);
				}
				//if (true) {}
				//this.ways[i].bots[n].hp = 0;
			}
		}
	} else if (!isLive&&!this.isFinish) {
		this.isFinish = true;
		alert("You Win!!!");
	}
};
Map.prototype.addWay = function(way) {
	this.ways.push(way);
	this.currentWay = this.ways.length - 1;
};

Map.prototype.start = function() {
	this.isFinish = false;
	this.lblHpMap.innerHTML = this.hp;
	this.updateAllDamageOnPx(); //test
	for (var i = 0; i < this.ways.length; i++) {
		this.ways[i].runBots(this);
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
	var numberHouse = this.house.length-1

	if(!this.isFinish) {
		for (var i = 0; i < this.ways.length; i++) {
			for (var n = 0; n < this.ways[i].points.length; n++) {
				var isPointTrue =this.house[numberHouse].isHasPoint(this.ways[i].points[n]);
				if (isPointTrue) {
					
					this.house[numberHouse].addZvector(n);
					this.ways[i].points[n].addHouse(this.house[numberHouse]);
				}
			}
		}
	}
};