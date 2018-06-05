function fillInputText() {
	var name = "Test"
    var button = document.getElementById("button");
    var input = name + ": " +document.getElementById("input").value;
    document.getElementById("testOutput").innerHTML = input;

}



//im going to go through this and put all of the images into seperate folders

var tileGraphicsToLoad = [ /*0*/ "images/scenery/floors/floorStone.png", /*1*/ "images/scenery/woodenScenery/bottomLeftCorner.png",
    /*2*/
    "images/scenery/woodenScenery/topLeftCorner.png", /*3*/ "images/scenery/woodenScenery/bottomRightCorner.png",
    /*4*/
    "images/scenery/woodenScenery/topRightCorner.png", /*5*/ "images/scenery/woodenScenery/horizontalWall.png",
    /*6*/
    "images/scenery/woodenScenery/verticalWall.png", /*7*/ "images/scenery/floors/sidewalk.png", /*8*/ "images/scenery/floors/grass.png",
    /*9*/
    "images/scenery/woodenScenery/outsideHorizontalWall.png", /*10*/ "images/scenery/woodenScenery/outsideHorizontalWallGlass.png", /*11*/ "images/scenery/woodenScenery/outsideHorizontalWall.png",
    /*12*/
    "images/scenery/woodenScenery/wallEndLeft.png", /*13*/ "images/scenery/woodenScenery/wallEndRight.png", /*14*/ "images/scenery/doors/door.png",
    /*15*/
    "images/scenery/woodenScenery/keyFacingRight.png", /*16*/ "images/scenery/woodenScenery/keyFacingLeft.png", /*17*/ "images/scenery/woodenScenery/keyFacingDown.png",
    /*18*/
    "images/scenery/woodenScenery/keyFacingUp.png", /*19*/ "images/scenery/woodenScenery/keyFourSides.png", /*20*/ "images/scenery/woodenScenery/verticalEndCapUp.png",
    /*21*/
    "images/scenery/woodenScenery/verticalEndCapDown.png", /*22*/ "abyss.png", /*23*/ "images/scenery/woodenScenery/stairDown.png",

    /*dungeon tiles*/
    /*24*/
    "images/scenery/dungeonImages/dungeonstaircase.png", /*25*/ "images/scenery/dungeonImages/dungeonEntranceGif.gif", /*26*/ "images/scenery/floors/dungeonFloor.png",
    /*27*/
    "images/scenery/dungeonImages/dungeonWall1.png", /*28*/ "images/scenery/dungeonImages/dungeonWallBottom.png", /*29*/ "images/scenery/dungeonImages/dungeonWallTop.png",
    /*30*/
    "images/scenery/dungeonImages/dungeonWallLeft.png", /*31*/ "images/scenery/dungeonImages/dungeonWallRight.png", /*32*/ "images/scenery/dungeonImages/dungeonWallCornerBottomLeft.png",
    /*33*/
    "images/scenery/dungeonImages/dungeonWallCornerBottomRight.png", /*34*/ "images/scenery/dungeonImages/dungeonWallCornerTopLeft.png",
    /*35*/
    "images/scenery/dungeonImages/dungeonWallCornerTopRight.png", /*36*/ "images/scenery/dungeonImages/dungeonWallKeyBL.png",
    /*37*/
    "images/scenery/dungeonImages/dungeonWallKeyBR.png", /*38*/ "images/scenery/dungeonImages/dungeonWallKeyTL.png", /*39*/ "images/scenery/dungeonImages/dungeonWallKeyTR.png",
    /*40*/
    "images/scenery/dungeonImages/dungeonAbyss.png",

    /*roof tiles*/
    /*41*/
    "images/scenery/roofs/roofVertical.png", /*42*/ "images/scenery/roofs/roofHorizontal.png", /*43*/ "images/scenery/roofs/roofVerticalBottom.png",
    /*44*/
    "images/scenery/roofs/roofVerticalCornerBR.png", /*45*/ "images/scenery/roofs/roofVerticalCornerBL.png", /*46*/ "images/scenery/roofs/roofVerticalER.png",
    /*47*/
    "images/scenery/roofs/roofVerticalEL.png",
    
    
    
	/*48*/"images/scenery/tavernImages/barCabinetsFront.png",/*49*/"images/scenery/tavernImages/barTopLeft.png",/*50*/"images/scenery/tavernImages/barTopPlate.png",
	/*51*/"images/scenery/tavernImages/barTopPlateMug.png", /*52*/"images/scenery/tavernImages/barTopInner.png",/*53*/"images/scenery/tavernImages/barTopRight.png",
	/*54*/"images/scenery/tavernImages/barFrontLeft.png",/*55*/"images/scenery/tavernImages/barFrontRight.png",/*56*/"images/scenery/tavernImages/barFront.png",
	/*57*/"images/scenery/doors/doorOpen.png",
	//i can use door open as a horizontal door image.
	/*58*/"images/scenery/towerImages/castleWall.png",/*59*/"images/scenery/towerImages/castleWallAS.png",/*60*/"images/scenery/towerImages/towerDBaseBR.png",
	/*61*/"images/scenery/towerImages/towerDTopLT.png",/*62*/"images/scenery/towerImages/towerDTopRT.png",/*63*/"images/scenery/towerImages/towerTopWall.png",
	/*64*/"images/scenery/towerImages/towerTopFloor.png",/*65*/"images/scenery/towerImages/TowerWallTurretFront.png",/*66*/"images/scenery/towerImages/towerWallTurretBack.png",
	/*67*/"images/scenery/towerImages/TowerTopFrontTurret.png",/*68*/"images/scenery/towerImages/towerTopLeftTurret.png",/*69*/"images/scenery/towerImages/towerTopRightTurret.png",
	/*70*/"images/scenery/towerImages/towerDTopBLT.png",/*71*/"images/scenery/towerImages/towerDTopBRT.png",/*72*/"images/scenery/towerImages/towerTopBackTurret.png",
	/*73*/"images/scenery/towerImages/testGateTopLeft.png",/*74*/"images/scenery/towerImages/testGateTopRight.png",
	
	/*75*/"images/scenery/towerImages/towerBottomLeftCorner.png",/*76*/"images/scenery/towerImages/towerBottomRightCorner.png",/*77*/"images/scenery/towerImages/towerTopLeftCorner.png",
	/*78*/"images/scenery/towerImages/towerTopRightCorner.png",/*79*/"images/scenery/towerImages/towerTopLeft.png",/*80*/"images/scenery/towerImages/towerTopRight.png",
	/*81*/"images/scenery/towerImages/towerTopTop.png",/*82*/"images/scenery/towerImages/towerTopBottom.png",/*83*/"images/scenery/towerImages/towerWallLeft.png",
	/*84*/"images/scenery/towerImages/towerWallRight.png",
	
	/*85*/"images/scenery/stoneScenery/stoneWallOutside.png",/*86*/"images/scenery/stoneScenery/stoneWallBase.png",
	/*87*/"images/scenery/stoneScenery/stoneBottomLeftCorner.png",/*88*/"images/scenery/stoneScenery/stoneBottomRightCorner.png",/*89*/"images/scenery/stoneScenery/stoneTopRightCorner.png",
	/*90*/"images/scenery/stoneScenery/stoneTopLeftCorner.png",/*91*/"images/scenery/stoneScenery/stoneKeyFacingDown.png",/*92*/"images/scenery/stoneScenery/stoneKeyFacingUp.png",
	/*93*/"images/scenery/stoneScenery/stoneKeyFacingRight.png",/*94*/"images/scenery/stoneScenery/stoneKeyFacingLeft.png",/*95*/"images/scenery/stoneScenery/stoneKeyFourSides.png",
	/*96*/"images/scenery/stoneScenery/stoneVerticalWall.png",/*97*/"images/scenery/stoneScenery/stoneHorizontalWall.png",/*98*/"images/scenery/woodenScenery/outsideHorizontalWall.png"
];

