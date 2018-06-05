function enemyPathFind(){
	console.log("this is likely to be completely broken");
	
	
}


		//guard left hand weapon coords for adamantite: 15/55
		//guard right hand weapon coords for adamantite: 53/55

/*
	There is five types of pathfinding that Redemption will use,
	DONE
	One is random pathfinding, this type is similar to how RuneScape does their pathfinding. It is random movement in a direction for a random amount of time, or until it
	touches a wall in which case it just stops the function. This type of pathfinding is used primarily, and it is the least processor intensive. The NPCs only stop if the
	player is colliding with them. (This is yet to be added)
	
	
	Two is pathwalking, where the NPC will walk paths (sidewalks), enter buildings, and just do NPC things to make it look more like a town. This is the second most used, and
	the way we will do this is just assigning them only the ability to walk on specific Tiles and walk directionally, instead of diagonally. (Pretty much only clear tiles.)
	
	
	DONE
	The third type of pathfinding is Follower Pathfinding, which they will follow you around and this is the first of the intensive pathfinding. The NPC will constantly be
	trying to update his position and find the best path to take to the player. The player will only be allowed two followers, and this will require a lot of optimization and
	maybe even movement to another programming platform to try and make a native based game instead of a fully browser based game. I would prefer to not use Java however, as
	I would still like to use an applet if possible and it seems that browsers are dropping their support for it. Javascript seems to work just fine so far however.
	
	
	HALF DONE
	Fourth is Hostile Pathfinding. This uses the same code as the follower pathfinding, only they will come much closer and then will enter combat with the player or the
	follower. This is chosen at random, and followers can have different weights depending on their defense and health to be attacked or not. 
	Each NPC is given a Hostile tag, which is dedicated to the pathfinding function, and if they are hostile they will automagically begin attacking the player. They
	only use the random pathfinding until the player is within its "range of sight" which we can describe as their npcXPos/npcYPos - x/y and +x/y.
	
	
	DONE
	The final is semi-hostile, which means they will just stand still or walk paths. These are NPCs which are capable of fighting, and have tags for combat, but they
	do not attack unless provoked. (IE: A guard, a follower). They will only attack when provoked, such as an NPC with the hostile tag coming within THEIR sights, or the
	player does something which requires hostility. They will only become hostile in self defense or provoked situations, otherwise (Say they are a guard and you are caught
	stealing within their viewsight (THEY DO NOT HAVE A CENTER PICTURE WHILE GUARDING. THEY ARE ALWAYS FACING A SPECIFIC DIRECTION, AND CAN ONLY SEE A "CONE" OF SIGHT AHEAD OF THEM FOR
	A SPECIFIC AMOUNT OF TILES) they will just approach with their weapon wielded similar to skyrim and arrest the player. YES we can use HALT HALT HALT as a reference to daggerfall.

*/



var npcArray = [];

