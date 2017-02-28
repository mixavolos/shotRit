function createFlag(x,y,parrentDiv) {
	var flag = document.createElement("img");
	flag.setAttribute("src", "icons/flag.png");
	flag.classList.add("imgOnMapWithoutDiv");
	flag.style.left = x+"px";
	flag.style.top = (y-7)+"px";
	parrentDiv.appendChild(flag);
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