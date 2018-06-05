(function(){
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var levelCols = 15;
	var levelRows = 13;
	var tileSize = 64;
	var playerCol = 2;
	var playerRow = 2;
	
	
	
	var level = [
		[8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
		[8, 8, 8, 8, 2, 5, 5, 5, 5, 5, 5, 5, 4, 8, 8],
		[8, 8, 8, 8, 6, 9, 9, 9, 9, 9, 9, 9, 6, 8, 8],
		[8, 8, 2, 5, 3, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8],
		[8, 8, 6, 9,11, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8],
		[8, 8, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8],
		[8, 8, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8],
		[8, 8, 1, 5, 4, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8],
		[8, 8,10, 9, 6, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8],
		[8, 8, 8, 8, 1, 5, 5, 7, 5, 5, 5, 5, 3, 8, 8],
		[8, 8, 8, 8,10, 9,11, 7,10, 9, 9, 9,11, 8, 8],
		[8, 8, 8, 8, 8, 8, 8, 7, 8, 8, 8, 8, 8, 8, 8],
		[7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
	];
	
	var tileGraphics = [];
	
	var playerXPos = playerRow * tileSize; //unused currently
	var playerXPos = playerCol *= tileSize;
	
	/*
		0 = wood floor
		1 = bottom left corner
		2 = top left corner
		3 = bottom right corner
		4 = top right corner
		5 = horizontal wall
		6 = vertical wall
		7 = "sidewalk"
		8 = grass
		9 = wall horizontal
		10 = wall end left
		11 = wall end right
	*/
	
	var tileGraphicsToLoad = [/*0*/"images/woodFloorTest.png",/*1*/"images/bottomLeftTestCorner.png",
	/*2*/"images/topLeftTestCorner.png", /*3*/"images/bottomRightTestCorner.png",
	/*4*/"images/topRightTestCorner.png",/*5*/"images/horizontalTestWall.png",
	/*6*/"images/verticalTestWall.png",/*7*/"images/sidewalkTest.png",/*8*/"images/grassTest.png",
	/*9*/"images/wallTest.png",/*10*/"images/wallEndLeftTest.png",/*11*/"images/wallEndRightTest.png"],
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
	}
})();