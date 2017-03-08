function createFlag(x,y,parrentDiv) {
	var flag = document.createElement("img");
	flag.setAttribute("src", "icons/flag.png");
	flag.classList.add("imgOnMapWithoutDiv");
	flag.style.left = x+"px";
	flag.style.top = (y-7)+"px";
	parrentDiv.appendChild(flag);
}
function createModalSave(jsonText) {
	var modal = document.createElement("div");
	//flag.setAttribute("src", "icons/flag.png");
	modal.classList.add("mymodal");
	modal.style.textAlign = "center";
	var textarea = document.createElement("textarea");
	textarea.setAttribute("cols","100");
	textarea.setAttribute("rows","30");
	textarea.innerHTML = jsonText;
	textarea.style.marginTop = "40px";
	modal.appendChild(textarea);
	var closeNode = document.createElement("img");
	closeNode.setAttribute("src","icons/close.png");
	closeNode.classList.add("imgCloseModal");

	function clickClose(e) {
		document.body.removeChild(modal);
		
		this.removeEventListener("click", clickClose);
		//console.log(this);
	};

	closeNode.addEventListener("click", clickClose);

	modal.appendChild(closeNode);
	document.body.appendChild(modal);
}

function createModalLoad(funk) {
	var modal = document.createElement("div");
	//flag.setAttribute("src", "icons/flag.png");
	modal.classList.add("mymodal");
	modal.style.textAlign = "center";

	var myul = document.createElement("ul");
	myul.classList.add("dropdown");
	var mymapsCategorys = getMapsWithCategorys();
	
	for (var i = 0; i < mymapsCategorys.length; i++) {
		var tmpLi, ulElem;
		tmpLi = document.createElement("li");
		tmpLi.classList.add("dropdown-top");
		tmpLi.innerHTML = "<label class='dropdown-top' >"+mymapsCategorys[i].category+"</label>"
		ulElem = document.createElement("ul");
		ulElem.classList.add("dropdown-inside");
		for (var n = 0; n < mymapsCategorys[i].maps.length; n++) {
			var tmpLiUl = document.createElement("li");
			tmpLiUl.innerHTML = mymapsCategorys[i].maps[n].name;
			tmpLiUl.setAttribute("data-numbermap",n);
			tmpLiUl.setAttribute("data-numbercategory",i);

			function loadMap(e) {
				//document.body.removeChild(modal);
				//funk(textarea.value);
				var myNumbermap = this.getAttribute("data-numbermap");
				var myNumbercategor = this.getAttribute("data-numbercategory");
				var mymapsCategorysLi = getMapsWithCategorys();
				textarea.value = mymapsCategorysLi[myNumbercategor].maps[myNumbermap].jsonMap;

				//this.removeEventListener("click", loadMap);
				//console.log(this);
			};

			tmpLiUl.addEventListener("click", loadMap);



			ulElem.appendChild(tmpLiUl);
		}
		tmpLi.appendChild(ulElem);
		myul.appendChild(tmpLi);
	}
	modal.appendChild(myul);

	var textarea = document.createElement("textarea");
	textarea.setAttribute("cols","100");
	textarea.setAttribute("rows","30");
	//textarea.innerHTML = jsonText;
	textarea.style.marginTop = "80px";
	modal.appendChild(textarea);
	var closeNode = document.createElement("img");
	closeNode.setAttribute("src","icons/close.png");
	closeNode.classList.add("imgCloseModal");

	function clickClose(e) {
		document.body.removeChild(modal);
		funk(textarea.value);
		this.removeEventListener("click", clickClose);
		//console.log(this);
	};

	closeNode.addEventListener("click", clickClose);
	modal.appendChild(closeNode);
	document.body.appendChild(modal);
}
function createLiForUl() {

}

function createLine(x,y,widthLine,length,lineVector,parrentDiv) {
	var line = document.createElement("div");
	line.classList.add("lineDiv");
	
	switch(lineVector) {
	    case constModule.gorizontalLine:
	    	
	    	line.style.height = widthLine + "px";
	    	line.style.width = Math.abs(length) + "px";
	    	line.style.top = y - (widthLine/2) + "px";
	    	if (length<0) {
	    		line.style.left = x + length + "px";
	    	} else {
	    		line.style.left = x + "px";
	    	}
	    	break;
	    case constModule.verticalLine:
	    	
	    	line.style.width = widthLine + "px";
	    	line.style.height = Math.abs(length) + "px";
	    	line.style.left = x - (widthLine/2) + "px";
	    	if (length<0) {
	    		line.style.top = y + length + "px";
	    	} else {
	    		line.style.top = y + "px";
	    	}
	    	break;
	     default:
	     	console.log("not lineVector!");
	}

	parrentDiv.appendChild(line);
}