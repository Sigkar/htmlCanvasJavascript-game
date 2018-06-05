//combat
var left = false;
var right = false;
var up = false;
var down = false;
var playerXPos = 0;
var playerYPos = 0;
var animationTime = 0;

var weapon = new Image();
weapon.src = "images/weapons/ironSword.png";

var swordPosition = {
	swordWidth:76,
	swordHeight:14,
	swordDamagePoints:[
		[-72,38], //left
		[-48,38], //left
		[-30,38], //left
		[-12,38], //left
	]
}


/*function shootArrow(){
	
}

function useMagic(){
	
}

function playerContactOnDamage(){
	
}

function enemyContactOnDaamge(){
	
}

function npcAttack(){
	//uses the NPCs weapon of choice in their npcArray
	//NPCs only carry one weapon and cant be disarmed for now
	//Some have innate abilities to use no weapon and are just magical (ie: dragons shooting fire);
}

function dropItem(){
	//will be a random number table that uses the playerData item IDs
}
*/