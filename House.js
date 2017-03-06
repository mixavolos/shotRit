//function House(damage,speedShot,width,height,imgPath,startx,starty,radius,typeShot,colorShot,speedFly) {
function House(pr,startx,starty,typeShot) {
	this.damage = parseFloat(pr.damage);
	this.speedShot = parseFloat(pr.speedShot)*1000;//convert to miliseconds
	this.width = parseFloat(pr.width);
	this.height = parseFloat(pr.height);
	this.imgPath = pr.imgPath;
	this.x = startx;
	this.y = starty;
	this.radius = parseFloat(pr.radius);
	this.speedFly = parseFloat(pr.speedFly)*1000;//convert to miliseonds
	this.startZ_vect = -1;
	this.endZ_vect = -1;
	//this.checkShot = 0;
	//this.isReadyShot = true;
	this.lastShot = -1;

	this.node = document.createElement("div");
	var inpImg = document.createElement("img");
	inpImg.classList.add("imghouse");
	inpImg.setAttribute("src", this.imgPath);
	inpImg.style.width = this.width+"px";
	inpImg.style.height = this.height+"px";
	inpImg.style.left = -this.width/2 + "px";
	inpImg.style.top = -this.height/2 + "px";
	this.node.appendChild(inpImg);
	// inpImg.style.width = this.width+"px";
	// inpImg.style.height = this.height+"px";
	this.node.classList.add("house");
	//  this.node.style.width = this.width+"px";
	// this.node.style.height = this.height+"px";
	this.node.style.left = this.startx+"px";
	this.node.style.top = this.starty+"px";

	//shot view
	this.colorShot = pr.colorShot;
	this.typeShot = typeShot;
	// this.nodeShot = document.createElement("div");
	// this.nodeShot.classList.add("nodeShot");
	// switch(this.typeShot) {
	//     case constTypeShot.squer:
	//     	var querLength = ((this.width+this.height)/2)/2;
	//     	this.nodeShot.style.width = querLength>1?querLength:1 + "px";
	//     	this.nodeShot.style.height = querLength>1?querLength:1 + "px";
	//     	this.nodeShot.style.backgroundColor = this.colorShot;
	//     	this.nodeShot.style.left = this.x;
	//     	this.nodeShot.style.top = this.y;
	// 		break;
	// 	default:
	// 		console.log("Error! not typeShot");
	// }
}
House.prototype.createShotNode = function() {
	var resNode = document.createElement("div");
	resNode.classList.add("nodeShot");
	switch(this.typeShot) {
	    case constTypeShot.squer:
	    	var querLength = ((this.width+this.height)/2)/4;
	    	resNode.style.width = Math.round(querLength) + "px";
	    	resNode.style.height = Math.round(querLength) + "px";
	    	resNode.style.MozBorderRadius = Math.round(querLength)/2 + "px";
	    	resNode.style.WebkitBorderRadius = Math.round(querLength)/2 + "px";
	    	resNode.style.borderRadius = Math.round(querLength)/2 + "px";
	    	resNode.style.backgroundColor = this.colorShot;
	    	resNode.style.left = this.x;
	    	resNode.style.top = this.y;
			break;
		default:
			console.log("Error! not typeShot");
	}
	return resNode;
};
House.prototype.appendHouse = function(elementInCreate) {
	this.node.style.left = this.x+"px";
	this.node.style.top = this.y+"px";
	console.log("changedHouse x="+this.x+" y="+this.y);
	elementInCreate.appendChild(this.node);

};
House.prototype.isHasPoint = function(point) {
	var res = false;
	if (point.x<=(this.x+this.radius)&&point.x>=(this.x-this.radius)) {
		if (point.y<=(this.y+this.radius)&&point.y>=(this.y-this.radius))
		{
			res = true;
		}
	}

	return res;
};
House.prototype.shotRit = function(bot) {
	var timeNow = new Date;
	if (this.lastShot===-1||(this.lastShot!==-1&&timeNow.getTime()-this.lastShot>this.speedShot)) {
		var tmpShot = this.createShotNode();
		constModule.parrentDiv.appendChild(tmpShot);
		runShot(tmpShot,constModule.parrentDiv,this.x,this.y,bot.x,bot.y,bot,this.damage,this.speedFly);
		this.lastShot = timeNow.getTime();
		//bot.hp -= this.damage;
	}
};

function runShot(nodeShot,parrentShot,startX,startY,endX,endY,bot,damage,speedFly) {
	var vidst = Math.sqrt(Math.pow((endX-startX),2) + Math.pow((endY - startY),2));
	var stackX = (endX - startX)/vidst;
	var stackY = (endY - startY)/vidst;
	var xNode=startX+stackX;
	var yNode=startY+stackY;
	var stackVidst= 1;
	var timerShot = setInterval(function(){ 
		//console.log("xNode="+xNode);
	//console.log("yNode="+yNode);
		nodeShot.style.left = Math.round(xNode) + "px";
		nodeShot.style.top = Math.round(yNode) + "px";

		xNode += stackX;
		yNode +=stackY;
		stackVidst ++;
		if (stackVidst>vidst) {
			//bot.hp -= damage;
			bot.dangerDamage(damage);
			parrentShot.removeChild(nodeShot);
			clearInterval(timerShot);
		}
	}, speedFly);
}



House.prototype.shotRit_old2 = function(bot) {
	//console.log("House startZ_vect = "+this.startZ_vect);
	if (this.isReadyShot) {
		bot.hp -= this.damage;
		console.log("House startZ_vect = "+this.startZ_vect);
		this.isReadyShot = false;
		thisHouse = this;
		//var timerWait = setTimeout(function(){
		//console.log(thisHouse.speedShot);
		setTimeout(function(){
			thisHouse.isReadyShot = true;
		}, thisHouse.speedShot);
	}
};
House.prototype.shotRit_old = function(bot) {
	this.checkShot += 1;
	if (this.checkShot === 1) {
		bot.hp -= this.damage;
	}
	if (this.checkShot === this.speedShot)
			this.checkShot = 0;
	// if (bot.hp <= 0)
	// 	bot.destroy(constModule.parrentDiv);
};
House.prototype.addZvector = function(z) {
	if (this.startZ_vect === -1)
		this.startZ_vect = z;
	
	this.endZ_vect = z;
}