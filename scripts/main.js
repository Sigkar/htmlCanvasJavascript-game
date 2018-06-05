/*
	=======================================================================
	=							 										  =
	=							 										  =
	=                  	    REDEMPTION V0.0.3 ALPHA  				      =
	=							 									      =
	=							 PROGRAMMERS							  =
	=				       		 Jesse Myers 						      =
	=					    	Duncan Pierce							  =
	=							 										  =
	=							 										  =
	=======================================================================  
*/
(function() {

    // var name = prompt("What is your adventurers name?");
    /*if(name === null){
    	name = "adventurer";
    }*/
    
    //I will have another onload function ready to load all of these in at a later date.
    
    var swordSlash = new Audio();
    swordSlash.src = 'audio/swordslash1.mp3';
    
    
    var toggleSprint = false;
    var xCheck = false;
    var oldMapID = 0;
    var close = false;
    var closeCoords = false;
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var mapID = 0;
    var coinImage = new Image();
    coinImage.src = "images/sprites/malePlayer/maleSprite.png";
	
	var testInv = new Image();
	testInv.src = itemID[1];

	playerData.inventory[0] = testInv;
	
	
    var sprite = {
	    	damage: 0,
            playersize: 70,
            sizeDiff: mapArray[mapID].tileSize - 80,
            playerXSpeed: mapArray[mapID].playerXPos,
            playerYSpeed: mapArray[mapID].playerYPos,
            playerCol: 8,
            playerRow: 5, //should null so you can change map position based upon what map you are in
            movementSpeed: 5, // the speed we are going to move, in pixels per frame
            playerIsAttacking: false,
            isMoving: false,
            animateWalking: false,
            turnOffCollision: false
        }
    var mapEditor = {
	    clicked:false
    }
        //viewport bullcrap and vars etc. explained below
    var viewport = {
        height: 7,
        width: 9
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
	var overlayGraphics = [];
    var tileGraphics = [];
	var overlayGraphics = [];
    var keysDown = {};
    window.addEventListener('keydown', function(e) {
        keysDown[e.keyCode] = true;
    });
    window.addEventListener('keyup', function(e) {
        delete keysDown[e.keyCode];
    });

    window.addEventListener('keypress', function(e) {
        if ((e.keyCode == "73" || e.keyCode == "105") && !close) {
            $(document).ready(function() {
                $(".inventoryMenu").animate({
                    "left": "5%"
                }, 500);
                close = true;
            });
        } else if ((e.keyCode == "73" || e.keyCode == "105") && close) {
            $(document).ready(function() {
                $(".inventoryMenu").animate({
                    "left": "-600"
                }, 500);
                close = false;
            });
        }
        if ((e.keyCode == 114) && !closeCoords) {
            closeCoords = true;
        } else if ((e.keyCode == 114) && closeCoords) {
            closeCoords = false;
        }
        if (e.keyCode == "32" && toggleSprint == false) {
            sprite.movementSpeed = 15;
            toggleSprint = true;
        } else if (e.keyCode == "32" && toggleSprint == true) {
            sprite.movementSpeed = 5;
            toggleSprint = false;
        }
        	var currentTile = 0;
	var changeTilePrompt = 0;
	var editViewport = 0;
	var outputArrayForPasting = "";
	//developer options. TAKE OUT IN LIVE VERSION
	//Press enter on the keyboard to open up the developer options. These have a list of options which you can input a -number in to get it.
	if(e.keyCode == "13"){
		changeTilePrompt = parseInt(prompt("Input a number for this to change to, not less than 0 or greater than "+(tileGraphicsToLoad.length-1)+"\nPrint the map tile array for copying : -1\nToggle collision, currently set to "+ sprite.turnOffCollision +": -2\nChange x value of viewport:-3\nChange y value of viewport: -4"));
	    //currentTile = mapArray[mapID].tiles[Math.round(mapArray[mapID].playerYPos / mapArray[mapID].tileSize)][Math.round(mapArray[mapID].playerXPos / mapArray[mapID].tileSize)];
	    
	    
	    if((isNaN(changeTilePrompt) === false) && changeTilePrompt >= 0 && changeTilePrompt <= 97){
		    mapArray[mapID].tiles[Math.round(mapArray[mapID].playerYPos / mapArray[mapID].tileSize)][Math.round(mapArray[mapID].playerXPos / mapArray[mapID].tileSize)] = changeTilePrompt;
	    }else if(changeTilePrompt === -1){
		    
		    
		    
		    console.log("[");
		    for(var i = 0; i < mapArray[mapID].levelRows; i++) {
			    outputArrayForPasting+=("[");
			 for(var z = 0; z < mapArray[mapID].levelCols; z++) {
			  outputArrayForPasting+=(mapArray[mapID].tiles[i][z] + ",");
			 }
			 	outputArrayForPasting+=("],\n");
			}
			console.log(outputArrayForPasting);
			console.log("],");
			
			
			
			
		}else if(changeTilePrompt === -2){
			if(!sprite.turnOffCollision)
			sprite.turnOffCollision = true;
			else
			sprite.turnOffCollision = false;
		}else if(changeTilePrompt === -3){
			editViewport = parseInt(prompt("Change x value of viewport"));
			if(isNaN(changeTilePrompt) === false){
				context.translate(editViewport, 0);
			}
		}else if(changeTilePrompt === -4){
			editViewport = parseInt(prompt("Change y value of viewport"));
			if(isNaN(changeTilePrompt) === false){
				context.translate(0, editViewport);
			}
		}else{
		    alert("Do it right dipshit");
	    }
		
		console.log(currentTile);
		mapEditor.clicked = true;
	}
    });
	//end developer options
    mapArray[mapID].playerYPos = sprite.playerRow * level.tileSize + sprite.sizeDiff / 2;
    mapArray[mapID].playerXPos = sprite.playerCol * level.tileSize + sprite.sizeDiff / 2;


	

    tileGraphicsLoaded = 0;
    for (var i = 0; i < tileGraphicsToLoad.length; i++) {
        tileGraphics[i] = new Image();
        tileGraphics[i].src = tileGraphicsToLoad[i];
        tileGraphics[i].onload = function() {
            // Once the image is loaded increment the loaded graphics count and check if all images are ready.
            //Will render the level once the tileGraphicsLoaded is finished, theoretically I could put up to 2147483647 images
            tileGraphicsLoaded++;
            if (tileGraphicsLoaded === tileGraphicsToLoad.length) {
	            console.log("loading images");
	            
                renderLevel();
                //Centers the initial load around the player. This works well for the initial map :D	
                context.translate((mapArray[mapID].playerXPos / mapArray[mapID].tileSize) - (11 / 3) * mapArray[mapID].tileSize, (mapArray[mapID].playerYPos / mapArray[mapID].tileSize) - (4 / 2) * mapArray[mapID].tileSize);

            }
            return tileGraphics;
        }
    };
    
    

    //I pretty much just used the same system as loading tiles
	
    var spritePicsLoaded = 0;
    var spritePic = []; //array for creating the player images, loads them all in a similar fashion
    //also because its lower on the "amount of images" to display, i've made an easier system for numbering them
    function drawPlayer() {
        for (var i = 0; i < playerGraphicsToLoad.length; i++) {
            spritePic[i] = new Image();
            spritePic[i].src = playerGraphicsToLoad[i];
            spritePic[i].onload = function() {
                spritePicsLoaded++;
                return spritePic;
            }
        };
        
        drawPlayerOnMove();

    };
    var weaponPicsLoaded = 0;
    var weaponPic = [];
    var attackPicsLoaded = 0;
    var attackPic = [];

    function loadSwords() {
        for (var i = 0; i < weaponsToLoad.length; i++) {
            weaponPic[i] = new Image();
            weaponPic[i].src = weaponsToLoad[i];
        }
        for (var j = 0; j<attackSpritesToLoad.length; j++) {
	        attackPic[j] = new Image();
	        attackPic[j].src = attackSpritesToLoad[j];
        }
    }
    function loadOverlays(){
	    for( var i = 0; i < overlayTilesToLoad.length; i++){
		        overlayGraphics[i] = new Image();
		        overlayGraphics[i].src = overlayTilesToLoad[i];
	     }
		context.drawImage(overlayGraphics[1],45*96,19*96);
	   
    }
    //viewport.width and height set up the viewport dimensions
    var canvasIDWidth = mapArray[mapID].tileSize * viewport.width;
    var canvasIDHeight = mapArray[mapID].tileSize * viewport.height;


    canvas.width = canvasIDWidth;
    canvas.height = canvasIDHeight;
	var droppedItem = false;
	var playerTouchedItem = false;
	var loadOnce = true;
    function renderLevel() {
	    
        //all new level render to deal with the new MAP object. Mainly just level. added to vars but I cleaned up the code some as well
        for (var c = 0; c < level.levelCols; c++) {
            for (var r = 0; r < level.levelRows; r++) {
                var drawTile = level.getTile(c, r);
                context.drawImage(tileGraphics[drawTile], (c * level.tileSize), (r * level.tileSize)); //drawImage(image,x,y)
            }
        }
        
        
        //The order of this load is directly related to the overlay of images
        //Later load = topmost picture
        checkAnimation();
        loadSwords();
        drawNPC();
        moveNPC();
        hostileMovement();
        drawPlayer();      
        drawSword();
        printCoords();
        checkNpcAndPlayerCollision();
        commentOnTiles();
        showHealthBars();
        loadOverlays();
        /*if(droppedItem === false){
	        context.drawImage(testInv, 5*96, 23*96);
        }
        if(playerTouchedItem === true){
	        droppedItem = true;
	        $('#invSpot1').html(testInv);
        }*/
        
        
        
    }
    /*var overlayPic = [];
    var overlayTilesLoaded;
    function drawOverlays(){
	     for (var i = 0; i < overlayTilesToLoad.length; i++) {
	            overlayPic[i] = new Image();
	            overlayPic[i].src = npcGraphicsToLoad[i];
	            overlayPic[i].onload = function() {
	                overlayTilesLoaded++;
	                return overlayPic;
            }
        }
        if(mapArray[mapID].hasOverlays != undefined)
	    for(var i = 0; i < mapArray[mapID].overlays.length; i++){
		    context.drawImage(overlayPic[mapArray[mapID].overlays[i][2]], mapArray[mapID].overlays[i][1], mapArray[mapID].overlays[i][0]);
	    }
	    }*/
       
    var movement = 0; 
    var swordJab = 0, swordDirectionChange = false,
    attackingLeft = false, attackingRight = false, attackingUp = false, attackingDown = false,
    finishJabAnimation = false;
    function drawSword() {
	    /*
		    
			This function is set up to do three things
			1. Display the players attacking image
			2. Display the sword attacking image, which may or may not be used in walking animations
			3. Run the checkAttack function which is supposed to pick up when a sword is hitting an enemy npc (Still uh, broken a little)    
		    
		*/
        if (52 in keysDown || 100 in keysDown || attackingLeft) {
            if (!attackingDown && !attackingRight && !attackingUp) {
                attackingLeft = true;
                if (swordDirectionChange === false) {
                    swordJab = 0;
                    swordDirectionChange = true;
                }
                //left stab
                swordSlash.play();
                checkAttack(1);
                if (swordJab < 50) {
	                sprite.playerIsAttacking = true;
	                context.drawImage(attackPic[1], mapArray[mapID].playerXPos - 10 , mapArray[mapID].playerYPos);
                    swordJab = swordJab + 5;
                    context.drawImage(weaponPic[0], mapArray[mapID].playerXPos - 55, mapArray[mapID].playerYPos + 33);
                }
                if(swordJab < 100 && swordJab>=50){
	                context.drawImage(attackPic[1], mapArray[mapID].playerXPos - 20, mapArray[mapID].playerYPos);
                    swordJab = swordJab + 5;
                    context.drawImage(weaponPic[0], mapArray[mapID].playerXPos - 65, mapArray[mapID].playerYPos + 33);
                }
                if (swordJab === 100) {
	                sprite.playerIsAttacking = false;
                    swordJab = 0;
                    finishJabAnimation = true;
                    attackingLeft = false;
                    swordDirectionChange = false;
                }
            }
        }


		//	=	=	=	=	=	=	=ATTACKING RIGHT=	=	=	=	=	=	=	=	=	=
        else if (54 in keysDown || 102 in keysDown || attackingRight) {
            if (!attackingDown && !attackingLeft && !attackingUp) {
                attackingRight = true;
                if (swordDirectionChange === false) {
                    swordJab = 0;
                    swordDirectionChange = true;
                }
                //right stab
                swordSlash.play();
                checkAttack(2);
                 if (swordJab < 50) {
	                sprite.playerIsAttacking = true;
	                context.drawImage(attackPic[0], mapArray[mapID].playerXPos+10, mapArray[mapID].playerYPos);
                    swordJab = swordJab + 5;
                    context.drawImage(weaponPic[1], mapArray[mapID].playerXPos + 75, mapArray[mapID].playerYPos+33);
                }
                if (swordJab < 100 && swordJab>=50) {
	                context.drawImage(attackPic[0], mapArray[mapID].playerXPos + 20, mapArray[mapID].playerYPos);
                    swordJab = swordJab + 5;
                    context.drawImage(weaponPic[1], mapArray[mapID].playerXPos + 85, mapArray[mapID].playerYPos + 33);
                }
                if (swordJab === 100) {
	                sprite.playerIsAttacking = false;
                    swordJab = 0;
                    finishJabAnimation = true;
                    attackingRight = false;
                    swordDirectionChange = false;
                }
            }
        }
        //=	=	=	=	=	=	=	=	=ATTACKING DOWN=	=	=	=	=	=	=	=	=
        else if (50 in keysDown || 98 in keysDown || attackingDown) {
            if (!attackingLeft && !attackingRight && !attackingUp) {
                attackingDown = true;
                if (swordDirectionChange === false) {
                    swordJab = 0;
                    swordDirectionChange = true;
                }
                swordSlash.play();
                checkAttack(3);
                if (swordJab < 50) {
	                sprite.playerIsAttacking = true;
	                context.drawImage(attackPic[2], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos+10); //this places the player 10px to the right w/ attack anim
                    swordJab = swordJab + 5;
                    context.drawImage(weaponPic[2], mapArray[mapID].playerXPos + 45, mapArray[mapID].playerYPos+60); //this pushes the NPCs weapon out to their hand
                }
                if (swordJab < 100 && swordJab>=50) {
	                context.drawImage(attackPic[2], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos+20);
                    swordJab = swordJab + 5;
                    context.drawImage(weaponPic[2], mapArray[mapID].playerXPos + 45, mapArray[mapID].playerYPos+70);
                }
                if (swordJab === 100) {
	                sprite.playerIsAttacking = false;
                    swordJab = 0;
                    finishJabAnimation = true;
                    attackingDown = false;
                    swordDirectionChange = false;
                }
            }
        }
        //=	=	=	=	=	==	=	=	=	attacking up=	=	=	=	=	=	=	=	=	=	=
        else if (56 in keysDown || 104 in keysDown || attackingUp) {
            if (!attackingDown && !attackingRight && !attackingLeft) {
                attackingUp = true;
                swordSlash.play();
                checkAttack(4);
                if (swordJab < 50) {
	                sprite.playerIsAttacking = true;
	                context.drawImage(attackPic[3], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos-10);
                    swordJab = swordJab + 5;
                    context.drawImage(weaponPic[3], mapArray[mapID].playerXPos + 25, mapArray[mapID].playerYPos-65);
                }
                if(swordJab < 100 && swordJab>=50) {
	                context.drawImage(attackPic[3], mapArray[mapID].playerXPos , mapArray[mapID].playerYPos - 20);
	                swordJab = swordJab + 5;
	                context.drawImage(weaponPic[3], mapArray[mapID].playerXPos + 25, mapArray[mapID].playerYPos-75);
                }
                if (swordJab === 100) {
	                sprite.playerIsAttacking = false;
                    swordJab = 0;
                    finishJabAnimation = true;
                    attackingUp = false;
                    swordDirectionChange = false;
                }
            }
        }
    }
	var npcPicsLoaded = 0, npcPic = []
    function drawNPC() {
	   
        var npcSizeDiff = mapArray[mapID].tileSize - 32;
        for (var i = 0; i < npcGraphicsToLoad.length; i++) {
	            npcPic[i] = new Image();
	            npcPic[i].src = npcGraphicsToLoad[i];
	            npcPic[i].onload = function() {
	                npcPicsLoaded++;
	                return npcPic;
            }
        };
        for (var i = 0; i < npcArray.length; i++) {
	        if(npcArray[i].alive === false){
		        npcArray[i].timeDead++;
		        if(npcArray[i].timeDead === npcArray[i].deathTimer){
			        npcArray[i].npcXPos = npcArray[i].initialX;
			        npcArray[i].npcYPos = npcArray[i].initialY;
			        npcArray[i].alive = true;
			        npcArray[i].attacking = false;
			        npcArray[i].timeDead = 0;
			        npcArray[i].health = npcArray[i].fullHealth;
		        }
	        }
	        if(npcArray[i].alive === true){
	            if (npcArray[i].npcMapID === mapArray[mapID].levelID) {
	                context.drawImage(npcPic[npcArray[i].picID], (npcArray[i].npcXPos), (npcArray[i].npcYPos));
	            }
	            if(npcArray[i].isArmed === true){
		            context.drawImage(weaponPic[npcArray[i].weaponID], (npcArray[i].npcXPos+npcArray[i].weaponX), (npcArray[i].npcYPos+npcArray[i].weaponY));
	            }
            }
        }
        context.drawImage(npcPic[2], (npcArray[0].npcXPos), (npcArray[0].npcYPos));
        /*	^	^	^	^	^	^	^	^	^	^	^	^	^	^	^	^	^	^
	        this is a temporary sprite, for some reason or another the for loop doesnt like to print the first picture, it's really weird.
	        I have checked the object several times to look for typos or errors, its still not making sense. Its sort of frustrating but
	        it is also 2:10 AM.
	    */
    }


    function moveNPC() {
        for (var i = 0; i < npcArray.length; i++) {
            if (npcArray[i].loop === true && npcArray[i].hostile === false && npcArray[i].alive === true && npcArray[i].npcMapID === mapID) { //if the loop isnt running it will continue doing this until the loop is true
                npcArray[i].npcMove = Math.floor((Math.random() * 8) + 1); //picks the direction the NPC will go (only 4 directions currently)
                npcArray[i].npcMovement = Math.floor((Math.random() * 96) + 32); //picks the amount of pixels the character will move (Broken)
                var startLoop = Math.floor((Math.random() * 600) + 1); //If it equals 25, the npc will begin the loop
            }
            if (startLoop === 150 || npcArray[i].loop === false && npcArray[i].hostile === false && npcArray[i].movesRandomly === undefined) { //will begin loop, and also sets the loop to false so it doesnt reset the vars

                npcArray[i].loop = false;
                if (npcArray[i].npcMove === 1) { //NPC is moving right
                    //console.log("right");
                    npcArray[i].npcXPos += 3; 
                    
                    //should use this 3 and define a variable in npcs.js that can choose how fast we want the NPC to go. (ie dogs fast)
                    //it starts to look glitchy around 5 pixels during frame lag, 
                    //because they arent moving at a smooth 1 pixel per frame. I would only go up to about 6.
                    
                    npcArray[i].npcXSpeed = 3;
                } else if (npcArray[i].npcMove === 2) { //NPC is moving left
                    //console.log("left");
                    npcArray[i].npcXPos -= 3;
                    npcArray[i].npcXSpeed = -3;
                } else if (npcArray[i].npcMove === 3) { //NPC is moving down
                    //console.log("down");
                    npcArray[i].npcYPos += 3;
                    npcArray[i].npcYSpeed = 3;
                } else if (npcArray[i].npcMove === 4) { //NPC is moving up
                    //console.log("up");
                    npcArray[i].npcYPos -= 3;
                    npcArray[i].npcYSpeed = -3;
                } else if (npcArray[i].npcMove === 5) { //NPC is moving down and right
                    //console.log("down and right");
                    npcArray[i].npcYPos += 3;
                    npcArray[i].npcXPos += 3;
                    npcArray[i].npcXSpeed = 3;
                    npcArray[i].npcYSpeed = 3;
                } else if (npcArray[i].npcMove === 6) { //NPC is moving up and right
                    //console.log("up and right");
                    npcArray[i].npcYPos -= 3;
                    npcArray[i].npcXPos += 3;
                    npcArray[i].npcXSpeed = 3;
                    npcArray[i].npcYSpeed = -3;
                } else if (npcArray[i].npcMove === 7) { //NPC is moving down and left
                    // console.log("down and left");
                    npcArray[i].npcYPos += 3;
                    npcArray[i].npcXPos -= 3;
                    npcArray[i].npcXSpeed = -3;
                    npcArray[i].npcYSpeed = 3;
                } else if (npcArray[i].npcMove === 8) { //NPC is moving up and left
                    //console.log("up and left");
                    npcArray[i].npcYPos -= 3;
                    npcArray[i].npcXPos -= 3;
                    npcArray[i].npcXSpeed = -3;
                    npcArray[i].npcYSpeed = -3;
                }
                npcArray[i].finished++;
                if (npcArray[i].finished === npcArray[i].npcMovement) { //should count to the finished/npcMovement #
                    npcArray[i].finished = 0;
                    startLoop = 0;
                    npcArray[i].loop = true;
                    npcArray[i].npcMove = 0;
                    npcArray[i].npcXSpeed = 0;
                    npcArray[i].npcYSpeed = 0;
                }
            }
        }
    } 
    
    function hostileMovement(){
	    for(var i = 0; i < npcArray.length;i++){
		    if(npcArray[i].hostile === true && npcArray[i].npcMapID === mapID){//checks if they have the hostile tag
			    //This checks to see if the player is within the amount of pixels required to be hostile to him or her.
				    if( (((npcArray[i].npcXPos + npcArray[i].range*96) > mapArray[mapID].playerXPos) && ((npcArray[i].npcXPos - npcArray[i].range*96) < mapArray[mapID].playerXPos)) && (((npcArray[i].npcYPos + npcArray[i].range*96) > mapArray[mapID].playerYPos) && ((npcArray[i].npcYPos - npcArray[i].range*96) < mapArray[mapID].playerYPos)) ||  npcArray[i].attacking === true ){
					    //console.log("player is within "+npcArray[i].range*96+" pixels of the hostile enemy");
					    npcArray[i].attacking = true;
					    if(npcArray[i].attacking && npcArray[i].npcXPos > mapArray[mapID].playerXPos - (npcArray[i].stopAt*96) && (npcArray[i].npcXPos != mapArray[mapID].playerXPos))
					    {
						    //console.log("the npc should be in persuit to the left");
		                    npcArray[i].npcXPos -= 3;
		                    npcArray[i].npcXSpeed = -3; 
					    }
					    if(npcArray[i].attacking && npcArray[i].npcXPos < mapArray[mapID].playerXPos + (npcArray[i].stopAt*96) && (npcArray[i].npcXPos != mapArray[mapID].playerXPos)){
						    //console.log("the npc should be in persuit to the right");
						    npcArray[i].npcXPos += 3;
		                    npcArray[i].npcXSpeed = 3; 
					    }
					    if(npcArray[i].attacking && npcArray[i].npcYPos > mapArray[mapID].playerYPos - (npcArray[i].stopAt*96) && (npcArray[i].npcYPos != mapArray[mapID].playerYPos)){
						    //console.log("the npc should be in persuit up");
						    npcArray[i].npcYPos -= 3;
							npcArray[i].npcYSpeed = -3;
					    }
					    if(npcArray[i].attacking && npcArray[i].npcYPos < mapArray[mapID].playerYPos + (npcArray[i].stopAt*96) && (npcArray[i].npcYPos != mapArray[mapID].playerYPos)){
						    //console.log("the npc should be in persuit down");
						    npcArray[i].npcYPos += 3;
							npcArray[i].npcYSpeed = 3;
					    }
					    if(npcArray[i].attacking && (npcArray[i].npcYPos === mapArray[mapID].playerYPos) && (npcArray[i].npcXPos === mapArray[mapID].playerXPos) ){
						    console.log("the NPC has reached the player");
						    npcArray[i].npcYSpeed = 0;
						    npcArray[i].npcXSpeed = 0;
					    }
				    }
		    }
	    }
    }
    
    
    
    function checkAttack(direction){
	//checking to the left of the player
		
		if(direction === 1){
			for(var i = 0; i<npcArray.length; i++){
				
				if(npcArray[i].health!=undefined){
					if(npcArray[i].hostile === true && ((Math.round(npcArray[i].npcXPos/96)>=Math.round((mapArray[mapID].playerXPos-108)/96)) &&
					(Math.round(npcArray[i].npcXPos/96)<=Math.round((mapArray[mapID].playerXPos/96)))) && ((Math.round(npcArray[i].npcYPos/96)>=Math.round((mapArray[mapID].playerYPos+30)/96)) && (Math.round(npcArray[i].npcYPos/96)<=Math.round(((mapArray[mapID].playerYPos+40)/96))))) {
						npcArray[i].health=npcArray[i].health - playerData.weaponDamage;
						npcArray[i].taggedForCombat = true;
						if(npcArray[i].health<=0 && npcArray[i].alive){
							npcArray[i].alive = false;
							npcArray[i].taggedForCombat = false;
							
							npcArray[i].deathX = npcArray[i].npcXPos;
							npcArray[i].deathY = npcArray[i].npcYPos;
							createDrop(i);
							
						}
					}
				}
				if(npcArray[i].semiHostile && !npcArray[i].attacking && npcArray[i].taggedForCombat){
					//console.log("should be attacking you now");//debug
					npcArray[i].movesRandomly = true;
					npcArray[i].hostile = true;
					npcArray[i].attacking = true;
				}
			}
		}
		//checking right
		if(direction === 2){
			for(var i = 0; i<npcArray.length; i++){
				if(npcArray[i].health!=undefined){
					if(npcArray[i].hostile === true && ((Math.round(npcArray[i].npcXPos/96)>=Math.round((mapArray[mapID].playerXPos+20)/96)) &&
					(Math.round(npcArray[i].npcXPos/96)<=Math.round(((mapArray[mapID].playerXPos+136)/96)))) && ((Math.round(npcArray[i].npcYPos/96)>=Math.round((mapArray[mapID].playerYPos+30)/96)) && (Math.round(npcArray[i].npcYPos/96)<=Math.round(((mapArray[mapID].playerYPos+40)/96))))) {
						npcArray[i].health=npcArray[i].health - playerData.weaponDamage;
						npcArray[i].taggedForCombat = true;
						if(npcArray[i].health<=0 && npcArray[i].alive){
							npcArray[i].alive = false;
							npcArray[i].taggedForCombat = false;
							
							npcArray[i].deathX = npcArray[i].npcXPos;
							npcArray[i].deathY = npcArray[i].npcYPos;
							createDrop(i);
							
						}
					}
				}
				if(npcArray[i].semiHostile && !npcArray[i].attacking && npcArray[i].taggedForCombat){
					//console.log("should be attacking you now");//debug
					npcArray[i].movesRandomly = true;
					npcArray[i].hostile = true;
					npcArray[i].attacking = true;
				}
			}
		}
		//checking down
		if(direction === 3){
			for(var i = 0; i<npcArray.length; i++){
				if(npcArray[i].health!=undefined){
					if(npcArray[i].hostile === true && ((Math.round(npcArray[i].npcXPos/96)>=Math.round((mapArray[mapID].playerXPos+20)/96)) &&
					(Math.round(npcArray[i].npcXPos/96)<=Math.round(((mapArray[mapID].playerXPos+40)/96)))) && ((Math.round(npcArray[i].npcYPos/96)>=Math.round((mapArray[mapID].playerYPos+30)/96)) && (Math.round(npcArray[i].npcYPos/96)<=Math.round(((mapArray[mapID].playerYPos+100)/96))))) {
						npcArray[i].health=npcArray[i].health - playerData.weaponDamage;
						npcArray[i].taggedForCombat = true;
						if(npcArray[i].health<=0 && npcArray[i].alive){
							npcArray[i].alive = false;
							npcArray[i].taggedForCombat = false;
							
							npcArray[i].deathX = npcArray[i].npcXPos;
							npcArray[i].deathY = npcArray[i].npcYPos;
							createDrop(i);
							
						}
					}
				}
				if(npcArray[i].semiHostile && !npcArray[i].attacking && npcArray[i].taggedForCombat){
					//console.log("should be attacking you now");//debug
					npcArray[i].movesRandomly = true;
					npcArray[i].hostile = true;
					npcArray[i].attacking = true;
				}
			}
		}
		//checking up
		if(direction === 4){
			for(var i = 0; i<npcArray.length; i++){
				if(npcArray[i].health!=undefined){
					if(npcArray[i].hostile === true && ((Math.round(npcArray[i].npcXPos/96)>=Math.round((mapArray[mapID].playerXPos+10)/96)) &&
					(Math.round(npcArray[i].npcXPos/96)<=Math.round(((mapArray[mapID].playerXPos+30)/96)))) && ((Math.round(npcArray[i].npcYPos/96)>=Math.round((mapArray[mapID].playerYPos-124)/96)) && (Math.round(npcArray[i].npcYPos/96)<=Math.round(((mapArray[mapID].playerYPos)/96))))) {
						npcArray[i].health=npcArray[i].health - playerData.weaponDamage;
						npcArray[i].taggedForCombat = true;
						if(npcArray[i].health<=0 && npcArray[i].alive){
							npcArray[i].alive = false;
							npcArray[i].taggedForCombat = false;
							
							npcArray[i].deathX = npcArray[i].npcXPos;
							npcArray[i].deathY = npcArray[i].npcYPos;
							createDrop(i);
							
						}
					}
				}
				if(npcArray[i].semiHostile && !npcArray[i].attacking && npcArray[i].taggedForCombat){
					//console.log("should be attacking you now");//debug
					npcArray[i].movesRandomly = true;
					npcArray[i].hostile = true;
					npcArray[i].attacking = true;
				}
			}
		}
	}
	
	
	
	
	function showHealthBars(){
	    for(var i=0;i<npcArray.length;i++){
		    if(npcArray[i].health != undefined && npcArray[i].attacking && npcArray[i].alive){
			    context.fillStyle = "red";
				context.fillRect(npcArray[i].npcXPos-10,npcArray[i].npcYPos-50,100,10);
				context.fillStyle = "blue";
				context.fillRect(npcArray[i].npcXPos-10,npcArray[i].npcYPos-50,npcArray[i].health/npcArray[i].healthFactor,10);
				context.font = "10px times new roman";
				context.fillStyle = "white";
				context.fillText(npcArray[i].health+"/"+npcArray[i].fullHealth,npcArray[i].npcXPos,npcArray[i].npcYPos-40);
				context.fillText(npcArray[i].isCalled[0], npcArray[i].npcXPos,npcArray[i].npcYPos-50 );
		    }
	    }
	    /*if(playerData.health>=0){//this makes the player disappear?
		    context.fillStyle = "red";
		    context.fillRect(mapArray[mapID].playerXPos-10, mapArray[mapID].npcYPos-50,100,10);
		    context.fillStyle="yellow";
		    context.fillRect(mapArray[mapID].playerXPos-10,mapArray[mapID].playerYPos=50,playerData.health/playerData.healthFactor,10);
		    context.font = "10px times new roman";
			context.fillStyle = "white";
			context.fillText(mapArray[mapID].health+"/"+mapArray[mapID].fullHealth,mapArray[mapID].playerXPos,mapArray[mapID].playerYPos-40);
	    }*/
    }
    var randomItem = 0;
    function createDrop(count){
	    //uses deathX to print the item;
	    randomItem = Math.floor((Math.random() * 100000) + 1);
	    console.log(randomItem);
	    for(var i = 0; i<npcArray[count].dropTable.length; i++){    
		    if((randomItem >= npcArray[count].dropTable[i][0]) && (randomItem <= npcArray[count].dropTable[i][1])){
			    console.log("Item to be dropped is "+npcArray[count].dropTable[i][2]);
		    }
	    }
    }
    
    
    var waitWhileSpeaking = 0,
    randomStatement = 0,
    peopleSpeaking = 0;
    
	function checkNpcAndPlayerCollision() {
        for (var i = 0; i < npcArray.length; i++) {
	        if(npcArray[i].alive === true){
	            if ((Math.floor(mapArray[mapID].playerXPos / 96)) === ((Math.floor(npcArray[i].npcXPos / 96))) && ((Math.floor(mapArray[mapID].playerYPos / 96)) === Math.floor(npcArray[i].npcYPos / 96)) || (Math.ceil(mapArray[mapID].playerXPos / 96)) === ((Math.ceil(npcArray[i].npcXPos / 96))) && ((Math.ceil(mapArray[mapID].playerYPos / 96)) === Math.ceil(npcArray[i].npcYPos / 96)) || npcArray[i].speaking === true && npcArray[i].npcMapID === mapID) {
		            //NPCs which are lower on the for loop, for some reason, can interrupt those later on the for loop with their text.
		            //Begin code to have the NPC just say a random string which is defined in npcs.js
		            peopleSpeaking++ //this makes sure only one NPC is talking at a time
		            if(peopleSpeaking<=1){
		                if(npcArray[i].interaction){
			                waitWhileSpeaking++; //waits 5 seconds (150 frames at 60 fps)
			                if(!npcArray[i].speaking && !npcArray[i].attacking){
				                randomStatement = Math.floor((Math.random() * npcArray[i].responseString.length) + 0);
				                npcArray[i].speaking = true;
				                
			                }
			                if(npcArray[i].speaking && waitWhileSpeaking < 150){
				                context.font = "20px arial";
								context.fillStyle = "white";
			                	if(npcArray[i].responseString[randomStatement]!=undefined)
			                		context.fillText( npcArray[i].isCalled[0]+" : "+npcArray[i].responseString[randomStatement], + ((npcArray[i].npcXPos)-(npcArray[i].responseString[randomStatement].length)*2.2), npcArray[i].npcYPos); //Responds with a context.
			                	//Im working on an algorithm that will center the text over their head, and if over a specific length will move it up the font size + a few
			                	//pixels of padding to clear the statement below it to kind of type the way that I am right now.
			                }else{
				                waitWhileSpeaking = 0; //resets the speaking time
				                npcArray[i].speaking = false; 
				                /*the npc selected is no longer speaking. This is probably where the interruption is.
					            it checks for whoever is touched first in the for loop, and if the NPC has an earlier position in the array
				                it will clear the other persons text and place theirs instead. It is really confusing.
				                It wouldnt normally matter but if the NPC has more lines and picks a random repsonse string HIGHER in the array
				                values of the NPC that is later in the array, it will just return undefined. Say that the barmaid has 4 lines, but
				                the tavern maid only has 3, if the barmaid interrupts with the fourth line, and you leave her, it will go back
				                to the tavern maid, but it will still have that random number attached to it (4) and will just print undefined
				                over their head.
				                
				                I fixed the glitch when the NPC talking would pick a number out of the array of the other person and would cause
				                a crash. That was obnoxious as hell.
				                
				                */
			                }
		                }
	                }
	            }
            }
        }
        peopleSpeaking = 0;
    }

    function checkAnimation() {
        var baseCol = Math.floor(mapArray[mapID].playerXPos / mapArray[mapID].tileSize);
        var baseRow = Math.floor(mapArray[mapID].playerYPos / mapArray[mapID].tileSize);

        var ceilCol = Math.ceil(mapArray[mapID].playerXPos / mapArray[mapID].tileSize);
        var ceilRow = Math.ceil(mapArray[mapID].playerYPos / mapArray[mapID].tileSize); //not needed but ive kept it here in case I need it later.

        var colOverlap = mapArray[mapID].playerXPos % mapArray[mapID].tileSize > sprite.sizeDiff;
        var rowOverlap = mapArray[mapID].playerYPos % mapArray[mapID].tileSize > sprite.sizeDiff;
        var checkIfTouched = false;
        //what this does is checks the players coordinates based upon a set of coordinates which we will define in
        //the maps folder, these are where the doors and other animated things will go,
        //doors are displayed first. These are WALK ON animation tiles.
        //tiles like water which are constantly animated are not to be posted in here.
        
        if (sprite.playerXSpeed > 0 && !sprite.turnOffCollision) {
            if ((animateWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && !animateWalkOn.contains(level.tiles[baseRow][baseCol]) && colOverlap) && checkIfTouched === false) {
                for (var i = 0; i < mapArray[mapID].animations.length; i++) { //checking through the animations array
                    if ((mapArray[mapID].animations[i][0]) === Math.round(mapArray[mapID].playerYPos / 96) &&
                        mapArray[mapID].animations[i][1] === Math.round(mapArray[mapID].playerXPos / 96)) { //checks to make sure that the coords are the arrays
                        checkIfTouched = true;
                        context.drawImage(tileGraphics[57], (mapArray[mapID].animations[i][1]) * 96, mapArray[mapID].animations[i][0] * 96); //drawImage(image,x,y)

                        //dorOpen.play();
                    }
                }
            }
        }
        if ((animateWalkOn.contains(level.tiles[ceilRow - 1][ceilCol - 1]) && !animateWalkOn.contains(level.tiles[ceilRow][ceilCol]) && colOverlap) && checkIfTouched === false) {
            for (var i = 0; i < mapArray[mapID].animations.length; i++) { //checking through the animations array
                if (mapArray[mapID].animations[i][0] === Math.round(mapArray[mapID].playerYPos / 96) &&
                    mapArray[mapID].animations[i][1] === Math.round(mapArray[mapID].playerXPos / 96)) { //checks to make sure that the coords are the arrays
                    checkIfTouched = true;
                    context.drawImage(tileGraphics[57], mapArray[mapID].animations[i][1] * 96, mapArray[mapID].animations[i][0] * 96); //drawImage(image,x,y)

                    //dorOpen.play();
                }
            }
        }
        if (sprite.playerYSpeed > 0&& !sprite.turnOffCollision) {
            if ((animateWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && !animateWalkOn.contains(level.tiles[baseRow][baseCol]) && rowOverlap) || (animateWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && !animateWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && colOverlap && rowOverlap) &&
                checkIfTouched === true) {
                for (var i = 0; i < mapArray[mapID].animations.length; i++) { //checking through the animations array
                    if ((mapArray[mapID].animations[i][0]) === Math.round(mapArray[mapID].playerYPos / 96) &&
                        mapArray[mapID].animations[i][1] === Math.round(mapArray[mapID].playerXPos / 96)) { //checks to make sure that the coords are the arrays
                        checkIfTouched = true;
                        context.drawImage(tileGraphics[57], (mapArray[mapID].animations[i][1]) * 96, mapArray[mapID].animations[i][0] * 96); //drawImage(image,x,y)

                        //dorOpen.play();
                    }
                }

                //dorOpen.play();
            }
        }
        if (sprite.playerYSpeed < 0&& !sprite.turnOffCollision) {
            if ((!animateWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && animateWalkOn.contains(level.tiles[baseRow][baseCol])) || (!animateWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && animateWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && colOverlap) && checkIfTouched === true){
                for (var i = 0; i < mapArray[mapID].animations.length; i++) { //checking through the animations array
                    if ((mapArray[mapID].animations[i][0]) === Math.round(mapArray[mapID].playerYPos / 96) &&
                        mapArray[mapID].animations[i][1] === Math.round(mapArray[mapID].playerXPos / 96)) { //checks to make sure that the coords are the arrays
                        checkIfTouched = true;
                        context.drawImage(tileGraphics[57], (mapArray[mapID].animations[i][1]) * 96, mapArray[mapID].animations[i][0] * 96); //drawImage(image,x,y)

                        //dorOpen.play();
                    }
                }
            }
        }
        checkIfTouched = false;
    }
    

	
    //created this function to print out the players coordinates
    function printCoords() {
        var xCoordinate = (Math.round(mapArray[mapID].playerXPos / mapArray[mapID].tileSize));
        var yCoordinate = (Math.round(mapArray[mapID].playerYPos / mapArray[mapID].tileSize));
        

	    
	    /*This is an attempt at changing the current position tile to the next one. it is completely screwed up, but once I fix it, map making will be a piece of cake. I will also turn off collision
	    for the character with this so he can "fly" and do a noclip
	    
	    */
		//if(xCoordinate === 5 && yCoordinate === 23){
		//	playerTouchedItem = true;
		//}
        context.font = "30px times new roman";
        context.fillStyle = "red";
        context.fillText("y:" + yCoordinate, mapArray[mapID].playerXPos - 400, mapArray[mapID].playerYPos - 220);
        context.fillText("x:" + xCoordinate, mapArray[mapID].playerXPos - 400, mapArray[mapID].playerYPos - 250); //coordinates follow npc and display as XY:N

    }
	function commentOnTiles() {
		if(mapArray[mapID] === mapArray[0]){
			context.font = "30px impact"
			context.fillStyle = "blue";
			context.fillText("Welcome to the redemption pre alpha!",9*96,11*96);
			context.fillText("Plan for city entrances.",48*96,4*96);
			context.fillText("House to test door collision.",22*96,11*96);
			context.fillText("This guy will follow you if you cross this text",25*96,15*96);
			context.fillText("You can attack him, finally.",25*96,16*96);
			context.fillText("Test Stone Pictures/Beds in the future",40*96,19*96);
		}
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
    
    animationCounter = 0;

    //Takes care of the multiple directions
    function drawPlayerOnMove() {
	    if(animationCounter === 20 && sprite.animateWalking === false && sprite.isMoving === true){
		    sprite.animateWalking = true;
		    animationCounter = 0;
	    }else if(animationCounter === 20 && sprite.animateWalking === true && sprite.isMoving === true){
		    sprite.animateWalking = false;
		    animationCounter = 0;
	    }
		if(sprite.playerIsAttacking === false && sprite.isMoving === false){
        	context.drawImage(spritePic[0], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
        	context.drawImage(weaponPic[4],mapArray[mapID].playerXPos+48,mapArray[mapID].playerYPos+50);
        	}
        //left drawing
        sprite.isMoving = false;
        if (65 in keysDown || 37 in keysDown ) {
	        sprite.isMoving = true;
            //walking.play();
            //left up
            if ((65 in keysDown || 37 in keysDown) && (87 in keysDown || 38 in keysDown)) {
                //left up down
                if ((65 in keysDown || 37 in keysDown) && (87 in keysDown || 38 in keysDown) && (83 in keysDown || 40 in keysDown)) {
                    //all 4 buttons
                    if ((65 in keysDown || 37 in keysDown) && (87 in keysDown || 38 in keysDown) && (68 in keysDown || 39 in keysDown) && (83 in keysDown || 40 in keysDown)) {
                        context.drawImage(spritePic[4], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
                    } else if(sprite.playerIsAttacking === false){
                    	sprite.isMoving = true;
                        context.drawImage(spritePic[0], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
                    }
                }
                //left up right
                else if ((65 in keysDown || 37 in keysDown) && (87 in keysDown || 38 in keysDown) && (68 in keysDown || 39 in keysDown)) {
	                sprite.isMoving = true;
                    context.drawImage(spritePic[7], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
                } else {
                	sprite.isMoving = true;
                    context.drawImage(spritePic[8], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
                    }
            }
            //left down
            else if ((83 in keysDown || 40 in keysDown) && (65 in keysDown || 37 in keysDown)) {
                //left down up 
                if ((83 in keysDown || 40 in keysDown) && (65 in keysDown || 37 in keysDown) && (68 in keysDown || 39 in keysDown && sprite.playerIsAttacking === false)) {
                    sprite.isMoving = true;
                    context.drawImage(spritePic[1], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
                } else {
                		sprite.isMoving = true;
                    	context.drawImage(spritePic[6], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
                    }
            }
            //left right
            else if ((65 in keysDown || 37 in keysDown) && (68 in keysDown || 39 in keysDown)) {
                context.drawImage(spritePic[0], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
            } else if(sprite.playerIsAttacking === false){
	            sprite.isMoving = true;
		            if(sprite.animateWalking === false){
	                	context.drawImage(spritePic[7], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
	                	animationCounter++;
	                }else if (sprite.animateWalking === true){
		                context.drawImage(spritePic[8], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
		                animationCounter++;
		                
	                }
                }
        }
        //up drawing
        else if (87 in keysDown || 38 in keysDown) {
            //walking.play();
            //up right
            if ((87 in keysDown || 38 in keysDown) && (68 in keysDown || 39 in keysDown)) {
                //up right down
                if ((87 in keysDown || 38 in keysDown) && (68 in keysDown || 39 in keysDown) && (83 in keysDown || 40 in keysDown) && sprite.playerIsAttacking === false) {
	                sprite.isMoving = true;
                    context.drawImage(spritePic[10], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
                } else {
	                sprite.isMoving = true;
	                ;
                    context.drawImage(spritePic[11], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
                    }
            }
            //up down
            else if ((87 in keysDown || 38 in keysDown) && (83 in keysDown || 40 in keysDown)) {
                context.drawImage(spritePic[0], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
            } else{
	            sprite.isMoving = true;
                if(sprite.animateWalking === false){
	                	context.drawImage(spritePic[4], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
	                	animationCounter++;
	                }else if (sprite.animateWalking === true){
		                context.drawImage(spritePic[5], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
		                animationCounter++;
		                
	                }
                }
        }
        //right drawing
        else if (68 in keysDown || 39 in keysDown) {
            //walking.play();
            //right down
            if ((68 in keysDown || 39 in keysDown) && (83 in keysDown || 40 in keysDown)) {
	            sprite.isMoving = true;
                context.drawImage(spritePic[10], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
            } else if(sprite.playerIsAttacking === false){
	            sprite.isMoving = true;
               if(sprite.animateWalking === false){
	                	context.drawImage(spritePic[10], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
	                	animationCounter++;
	                }else if (sprite.animateWalking === true){
		                context.drawImage(spritePic[11], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
		                animationCounter++;
		                
	                }
                
                }
        }
        //down drawing
        else if (83 in keysDown || 40 in keysDown) {
            //walking.play();
            sprite.isMoving = true;
            if(sprite.animateWalking === false){
	                	context.drawImage(spritePic[1], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
	                	context.drawImage(weaponPic[4],mapArray[mapID].playerXPos+45,mapArray[mapID].playerYPos+50);
	                	animationCounter++;
	                }else if (sprite.animateWalking === true){
		                context.drawImage(spritePic[2], mapArray[mapID].playerXPos, mapArray[mapID].playerYPos);
		                context.drawImage(weaponPic[4],mapArray[mapID].playerXPos+56,mapArray[mapID].playerYPos+45);
		                animationCounter++;
		                
	        }
        }
    }



    // function to handle the game itself

    function updateGame() {



        //Player movement and angular movement	

        //Yup.......SO MUCH SIMPLER all if statements so they can run next to each other
        //also combined mapArray[mapID].playerXPos += sprite.playerXSpeed=(-sprite.movementSpeed) so it would update position correctly (fixed the buggy movement) as well as keep the speed in for collision

        //FLAG NEEDS WORK = We can probably make the images for the sprite work here somehow.
        if ((65 in keysDown || 37 in keysDown)&& sprite.playerIsAttacking === false) {
            mapArray[mapID].playerXPos += sprite.playerXSpeed = (-sprite.movementSpeed);
            if(sprite.turnOffCollision){
	            context.translate((-sprite.playerXSpeed), 0);
            }
        }
        if ((87 in keysDown || 38 in keysDown) && sprite.playerIsAttacking === false) {
            mapArray[mapID].playerYPos += sprite.playerYSpeed = (-sprite.movementSpeed);
            if(sprite.turnOffCollision){
	            context.translate(0, (-sprite.playerYSpeed));
            }
        }
        if ((68 in keysDown || 39 in keysDown) && sprite.playerIsAttacking === false) {
            mapArray[mapID].playerXPos += sprite.playerXSpeed = sprite.movementSpeed;
            if(sprite.turnOffCollision){
	            context.translate((-sprite.playerXSpeed), 0);
            }
        }
        if ((83 in keysDown || 40 in keysDown) && sprite.playerIsAttacking === false) {
            mapArray[mapID].playerYPos += sprite.playerYSpeed = sprite.movementSpeed;
            if(sprite.turnOffCollision){
	            context.translate(0, (-sprite.playerYSpeed));
            }
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



        if (sprite.playerXSpeed > 0  && !sprite.turnOffCollision) {
            if ((cantWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && !cantWalkOn.contains(level.tiles[baseRow][baseCol]) && colOverlap) || (cantWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && !cantWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && rowOverlap && colOverlap)) {
                mapArray[mapID].playerXPos = baseCol * mapArray[mapID].tileSize + sprite.sizeDiff;
                context.restore();
            }
            //checks for player movement to the left to move the camera according to speed (keeps you from having the issue where you slide on a wall and the cam moves) the !(keys) statement keeps the cam from glitching if you hit left and right at the same time, this checks both ways so its only needed once
            else if ((68 in keysDown || 39 in keysDown) && !(((68 in keysDown || 39 in keysDown) && ((65 in keysDown || 37 in keysDown))))&& sprite.playerIsAttacking === false)
                context.translate((-sprite.playerXSpeed), 0);
        }
        if (sprite.playerXSpeed < 0  && !sprite.turnOffCollision) {
            if ((!cantWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && cantWalkOn.contains(level.tiles[baseRow][baseCol])) || (!cantWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && cantWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && rowOverlap)) {
                mapArray[mapID].playerXPos = (baseCol + 1) * mapArray[mapID].tileSize;
                context.restore();
            }
            //same as above but checks for movement to the right
            else if ((65 in keysDown || 37 in keysDown) && sprite.playerIsAttacking === false)
                context.translate((-sprite.playerXSpeed), 0);
        }
        var promptCheck = false;
        /*Prompt upon walking into blocks for teleportation and other on-entering effects that COLLIDE*/
        if (sprite.playerXSpeed > 0  && !sprite.turnOffCollision) {
            if ((promptWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && !promptWalkOn.contains(level.tiles[baseRow][baseCol]) && colOverlap) || (promptWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && !promptWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && rowOverlap && colOverlap)) {
                //right
                promptCheck = false;
                promptCheck = confirm("Do you want to enter?");
                keyClear();
                if (!promptCheck) {
                    mapArray[mapID].playerXPos = (baseCol * mapArray[mapID].tileSize + sprite.sizeDiff) - 10;
                    alert("You step away from the entrance");
                } else {
                    mapArray[mapID].playerXPos = baseCol * mapArray[mapID].tileSize + sprite.sizeDiff;
                    mapArray[mapID].playerXPos = (baseCol * mapArray[mapID].tileSize + sprite.sizeDiff) - 10;
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    changeMap();
                    console.log("change map");
                }
            }
        }
        if (sprite.playerXSpeed < 0  && !sprite.turnOffCollision) {
            if ((!promptWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && promptWalkOn.contains(level.tiles[baseRow][baseCol])) || (!promptWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && promptWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && rowOverlap)) {
                //left
                promptCheck = true;
                /*promptCheck = confirm("Do you want to enter?");*/
                keyClear();
                if (!promptCheck) {
                    mapArray[mapID].playerXPos = ((baseCol + 1) * mapArray[mapID].tileSize) + 10;
                    /*alert("You step away from the entrance");*/
                } else {
                    mapArray[mapID].playerXPos = baseCol * mapArray[mapID].tileSize + sprite.sizeDiff;
                    mapArray[mapID].playerXPos = ((baseCol + 1) * mapArray[mapID].tileSize) + 10;
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    changeMap();
                    console.log("change map");
                }

            }
        }
        //========================NPC COLLISION===============================================
        for (var i = 0; i < npcArray.length; i++) {
            var NPCbaseCol = Math.floor(npcArray[i].npcXPos / mapArray[mapID].tileSize);
            var NPCbaseRow = Math.floor(npcArray[i].npcYPos / mapArray[mapID].tileSize);

            var NPCcolOverlap = npcArray[i].npcXPos % mapArray[mapID].tileSize > npcArray[i].npcSizeDiff;
            var NPCrowOverlap = npcArray[i].npcYPos % mapArray[mapID].tileSize > npcArray[i].npcSizeDiff;
            //check if the player is touching left and right for animation

            if (npcArray[i].npcXSpeed > 0) {
                if ((cantWalkOn.contains(level.tiles[NPCbaseRow][NPCbaseCol + 1]) && !cantWalkOn.contains(level.tiles[NPCbaseRow][NPCbaseCol]) && NPCcolOverlap) || (cantWalkOn.contains(level.tiles[NPCbaseRow + 1][NPCbaseCol + 1]) && !cantWalkOn.contains(level.tiles[NPCbaseRow + 1][NPCbaseCol]) && NPCrowOverlap && NPCcolOverlap)) {
                    npcArray[i].npcXPos = NPCbaseCol * mapArray[mapID].tileSize + npcArray[i].npcSizeDiff;
                }
                //checks for player movement to the left to move the camera according to speed (keeps you from having the issue where you slide on a wall and the cam moves) the !(keys) statement keeps the cam from glitching if you hit left and right at the same time, this checks both ways so its only needed once
            }
            if (npcArray[i].npcXSpeed < 0) {
                if ((!cantWalkOn.contains(level.tiles[NPCbaseRow][NPCbaseCol + 1]) && cantWalkOn.contains(level.tiles[NPCbaseRow][NPCbaseCol])) || (!cantWalkOn.contains(level.tiles[NPCbaseRow + 1][NPCbaseCol + 1]) && cantWalkOn.contains(level.tiles[NPCbaseRow + 1][NPCbaseCol]) && NPCrowOverlap)) {
                    npcArray[i].npcXPos = (NPCbaseCol + 1) * mapArray[mapID].tileSize;
                }
                //same as above but checks for movement to the right
            }
            NPCbaseCol = Math.floor(npcArray[i].npcXPos / mapArray[mapID].tileSize);
            NPCbaseRow = Math.floor(npcArray[i].npcYPos / mapArray[mapID].tileSize);
            NPCrowOverlap = npcArray[i].npcXPos % mapArray[mapID].tileSize > npcArray[i].npcSizeDiff;
            NPCcolOverlap = npcArray[i].npcYPos % mapArray[mapID].tileSize > npcArray[i].npcSizeDiff;

            if (npcArray[i].npcYSpeed > 0) {
                if ((cantWalkOn.contains(level.tiles[NPCbaseRow + 1][NPCbaseCol]) && !cantWalkOn.contains(level.tiles[NPCbaseRow][NPCbaseCol]) && NPCrowOverlap) || (cantWalkOn.contains(level.tiles[NPCbaseRow + 1][NPCbaseCol + 1]) && !cantWalkOn.contains(level.tiles[NPCbaseRow][NPCbaseCol + 1]) && NPCcolOverlap && NPCrowOverlap)) {
                    npcArray[i].npcYPos = NPCbaseRow * mapArray[mapID].tileSize + sprite.sizeDiff;
                }
            }
            //checks for NPC Movement up
            if (npcArray[i].npcYSpeed < 0) {
                if ((!cantWalkOn.contains(level.tiles[NPCbaseRow + 1][NPCbaseCol]) && cantWalkOn.contains(level.tiles[NPCbaseRow][NPCbaseCol])) || (!cantWalkOn.contains(level.tiles[NPCbaseRow + 1][NPCbaseCol + 1]) && cantWalkOn.contains(level.tiles[NPCbaseRow][NPCbaseCol + 1]) && NPCcolOverlap)) {
                    npcArray[i].npcYPos = (NPCbaseRow + 1) * mapArray[mapID].tileSize;
                }
                //same as above but checks for movement down
            }
        }

        //=	=	=	=	=	=	=	=	=	=	=	=	=	END NPC COLLISION	=	=	=	=	=	=	=	=	=	=	=	=


        baseCol = Math.floor(mapArray[mapID].playerXPos / mapArray[mapID].tileSize);
        baseRow = Math.floor(mapArray[mapID].playerYPos / mapArray[mapID].tileSize);
        colOverlap = mapArray[mapID].playerXPos % mapArray[mapID].tileSize > sprite.sizeDiff;
        rowOverlap = mapArray[mapID].playerYPos % mapArray[mapID].tileSize > sprite.sizeDiff;




        if (sprite.playerYSpeed > 0 && !sprite.turnOffCollision) {
            if ((cantWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && !cantWalkOn.contains(level.tiles[baseRow][baseCol]) && rowOverlap) || (cantWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && !cantWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && colOverlap && rowOverlap)) {
                mapArray[mapID].playerYPos = baseRow * mapArray[mapID].tileSize + sprite.sizeDiff;
                context.restore();
            }

            //checks for player movement up to move the camera according to speed (keeps you from having the issue where you slide on a wall and the cam moves) the !(keys) statement keeps the cam from glitching if you hit up and down at the same time, this checks both ways so its only needed once
            else if ((83 in keysDown || 40 in keysDown) && !((83 in keysDown || 40 in keysDown) && (87 in keysDown || 38 in keysDown))&& sprite.playerIsAttacking === false)
                context.translate(0, (-sprite.playerYSpeed));
        }
        if (sprite.playerYSpeed < 0 && !sprite.turnOffCollision) {
            if ((!cantWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && cantWalkOn.contains(level.tiles[baseRow][baseCol])) || (!cantWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && cantWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && colOverlap)) {
                mapArray[mapID].playerYPos = (baseRow + 1) * mapArray[mapID].tileSize;
                context.restore();
            }
            //same as above but checks for movement down
            else if ((87 in keysDown || 38 in keysDown)&& sprite.playerIsAttacking === false)
                context.translate(0, (-sprite.playerYSpeed));
        }
        if (sprite.playerYSpeed > 0 && !sprite.turnOffCollision) {
            if ((promptWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && !promptWalkOn.contains(level.tiles[baseRow][baseCol]) && rowOverlap) || (promptWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && !promptWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && colOverlap && rowOverlap) && sprite.playerIsAttacking === false ) {
                //down
                promptCheck = false;
                promptCheck = confirm("Do you want to enter?");
                keyClear();
                if (!promptCheck) {
                    context.translate(0, (10));
                    mapArray[mapID].playerYPos = (baseRow * mapArray[mapID].tileSize + sprite.sizeDiff) - 10;
                    alert("You step away from the entrance");
                } else {
                    context.translate(0, (10));
                    mapArray[mapID].playerXPos = baseCol * mapArray[mapID].tileSize + sprite.sizeDiff;
                    mapArray[mapID].playerYPos = (baseRow * mapArray[mapID].tileSize + sprite.sizeDiff) - 10;
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    changeMap();
                    console.log("change map");
                }
            }
        }
        if (sprite.playerYSpeed < 0 && !sprite.turnOffCollision) {
            if ((!promptWalkOn.contains(level.tiles[baseRow + 1][baseCol]) && promptWalkOn.contains(level.tiles[baseRow][baseCol])) || (!promptWalkOn.contains(level.tiles[baseRow + 1][baseCol + 1]) && promptWalkOn.contains(level.tiles[baseRow][baseCol + 1]) && colOverlap)) {
                //up
                promptCheck = confirm("Do you want to enter?");
                keyClear();
                if (!promptCheck) {
                    context.translate(0, (10));
                    mapArray[mapID].playerYPos = ((baseRow + 1) * mapArray[mapID].tileSize) + 10;
                    alert("You step away from the entrance");
                } else {
                    context.translate(0, (10));
                    mapArray[mapID].playerXPos = baseCol * mapArray[mapID].tileSize + sprite.sizeDiff;
                    mapArray[mapID].playerYPos = ((baseRow + 1) * mapArray[mapID].tileSize) + 10;
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    changeMap();
                    console.log("change map");
                }

            }
        }
        //Maybe?



        function keyClear() {
            for (key in keysDown) {
                delete keysDown[key];
            }
        }
        //may 25 2016
        function changeMap() {
	        context.clearRect(0,0,mapArray[mapID].levelCols*96,mapArray[mapID].levelRows*96);
            /*begin added code*/
            console.log(" ");
            console.log(" ");
            var firstRun = true;
            var i = 0;
            var match = false;
            while (i < mapArray[mapID].mapChangePositions.length && !match) {

                if ((Math.round(mapArray[mapID].playerXPos / 96) === (mapArray[mapID].mapChangePositions[i][0])) || ((Math.round(mapArray[mapID].playerXPos / 96) + 1) === (mapArray[mapID].mapChangePositions[i][0])) || ((Math.round(mapArray[mapID].playerXPos / 96) - 1) === (mapArray[mapID].mapChangePositions[i][0]))) {
                    console.log("Coordinates picked up: x:" + (Math.round(mapArray[mapID].playerXPos / 96)) + " y:" + (Math.round(mapArray[mapID].playerYPos / 96)));
                    console.log("x is correct, checking y");
                    xCheck = true;
                }


                if ((Math.round(mapArray[mapID].playerYPos / 96) === (mapArray[mapID].mapChangePositions[i][1])) || ((Math.round(mapArray[mapID].playerYPos / 96) + 1) === (mapArray[mapID].mapChangePositions[i][1])) || ((Math.round(mapArray[mapID].playerYPos / 96) - 1) === (mapArray[mapID].mapChangePositions[i][1]))) {
                    if (xCheck) {
                        console.log("Coordinates picked up: x:" + (Math.round(mapArray[mapID].playerXPos / 96)) + " y:" + (Math.round(mapArray[mapID].playerYPos / 96)));
                        console.log("MATCH FOUND : checked at x:" + mapArray[mapID].mapChangePositions[i][0] + " y:" + mapArray[mapID].mapChangePositions[i][1]);
                        match = true;
                        oldMapID = mapID;
                        mapID = mapArray[mapID].mapChangePositions[i][3];
                    }
                } else {
                    xCheck = false;
                }

                if (!match) {
                    i++;
                };
                if (i === 0) {
                    firstRun = false;
                }
                console.log("i:" + i);
            }

            /*end added code*/
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
            console.log(oldMapID+":old map id");
            context.translate(
                (mapArray[oldMapID].playerXPos / mapArray[oldMapID].tileSize) - (mapArray[oldMapID].mapChangePositions[i][4]) * mapArray[oldMapID].tileSize,
                (mapArray[oldMapID].playerYPos / mapArray[oldMapID].tileSize) - (mapArray[oldMapID].mapChangePositions[i][5]) * mapArray[oldMapID].tileSize);
            //Centers the initial load around the player. Totally not working atm, BUT IM GETTING THERE!!!!!!!!!!	
            //context.translate((mapArray[mapID].playerXPos/mapArray[mapID].tileSize)-(3/2)*mapArray[mapID].tileSize,(mapArray[mapID].playerYPos/mapArray[mapID].tileSize)-(3/2)*mapArray[mapID].tileSize);

        }

        function loadTiles() {
            context.clearRect(0, 0, canvas.width, canvas.height);
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