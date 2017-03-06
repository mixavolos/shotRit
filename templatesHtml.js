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
	var textarea = document.createElement("textarea");
	textarea.setAttribute("cols","100");
	textarea.setAttribute("rows","30");
	//textarea.innerHTML = jsonText;
	textarea.style.marginTop = "40px";
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
function createLine(x,y,length,lineVector,parrentDiv) {
	var line = document.createElement("div");
	line.classList.add("lineDiv");
	
	switch(lineVector) {
	    case constModule.gorizontalLine:
	    	
	    	line.style.height = constModule.boldLine + "px";
	    	line.style.width = Math.abs(length) + "px";
	    	line.style.top = y - (constModule.boldLine/2) + "px";
	    	if (length<0) {
	    		line.style.left = x + length + "px";
	    	} else {
	    		line.style.left = x + "px";
	    	}
	    	break;
	    case constModule.verticalLine:
	    	
	    	line.style.width = constModule.boldLine + "px";
	    	line.style.height = Math.abs(length) + "px";
	    	line.style.left = x - (constModule.boldLine/2) + "px";
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