var barMaid = {
		alive:true,
		hostile: false,
		isCalled: ["Sophia", "Adelaide", "Tallah", "Kate"],
        npcXPos : 800,
        npcYPos : 600,
        npcSize : 96,
        npcXSpeed: 0,
        npcYSpeed: 0,
        npcCol: 7,
        npcRow: 6,
        npcMovementSpeed: 5,
        npcSizeDiff: 32,
        npcMapId: 0,
        picID: 2,
        loop: true,
        finished: 0,
        npcMove: 0,
        npcMovement: 0,
        interaction: true,
        speaking: false,
        responseString: ["Hi, how can I help you?", "That old man just took your spork", "Hi! Welcome to the Bad Dog!",
        "We've got rooms for rent and food.", "If you want to rent a room, talk to Tilda."],
        meantForBusiness: true
}
npcArray.push(barMaid);
var tavernOwner = {
		alive:true,
		movesRandomly: false,
		hostile: false,
		isCalled: ["Tilda", "Anne", "Madison", "Caroline", "Molly", "Claire"],
	    npcXPos : 12*96,
        npcYPos : 4*96,
        npcSize : 96,
        npcXSpeed: 0,
        npcYSpeed: 0,
        npcCol: 7,
        npcRow: 6,
        npcMovementSpeed: 5,
        npcSizeDiff: 32,
        npcMapID: 0,
        picID: 1,
        loop: true,
        finished: 0,
        npcMove: 0,
        npcMovement: 0,
        interaction: true,
        speaking: false,
        responseString: ["Hi, would you like to rent a room?", "You don't look like you're from here.", "I am Tilda. I own this tavern."],
        meantForBusiness: true
}
npcArray.push(tavernOwner);
var scaryMageDude = {
	
		
		alive:true, //checks if they need all the movement stuff, overall saves time
		hostile: true, //this checks if they will attack you if you get in range
		attacking: false, //this means they are in persuit of the player
		health:100, //this is the health of the NPC at the start
		healthFactor:1, //this is the factor out of 100. Say he has 120 health, his healthfactor is 1.2. Every 1 = 100
		fullHealth: 100, //this is to reset his health at the end, may be able to just do healthFactor*100 in the future
        deathTimer: 180, //amount of frames until respawn
        timeDead:0, //adds every frame
        initialX: 26*96, //this is the respawn point of x
        initialY: 17*96, //this is the respawn point of y
        deathX:0,	//this is used for dropping items
        deathY:0,
        willTravel: 12, //this is supposed to be the NPCs range that they will follow
        range : 3, //this is how close you need to be for the NPC to start attacking you
        stopAt: 1, //this is the amount of tiles away the NPC will stop so he doesnt just stand on top of you.
        
        
		npcXPos : 27*96,
        npcYPos : 17*96,
        npcSize : 64,
        npcXSpeed: 0,
        npcYSpeed: 0,
        npcCol: 7,
        npcRow: 6,
        npcMovementSpeed: 5,
        npcSizeDiff: 32,
        npcMapID: 0,
        picID: 0,
        loop: true,
        finished: 0,
        npcMove: 0,
        npcMovement: 0,
        interaction: true,
        speaking: false,
        isCalled:["Cryptus"],
        responseString: ["DO YOU LIKE MY RED SHOES?!?!?!?!?!", "I am creepy mage guy.", "Avada Kedabra!", "I BREAK EVERYTHING"],
        meantForBusiness: false
}
npcArray.push(scaryMageDude);
var guard1 = {
		factionID: 100, //this means they are in the guards, and it is currently unused. It will make other guards help.
	
		isArmed:true, //check to save time if the NPC even needs to have a weapon added.
		weaponID:9, //the ID of the weapon they use (adamantite)
		weaponX:53, //the X Position of their hand for the hilt relative to the NPC
		weaponY:55, //the Y position of their hand for their hilt relative to the NPC
		movesRandomly: false,
		
		alive:true, //checks if they need all the movement stuff, overall saves time
		hostile: true, //this checks if they will attack you if you get in range
		semiHostile:true, //this is the tag to attack in self defense
		attacking: false, //this means they are in persuit of the player
		health:500, //this is the health of the NPC at the start
		healthFactor:5, //this is the factor out of 100. Say he has 120 health, his healthfactor is 1.2. Every 1 = 100
		fullHealth: 500, //this is to reset his health at the end, may be able to just do healthFactor*100 in the future
        deathTimer: 180, //amount of frames until respawn
        timeDead:0, //adds every frame
        initialX: 48*96, //this is the respawn point of x
        initialY: 7*96, //this is the respawn point of y
        deathX:0,	//this is used for dropping items
        deathY:0,
        willTravel: 12, //this is supposed to be the NPCs range that they will follow
        range : 0, //this is how close you need to be for the NPC to start attacking you - 0 = semi-hostile
        stopAt: 1, //this is the amount of tiles away the NPC will stop so he doesnt just stand on top of you.
        taggedForCombat: false, //This makes sure that only that specific NPC will attack, instead of being mobbed by every hostile on the map
		
		isCalled: ["Elysia Guard"], //npcs have names!
	    npcXPos : 48*96, //current position of the NPC on the X axis
        npcYPos : 7*96, //current position of the npc on the Y axis

        npcSize : 96, //obvious
        npcXSpeed: 0, //checks if theyre moving left/right in collision
        npcYSpeed: 0, //checks if theyre moving in collision up/down
        npcCol: 7, //broken, doesnt work
        npcRow: 6, //broken, doesnt work
        npcMovementSpeed: 5, //amount of pixels per frame they should move
        npcSizeDiff: 32,
        npcMapID: 0, //the ID of the map they should spawn on
        picID: 4, //its their array ID in npcPics!
        loop: true, //not sure, cant remmeber off the top of my head
        finished: 0, //checks if the NPC is finished talking
        npcMove: 0,
        npcMovement: 0,
        interaction: true, //checks if the NPC can even talk
        speaking: false, //checks if the NPC is talking
        responseString: ["You may enter Elysia, but I've got my eyes on you.", "Boy the sun is hot today..", "No one ever even comes in the gates here."],
		//currently unused, obvious what their purpose is
        combatSpeak:0,
        combatSpeakCounter:0,
        combatString: ["Halt! In the name of Elysian Justice!","You have insulted our king! Prepare to die!","Thee shall not see tomorrow after this!"],
        meantForBusiness: false, //this is meant for trading later
        
        dropTable: [ //each drop table adds up to 100,000, up to a 1/100,000 chance of an item dropping. a value of 0 means that the item will ALWAYS drop.
	        [     0, 59999, "images/weapons/bronze.png"			, false], //60% droprate
	        [ 60000, 79999,"images/weapons/ironSwordRight.png"	, false], //20% droprate
	        [ 80000, 89999,"images/weapons/mythril.png"		, false], //10% droprate
	        [ 90000, 97999,"images/weapons/adamant.png"		, false], //8% droprate
	        [ 98000, 98999,"images/weapons/deathstone.png"		, false], //1% droprate
	        [ 99000,100000,"images/weapons/deathStone.png"		, false], //1% droprate
        ],
        
        dropPickedUp: false,
}
npcArray.push(guard1);
var guard2 = {
		factionID: 100, 
		
		isArmed: true,
		weaponID:9,
		weaponX:15,
		weaponY:55,
		movesRandomly: false,
		
		alive:true, //checks if they need all the movement stuff, overall saves time
		hostile: true, //this checks if they will attack you if you get in range
		semiHostile:true, //this is the tag to attack in self defense
		attacking: false, //this means they are in persuit of the player
		health:500, //this is the health of the NPC at the start
		healthFactor:5, //this is the factor out of 100. Say he has 120 health, his healthfactor is 1.2. Every 1 = 100
		fullHealth: 500, //this is to reset his health at the end, may be able to just do healthFactor*100 in the future
        deathTimer: 180, //amount of frames until respawn
        timeDead:0, //adds every frame
        initialX: 48*96, //this is the respawn point of x
        initialY: 2*96, //this is the respawn point of y
        deathX:0,	//this is used for dropping items
        deathY:0,
        willTravel: 12, //this is supposed to be the NPCs range that they will follow
        range : 0, //this is how close you need to be for the NPC to start attacking you - 0 = semi-hostile
        stopAt: 1, //this is the amount of tiles away the NPC will stop so he doesnt just stand on top of you.
		taggedForCombat: false, //This makes sure that only that specific NPC will attack, instead of being mobbed by every hostile on the map
		
		isCalled: ["Elysia Guard"],
	    npcXPos : 48*96,
        npcYPos : 2*96,

        npcSize : 96,
        npcXSpeed: 0,
        npcYSpeed: 0,
        npcCol: 7,
        npcRow: 6,
        npcMovementSpeed: 5,
        npcSizeDiff: 32,
        npcMapID: 0,
        picID: 4,
        loop: true,
        finished: 0,
        npcMove: 0,
        npcMovement: 0,
        interaction: true,
        speaking: false,
        responseString: ["Wait, how did you get back here?","The devs worked hard, stop breaking the game.","This area is off limits. Wait, how did you even get here?","...Really, you glitched the collision?"],
        meantForBusiness: false,
} 
npcArray.push(guard2);


/*var dragon = {
		npcXPos : 2700,
        npcYPos : 2100,
        npcSize : 64,
        npcXSpeed: 0,
        npcYSpeed: 0,
        npcCol: 7,
        npcRow: 6,
        npcMovementSpeed: 5,
        npcSizeDiff: -192,
        npcMapID: 0,
        picID: 13,
        loop: true,
        finished: 0,
        npcMove: 0,
        npcMovement: 0
}
npcArray.push(dragon);
/*
	    var sprite = {
        playersize: 52,
        sizeDiff: mapArray[mapID].tileSize - 52,
        playerXSpeed: 0,
        playerYSpeed: 0,
        playerCol: 8,
        playerRow: 5, //should null so you can change map position based upon what map you are in
        movementSpeed: 6 // the speed we are going to move, in pixels per frame
    }
    */
