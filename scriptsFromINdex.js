window.onload = function() {
	var mapDoom;
	var mapClass;

	mapDoom = document.getElementById('map');
	mapClass = new Map(mapDoom);

	constModule.parrentDiv = mapDoom;

	//Add start Point
	document.getElementById('butStartPoint').onclick = function(e) {
		this.style.backgroundColor = "red";

		function addStartPoint(e) {
			var ev = e || window.event;
			var newWay = new Way(ev.x,ev.y);
			createFlag(ev.x,ev.y,this);
			mapClass.addWay(newWay);
			console.log("add New Way");
			console.log(mapClass);
			this.removeEventListener("click", addStartPoint);
			document.getElementById('butStartPoint').style.backgroundColor = "buttonface";
			//console.log(this);
		};

		document.getElementById('map').addEventListener("click", addStartPoint);
	}

	//Add line gorizont
	document.getElementById('butAppendPovGor').onclick = function() {
		this.style.backgroundColor = "red";

		function addLineGorizont(e) {
			var ev = e || window.event;
			if (mapClass.currentWay === -1) {
				alert("error! current way = -1");
			}

			mapClass.ways[mapClass.currentWay].addPointsFromLine(ev.x,ev.y,constModule.gorizontalLine);
			console.log("add line");
			console.log(mapClass);

			this.removeEventListener("click", addLineGorizont);
			document.getElementById('butAppendPovGor').style.backgroundColor = "buttonface";
			//console.log(this);
		};

		document.getElementById('map').addEventListener("click", addLineGorizont);
	}

	document.getElementById('butAppendPovVert').onclick = function() {
		this.style.backgroundColor = "red";

		function addLineVertical(e) {
			var ev = e || window.event;
			if (mapClass.currentWay === -1) {
				alert("error! current way = -1");
			}

			mapClass.ways[mapClass.currentWay].addPointsFromLine(ev.x,ev.y,constModule.verticalLine);
			console.log("add line");
			console.log(mapClass);


			this.removeEventListener("click", addLineVertical);
			document.getElementById('butAppendPovVert').style.backgroundColor = "buttonface";
			//console.log(this);
		};

		document.getElementById('map').addEventListener("click", addLineVertical);
	}

	document.getElementById('butAppendBush').onclick = function() {
		this.style.backgroundColor = "red";

		function addHouse(e) {
			var ev = e || window.event;
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
			//var newHouse = new House(propertyHouse.damage,propertyHouse.speedShot,propertyHouse.width,propertyHouse.height,propertyHouse.imgPath,ev.x,ev.y,propertyHouse.radius,constTypeShot.squer,propertyHouse.colorShot);
			var newHouse = new House(propertyHouse,ev.x,ev.y,constTypeShot.squer);
			newHouse.appendHouse(mapClass.mapNode);
			mapClass.addHouse(newHouse);


			this.removeEventListener("click", addHouse);
			document.getElementById('butAppendBush').style.backgroundColor = "buttonface";
			//console.log(this);
		};

		document.getElementById('map').addEventListener("click", addHouse);
	}

	document.getElementById('butCountZver').onclick = function() {
		var property = {
			count:document.getElementById('textCountZver').value,
			hp:document.getElementById('textHpZver').value,
			speed:document.getElementById('textSpeedZver').value,
			width:document.getElementById('textWidthZver').value,
			height:document.getElementById('textHeightZver').value,
			imgPath:document.getElementById('textImgPathZver').value,
			pauseOut:document.getElementById('textPauseOutZver').value,
			timeAfter:document.getElementById('textTimeAfterZver').value,
		}

		var lenBots = mapClass.ways[mapClass.currentWay].bots.length;
		if (lenBots !== 0) {
			console.log(parseFloat(property.timeAfter));
			console.log(mapClass.ways[mapClass.currentWay].bots[lenBots-1].pauseOut/1000);
			constModule.timeAfterBots += parseFloat(property.timeAfter) + mapClass.ways[mapClass.currentWay].bots[lenBots-1].pauseOut/1000
		} else {
			constModule.timeAfterBots = parseFloat(property.timeAfter);
		}
		console.log(constModule.timeAfterBots);
		for (var i = 0; i < property.count; i++) {
			var newBot = new Bot(property.width,property.height,property.imgPath,i*property.pauseOut+constModule.timeAfterBots,property.hp,property.speed);
			mapClass.ways[mapClass.currentWay].addBot(newBot);
			//console.log(mapClass.ways[mapClass.currentWay]);
		}
	}
	document.getElementById('butRun').onclick = function() {
		mapClass.modRun= true;
		mapClass.start();
	}
	document.getElementById('butSave').onclick = function() {

		createModalSave(JSON.stringify(mapClass));
	}
	document.getElementById('butLoad').onclick = function() {
		function myFunckClose(myjson) { 
			mapClass = new Map(mapDoom);
			var myMap = JSON.parse(myjson);

			for (var i = 0; i < myMap.ways.length; i++) {
				var lastPoint;
				//console.log(lastPoint);
				for (var n = 0; n < myMap.ways[i].points.length; n++) {
					if (n===0) {
						var newWay = new Way(myMap.ways[i].points[n].x,myMap.ways[i].points[n].y,myMap.ways[i].points[n].damage);
						createFlag(myMap.ways[i].points[n].x,myMap.ways[i].points[n].y,mapDoom);
						mapClass.addWay(newWay);
					} else {
						var newPoint = new Point(myMap.ways[i].points[n].x,myMap.ways[i].points[n].y,myMap.ways[i].points[n].damage,myMap.ways[i].points[n].povVector); //!!! not damage
						mapClass.ways[mapClass.currentWay].points.push(newPoint);
						//console.log("lastPoint="+lastPoint+"  povVec="+mapClass.ways[mapClass.currentWay].points[n].povVector)
						if(lastPoint===undefined&&mapClass.ways[mapClass.currentWay].points[n].povVector!==-1) 
							lastPoint = mapClass.ways[mapClass.currentWay].points[n];
						else if(mapClass.ways[mapClass.currentWay].points[n].povVector!==-1||(lastPoint!==undefined&&n===myMap.ways[i].points.length-1)) {
							//console.log("eles");
							//if(mapClass.ways[mapClass.currentWay].points[n].povVector===constModule.gorizontalLine) 
							if(lastPoint.povVector===constModule.gorizontalLine) 
								createLine(lastPoint.x,lastPoint.y,(mapClass.ways[mapClass.currentWay].points[n].x - lastPoint.x),constModule.gorizontalLine,constModule.parrentDiv);
							else if(lastPoint.povVector===constModule.verticalLine)
								createLine(lastPoint.x,lastPoint.y,(mapClass.ways[mapClass.currentWay].points[n].y - lastPoint.y),constModule.verticalLine,constModule.parrentDiv);

							lastPoint = mapClass.ways[mapClass.currentWay].points[n];
						} 
					}
				}
			}
			console.log(mapClass);
			// mapClass.ways = myMap.ways;
			// mapClass.currentWay = myMap.currentWay;
			// mapClass.house = myMap.house;
			// mapClass.modRun = myMap.modRun;
			// mapClass.mapNode = myMap.mapNode;
			console.log(myMap);
		};
		createModalLoad(myFunckClose);

	}
}