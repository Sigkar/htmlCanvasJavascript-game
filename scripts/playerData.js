var playerData = {
	inventory:[],
	weaponDamage:3,
	health:100,
	fullHealth:100,
	healthFactor:1,
	healthModifiers:0,
	defence: 0,
	defenceModifiers: 0,
	mana:100,
	manaModifiers:0,
	meleeDamageModifiers:0,
	magicDamageModifiers:0,
	archeryDamageModifiers:0,
	
	//skills - max of 128
	mining:1,
	swordsmanship:1,
	magic:1,
	archery:1,
	holding:4
	
}

function addItemToInventory(){
	if(playerData.inventory.length <=28){
		//code to add item
	}else{
		alert("You are out of inventory space!");
	}
	
}

/*$(document).ready(function(){
	$('#invSpot1').click(function(){
		playerData.holding = 
	});
	
})*/