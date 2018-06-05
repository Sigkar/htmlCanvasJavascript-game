//first tutorial line "Very good, but that little butter knife isn’t going to protect you much. Here, take these.﻿"
//that's a quote from runescape lmfao
(function() {

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
	var mapID = 0;
    var coinImage = new Image();
	
	// viewport
	var vX = 0;
    var vY = 0;
    var vWidth = 13;
    var vHeight = 8;
	
    coinImage.src = "images/sprite.png";
    var sprite = {
        playersize: 52,
        sizeDiff: mapArray[mapID].tileSize - 52,
        playerXSpeed: 0,
        playerYSpeed: 0,
        playerCol: 8,
        playerRow: 5, //should null so you can change map position based upon what map you are in
        movementSpeed: 3 // the speed we are going to move, in pixels per frame
    }

    var level = {

        levelCols: mapArray[mapID].levelCols,
        levelRows: mapArray[mapID].levelRows,
        tileSize: mapArray[mapID].tileSize,

        tiles: mapArray[mapID].tiles,

        getTile: function(col, row) {
            return this.tiles[row][col];
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

    mapArray[mapID].playerYPos = sprite.playerRow * level.tileSize + sprite.sizeDiff / 2;
    mapArray[mapID].playerXPos = sprite.playerCol * level.tileSize + sprite.sizeDiff / 2;


    var cantWalkOn = [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22];
    var fluidWalkOn = [8, 14];
    var normalWalkOn = [0, 7];
    var promptWalkOn = [23 ,24];

    var tileGraphicsToLoad = [ /*0*/ "images/floorStone.png", /*1*/ "images/bottomLeftCorner.png",
            /*2*/
            "images/topLeftCorner.png", /*3*/ "images/bottomRightCorner.png",
            /*4*/
            "images/topRightCorner.png", /*5*/ "images/horizontalWall.png",
            /*6*/
            "images/verticalWall.png", /*7*/ "images/sidewalk.png", /*8*/ "images/grass.png",
            /*9*/
            "images/outsideHorizontalWall.png", /*10*/ "images/outsideHorizontalWallGlass.png", /*11*/ "images/outsideHorizontalWall.png",
            /*12*/
            "images/wallEndLeft.png", /*13*/ "images/wallEndRight.png", /*14*/ "images/door.png",
            /*15*/
            "images/keyFacingRight.png", /*16*/ "images/keyFacingLeft.png", /*17*/ "images/keyFacingDown.png",
            /*18*/
            "images/keyFacingUp.png", /*19*/ "images/keyFourSides.png", /*20*/ "images/verticalEndCapUp.png",
            /*21*/
            "images/verticalEndCapDown.png", /*22*/ "abyss.png", /*23*/ "images/stairDown.png",
            /*24*/"dungeonImages/dungeonstaircase.png"
        ],
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
    
    var canvasIDWidth = vWidth;
    var canvasIDHeight = vHeight;
    
    
	canvas.width = canvasIDWidth;
	canvas.height = canvasIDHeight;
	

	
    function renderLevel() {
		context.clearRect(0,0,canvas.width, canvas.height);
		
        //all new level render to deal with the new MAP object. Mainly just level. added to vars but I cleaned up the code some as well
        for (var c = 0; c <  vWidth; c++) {
            for (var r = 0; r <  vHeight; r++) {
				var viewX = vX + c;
				var viewY = vY + r;
                var drawTile = level.getTile(viewX, viewY);
				console.log(viewX + " and " + viewY);
                context.drawImage(tileGraphics[drawTile], c * level.tileSize, r * level.tileSize); //drawImage(image,x,y)
            }
        }

        var spritePic = new Image();
        spritePic.src = 'images/sprite.png';
        var pattern = context.createPattern(spritePic, "no-repeat");

        context.drawImage(spritePic, mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);



    }

    // this function will do its best to make stuff work at 60FPS - please notice I said "will do its best"

    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 30);
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

        //Yup.......SO MUCH SIMPLER all if statements so they can run next to each other
        //also combined mapArray[mapID].playerXPos += sprite.playerXSpeed=(-sprite.movementSpeed) so it would update position correctly (fixed the buggy movement) as well as keep the speed in for collision
        if (65 in keysDown || 37 in keysDown) {
			if (mapArray[mapID].playerXPos > 0)
				mapArray[mapID].playerXPos += sprite.playerXSpeed = (-sprite.movementSpeed);
        }
        if (87 in keysDown || 38 in keysDown) {
			if (mapArray[mapID].playerYPos > 0)
				mapArray[mapID].playerYPos += sprite.playerYSpeed = (-sprite.movementSpeed);
        }
        if (68 in keysDown || 39 in keysDown) {
			if (mapArray[mapID].playerXPos < canvas.width)
				mapArray[mapID].playerXPos += sprite.playerXSpeed = sprite.movementSpeed;
        }
        if (83 in keysDown || 40 in keysDown) {
			if (mapArray[mapID].playerYPos < canvas.height)
				mapArray[mapID].playerYPos += sprite.playerYSpeed = sprite.movementSpeed;
        }

        /*mapArray[mapID].playerXPos += sprite.playerXSpeed;
        mapArray[mapID].playerYPos += sprite.playerYSpeed;*/

        //Collision?

        var baseCol = Math.floor(mapArray[mapID].playerXPos / mapArray[mapID].tileSize);
        var baseRow = Math.floor(mapArray[mapID].playerYPos / mapArray[mapID].tileSize);
        var colOverlap = mapArray[mapID].playerXPos % mapArray[mapID].tileSize > sprite.sizeDiff;
        var rowOverlap = mapArray[mapID].playerYPos % mapArray[mapID].tileSize > sprite.sizeDiff;

        if (sprite.playerXSpeed > 0) {
            if ((cantWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && !cantWalkOn.contains(level.tiles[baseRow][baseCol]) && colOverlap) || (cantWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && !cantWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && rowOverlap && colOverlap)) {
                mapArray[mapID].playerXPos = baseCol * mapArray[mapID].tileSize + sprite.sizeDiff;
                context.restore();
            }
        }
        if (sprite.playerXSpeed < 0) {
            if ((!cantWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && cantWalkOn.contains(level.tiles[baseRow][baseCol])) || (!cantWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && cantWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && rowOverlap)) {
                mapArray[mapID].playerXPos = (baseCol + 1) * mapArray[mapID].tileSize;
                context.restore();
            }
        }
        var promptCheck = false;
        /*Prompt upon walking into blocks for teleportation and other on-entering effects that COLLIDE*/
        if (sprite.playerXSpeed > 0) {
            if ((promptWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && !promptWalkOn.contains(level.tiles[baseRow][baseCol]) && colOverlap) || (promptWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && !promptWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && rowOverlap && colOverlap)) {
	            //right
	            promptCheck = false;
                promptCheck = confirm("Do you want to enter?");
                keyClear();
	            if(!promptCheck){
				  	mapArray[mapID].playerXPos = (baseCol * mapArray[mapID].tileSize + sprite.sizeDiff) - 10;
	                alert("You step away from the entrance");
				}else{
					mapArray[mapID].playerXPos = baseCol*mapArray[mapID].tileSize+sprite.sizeDiff;
					context.clearRect(0,0,canvas.width,canvas.height);
					changeMap();
					console.log("change map");
				}
            }
        }
        if (sprite.playerXSpeed < 0) {
            if ((!promptWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && promptWalkOn.contains(level.tiles[baseRow][baseCol])) || (!promptWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && promptWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && rowOverlap)) {
	            //left
	            promptCheck = false;
                promptCheck = confirm("Do you want to enter?");
                keyClear();
	            if(!promptCheck){
				  	mapArray[mapID].playerXPos = ((baseCol + 1) * mapArray[mapID].tileSize) + 10;
	                alert("You step away from the entrance");
				}else{
					mapArray[mapID].playerXPos = baseCol*mapArray[mapID].tileSize+sprite.sizeDiff;
					context.clearRect(0,0,canvas.width,canvas.height);
					changeMap();
					console.log("change map");
				}
                
            }
        }

        baseCol = Math.floor(mapArray[mapID].playerXPos / mapArray[mapID].tileSize);
        baseRow = Math.floor(mapArray[mapID].playerYPos / mapArray[mapID].tileSize);
        colOverlap = mapArray[mapID].playerXPos % mapArray[mapID].tileSize > sprite.sizeDiff;
        rowOverlap = mapArray[mapID].playerYPos % mapArray[mapID].tileSize > sprite.sizeDiff;

        if (sprite.playerYSpeed > 0) {
            if ((cantWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && !cantWalkOn.contains(level.tiles[baseRow][baseCol]) && rowOverlap) || (cantWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && !cantWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && colOverlap && rowOverlap)) {
                mapArray[mapID].playerYPos = baseRow * mapArray[mapID].tileSize + sprite.sizeDiff;
                context.restore();
            }
        }
        if (sprite.playerYSpeed < 0) {
            if ((!cantWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && cantWalkOn.contains(level.tiles[baseRow][baseCol])) || (!cantWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && cantWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && colOverlap)) {
                mapArray[mapID].playerYPos = (baseRow + 1) * mapArray[mapID].tileSize;
                context.restore();
            }
        }
        
        
        
        
        if (sprite.playerYSpeed > 0) {
            if ((promptWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && !promptWalkOn.contains(level.tiles[baseRow][baseCol]) && rowOverlap) || (promptWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && !promptWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && colOverlap && rowOverlap)) {
	            //down
	            promptCheck = false;
	            promptCheck = confirm("Do you want to enter?");
	            keyClear();
	            if(!promptCheck){
	              	
				  	mapArray[mapID].playerYPos = (baseRow * mapArray[mapID].tileSize + sprite.sizeDiff) - 10;
	                alert("You step away from the entrance");
				}else{
					mapArray[mapID].playerXPos = baseCol*mapArray[mapID].tileSize+sprite.sizeDiff;
					context.clearRect(0,0,canvas.width,canvas.height);
					changeMap();
					console.log("change map");
				}
            }
        }
        if (sprite.playerYSpeed < 0) {
            if ((!promptWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && promptWalkOn.contains(level.tiles[baseRow][baseCol])) || (!promptWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && promptWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && colOverlap)) {
	            //up
	            promptCheck = confirm("Do you want to enter?");
	            keyClear();
	            if(!promptCheck){
				  	mapArray[mapID].playerYPos = ((baseRow + 1) * mapArray[mapID].tileSize )+ 10;
	                alert("You step away from the entrance");
				}else{
					mapArray[mapID].playerXPos = baseCol*mapArray[mapID].tileSize+sprite.sizeDiff;
					context.clearRect(0,0,canvas.width,canvas.height);
					changeMap();
					console.log("change map");
				}

            }
        }
        //Maybe?


        //Keep player within Canvas Border
        function checkPlayerBounds() {
            // Check bounds
            if (mapArray[mapID].playerXPos < mapArray[mapID].tileSize) {
                mapArray[mapID].playerXPos = mapArray[mapID].tileSize;
                context.restore();
            } else if (mapArray[mapID].playerXPos > canvas.width - 120) {
                mapArray[mapID].playerXPos = canvas.width - 120;
                context.restore();
            }

            if (mapArray[mapID].playerYPos < mapArray[mapID].tileSize) {
                mapArray[mapID].playerYPos = mapArray[mapID].tileSize;
                context.restore();
            } else if (mapArray[mapID].playerYPos > canvas.height - 120) {
                mapArray[mapID].playerYPos = canvas.height - 120;
                context.restore();
            }
        }
		
		vX = Math.floor(mapArray[mapID].playerXPos/mapArray[mapID].tileSize) - Math.floor(0.5 *  vWidth);
        if ( vX < 0)  vX = 0;
        if ( vX+ vWidth > mapArray[mapID].levelCols)  vX = mapArray[mapID].levelCols -  vWidth;
        
        
        vY = Math.floor(mapArray[mapID].playerYPos/mapArray[mapID].tileSize) - Math.floor(0.5 *  vHeight);
        if ( vY < 0)  vY = 0;
        if ( vY+ vHeight > mapArray[mapID].levelRows)  vY = mapArray[mapID].levelRows -  vHeight;
        
        
        function keyClear(){
	        for(key in keysDown){
				delete keysDown[key];
			}
		}
		function changeMap(){
			mapID = mapArray[mapID].changeID;//1 is the backup in case they crash.
			level = {

		        levelCols: mapArray[mapID].levelCols,
		        levelRows: mapArray[mapID].levelRows,
		        tileSize: mapArray[mapID].tileSize,
		
		        tiles: mapArray[mapID].tiles,
		
		        getTile: function(col, row) {
		            return this.tiles[row][col];
		        }
		
		    };
		    loadTiles();
		    renderLevel();
		    alert("If youre upstairs, click cancel and it will take you down");
		    
		}		
		
		function loadTiles(){
			context.clearRect(0,0,canvas.width,canvas.height);
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
		}
		

        checkPlayerBounds();


        // rendering level

        renderLevel();

        // update the game in about 1/60 seconds

        requestAnimFrame(function() {
            updateGame();
        });
    }

    updateGame();

})();