/*var overlayTilesToLoad = [
	//Stone towers and gates
	//1 - 81, 82, 73 74
	"images/scenery/towerImages/towerTopTop.png",
	//2
	"images/scenery/towerImages/towerTopBottom.png",
	//3
	"images/scenery/towerImages/testGateTopleft.png",
	//4
	"images/scenery/towerImages/testGateTopRight.png",
	//5
	//6
]*/

var overlayTilesToLoad = [
	//1
	"images/overlaySpecific/clearTile.png",
	//2
	"images/overlaySpecific/woodenDoorVertical.png",
	//3
	"images/overlaySpecific/closedHorizontalWoodenDoor.png"
];

var playerGraphicsToLoad = [
    //0
    "images/sprites/malePlayer/maleSprite.png",
    //1
    "images/sprites/malePlayer/maleWalkingDown1.png",
    //2
    "images/sprites/malePlayer/maleWalkingDown2.png",
    //3
    "images/sprites/malePlayer/maleSprite.png",//placeHolder for maleWalkingDown3
    //4
    "images/sprites/malePlayer/maleWalkingUp1.png",
    //5
    "images/sprites/malePlayer/maleWalkingUp2.png",
    //6
    "images/sprites/malePlayer/maleSprite.png",//placeHolder for maleWalkingUp3
    //7
    "images/sprites/malePlayer/maleWalkingLeft1.png",
    //8
    "images/sprites/malePlayer/maleWalkingLeft2.png",
    //9
    "images/sprites/malePlayer/maleSprite.png",//placeHolder for maleWalkingLeft3
    //10
    "images/sprites/malePlayer/maleWalkingRight1.png",
    //11
    "images/sprites/malePlayer/maleWalkingRight2.png",
    //12
    "images/sprites/malePlayer/maleSprite.png",//placeHolder for maleWalkingLRight3
    //13
    "images/sprites/player/playertopleft.png",
    //14
    "images/sprites/malePlayer/maleSprite.png",//placeHolder for maleWalkingTopLeft2
    //15
    "images/sprites/malePlayer/maleSprite.png",//placeHolder for maleWalkingTopLeft3
    //16
    "images/sprites/player/playerbottomleft.png",
    //17
    "images/sprites/malePlayer/maleSprite.png",//placeHolder for maleWalkingBottomLeft2
    //18
    "images/sprites/malePlayer/maleSprite.png",//placeHolder for maleWalkingBottomLeft3
    //19
    "images/sprites/player/playertopright.png",
    //20
    "images/sprites/malePlayer/maleSprite.png",//placeHolder for maleWalkingTopRight2
    //21
    "images/sprites/malePlayer/maleSprite.png",//placeHolder for maleWalkingTopRIght3
    //22
    "images/sprites/player/playerbottomright.png",
    //23
    "images/sprites/malePlayer/maleSprite.png",//placeHolder for maleWalkingBottomRight2
    //24
    "images/sprites/malePlayer/maleSprite.png",//placeHolder for maleWalkingBottomRight3
    

];

