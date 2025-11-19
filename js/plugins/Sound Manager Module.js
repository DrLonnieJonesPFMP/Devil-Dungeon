//==============================================================================================================
//--------------------------------------------------------------------------------------------------------------
// *** MUSHROOMCAKE28' Sound Manager Module
//  * Author: MushroomCake28
//  * Contact: last.truong@hotmail.com
//  * Version: 1.01 (2018-12-19) 
//  * File Name: $MUSH_SoundManagerModule_P2.js
//--------------------------------------------------------------------------------------------------------------
// * INFO : This script restructures the Sound Manager to allow to modify the game's recurring sound effects.
//          This will allow the developper to use plugin commands to change any sound effects set in the
//          the sound manager.
// * TERMS : This script is part of the MushroomCake Public first generation scripts. It can be used by anyone
//           for free and commercials games without requesting my permission. You just need to credit me
//           (MushroomCake28), and please be generous if I request a copy of your game ;) 
// * USAGE : Save as a javascript file (.js at the end) if it's not already a js file and insert it anywhere
//           in the plugin manager. Use the file name at the top of the script.
//--------------------------------------------------------------------------------------------------------------
// INFORMATION ON FUNCTIONALITY
//--------------------------------------------------------------------------------------------------------------
// UPDATES HISTORY
// * v.1.01
//--------------------------------------------------------------------------------------------------------------
// SECTIONS
// * Section 1: Intro
// * Section 2: Managers
//   - 2.01: Sound Manager
// * Section 3: Game Objects
//   - 3.01: Game System
//   - 3.02: Game Interpreter
//==============================================================================================================
/*:
* 
* @plugindesc [v.1.01] Allow the modification of any sound effect mid-game.
* @author MushroomCake28
* @help MUSHROOMCAKE28' SOUND MANAGER MODULE (v.1.01)
*
* Youtube Video: coming soon!
*
* This plugin allows the developper to change any sound effect defined by in
* the Sound Manager (set in the database) with a plugin command. To change 
* the sound effect set in the database in the middle of the game, use this
* plugin command:
*
* -> SoundManagerModule [key] [SE Name] [SE pitch] [SE volume]
* example: SoundManagerModule cursor Bell1 120 80
*
* [key]: Determines what Sound Effect slot to change. They are named similarly 
* to the sound effects in the database (system section). Here is the list of
* all the keys (you must spell them correctly):
* - cursor
* - ok
* - cancel
* - buzzer
* - equip
* - save
* - load
* - battleStart
* - escape
* - enemyAttack
* - enemyDamage
* - enemyCollapse
* - bossCollapse1
* - bossCollapse2
* - actorDamage
* - actorCollapse
* - recovery
* - miss
* - evasion
* - magicEvasion
* - magicReflection
* - shop
* - useItem
* - useSkill
*
* [SE Name]: Filename of the SE you want to use.
*
* [SE Pitch]: Pitch of the SE.
*
* [SE Volume]: Volume of the SE.
*
* For more information:
* - Youtube tutorial: https://youtu.be/_JQpMhoOPN4
*
*/
//==============================================================================================================


//==============================================================================================================
// * SECTION 1 : Intro
//==============================================================================================================


var Imported = Imported || {};
Imported.mushFeatures = Imported.mushFeatures || {}; 
Imported.mushFeatures['SoundManagerModule_P2'] = 1.01;

var $mushFeatures = $mushFeatures || { 'imported': {}, 'params': {} };
$mushFeatures.imported['SoundManagerModule_P2'] = 1.01;


//==============================================================================================================
// * SECTION 2.01 : Sound Manager
//==============================================================================================================

