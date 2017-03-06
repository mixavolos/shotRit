function Bot(width,height,imgPath,pauseOut,hp,speed=1) {
	this.width = parseFloat(width);
	this.height = parseFloat(height);
	this.imgPath = imgPath;

	this.pauseOut = parseFloat(pauseOut)*1000; //convert to milisecond
	this.isRun = false;
	this.speed = parseFloat(speed)*1000; //convert to milisecond
	this.hp = parseFloat(hp);
	this.startHp = parseFloat(hp);
	this.x = 0;
	this.y = 0;
	this.z_vect = 0;


	this.node = document.createElement("div");
	this.inpHp = document.createElement("div");
	//this.inpHp.innerHTML = this.hp; 
	this.inpHp.classList.add("inpHp");
	this.inpHp.style.width = this.width + "px";
	this.inpHp.style.top = this.y-(this.height/2)-6 + "px";
	this.inpHp.style.left = this.x-(this.width/2) + "px";
	this.paddHp = document.createElement("div");
	this.paddHp.classList.add("paddHp");
	this.inpHp.appendChild(this.paddHp);
	this.node.appendChild(this.inpHp);
	

	var inpImg = document.createElement("img");
	inpImg.classList.add("imgbot");
	inpImg.setAttribute("src", this.imgPath);
	inpImg.style.top = -(height/2) + "px";
	inpImg.style.left = -(width/2) + "px";
	inpImg.style.width = this.width+"px";
	inpImg.style.height = this.height+"px";
	this.node.appendChild(inpImg);
	// inpImg.style.width = this.width+"px";
	// inpImg.style.height = this.height+"px";

	this.node.classList.add("bot");
	//  this.node.style.width = this.width+"px";
	// this.node.style.height = this.height+"px";
	this.isNotRedBacrHp = true;
}
Bot.prototype.dangerDamage = function(damage) {
	this.hp -= damage;
	var progrr = (this.hp/this.startHp)*100;

	//this.inpHp.innerHTML = this.hp; 
	if (progrr<30&&this.isNotRedBacrHp) {
		//this.paddHp.style.backgroundColor = "rgba(251,10,10,0.5);";
		this.paddHp.classList.add("backrColRed");
		this.isNotRedBacrHp = false;
	}
	this.paddHp.style.width = (progrr*this.width)/100 + "px";
};
Bot.prototype.appendBot = function(elementInCreate) {
	this.node.style.left = this.x+"px";
	this.node.style.top = this.y+"px";
	console.log("changed x="+this.x+" y="+this.y);
	elementInCreate.appendChild(this.node);

};
Bot.prototype.refresh = function() {
	this.isRun = false;
	this.hp = this.startHp;
	this.paddHp.classList.remove("backrColRed");
	this.isNotRedBacrHp = true;
	this.paddHp.style.width = this.width + "px";
};

Bot.prototype.changed = function() {
	this.node.style.left = this.x+"px";
	this.node.style.top = this.y+"px";
	if(this.hp <= 0 ) {
		//this.destroy();
	}
};

Bot.prototype.destroy = function(parrent) {
	parrent.removeChild(this.node);
	//this.hp = this.startHp;
	console.log("destroy");
};