var npcGraphicsToLoad = [
	//0
    "images/sprites/humanEnemies/evilMage.png",
    //1
    "images/sprites/merchants/tavernMaid.png",
    //2
    "images/sprites/merchants/barMaid.png",
    //3
    "images/sprites/merchants/blacksmithSprite.png",
    //4
    "images/sprites/humanEnemies/banditSprite.png"
]

var attackSpritesToLoad = [
		//0 Stab Right With Male Sprite
		"images/sprites/malePlayer/maleStabRight.png",
		//1 Stab Left With Male Sprite
		"images/sprites/malePlayer/maleStabLeft.png",
		//2 Stab Down with Male Sprite
		"images/sprites/malePlayer/maleStabDown.png",
		//3 stab up with male sprite
		"images/sprites/malePlayer/maleStabUp.png"
]

var weaponsToLoad = [
	//0
	"images/weapons/ironSwordLeft.png",
	//1
	"images/weapons/ironSwordRight.png",
	//2
	"images/weapons/ironSwordDown.png",
	//3
	"images/weapons/ironSwordUp.png",
	//4
	"images/weapons/ironSword.png",
	//5
	"images/weapons/adamantSwordLeft.png",
	//6
	"images/weapons/adamantSwordRight.png",
	//7
	"images/weapons/adamantSwordDown.png",
	//8
	"images/weapons/adamantSwordUp.png",
	//9
	"images/weapons/adamantSword.png"
];





var cantWalkOn = [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20,
21, 22, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
45, 46, 47, 48, 49, 50, 51];
var animateWalkOn = [14];
var normalWalkOn = [0, 7, 8, 26];
var promptWalkOn = [23, 24, 25];





var itemID = [
	/*0*/"images/weapons/ironSword.png",
	/*1*/"images/weapons/adamantSword.png"
]