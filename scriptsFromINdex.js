window.onload = function() {
	var mapDoom, mapClass, lblMapNode, lblMoney;
	lblMapNode = document.getElementById('lblHpMap');
	lblMoney = document.getElementById('lblMoney');
	mapDoom = document.getElementById('map');
	mapClass = new Map(mapDoom,100,lblMapNode,100,lblMoney);

	//var styleElem = document.head.appendChild(document.createElement("style"));
	//constHtmlNode.nodeStyleHead = styleElem;
	//styleElem.innerHTML = "#theDiv:before {background: black;}";

	constModule.parrentDiv = mapDoom;

	//Add start Point
	document.getElementById('butStartPoint').onclick = function(e) {
		this.style.backgroundColor = "red";

		function addStartPoint(e) {
			var ev = e || window.event;
			var zgladz = parseFloat(document.getElementById('textZgladzWay').value);
			var widthWay = parseFloat(document.getElementById('textWidthWay').value);

			var newWay = new Way(ev.x,ev.y,widthWay,0,zgladz);
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
		var modalHouse = document.createElement("div");
		modalHouse.id = "modalWindowHouse";

		document.body.appendChild(modalHouse);

		var propertyHouseTemplate = {
			damage:document.getElementById('textDamageHouse').value,
			speedShot:document.getElementById('textSpeedShotHouse').value,
			speedFly:document.getElementById('textSpeedFlyHouse').value,
			width:document.getElementById('textWidthHouse').value,
			height:document.getElementById('textHeightHouse').value,
			imgPath:document.getElementById('textImgPathHouse').value,
			radius:document.getElementById('textRaidusHouse').value,
			colorShot:document.getElementById('textColorShotHouse').value,
		}
		//constHtmlNode.nodeStyleHead.innerHTML = ".house:before {content: "";top: "++"px;left: "++";width: "++";height: "++";position: absolute;border: 2px solid red;}";
		var newHouseTemplate = new House(propertyHouseTemplate,-1000,-1000,constTypeShot.squer);
		newHouseTemplate.appendHouse(modalHouse);
		constHtmlNode.nodHouseCreate = newHouseTemplate;

		modalHouse.addEventListener("mousemove", evMouseMoveHouse);

		function evMouseMoveHouse(e) {
			var ev = e || window.event;
			//console.log(ev.offsetX+"  "+ev.offsetY);

			constHtmlNode.nodHouseCreate.node.style.left = ev.x + "px";
			constHtmlNode.nodHouseCreate.node.style.top = ev.y + "px";
		}

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
			if(mapClass.checkIfCreateHouse(ev.x,ev.y,propertyHouse.width,propertyHouse.height)) {
				var newHouse = new House(propertyHouse,ev.x,ev.y,constTypeShot.squer);
				newHouse.appendHouse(mapClass.mapNode);
				mapClass.addHouse(newHouse);

				this.removeEventListener("click", addHouse);
				this.removeEventListener("mousemove", evMouseMoveHouse);
				document.body.removeChild(this);
				document.getElementById('butAppendBush').style.backgroundColor = "buttonface";
			}
			//console.log(this);
		};

		//document.getElementById('map').addEventListener("click", addHouse);
		modalHouse.addEventListener("click",addHouse);
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
			constModule.timeAfterBots = parseFloat(property.timeAfter) + mapClass.ways[mapClass.currentWay].bots[lenBots-1].pauseOut/1000;
		} else {
			constModule.timeAfterBots = parseFloat(property.timeAfter);
		}
		console.log(constModule.timeAfterBots);
		for (var i = 0; i < property.count; i++) {
			//var newBot = new Bot(property.width,property.height,property.imgPath,i*property.pauseOut+constModule.timeAfterBots,property.hp,property.speed*mapClass.ways[mapClass.currentWay].lineZglaz);
			var newBot = new Bot(property.width,property.height,property.imgPath,i*property.pauseOut+constModule.timeAfterBots,property.hp,property.speed*mapClass.ways[mapClass.currentWay].lineZglaz);
			mapClass.ways[mapClass.currentWay].addBot(newBot);
			//console.log(mapClass.ways[mapClass.currentWay]);
		}
	}
	document.getElementById('butRun').onclick = function() {
		mapClass.money = parseFloat(document.getElementById('textMapMoney').value);
		document.getElementById('lblMoney').innerHTML = mapClass.money;
		//mapClass.modRun= true;
		mapClass.changeStartHp(parseFloat(document.getElementById('textMapHp').value));
		mapClass.start();
	}
	document.getElementById('butSave').onclick = function() {
		mapClass.money = parseFloat(document.getElementById('textMapMoney').value);
		//mapClass.modRun= true;
		mapClass.changeStartHp(parseFloat(document.getElementById('textMapHp').value));
		createModalSave(JSON.stringify(mapClass));
	}
	document.getElementById('butLoad').onclick = function() {
		function myFunckClose(myjson) { 
			
			var myMap = JSON.parse(myjson);
			mapClass = new Map(mapDoom,myMap.hp,lblMapNode,myMap.money,lblMoney);
			document.getElementById('textMapHp').value = myMap.hp;
			copyMap(mapClass,myMap);
		};
		createModalLoad(myFunckClose);

	}

	document.getElementById('btnByHouse').onclick = function() {

		var tmpEl = document.getElementById('slcTypeBush');
		var objCostHouses = getHouseForBy(parseInt(tmpEl.value));

		if (objCostHouses===undefined) {
			alert("Error!! objCostHouses===undefined");
			return;
		}


		if (mapClass.money<objCostHouses.cost) {
			document.getElementById('lblMoney').style.color = "red";
		} else {
			this.style.backgroundColor = "red";

			var modalHouse = document.createElement("div");
			modalHouse.id = "modalWindowHouse";

			document.body.appendChild(modalHouse);

			var propertyHouseTemplate = {
				damage:document.getElementById('textDamageHouse').value,
				speedShot:document.getElementById('textSpeedShotHouse').value,
				speedFly:document.getElementById('textSpeedFlyHouse').value,
				width:document.getElementById('textWidthHouse').value,
				height:document.getElementById('textHeightHouse').value,
				imgPath:document.getElementById('textImgPathHouse').value,
				radius:document.getElementById('textRaidusHouse').value,
				colorShot:document.getElementById('textColorShotHouse').value,
			}
			//constHtmlNode.nodeStyleHead.innerHTML = ".house:before {content: "";top: "++"px;left: "++";width: "++";height: "++";position: absolute;border: 2px solid red;}";
			var newHouseTemplate = new House(propertyHouseTemplate,-1000,-1000,constTypeShot.squer);
			newHouseTemplate.appendHouse(modalHouse);
			constHtmlNode.nodHouseCreate = newHouseTemplate;

			modalHouse.addEventListener("mousemove", evMouseMoveHouse);

			function evMouseMoveHouse(e) {
				var ev = e || window.event;
				//console.log(ev.offsetX+"  "+ev.offsetY);

				constHtmlNode.nodHouseCreate.node.style.left = ev.x + "px";
				constHtmlNode.nodHouseCreate.node.style.top = ev.y + "px";
			}

			//mapClass.money -= objCostHouses.cost;
			mapClass.changeMoney(-objCostHouses.cost);
			document.getElementById('lblMoney').innerHTML = mapClass.money;
			function addHouseBy(e) {
				var ev = e || window.event;
				var propertyHouse = {
					damage:objCostHouses.damage,
					speedShot:objCostHouses.speed,
					speedFly:document.getElementById('textSpeedFlyHouse').value,
					width:document.getElementById('textWidthHouse').value,
					height:document.getElementById('textHeightHouse').value,
					imgPath:document.getElementById('textImgPathHouse').value,
					radius:document.getElementById('textRaidusHouse').value,
					colorShot:document.getElementById('textColorShotHouse').value,
				}
				//var newHouse = new House(propertyHouse.damage,propertyHouse.speedShot,propertyHouse.width,propertyHouse.height,propertyHouse.imgPath,ev.x,ev.y,propertyHouse.radius,constTypeShot.squer,propertyHouse.colorShot);
				if(mapClass.checkIfCreateHouse(ev.x,ev.y,propertyHouse.width,propertyHouse.height)) {
					var newHouse = new House(propertyHouse,ev.x,ev.y,constTypeShot.squer);
					newHouse.appendHouse(mapClass.mapNode);
					mapClass.addHouse(newHouse);


					this.removeEventListener("click", addHouseBy);
					this.removeEventListener("mousemove", evMouseMoveHouse);
					document.body.removeChild(this);
					document.getElementById('btnByHouse').style.backgroundColor = "buttonface";
				}
				//console.log(this);
			};

			//document.getElementById('map').addEventListener("click", addHouseBy);
			modalHouse.addEventListener("click",addHouseBy);
		}
	}
}