var constModule = {
	gorizontalLine: 1,
	verticalLine: 2,
	boldLine: 10,
	isDebug: true,
	parrentDiv: "",
	timeAfterBots: 0,
};
var constTypeShot = {
	squer: 1,
};
var constHtmlNode = {
	nodHouseCreate:-1,
	nodeStyleHead:-1,
};
function getHouseForBy(type) {
	var resObj;
	switch(type) {
		case constByHouse.house10dmg1xspeed:
			resObj = {
				name:"house1dmg1xspeed",
				type:1,
				cost:20,
				damage:1,
				speed:1,
			}
			break;
		case constByHouse.house10dmg2xspeed:
			resObj = {
				name:"house1dmg2xspeed",
				type:2,
				cost:40,
				damage:1,
				speed:0.5,
			}
			break;
		case constByHouse.house20dmg1xspeed:
			resObj = {
				name:"house2dmg1xspeed",
				type:3,
				cost:40,
				damage:2,
				speed:1,
			}
			break;
		default:
		     	console.log("not type by house!");
	}
	//var resArr = [house1,house2,house3];

	// var resObj = {
	// 	maxCost:0,
	// 	houses:resArr,
	// };
	// for (var i = 0; i < resArr.length; i++) {
	// 	if (resArr[i].cost>resObj.maxCost)
	// 		resObj.maxCost = resArr[i].cost;
	// }

	return resObj;
}



var constByHouse = {
	house10dmg1xspeed:1,
	house10dmg2xspeed:2,
	house20dmg1xspeed:3,
}
function byHouse(type,map) {
	var resHouse;
	var propertyHouse = {
		damage:document.getElementById('textDamageHouse').value,
		speedShot:document.getElementById('textSpeedShotHouse').value,
		speedFly:document.getElementById('textSpeedFlyHouse').value,
		width:document.getElementById('textWidthHouse').value,
		height:document.getElementById('textHeightHouse').value,
		imgPath:document.getElementById('textImgPathHouse').value,
		radius:document.getElementById('textRaidusHouse').value,
		colorShot:document.getElementById('textColorShotHouse').value,
	}
	switch(type) {
		case constByHouse.house10dmg1xspeed:
			if (map.money>=20) {
				map.money -= 20;

			}
			break;
		case constByHouse.house10dmg2xspeed:
			if (map.money>=40) {
				map.money -= 40;
				
			}
			break;
		case constByHouse.house20dmg1xspeed:
			if (map.money>=40) {
				map.money -= 40;
				
			}
			break;
		default:
		     	console.log("not type by house!");
	}
}

function copyMap(map,myMap) {
	for (var i = 0; i < myMap.ways.length; i++) {
				var lastPoint;
				//console.log(lastPoint);
				for (var n = 0; n < myMap.ways[i].points.length; n++) {
					if (n===0) {
						var newWay = new Way(myMap.ways[i].points[n].x,myMap.ways[i].points[n].y,myMap.ways[i].widthWay,myMap.ways[i].points[n].damage,myMap.ways[i].lineZglaz);
						createFlag(myMap.ways[i].points[n].x,myMap.ways[i].points[n].y,map.mapNode);
						map.addWay(newWay);
					} else {
						var newPoint = new Point(myMap.ways[i].points[n].x,myMap.ways[i].points[n].y,myMap.ways[i].points[n].damage,myMap.ways[i].points[n].povVector); //!!! not damage
						map.ways[map.currentWay].points.push(newPoint);
						//console.log("lastPoint="+lastPoint+"  povVec="+map.ways[map.currentWay].points[n].povVector)
						if(lastPoint===undefined&&map.ways[map.currentWay].points[n].povVector!==-1) 
							lastPoint = map.ways[map.currentWay].points[n];
						else if(map.ways[map.currentWay].points[n].povVector!==-1||(lastPoint!==undefined&&n===myMap.ways[i].points.length-1)) {
							//console.log("eles");
							//if(map.ways[map.currentWay].points[n].povVector===constModule.gorizontalLine) 
							if(lastPoint.povVector===constModule.gorizontalLine) 
								createLine(lastPoint.x,lastPoint.y,myMap.ways[i].widthWay,(map.ways[map.currentWay].points[n].x - lastPoint.x),constModule.gorizontalLine,constModule.parrentDiv);
							else if(lastPoint.povVector===constModule.verticalLine)
								createLine(lastPoint.x,lastPoint.y,myMap.ways[i].widthWay,(map.ways[map.currentWay].points[n].y - lastPoint.y),constModule.verticalLine,constModule.parrentDiv);

							lastPoint = map.ways[map.currentWay].points[n];
						} 
					}
				}
				for (var n = 0; n < myMap.ways[i].bots.length; n++) {
					var tmpBot = myMap.ways[i].bots[n];
					var newBot = new Bot(tmpBot.width,tmpBot.height,tmpBot.imgPath,tmpBot.pauseOut/1000,tmpBot.startHp,tmpBot.speed/1000);
					map.ways[i].addBot(newBot);
				}
			}
			for (var i = 0; i < myMap.house.length; i++) {
				var tmpHouse = myMap.house[i];
				var prHouse = {
					damage:tmpHouse.damage,
					speedShot:tmpHouse.speedShot/1000,
					speedFly:tmpHouse.speedFly/1000,
					width:tmpHouse.width,
					height:tmpHouse.height,
					imgPath:tmpHouse.imgPath,
					radius:tmpHouse.radius,
					colorShot:tmpHouse.colorShot,
				}
				var newHouse = new House(prHouse,tmpHouse.x,tmpHouse.y,tmpHouse.typeShot);
				newHouse.appendHouse(map.mapNode);
				map.addHouse(newHouse);
			}
			console.log(map);
}