window.onload = function() {
	var mapDoom;
	var mapClass;

	mapDoom = document.getElementById('map');
	mapClass = new Map();

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

	document.getElementById('butCountZver').onclick = function() {
		var count = document.getElementById('textCountZver').value;
		for (var i = 0; i < count; i++) {
			var newBot = new Bot(14,14,"startup.png",i,100,1);
			mapClass.ways[mapClass.currentWay].addBot(newBot);
			console.log(mapClass.ways[mapClass.currentWay]);
		}
	}
	document.getElementById('butRun').onclick = function() {
		mapClass.start();
	}
}