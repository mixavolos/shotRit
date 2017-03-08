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
Map.prototype.checkIfCreateHouse = function(x,y,width,height) {
	var isCanCreate = true;
	//console.log(this);
	for (var i = 0; i < this.ways.length; i++) {
		console.log("i"+i);
		for (var n = 0; n < this.ways[i].points.length; n++) {
			//console.log("n"+n);
			if (n !== 0) {

				var tmpPxY ;
				var tmpPxX ;
				for (var m = 0; m <= this.ways[i].widthWay; m++) {

					if (this.ways[i].points[n].x > this.ways[i].points[n-1].x) {
						tmpPxY = this.ways[i].points[n].y - this.ways[i].widthWay/2 + m;
						tmpPxX = this.ways[i].points[n].x;
					} else if (this.ways[i].points[n].y > this.ways[i].points[n-1].y) {
						tmpPxX = this.ways[i].points[n].x - this.ways[i].widthWay/2 + m;
						tmpPxY = this.ways[i].points[n].y;
					}

					if((tmpPxX>(x-width/2)&&tmpPxX<(x+width/2))&&(tmpPxY>(y-height/2)&&tmpPxY<(y+height/2))) {
						//console.log("yeep! ttrue");
						isCanCreate = false;
					}
				}
			}


			// var tmpPoint = this.ways[i].points[n];
			// var lineUpX = ((((tmpPoint.y-this.ways[i].widthWay/2)-tmpPoint.y)*(x - tmpPoint.x))/(y - tmpPoint.y)) + tmpPoint.x;
			// var lineDownX = ((((tmpPoint.y+this.ways[i].widthWay/2)-tmpPoint.y)*(x - tmpPoint.x))/(y - tmpPoint.y)) + tmpPoint.x;
			// //var lineY = ((((tmpPoint.x-this.ways[i].widthWay/2)-tmpPoint.x)*(y - tmpPoint.y))/(x - tmpPoint.x)) + tmpPoint.y;
			// var lineY = tmpPoint.y;
			// if (y<tmpPoint.y&&lineUpX>(tmpPoint.x - this.ways[i].widthWay/2)&&lineUpX<(tmpPoint.x + this.ways[i].widthWay/2)) {
			// 	console.log("true this true");
			// } else if (y>tmpPoint.y&&lineUpX>(tmpPoint.x - this.ways[i].widthWay/2)&&lineUpX<(tmpPoint.x + this.ways[i].widthWay/2)) {
			// 	console.log("true this true down");
			// } else if (x<tmpPoint.x&&lineY>(tmpPoint.y - this.ways[i].widthWay/2)&&lineUpX<(tmpPoint.x + this.ways[i].widthWay/2)) {
			// 	console.log("true this true left");
			// } else if (x>tmpPoint.x&&lineLeftY>(tmpPoint.y - this.ways[i].widthWay/2)&&lineUpX<(tmpPoint.x + this.ways[i].widthWay/2)) {
			// 	console.log("true this true right");
			// }
		}
	}

	// var p1inHouse = {x:x-width/2, y:y-height/2};
	// 	var p2inHouse = {x:x+width/2, y:y-height/2};
	// 	var p3inHouse = {x:x+width/2, y:y+height/2};
	// 	var p4inHouse = {x:x-width/2, y:y+height/2};
	var arrPointsInHouse = [{x:x-width/2, y:y-height/2},
							{x:x+width/2, y:y-height/2},
							{x:x+width/2, y:y+height/2},
							{x:x-width/2, y:y+height/2}];
	for (var i = 0; i < this.house.length; i++) {
		//console.log("house"+i);
		var breaktmp = false;
		var tmphouse = this.house[i];
		var arrPointsThisHouse=[{x:tmphouse.x-tmphouse.width/2, y:tmphouse.y-tmphouse.height/2},
								{x:tmphouse.x+tmphouse.width/2, y:tmphouse.y-tmphouse.height/2},
								{x:tmphouse.x+tmphouse.width/2, y:tmphouse.y+tmphouse.height/2},
								{x:tmphouse.x-tmphouse.width/2, y:tmphouse.y+tmphouse.height/2}];
		for (var n = 0; n < arrPointsInHouse.length; n++) {

			var tmpIsHasInHouse = isHasPointHouse(arrPointsInHouse[n].x,arrPointsInHouse[n].y,tmphouse.x,tmphouse.y,tmphouse.height,tmphouse.width);

			var tmpIsHasHouse = isHasPointHouse(arrPointsThisHouse[n].x,arrPointsThisHouse[n].y,x,y,height,width);
			//console.log("tmpIsHasHouse="+tmpi+" tmpIsHasInHouse");
			if (tmpIsHasHouse||tmpIsHasInHouse) {
				//console.log("tmpIsHasHouse||tmpIsHasInHouse true!");
				isCanCreate = false;
				breaktmp = true;
				break;
			}
		}
		if (breaktmp)
			break;
	}

	return isCanCreate;
};
function isHasPointHouse(inx,iny,hx,hy,hheight,hwidth) {
	var resIsHas = false;
	if (((inx>=(hx-hwidth/2)&&inx<=(hx+hwidth/2)))&&(iny>=(hy-hheight/2)&&iny<=(hy+hheight/2))) {
		//console.log("resIsHas = true");
		resIsHas = true;
	}

	return resIsHas;
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