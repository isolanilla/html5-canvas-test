var myGamePiece;
var myObstacle;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(20, 20, "red", 10, 10);
	myObstacle = new component(10, 200, "green", 300, 120); 
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 640;
        this.canvas.height = 480;
        this.canvas.style = "border: 2px solid #000000;" // mine
        this.canvas.style.cursor = "none"; //hide the original cursor
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y) {
	
	// Definir el componente con los parámetros
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    
    // Crear el objeto en el contexto
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    // Mover
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    
    // Colisión
    this.crashWith = function(otherobj) {
        
    	var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        
        console.log((this.x + this.width) + " == " + otherobj.x);
        console.log((this.y + this.height) + " > " + otherobj.y);
        console.log(this.y + " < " + (otherobj.y + otherobj.height));
        
        if ( ((this.x + this.width) == otherobj.x)
        		&& ( ((this.y + this.height) > otherobj.y) && (this.y < (otherobj.y + otherobj.height)) ) ) {
        	return "D";
        }
        
        if ( ((this.y + this.height) == otherobj.y)
        		&& ( ((this.x + this.width) > otherobj.x) && (this.x < (otherobj.x + otherobj.width)) ) ) {
        	alert( "A");
        }
        
        

    }
    
}

function updateGameArea() {

	 if (myGamePiece.crashWith(myObstacle) == "D") {
		myGameArea.clear();
		myGamePiece.speedX = 0;
		myGamePiece.speedY = 0;
		if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -1; }
		if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -1; }
		if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 1; }
		myObstacle.update();
		myGamePiece.newPos();
		myGamePiece.update();
	} else {
		
		myGameArea.clear();
		myGamePiece.speedX = 0;
		myGamePiece.speedY = 0;

		if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -1; }
		if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 1; }
		if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -1; }
		if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 1; }

		myObstacle.update();
		
		myGamePiece.newPos();
		myGamePiece.update();
	}
	
}