SoundManager.convertSoundNameNumber = function(data) {
	var cnvt = [
	{"name": "cursor",          "id": 0},
	{"name": "ok",              "id": 1},
	{"name": "cancel",          "id": 2},
	{"name": "buzzer",          "id": 3},
	{"name": "equip",           "id": 4},
	{"name": "save",            "id": 5},
	{"name": "load",            "id": 6},
	{"name": "battleStart",     "id": 7},
	{"name": "escape",          "id": 8},
	{"name": "enemyAttack",     "id": 9},
	{"name": "enemyDamage",     "id": 10},
	{"name": "enemyCollapse",   "id": 11},
	{"name": "bossCollapse1",   "id": 12},
	{"name": "bossCollapse2",   "id": 13},
	{"name": "actorDamage",     "id": 14},
	{"name": "actorCollapse",   "id": 15},
	{"name": "recovery",        "id": 16},
	{"name": "miss",            "id": 17},
	{"name": "evasion",         "id": 18},
	{"name": "magicEvasion",    "id": 19},
	{"name": "magicReflection", "id": 20},
	{"name": "shop",            "id": 21},
	{"name": "useItem",         "id": 22},
	{"name": "useSkill",        "id": 23} ];
	if (typeof data == "string") {
		for (var i = 0 ; i < cnvt.length ; i++) {
			if (cnvt[i].name == data) {
				return cnvt[i].id;
				break;
			}
		}
		return null;
	} else if (typeof data == "number") {
		for (var i = 0 ; i < cnvt.length ; i++) {
			if (cnvt[i].id == data) {
				return cnvt[i].name;
				break;
			}
		}
		return null;
	} else {
		return null;
	}
};

SoundManager.loadSystemSound = function(n) {
    if ($dataSystem) {
    	if ($gameSystem) {
    		var key = this.convertSoundNameNumber(n);
    		var gsd = $gameSystem.getSoundManagerData(key);
    		AudioManager.loadStaticSe(gsd);
    	} else {
    		AudioManager.loadStaticSe($dataSystem.sounds[n]);
    	}
    }
};


SoundManager.playSystemSound = function(n) {
    if ($dataSystem) {
    	if ($gameSystem) {
    		var key = this.convertSoundNameNumber(n);
    		var gsd = $gameSystem.getSoundManagerData(key);
    		AudioManager.playStaticSe(gsd);
    	} else {
    		AudioManager.playStaticSe($dataSystem.sounds[n]);
    	}
    }
};


//==============================================================================================================
// * SECTION 3.01 : Game System
//==============================================================================================================

var alias_GameSystemInitialize5307 = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    alias_GameSystemInitialize5307.call(this);
    this.initializeSoundManagerModuleVars();
};

Game_System.prototype.getDuplicateObject = function(obj) {
	return obj;
};

Game_System.prototype.initializeSoundManagerModuleVars = function() {
	var dt = $dataSystem.sounds;
	this._soundManagerData = {}
	for (var i = 0 ; i < dt.length; i++) {
		var key = SoundManager.convertSoundNameNumber(i);
		this._soundManagerData[key] = this.getDuplicateObject(dt[i]);
	}
};

Game_System.prototype.getSoundManagerData = function(key) {
	if (this._soundManagerData == undefined || this._soundManagerData == null) {
		this.initializeSoundManagerModuleVars();
	} 
	if (key) {
		return this._soundManagerData[key];
	} else {
		return this._soundManagerData;
	}
};

Game_System.prototype.setSoundManagerData = function(key, se) {
	if (key && se) {
		this._soundManagerData[key] = se;
	}
};


//==============================================================================================================
// * SECTION 3.02 : Game System
//==============================================================================================================

var aliasMush_GameInterpreterPluginCommand608 = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    aliasMush_GameInterpreterPluginCommand608.call(this, command, args);
    if (command === "SoundManagerModule") {
        var key     = args[0];
        var checkId = SoundManager.convertSoundNameNumber(key);
        if (checkId >= 0 && checkId != null) {
        	var se = {"name": args[1], "pitch": args[2], "volume": args[3]};
        	$gameSystem.setSoundManagerData(key, se);
        } else {
        	alert("Sound Manager Module key didn't check out. Make sure there are no typos in the plugin command.");
        }
    }
};