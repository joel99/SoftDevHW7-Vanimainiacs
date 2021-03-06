var svgImage = document.getElementById("svgImage");
var width = svgImage.getAttribute("width");
var height = svgImage.getAttribute("height");

var clrBtn = document.getElementById("clearbtn");
var circBtn = document.getElementById("circbtn");
var dvdBtn = document.getElementById("dvdbtn");
var stopBtn = document.getElementById("stopbtn");
//var spd = document.getElementById("spd");
var mousex, mousey;
var rid;
var imgLink = "https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Dvd-video-logo.svg/1280px-Dvd-video-logo.svg.png";
//var imgLink = "https://www.sitebuilderreport.com/assets/facebook-stock-up-08c6c9a855df26a3b13a34ac62bb75cc.jpg";


svgImage.addEventListener("mousemove", function(e) {
    mousex = e.offsetX;
    mousey = e.offsetY;
});


var clrSVG = function(){
    while (svgImage.hasChildNodes()){
	svgImage.removeChild(svgImage.lastChild);
    }
};

var addCircle = function(x,y,r){
    
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    
    c.setAttribute("cx", x);
    
    c.setAttribute("cy", y);
    
    c.setAttribute("r", r);
    
    c.setAttribute("fill", "black");

    return c;

}


var makeImg = function(x, y, h, w, link){

    var c = document.createElementNS("http://www.w3.org/2000/svg", "image");

    c.setAttribute("href", link);

    c.setAttribute("x", x);
    
    c.setAttribute("y", y);

    c.setAttribute("height", h);

    c.setAttribute("width", w);
    //c.setAttribute("preserveAspectRatio", "xMidYMid");    

    return c;
    
};

var circleAnim = function(){

    clrSVG();
    window.cancelAnimationFrame(rid);
    var r = 0;
    var x = width / 4 + Math.random() * width / 2;
    var y = height / 4 + Math.random() * height / 2;
    var dir = 1;
    var speed = 2;
    var c = addCircle(x,y,r);

    svgImage.appendChild(c);
    
    var anim = function(){

	r += dir * speed;
	c.setAttribute("r", r.toString());
	
	if (dir >= 0 &&
	    (x - r <= 0 ||
	     x + r >= width ||
	     y - r <= 0 ||
	     y + r >= height
	    )
	   ){
	    dir = -1;
	}
	else if (dir <= 0 && r <= 0){
	    dir = 1;
	    r = 0;
	}
	
	rid = window.requestAnimationFrame(anim);
	
    };
    anim();
    
};

var dvdAnim = function(){

    clrSVG();
    window.cancelAnimationFrame(rid);
    var xVel = 2;
    var yVel = 2;
    var x = width / 4 + Math.random() * width / 2;
    var y = height / 4 + Math.random() * height / 2;
    var imgW = width/6;
    var imgH = height/6;
    var speed = 2;
    var xDir = 1, yDir = 1;
    
    var c = makeImg(x, y, imgH, imgW, imgLink);
    svgImage.appendChild(c);
    
    var anim = function(){
	
	xVel = xDir * speed;
	yVel = yDir * speed;
	x += xVel * speed;
	y += yVel * speed;

	c.setAttribute("x", x.toString());
	c.setAttribute("y", y.toString());
		
	if (xVel >= 0 && x + imgW >= width){
	    xDir = -1;
	}
	if (xVel <= 0 && x <= 0){
	    xDir = 1;
	}
	if (yVel >= 0 && y + imgH >= height){
	    yDir = -1;
	}
	if (yVel <= 0 && y <= 0){
	    yDir = 1;
	}
	
	rid = window.requestAnimationFrame(anim);
	
    }
    
    anim();
    
    
};

var stopAll = function(){
    window.cancelAnimationFrame(rid);
};

circBtn.addEventListener("click", circleAnim);
stopBtn.addEventListener("click", stopAll);
dvdBtn.addEventListener("click", dvdAnim);
clrBtn.addEventListener("click", clrSVG);
