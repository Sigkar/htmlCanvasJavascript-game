(function(){
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");                         
	
	var coinImage = new Image();
	coinImage.src = "images/sprite.png";
	
	var sprite = {
		playersize:52,
		sizeDiff: 64-52,
		playerXSpeed: 0,
		playerYSpeed: 0,
		playerCol: 8,
		playerRow: 5, //should null so you can change map position based upon what map you are in
		playerXPos: 400,
		playerYPos: 300,
		movementSpeed: 3							  // the speed we are going to move, in pixels per frame
	}
	
	var level = {
		
		levelCols: 33,
		levelRows: 30,
		tileSize: 64, 
		
		tiles:	[
		[22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22],
		
		[22, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,22],
		
		[22, 8, 8, 8, 8, 2, 5, 5, 5, 5, 5, 5, 5, 4, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,22],
		
		[22, 8, 8, 8, 8, 6, 9, 9, 9, 9, 9, 9, 9, 6, 8, 8, 8, 8, 8, 8, 8, 2, 5, 5, 5, 5, 5, 5, 5, 5, 4, 8,22],
	
		[22, 8, 8, 2, 5, 3, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 6,10, 9, 9, 9, 9, 9, 9,11, 6, 8,22],
		
		[22, 8, 8, 6, 9,11, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 6, 0, 0,14, 0, 0, 0, 0, 0, 6, 8,22],
		
		[22, 8, 8, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 6, 0, 0,20, 0, 0, 0, 0, 0, 6, 8,22],
		
		[22, 8, 8, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 6, 0,12,19, 5, 5,13, 0, 2, 3, 8,22],
		
		[22, 8, 8, 1, 5, 4, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 6,14,10, 6,10, 9,11,14, 6,11, 8,22],
		
		[22, 8, 8,10, 9, 6, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 6, 0, 0, 6, 0, 0, 0, 0, 6, 8, 8,22],
		
		[22, 8, 8, 8, 8, 1, 5,13, 0,12, 5, 5, 5, 3, 8, 8, 8, 8, 8, 8, 8, 1, 5, 5,18,13, 0,12, 5, 3, 8, 8,22],
		
		[22, 8, 8, 8, 8,10, 9,11,14,10, 9, 9, 9,11, 8, 8, 8, 8, 8, 8, 8,10, 9, 9, 9,11,14,10, 9,11, 8, 8,22],
		
		[22, 8, 8, 8, 8, 8, 8, 8, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 8, 8, 8, 8, 8,22],
		
		[22, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,22],
		
		[22, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,22],
		
		[22, 8, 8, 8, 2, 5, 5, 4, 8, 8, 8, 8, 8, 8, 8, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,22],
		
		[22, 8, 8, 8, 6, 9, 9, 1, 5, 5, 5, 5,17, 5,13,14,14,12, 5, 5, 5, 5, 4, 8, 8, 8, 8, 8, 8, 8, 8, 8,22],
		
		[22, 8, 8, 8, 6, 0, 0, 9, 9, 9, 9, 9, 6, 9, 9, 0, 0, 9, 9, 9, 9, 9, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8,22],
		
		[22, 8, 8, 8, 6, 0, 0,14, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8,22],
		
		[22, 8, 8, 8, 1, 5, 5, 4, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8,22],
		
		[22, 8, 8, 8, 9, 9, 9,15,13, 0,12, 5,19, 5, 5, 5, 4, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8,22],
		
		[22, 8, 8, 8, 8, 8, 8, 6, 9,14, 9, 9, 6, 9, 9, 9, 6, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8,22],
		
		[22, 8, 8, 8, 8, 8, 8, 6, 0, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8,22],
		
		[22, 8, 8, 8, 8, 8, 8, 6, 0, 0, 0, 0, 6, 0, 0, 0,21, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8,22],
		
		[22, 8, 8, 8, 8, 8, 8, 6, 0, 0, 0, 0,21, 0, 0, 0,14, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8,22],
		
		[22, 8, 8, 8, 8, 8, 8, 6, 0, 0, 0, 0,14, 0, 0, 0,20, 0, 0, 0, 0, 0, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8,22],
		
		[22, 8, 8, 8, 8, 8, 8, 1, 5, 5, 5, 5, 5, 5, 5, 5,18, 5, 5, 5, 5, 5, 3, 8, 8, 8, 8, 8, 8, 8, 8, 8,22],
		
		[22, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 8, 8, 8, 8, 8, 8, 8, 8,22],
		
		[22, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,22],
		
		[22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22]
		],
		
		getTile: function (col, row) {
        return this.tiles[row][col];
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
		22 = Abyss
	*/
    }
	
	};
	
	var tileGraphics = [];
	
	var keysDown = {};
	window.addEventListener('keydown', function(e) {
		keysDown[e.keyCode] = true;
	});
	window.addEventListener('keyup', function(e) {
		delete keysDown[e.keyCode];
	});
	
	sprite.playerYPos = sprite.playerRow * level.tileSize+sprite.sizeDiff/2;
	sprite.playerXPos = sprite.playerCol * level.tileSize+sprite.sizeDiff/2;
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
		22 = Abyss
	*/

	var cantWalkOn = [1,2,3,4,5,6,9,10,11,12,13,15,16,17,18,19,20,21,22];
	var fluidWalkOn = [8,14];
	var normalWalkOn = [0,7];
		
	var tileGraphicsToLoad = [/*0*/"images/floorStone.png",/*1*/"images/bottomLeftCorner.png",
	/*2*/"images/topLeftCorner.png", /*3*/"images/bottomRightCorner.png",
	/*4*/"images/topRightCorner.png",/*5*/"images/horizontalWall.png",
	/*6*/"images/verticalWall.png",/*7*/"images/sidewalk.png",/*8*/"images/grass.png",
	/*9*/"images/outsideHorizontalWall.png",/*10*/"images/outsideHorizontalWall.png",/*11*/"images/outsideHorizontalWall.png",
	/*12*/"images/wallEndLeft.png",/*13*/"images/wallEndRight.png",/*14*/"images/door.png",
	/*15*/"images/keyFacingRight.png",/*16*/"images/keyFacingLeft.png",/*17*/"images/keyFacingDown.png",
	/*18*/"images/keyFacingUp.png",/*19*/"images/keyFourSides.png",/*20*/"images/verticalEndCapUp.png",
	/*21*/"images/verticalEndCapDown.png", /*22*/"abyss.png"],
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
    canvas.width = level.tileSize * level.levelCols;
	canvas.height = level.tileSize * level.levelRows;
	
	function renderLevel(){
		//all new level render to deal with the new MAP object. Mainly just level. added to vars but I cleaned up the code some as well
		for (var c = 0; c < level.levelCols; c++) {
        for (var r = 0; r < level.levelRows; r++) {
            var drawTile = level.getTile(c, r);
             context.drawImage(tileGraphics[drawTile], c*level.tileSize, r*level.tileSize); //drawImage(image,x,y)
        }
		}
		
		// player = green box
		context.fillStyle = "#00ff00";
		context.fillRect(sprite.playerXPos,sprite.playerYPos,sprite.playersize,sprite.playersize);
		
		
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
	
	
	//function for array checking :D
	Array.prototype.contains = function(obj) {
		var i = this.length;
		while (i--) {
			if (this[i] === obj) {
				return true;
			}
		}
		return false;
	}
	// function to handle the game itself
	function updateGame() {	
	
	
//Player movement and angular movement
	/*========================================================================LEFT========================================================================*/	
	if (65 in keysDown || 37 in keysDown){
		if (37 in keysDown && 38 in keysDown || 65 in keysDown && 87 in keysDown) //Left and Up
		{
			if (37 in keysDown && 38 in keysDown && 39 in keysDown || 65 in keysDown && 87 in keysDown && 68 in keysDown) //Left and Up and Right
			{
				sprite.playerYSpeed=(-sprite.movementSpeed);
			}
			else if (37 in keysDown && 38 in keysDown && 40 in keysDown || 65 in keysDown && 87 in keysDown && 83 in keysDown) //Left and Up and Down
			{
				sprite.playerXSpeed=(-sprite.movementSpeed);
			}
			else //left and up
			{
					sprite.playerXSpeed=(-sprite.movementSpeed);
					sprite.playerYSpeed=(-sprite.movementSpeed);				
			}
		}
		else if  (37 in keysDown && 39 in keysDown || 65 in keysDown && 68 in keysDown) //Left and Right
		{
			if (37 in keysDown && 39 in keysDown && 40 in keysDown || 65 in keysDown && 68 in keysDown && 83 in keysDown) //Left and Right and Down
			{
				sprite.playerYSpeed=sprite.movementSpeed;
			}
		}
		else if (37 in keysDown && 40 in keysDown || 65 in keysDown && 83 in keysDown) //Left And Down
		{
					sprite.playerXSpeed=(-sprite.movementSpeed);
					sprite.playerYSpeed=sprite.movementSpeed;
		}
		else
		{
				sprite.playerXSpeed=(-sprite.movementSpeed);
		}
	}
	/*========================================================================UP========================================================================*/
	else if (87 in keysDown || 38 in keysDown){
		if (39 in keysDown && 38 in keysDown || 68 in keysDown && 87 in keysDown) //Up and Right
		{
			if (39 in keysDown && 38 in keysDown && 40 in keysDown || 68 in keysDown && 87 in keysDown && 83 in keysDown) //Up and Right and Down
			{
				sprite.playerXSpeed=sprite.movementSpeed;
			}
			else
			{
					sprite.playerXSpeed=sprite.movementSpeed;
					sprite.playerYSpeed=(-sprite.movementSpeed);
			}
		}
		else if  (38 in keysDown && 40 in keysDown || 87 in keysDown && 83 in keysDown) //Up and Down
		{
			sprite.playerXSpeed = 0;
			sprite.playerYSpeed = 0;
		}
		else
		{
				sprite.playerYSpeed=(-sprite.movementSpeed);
		}
	}
	/*========================================================================RIGHT========================================================================*/
	else if (68 in keysDown || 39 in keysDown){
		if (39 in keysDown && 40 in keysDown || 83 in keysDown && 68 in keysDown) //Right and Down
		{
				sprite.playerXSpeed=sprite.movementSpeed;
				sprite.playerYSpeed=sprite.movementSpeed;
		}
		else
		{
				sprite.playerXSpeed=sprite.movementSpeed;
		}
	}
	/*========================================================================DOWN========================================================================*/
	else if (83 in keysDown || 40 in keysDown){
				sprite.playerYSpeed=sprite.movementSpeed;

	}
	else
	{
		sprite.playerXSpeed = 0;
		sprite.playerYSpeed = 0;
	}	
	
	sprite.playerXPos += sprite.playerXSpeed;
	sprite.playerYPos += sprite.playerYSpeed;
	
	//Collision?
	
	var baseCol = Math.floor(sprite.playerXPos/64); //pixel value of your position on tiles in columns
	var baseRow = Math.floor(sprite.playerYPos/64); //pixel value of your position on tiles in rows
	
	var colOverlap = sprite.playerXPos%64>sprite.sizeDiff; //if your going into a block, it stops that from happening, blocks even if overlapped for colunns
	var rowOverlap = sprite.playerYPos%64>sprite.sizeDiff; //same thing as above for rows
	
	if(sprite.playerXSpeed>0){ //checking if there is a block on the column to your right and theres not a block you cant walk on where youre standing, and its checking for overlap
		if((cantWalkOn.contains(level.tiles[baseRow][baseCol+1]) && !cantWalkOn.contains(level.tiles[baseRow][baseCol]) && colOverlap) || 
		(cantWalkOn.contains(level.tiles[baseRow+1][baseCol+1]) && !cantWalkOn.contains(level.tiles[baseRow+1][baseCol]) && rowOverlap && colOverlap)){
				sprite.playerXPos = baseCol*64+sprite.sizeDiff;
		}
	}	//right
	if(sprite.playerXSpeed<0){
		if((!cantWalkOn.contains(level.tiles[baseRow][baseCol+1]) && cantWalkOn.contains(level.tiles[baseRow][baseCol])) || 
		(!cantWalkOn.contains(level.tiles[baseRow+1][baseCol+1]) && cantWalkOn.contains(level.tiles[baseRow+1][baseCol]) && rowOverlap)){
				sprite.playerXPos = (baseCol+1)*64;
		}
	}	//left
	
	baseCol = Math.floor(sprite.playerXPos/64);
	baseRow = Math.floor(sprite.playerYPos/64);
	colOverlap = sprite.playerXPos%64>sprite.sizeDiff;
	rowOverlap = sprite.playerYPos%64>sprite.sizeDiff;
	
	if(sprite.playerYSpeed>0){
		if((cantWalkOn.contains(level.tiles[baseRow+1][baseCol]) && !cantWalkOn.contains(level.tiles[baseRow][baseCol]) && rowOverlap) || 
		(cantWalkOn.contains(level.tiles[baseRow+1][baseCol+1]) && !cantWalkOn.contains(level.tiles[baseRow][baseCol+1]) && colOverlap && rowOverlap)){
				sprite.playerYPos = baseRow*64+sprite.sizeDiff;
		}
	}	//up
	if(sprite.playerYSpeed<0){
		if((!cantWalkOn.contains(level.tiles[baseRow+1][baseCol]) && cantWalkOn.contains(level.tiles[baseRow][baseCol])) || 
		(!cantWalkOn.contains(level.tiles[baseRow+1][baseCol+1]) && cantWalkOn.contains(level.tiles[baseRow][baseCol+1]) && colOverlap)){
				sprite.playerYPos = (baseRow+1)*64;
		}
	}	//down
	
	
	
	//Maybe?
	
	
		//Keep player within Canvas Border
		function checkPlayerBounds() {
			// Check bounds
			if(sprite.playerXPos < 64) {
				sprite.playerXPos = 64;
			}
			else if(sprite.playerXPos > canvas.width - 120) {
				sprite.playerXPos = canvas.width - 120;
			}

			if(sprite.playerYPos < 64) {
				sprite.playerYPos = 64;
			}
			else if(sprite.playerYPos > canvas.height - 120) {
				sprite.playerYPos = canvas.height - 120;
			}
		}
		
		
		checkPlayerBounds();
		
		
		
		//COLLISION MOTHERFUCKERS!!!!!!
		
		
		

		
		
		
		
		//LETS DO THIS SHIT
		
				
		
		// rendering level
		
		renderLevel();
		
		// update the game in about 1/60 seconds
		
		requestAnimFrame(function() {
			updateGame();
		});
	}
 
	updateGame();
	
})();