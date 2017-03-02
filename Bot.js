function Bot(width,height,imgPath,pauseOut,hp,speed=1) {
	this.width = width;
	this.height = height;
	this.imgPath = imgPath;

	this.pauseOut = pauseOut*1000; //convert to milisecond
	this.speed = speed*1000; //convert to milisecond
	this.hp = hp;
	this.x = 0;
	this.y = 0;
	this.z_vect = 0;
}

Bot.prototype.destroy = function() {
	console.log("destroy");
};