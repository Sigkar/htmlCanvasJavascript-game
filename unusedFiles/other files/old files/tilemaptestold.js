(function(){
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var levelCols = 31;
	var levelRows = 13;
	var tileSize = 64;
	var playerCol = 8;
	var playerRow = 5;
	
	var leftPressed=false;                            // are we pressing LEFT arrow key?
	var rightPressed=false;                           // are we pressing RIGHT arrow key?
	var upPressed=false;                              // are we pressing UP arrow key?
	var downPressed=false;                            // are we pressing DOWN arrow key?
	var movementSpeed=5;                              // the speed we are going to move, in pixels per frame
	var playerXSpeed=0;                               // player horizontal speed, in pixels per frame
	var playerYSpeed=0;                               // player vertical speed, in pixels per frame
	

	
	var level = [
		[8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
		
		[8, 8, 8, 8, 2, 5, 5, 5, 5, 5, 5, 5, 4, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
		
		[8, 8, 8, 8, 6, 9, 9, 9, 9, 9, 9, 9, 6, 8, 8, 8, 8, 8, 8, 8, 2, 5, 5, 5, 5, 5, 5, 5, 5, 4, 8],
		
		[8, 8, 2, 5, 3, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 6,10, 9, 9, 9, 9, 9, 9,11, 6, 8],
		
		[8, 8, 6, 9,11, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 6, 0, 0,14, 0, 0, 0, 0, 0, 6, 8],
		
		[8, 8, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 6, 0, 0,20, 0, 0, 0, 0, 0, 6, 8],
		
		[8, 8, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 6, 0,12,19, 5, 5,13, 0, 2, 3, 8],
		
		[8, 8, 1, 5, 4, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 6,14,10, 6,10, 9,11,14, 6,11, 8],
		
		[8, 8,10, 9, 6, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 6, 0, 0, 6, 0, 0, 0, 0, 6, 8, 8],
		
		[8, 8, 8, 8, 1, 5,13, 0,12, 5, 5, 5, 3, 8, 8, 8, 8, 8, 8, 8, 1, 5, 5,18,13, 0,12, 5, 3, 8, 8],
		
		[8, 8, 8, 8,10, 9,11,14,10, 9, 9, 9,11, 8, 8, 8, 8, 8, 8, 8,10, 9, 9, 9,11,14,10, 9,11, 8, 8],
		
		[8, 8, 8, 8, 8, 8, 8, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 8, 8, 8, 8, 8],
		
		[7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
	];
	
	var tileGraphics = [];
	
	var playerYPos = playerRow * tileSize; //unused currently
	var playerXPos = playerCol * tileSize;
	/*
		0 = wood floor = clear
		1 = bottom left corner = collide
		2 = top left corner = collide
		3 = bottom right corner = collide
		4 = top right corner = collide
		5 = horizontal wall = collide
		6 = vertical wall = collide 
		7 = "sidewalk" = clear
		8 = grass = fluid
		9 = wall horizontal = collide
		10 = wall end left = collide
		11 = wall end right = collide
		12 = end cap left inside wall = collide
		13 = end cap right inside wall = collide
		14 = doortest = fluid
		15 = key right = collide
		16 = key left = collide
		17 = key down = collide
		18 = key up = collide
		19 = center key = collide
		20 = end cap up inside wall = collide
		21 = end cap down inside wall = collide
	*/
		document.addEventListener("keydown", function(e){
		console.log(e.keyCode);
		switch(e.keyCode){
			case 65:
				leftPressed=true;
				break;
			case 87:
				upPressed=true;
				break;
			case 68:
				rightPressed=true;
				break;
			case 83:
				downPressed=true;
				break;
		}
	}, false);
 
	document.addEventListener("keyup", function(e){
		switch(e.keyCode){
			case 65:
				leftPressed=false;
				break;
			case 87:
				upPressed=false;
				break;
			case 68:
				rightPressed=false;
				break;
			case 83:
				downPressed=false;
				break;
		}
	}, false);
	
	var tileGraphicsToLoad = [/*0*/"images/woodFloorTest.png",/*1*/"images/bottomLeftTestCorner.png",
	/*2*/"images/topLeftTestCorner.png", /*3*/"images/bottomRightTestCorner.png",
	/*4*/"images/topRightTestCorner.png",/*5*/"images/horizontalTestWall.png",
	/*6*/"images/verticalTestWall.png",/*7*/"images/sidewalkTest.png",/*8*/"images/grassTest.png",
	/*9*/"images/wallTest.png",/*10*/"images/wallEndLeftTest.png",/*11*/"images/wallEndRightTest.png",
	/*12*/"images/horizontalEndCapLeft.png",/*13*/"images/horizontalEndCapRight.png",/*14*/"images/doorTest.png",
	/*15*/"images/keyFacingRightTest.png",/*16*/"images/keyFacingLeftTest.png",/*17*/"images/keyFacingDownTest.png",
	/*18*/"images/keyFacingUpTest.png",/*19*/"images/keyFourSidesTest.png",/*20*/"images/verticalEndCapUp.png",
	/*21*/"images/verticalEndCapDown.png"],
    tileGraphicsLoaded = 0;

    for (var i = 0; i < tileGraphicsToLoad.length; i++) {
      tileGraphics[i] = new Image();
      tileGraphics[i].src = tileGraphicsToLoad[i];
      tileGraphics[i].onload = function() {
        // Once the image is loaded increment the loaded graphics count and check if all images are ready.
        //Will render the level once the tileGraphicsLoaded is finished, theoretically I could put up to 2147483647 images
        tileGraphicsLoaded++;
        if (tileGraphicsLoaded === tileGraphicsToLoad.length) {
            renderLevel();
        }
      }
    };
    canvas.width = tileSize * levelCols;
	canvas.height = tileSize * levelRows;
	
	function renderLevel(){
		var drawTile;
		//clear canvas
		context.clearRect(0,0, canvas.width, canvas.height);
		for (var i = 0; i < level.length; i++) {
	    	for (var j = 0; j < level[i].length; j++) {
		        drawTile = level[i][j];
		        // Draw the represented image number, at the desired X & Y coordinates followed by the graphic width and height.
		        //Draws the tiles until it ends at the level length
		        context.drawImage(tileGraphics[drawTile], j*tileSize, i*tileSize); //drawImage(image,x,y)
	    	}
		}
		// player = green box
		context.fillStyle = "#00ff00";
		context.fillRect(playerXPos,playerYPos,tileSize/1.2,tileSize/1.2);
		
	}
		// this function will do its best to make stuff work at 60FPS - please notice I said "will do its best"
	
	window.requestAnimFrame = (function(callback) {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame || window.oRequestAnimationFrame || 
		window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000/60);
		};
	})();
	
	// function to handle the game itself
	
	function updateGame() {
	
		// no friction or inertia at the moment, so at every frame initial speed is set to zero
		playerXSpeed=0;
		playerYSpeed=0;
		
		// updating speed according to key pressed
		if(rightPressed){
			playerXSpeed=movementSpeed
		}
		else{
			if(leftPressed){
				playerXSpeed=-movementSpeed;
			}
			else{
				if(upPressed){
					playerYSpeed=-movementSpeed;
				}
				else{
					if(downPressed){
						playerYSpeed=movementSpeed;
					}         
				}          
			}         
		}
		
		// updating player position
		
		playerXPos+=playerXSpeed;
		playerYPos+=playerYSpeed;
		
		// rendering level
		
		renderLevel();
		
		// update the game in about 1/60 seconds
		
		requestAnimFrame(function() {
			updateGame();
		});
	}
 
	updateGame();
	
})();