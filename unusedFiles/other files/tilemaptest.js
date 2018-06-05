//first tutorial line "Very good, but that little butter knife isn’t going to protect you much. Here, take these.﻿"
//that's a quote from runescape lmfao
(function() {
	var close = false;
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
	var mapID = 0;
    var coinImage = new Image();
    coinImage.src = "player/playerCenter.png";
    var sprite = {
        playersize: 64,
        sizeDiff: mapArray[mapID].tileSize - 64,
        playerXSpeed: mapArray[mapID].playerXPos,
        playerYSpeed: mapArray[mapID].playerYPos,
        playerCol: 8,
        playerRow: 5, //should null so you can change map position based upon what map you are in
        movementSpeed: 6 // the speed we are going to move, in pixels per frame
    }
	
	
	//viewport bullshit and vars etc. explained below
	var viewport={
		height: 8,
		width: 13
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


    var cantWalkOn = [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47];
    var animateWalkOn = [14];
    var normalWalkOn = [0, 7, 8, 26];
    var promptWalkOn = [23 ,24, 25];

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
            
            /*dungeon tiles*/
            /*24*/"images/dungeonstaircase.png", /*25*/"dungeonImages/dungeonEntranceGif.gif", /*26*/"dungeonImages/dungeonFloor.png",
            /*27*/"dungeonImages/dungeonWall1.png", /*28*/"dungeonImages/dungeonWallBottom.png", /*29*/"dungeonImages/dungeonWallTop.png",
            /*30*/"dungeonImages/dungeonWallLeft.png",/*31*/"dungeonImages/dungeonWallRight.png",/*32*/"dungeonImages/dungeonWallCornerBottomLeft.png",
            /*33*/"dungeonImages/dungeonWallCornerBottomRight.png",/*34*/"dungeonImages/dungeonWallCornerTopLeft.png",
            /*35*/"dungeonImages/dungeonWallCornerTopRight.png",/*36*/"dungeonImages/dungeonWallKeyBL.png",
            /*37*/"dungeonImages/dungeonWallKeyBR.png",/*38*/"dungeonImages/dungeonWallKeyTL.png",/*39*/"dungeonImages/dungeonWallKeyTR.png",
            /*40*/"images/dungeonAbyss.png",
            
            /*roof tiles*/
            /*41*/"images/roofVertical.png",/*42*/"images/roofHorizontal.png",/*43*/"images/roofVerticalBottom.png",
            /*44*/"images/roofVerticalCornerBR.png",/*45*/"images/roofVerticalCornerBL.png",/*46*/"images/roofVerticalER.png",
            /*47*/"images/roofVerticalEL.png"
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
				//Centers the initial load around the player. This works well for the initial map :D	
				context.translate((mapArray[mapID].playerXPos/mapArray[mapID].tileSize)-(3/2)*mapArray[mapID].tileSize,(mapArray[mapID].playerYPos/mapArray[mapID].tileSize)-(3/2)*mapArray[mapID].tileSize);
				
            }
            return tileGraphics;
        }
    };
    
    //I pretty much just used the same system as loading tiles
    var playerGraphicsToLoad = [
			//0
			"player/playerCenter.png",
			//1
			"player/playerBottom.png",
			//2
			"player/playerTop.png",
			//3
			"player/playerLeft.png",
			//4
			"player/playerRight.png",
			//5
			"player/playerTopLeft.png",
			//6
			"player/playerBottomLeft.png",
			//7
			"player/playerTopRight.png",
			//8
			"player/playerBottomRight.png"
	];
	var spritePicsLoaded = 0;
	var spritePic = []; //array for creating the player images, loads them all in a similar fashion
	//also because its lower on the "amount of images" to display, i've made an easier system for numbering them
	function drawPlayer(){
		for (var i = 0; i < playerGraphicsToLoad.length; i++) {
	        spritePic[i] = new Image();
	        spritePic[i].src = playerGraphicsToLoad[i];
	        spritePic[i].onload = function() {
	            spritePicsLoaded++;
	            return spritePic;
	        }
	    };
	    context.drawImage(spritePic[0], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
        
	};
	//viewport.width and height set up the viewport dimensions
    var canvasIDWidth = mapArray[mapID].tileSize * viewport.width;
    var canvasIDHeight = mapArray[mapID].tileSize * viewport.height;
    
    
	canvas.width = canvasIDWidth;
	canvas.height = canvasIDHeight;
    function renderLevel() {
        //all new level render to deal with the new MAP object. Mainly just level. added to vars but I cleaned up the code some as well
        for (var c = 0; c < level.levelCols; c++) {
            for (var r = 0; r < level.levelRows; r++) {
                var drawTile = level.getTile(c, r);
                context.drawImage(tileGraphics[drawTile], (c* level.tileSize), (r * level.tileSize)); //drawImage(image,x,y)
            }
        }
		drawPlayer();
		//drawNPC();
		printCoords();
    }
	
	function drawNPC(){ //FLAG UNFINISHED = I still need to get a test NPC working before I expand upon this
		var npcSizeDiff = mapArray[mapID].tileSize - 52;
		var npcPic = new Image();
        npcPic.src = 'images/sprite.png';
        context.drawImage(npcPic, npcArray[0].npcXPos, npcArray[0].npcYPos); //these are in the npc file.
	}
	function moveNPC(){	//FLAG UNFINISHED
		var npcMovement = Math.floor((Math.random()*4)+1);
		//mapArray[mapID].playerYPos += sprite.playerYSpeed = sprite.movementSpeed;
	}
	//created this function to print out the players coordinates, it does the floor and cieling of them divided by 2, which always makes a
	//N.5, I'll keep working on it to try and get the coordinates finished
    function printCoords(){
	    var xCoordinate =(Math.round(mapArray[mapID].playerXPos / mapArray[mapID].tileSize));
	    var yCoordinate =(Math.round(mapArray[mapID].playerYPos / mapArray[mapID].tileSize));
	    
	    context.font = "30px times new roman";
		context.fillStyle = "red";
		context.fillText("x:"+xCoordinate, mapArray[mapID].playerXPos-600, mapArray[mapID].playerYPos-300); //coordinates follow npc and display as XY:N
		context.fillText("y:"+yCoordinate, mapArray[mapID].playerXPos-600, mapArray[mapID].playerYPos-330);
    }

    // this function will do its best to make stuff work at 60FPS - please notice I said "will do its best"

    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
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
        
        //FLAG NEEDS WORK = We can probably make the images for the sprite work here somehow.
        if (65 in keysDown || 37 in keysDown) {
            mapArray[mapID].playerXPos += sprite.playerXSpeed = (-sprite.movementSpeed);
        }
        if (87 in keysDown || 38 in keysDown) {
            mapArray[mapID].playerYPos += sprite.playerYSpeed = (-sprite.movementSpeed);
        }
        if (68 in keysDown || 39 in keysDown) {
            mapArray[mapID].playerXPos += sprite.playerXSpeed = sprite.movementSpeed;
        }
        if (83 in keysDown || 40 in keysDown) {
            mapArray[mapID].playerYPos += sprite.playerYSpeed = sprite.movementSpeed;
        }
        if (73 in keysDown && !close) {
	        $(document).ready(function(){
				 $(".inventoryMenu").animate({
					"left":"5%"
				 }, 500);
				 close = true;
			});
        }else if(27 in keysDown && close){
	        $(document).ready(function(){
				 $(".inventoryMenu").animate({
					"left":"-600"
				 }, 500);
				 close = false;
			});
        }

        //Collision?

        var baseCol = Math.floor(mapArray[mapID].playerXPos / mapArray[mapID].tileSize);
        var baseRow = Math.floor(mapArray[mapID].playerYPos / mapArray[mapID].tileSize);
        
        var ceilCol = Math.ceil(mapArray[mapID].playerXPos / mapArray[mapID].tileSize);
        var ceilRow = Math.ceil(mapArray[mapID].playerYPos / mapArray[mapID].tileSize);
        
        var colOverlap = mapArray[mapID].playerXPos % mapArray[mapID].tileSize > sprite.sizeDiff;
        var rowOverlap = mapArray[mapID].playerYPos % mapArray[mapID].tileSize > sprite.sizeDiff;
        var checkIfTouched = false;
		//check if the player is touching left and right for animation
		
		if(sprite.playerXSpeed > 0) {
			if ((animateWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && !animateWalkOn.contains(level.tiles[baseRow][baseCol]) && colOverlap) &&
			checkIfTouched === false)
				{	
					checkAnimation();
				}			
		}
		if ((animateWalkOn.contains(level.tiles[ceilRow - 1][ceilCol - 1]) && !animateWalkOn.contains(level.tiles[ceilRow][ceilCol]) && colOverlap ) && 
		checkIfTouched === false)
				{
					checkAnimation();
				}

        if (sprite.playerXSpeed > 0) {
            if ((cantWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && !cantWalkOn.contains(level.tiles[baseRow][baseCol]) && colOverlap) || (cantWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && !cantWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && rowOverlap && colOverlap)) {
                mapArray[mapID].playerXPos = baseCol * mapArray[mapID].tileSize + sprite.sizeDiff;
                context.restore();
            }
			//checks for player movement to the left to move the camera according to speed (keeps you from having the issue where you slide on a wall and the cam moves) the !(keys) statement keeps the cam from glitching if you hit left and right at the same time, this checks both ways so its only needed once
			else if((68 in keysDown || 39 in keysDown) && !(((68 in keysDown || 39 in keysDown) && ((65 in keysDown || 37 in keysDown)))))
				context.translate((-sprite.playerXSpeed), 0);
        }
        if (sprite.playerXSpeed < 0) {
            if ((!cantWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && cantWalkOn.contains(level.tiles[baseRow][baseCol])) || (!cantWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && cantWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && rowOverlap)) {
                mapArray[mapID].playerXPos = (baseCol + 1) * mapArray[mapID].tileSize;
                context.restore();
            }
			//same as above but checks for movement to the right
			else if((65 in keysDown || 37 in keysDown))
				context.translate((-sprite.playerXSpeed), 0);
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
					mapArray[mapID].playerXPos = (baseCol * mapArray[mapID].tileSize + sprite.sizeDiff) - 10;
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
					mapArray[mapID].playerXPos = ((baseCol + 1) * mapArray[mapID].tileSize) + 10;
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
            if ((animateWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && !animateWalkOn.contains(level.tiles[baseRow][baseCol]) && rowOverlap) || (animateWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && !animateWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && colOverlap && rowOverlap)
            && checkIfTouched === true) {
				checkAnimation();
            }
        }
  if (sprite.playerYSpeed < 0) {
            if ((!animateWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && animateWalkOn.contains(level.tiles[baseRow][baseCol])) || (!animateWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && animateWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && colOverlap) &&
            checkIfTouched === false) {
	            checkAnimation();
            }
        }


        if (sprite.playerYSpeed > 0) {
            if ((cantWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && !cantWalkOn.contains(level.tiles[baseRow][baseCol]) && rowOverlap) || (cantWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && !cantWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && colOverlap && rowOverlap)) {
                mapArray[mapID].playerYPos = baseRow * mapArray[mapID].tileSize + sprite.sizeDiff;
                context.restore();
            }
			
			//checks for player movement up to move the camera according to speed (keeps you from having the issue where you slide on a wall and the cam moves) the !(keys) statement keeps the cam from glitching if you hit up and down at the same time, this checks both ways so its only needed once
			else if((83 in keysDown || 40 in keysDown) && !((83 in keysDown || 40 in keysDown) && (87 in keysDown || 38 in keysDown)))
				context.translate(0,(-sprite.playerYSpeed));
        }
        if (sprite.playerYSpeed < 0) {
            if ((!cantWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && cantWalkOn.contains(level.tiles[baseRow][baseCol])) || (!cantWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && cantWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && colOverlap)) {
                mapArray[mapID].playerYPos = (baseRow + 1) * mapArray[mapID].tileSize;
                context.restore();
            }
			//same as above but checks for movement down
			else if((87 in keysDown || 38 in keysDown))
				context.translate(0, (-sprite.playerYSpeed));
        }
        
        
        
        
        if (sprite.playerYSpeed > 0) {
            if ((promptWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && !promptWalkOn.contains(level.tiles[baseRow][baseCol]) && rowOverlap) || (promptWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && !promptWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && colOverlap && rowOverlap)) {
	            //down
	            promptCheck = false;
	            promptCheck = confirm("Do you want to enter?");
	            keyClear();
	            if(!promptCheck){
	              	context.translate(0, (10));
				  	mapArray[mapID].playerYPos = (baseRow * mapArray[mapID].tileSize + sprite.sizeDiff) - 10;
	                alert("You step away from the entrance");
				}else{
	              	context.translate(0, (10));
					mapArray[mapID].playerXPos = baseCol*mapArray[mapID].tileSize+sprite.sizeDiff;
					mapArray[mapID].playerYPos = (baseRow * mapArray[mapID].tileSize + sprite.sizeDiff) - 10;
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
	              	context.translate(0, (10));
				  	mapArray[mapID].playerYPos = ((baseRow + 1) * mapArray[mapID].tileSize )+ 10;
	                alert("You step away from the entrance");
				}else{
	              	context.translate(0, (10));
					mapArray[mapID].playerXPos = baseCol*mapArray[mapID].tileSize+sprite.sizeDiff;
					mapArray[mapID].playerYPos = ((baseRow + 1) * mapArray[mapID].tileSize )+ 10;
					context.clearRect(0,0,canvas.width,canvas.height);
					changeMap();
					console.log("change map");
				}

            }
        }
        //Maybe?



        
        
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
				playerXPos: mapArray[mapID].playerXPos,
				playerYPos: mapArray[mapID].playerYPos,
		        tiles: mapArray[mapID].tiles,
		
		        getTile: function(col, row) {
		            return this.tiles[row][col];
		        }
		
		    };
		    loadTiles();
		    alert("If youre upstairs, click cancel and it will take you down");
			
			//Centers the initial load around the player. Totally not working atm, BUT IM GETTING THERE!!!!!!!!!!	
			context.translate((mapArray[mapID].playerXPos/mapArray[mapID].tileSize)-(3/2)*mapArray[mapID].tileSize,(mapArray[mapID].playerYPos/mapArray[mapID].tileSize)-(3/2)*mapArray[mapID].tileSize);
		    
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
		function checkAnimation(){
			//what this does is checks the players coordinates based upon a set of coordinates which we will define in
			//the maps folder, these are where the doors and other animated things will go,
			
			for (var i = 0; i < mapArray[mapID].animations.length; i++) { //checking through the animations array
		        if(mapArray[mapID].animations[i][0] === Math.round(mapArray[mapID].playerYPos/96) &&
		        mapArray[mapID].animations[i][1] === Math.round(mapArray[mapID].playerXPos/96)){ //checks to make sure that the coords are the arrays
					//FLAG BROKEN: this is the part I cant get to work, I can't get the images to change upon entering a door, but it does work.
					//the coordinate system responds to you entering a door, and it picks it up and displays the coordinates you should be in.
			        var imageTest;
			        console.log("Picked up Y:"+mapArray[mapID].animations[i][0]); 
			        console.log("Picked up X:"+mapArray[mapID].animations[i][1]);
			        context.drawImage(tileGraphics[0],100,100); //drawImage(image,x,y)
		        }
	        }
		}

        //checkPlayerBounds();


        // rendering level

        renderLevel();

        // update the game in about 1/60 seconds

        requestAnimFrame(function() {
            updateGame();
        });
    }

    updateGame();

})();