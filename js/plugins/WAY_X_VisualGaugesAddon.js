//=============================================================================
// WAY_X_VisualGaugesAddon.js
//=============================================================================
/*:
@plugindesc v1.3 (This requires YEP_X_VisualHpGauge.js) Adds MP and TP gauges
to battlers.

@param Gauge Text Font Size
@desc This is the font size of the texts.
@default 20

@param >>> MP Gauge <<<

@param MP Gauge Min Width
@desc This is the minimum width in pixels for MP Gauges.
@default 144

@param MP Gauge Height
@desc This is the height in pixels for MP Gauges.
@default 18

@param MP Color 1
@desc This is the text color used for the 1st part of MP Gauges.
@default 22

@param MP Color 2
@desc This is the text color used for the 2nd part of MP Gauges.
@default 23

@param Show MP Text
@desc Show the actual 'MP' text.
@default true

@param Show MP Value
@desc Show the MP value.
@default true

@param Show MP Max
@desc Show the MaxMP value if value is shown?
@default true

@param MP Gauge X Padding
@desc Moves the MP Gauge left or right.
@default 0

@param MP Gauge Y Padding
@desc Moves the MP Gauge up or down. 
@default 0

@param >>> TP Gauge <<<

@param TP Gauge Min Width
@desc This is the minimum width in pixels for TP Gauges.
@default 144

@param TP Gauge Height
@desc This is the height in pixels for TP Gauges.
@default 18

@param TP Color 1
@desc This is the text color used for the 1st part of TP Gauges.
@default 28

@param TP Color 2
@desc This is the text color used for the 2nd part of TP Gauges.
@default 29

@param Show TP Text
@desc Show the actual 'TP' text.
@default true

@param Show TP Value
@desc Show the MP value.
@default true

@param Show TP Max
@desc Show the MaxMP value if value is shown?
@default true

@param TP Gauge X Padding
@desc Moves the TP Gauge left or right.
@default 0

@param TP Gauge Y Padding
@desc Moves the TP Gauge up or down.
@default 0

@author waynee95

@help 
============================================================================
 Notetags
============================================================================
Class and Enemy Notetags:

<Hide MP Gauge>

<Show MP Gauge>

<MP Gauge Width: x>

<MP Gauge Height: x>

<MP Gauge Back Color: x>

<MP Gauge Color 1: x>

<MP Gauge Color 2: x>

<MP Gauge X Padding: x>

<MP Gauge Y Padding: y>

<Hide TP Gauge>

<Show TP Gauge>

<TP Gauge Width: x>

<TP Gauge Height: x>

<TP Gauge Back Color: x>

<TP Gauge Color 1: x>

<TP Gauge Color 2: x>

<TP Gauge X Padding: x>

<TP Gauge Y Padding: y>

============================================================================
 Terms of Use
============================================================================
Free for any commercial or non-commercial project! [Credit: Yanfly, waynee95]

============================================================================
 Changelog
============================================================================
Version 1.3: 10.05.2017
 - Added fontsize parameter
 
Version 1.2: 10.05.2017
 - Fix error with number alignment
 
Version 1.1: 10.05.2017
 - Fix error with MaxMp or MaxTp being 0
 
Version 1.0: 09.05.2017
 - Release!
*/

//=============================================================================
// Namespaces
//=============================================================================
var Imported = Imported || {};
Imported.WAY_X_VisualGaugesAddon = true;

var WAY = WAY || {};
WAY.VisualGaugesAddon = WAY.VisualGaugesAddon || {};

//=============================================================================
// Plugin Dependencies
//=============================================================================
if (!Imported.YEP_X_VisualHpGauge) {
	console.error('ERROR!\nThis Plugin requires YEP_X_VisualHpGauge.js');
	if (Utils.isNwjs() && Utils.isOptionValid('test')) {
		if (!require('nw.gui').Window.get().isDevToolsOpen()) {
			require('nw.gui').Window.get().showDevTools();
		}
	}
} else {

//=============================================================================
// Classes
//=============================================================================
function Window_VisualMpGauge() {
    this.initialize.apply(this, arguments);
}

function Window_VisualTpGauge() {
    this.initialize.apply(this, arguments);
}

(function() {
	
'use strict';
	
//=============================================================================
// Plugin Parameters
//=============================================================================
var parameters = PluginManager.parameters('WAY_X_VisualGaugesAddon');
WAY.VisualGaugesAddon.Param = {
	fontSize: Number(parameters['Gauge Text Font Size']),
	mpGaugeMinimumWidth: Number(parameters['MP Gauge Min Width']),
	mpGaugeHeight: Number(parameters['MP Gauge Height']),
	mpGaugeColor1: Number(parameters['MP Color 1']),
	mpGaugeColor2: Number(parameters['MP Color 2']),
	showMpText: Boolean(String(parameters['Show MP Text']).toLowerCase() === 'true'),
	showMpValue: Boolean(String(parameters['Show MP Value']).toLowerCase() === 'true'),
	showMpMax: Boolean(String(parameters['Show MP Max']).toLowerCase() === 'true'),
	mpGaugeXPadding: Number(parameters['MP Gauge X Padding']),
	mpGaugeYPadding: Number(parameters['MP Gauge Y Padding']),
	tpGaugeMinimumWidth: Number(parameters['TP Gauge Min Width']),
	tpGaugeHeight: Number(parameters['TP Gauge Height']),
	tpGaugeColor1: Number(parameters['TP Color 1']),
	tpGaugeColor2: Number(parameters['TP Color 2']),
	showTpText: Boolean(String(parameters['Show TP Text']).toLowerCase() === 'true'),
	showTpValue: Boolean(String(parameters['Show TP Value']).toLowerCase() === 'true'),
	showTpMax: Boolean(String(parameters['Show TP Max']).toLowerCase() === 'true'),
	tpGaugeXPadding: Number(parameters['TP Gauge X Padding']),
	tpGaugeYPadding: Number(parameters['TP Gauge Y Padding'])
};

var params = WAY.VisualGaugesAddon.Param;

//=============================================================================
// DataManager
//=============================================================================
DataManager.processVHGNotetags = function (group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		// HP Parameters
		obj.hideHpGauge = false;
		obj.showHpGauge = false;
		obj.hpGaugeWidth = 0;
		obj.hpGaugeHeight = Yanfly.Param.VHGGaugeHeight;
		obj.hpGaugeBackColor = Yanfly.Param.VHGBackColor;
		obj.hpGaugeColor1 = Yanfly.Param.VHGHpColor1;
		obj.hpGaugeColor2 = Yanfly.Param.VHGHpColor2;

		// MP Parameters
		obj.hideMpGauge = false;
		obj.showMpGauge = false;
		obj.mpGaugeWidth = 0;
		obj.mpGaugeHeight = params.mpGaugeHeight;
		obj.mpGaugeBackColor = Yanfly.Param.VHGBackColor;
		obj.mpGaugeColor1 = params.mpGaugeColor1;
		obj.mpGaugeColor2 = params.mpGaugeColor2;
		obj.mpGaugeXPadding = params.mpGaugeXPadding;
		obj.mpGaugeYPadding = params.mpGaugeYPadding;
		
		// TP Parameters
		obj.hideTpGauge = false;
		obj.showTpGauge = false;
		obj.tpGaugeWidth = 0;
		obj.tpGaugeHeight = params.tpGaugeHeight;
		obj.tpGaugeBackColor = Yanfly.Param.VHGBackColor;
		obj.tpGaugeColor1 = params.tpGaugeColor1;
		obj.tpGaugeColor2 = params.tpGaugeColor2;
		obj.tpGaugeXPadding = params.tpGaugeXPadding;
		obj.tpGaugeYPadding = params.tpGaugeYPadding;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:HIDE HP GAUGE)>/i)) {
				obj.hideHpGauge = true;
			} else if (line.match(/<(?:SHOW HP GAUGE)>/i)) {
				obj.showHpGauge = true;
			} else if (line.match(/<(?:HP GAUGE WIDTH):[ ](\d+)>/i)) {
				obj.hpGaugeWidth = parseInt(RegExp.$1);
			} else if (line.match(/<(?:HP GAUGE HEIGHT):[ ](\d+)>/i)) {
				obj.hpGaugeHeight = parseInt(RegExp.$1);
			} else if (line.match(/<(?:HP GAUGE BACK COLOR):[ ](\d+)>/i)) {
				obj.hpGaugeBackColor = parseInt(RegExp.$1);
			} else if (line.match(/<(?:HP GAUGE COLOR 1):[ ](\d+)>/i)) {
				obj.hpGaugeColor1 = parseInt(RegExp.$1);
			} else if (line.match(/<(?:HP GAUGE COLOR 2):[ ](\d+)>/i)) {
				obj.hpGaugeColor2 = parseInt(RegExp.$1);
			} else if (line.match(/<(?:HIDE MP GAUGE)>/i)) {
				obj.hideMpGauge = true;
			} else if (line.match(/<(?:SHOW MP GAUGE)>/i)) {
				obj.showMpGauge = true;
			} else if (line.match(/<(?:MP GAUGE WIDTH):[ ](\d+)>/i)) {
				obj.mpGaugeWidth = parseInt(RegExp.$1);
			} else if (line.match(/<(?:MP GAUGE HEIGHT):[ ](\d+)>/i)) {
				obj.mpGaugeHeight = parseInt(RegExp.$1);
			} else if (line.match(/<(?:MP GAUGE BACK COLOR):[ ](\d+)>/i)) {
				obj.mpGaugeBackColor = parseInt(RegExp.$1);
			} else if (line.match(/<(?:MP GAUGE COLOR 1):[ ](\d+)>/i)) {
				obj.mpGaugeColor1 = parseInt(RegExp.$1);
			} else if (line.match(/<(?:MP GAUGE COLOR 2):[ ](\d+)>/i)) {
				obj.mpGaugeColor2 = parseInt(RegExp.$1);
			} else if (line.match(/<(?:MP GAUGE X PADDING):[ ](\d+)>/i)) {
				obj.mpGaugeXPadding = parseInt(RegExp.$1);
			} else if (line.match(/<(?:MP GAUGE Y PADDING):[ ](\d+)>/i)) {
				obj.mpGaugeYPadding = parseInt(RegExp.$1);
			}else if (line.match(/<(?:HIDE TP GAUGE)>/i)) {
				obj.hideTpGauge = true;
			} else if (line.match(/<(?:SHOW TP GAUGE)>/i)) {
				obj.showTpGauge = true;
			} else if (line.match(/<(?:TP GAUGE WIDTH):[ ](\d+)>/i)) {
				obj.tpGaugeWidth = parseInt(RegExp.$1);
			} else if (line.match(/<(?:TP GAUGE HEIGHT):[ ](\d+)>/i)) {
				obj.tpGaugeHeight = parseInt(RegExp.$1);
			} else if (line.match(/<(?:TP GAUGE BACK COLOR):[ ](\d+)>/i)) {
				obj.tpGaugeBackColor = parseInt(RegExp.$1);
			} else if (line.match(/<(?:TP GAUGE COLOR 1):[ ](\d+)>/i)) {
				obj.tpGaugeColor1 = parseInt(RegExp.$1);
			} else if (line.match(/<(?:TP GAUGE COLOR 2):[ ](\d+)>/i)) {
				obj.tpGaugeColor2 = parseInt(RegExp.$1);
			} else if (line.match(/<(?:TP GAUGE X PADDING):[ ](\d+)>/i)) {
				obj.tpGaugeXPadding = parseInt(RegExp.$1);
			} else if (line.match(/<(?:TP GAUGE Y PADDING):[ ](\d+)>/i)) {
				obj.tpGaugeYPadding = parseInt(RegExp.$1);
			}
		}
	}
};

//=============================================================================
// Game_System
//=============================================================================
var _Game_System_init = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
	_Game_System_init.call(this);
	this.initShownMpGauge();
	this.initShownTpGauge();
};

Game_System.prototype.initShownMpGauge = function () {
	this._shownMpGauge = [];
};

Game_System.prototype.showMpGaugeEnemy = function (id) {
	if (this._shownMpGauge === undefined) {
		this.initShownMpGauge();
	}
	if (!eval(Yanfly.Param.VHGDefeatFirst)) {
		return true;
	}
	return this._shownMpGauge.contains(id);
};

Game_System.prototype.addMpGaugeEnemy = function (id) {
	if (this._shownMpGauge === undefined) {
		this.initShownMpGauge();
	}
	if (this._shownMpGauge.contains(id)) {
		return;
	}
	this._shownMpGauge.push(id);
};

Game_System.prototype.initShownTpGauge = function () {
	this._shownTpGauge = [];
};

Game_System.prototype.showTpGaugeEnemy = function (id) {
	if (this._shownTpGauge === undefined) {
		this.initShownTpGauge();
	}
	if (!eval(Yanfly.Param.VHGDefeatFirst)) {
		return true;
	}
	return this._shownTpGauge.contains(id);
};

Game_System.prototype.addTpGaugeEnemy = function (id) {
	if (this._shownTpGauge === undefined) {
		this.initShownMpGauge();
	}
	if (this._shownTpGauge.contains(id)) {
		return;
	}
	this._shownTpGauge.push(id);
};

//=============================================================================
// Game_BattlerBase
//=============================================================================
var _Game_Battler_Base_die = Game_BattlerBase.prototype.die;
Game_BattlerBase.prototype.die = function () {
	_Game_Battler_Base_die.call(this);
	if (!this.isEnemy()) {
		return;
	}
	if (eval(Yanfly.Param.VHGDefeatFirst)) {
		if (!$gameSystem.showHpGaugeEnemy(this._enemyId))
			this._noHpGauge = true;
		if (!$gameSystem.showMpGaugeEnemy(this._enemyId))
			this._noMpGauge = true;
		if (!$gameSystem.showTpGaugeEnemy(this._enemyId))
			this._noTpGauge = true;
	}
	$gameSystem.addHpGaugeEnemy(this._enemyId);
	$gameSystem.addMpGaugeEnemy(this._enemyId);
	$gameSystem.addTpGaugeEnemy(this._enemyId);
};

//=============================================================================
// Game_Battler
//=============================================================================
Game_Battler.prototype.mpGaugeVisible = function () {
	if (this._noMpGauge) {
		return false;
	}
	if (this.isHidden()) {
		return false;
	}
	return true;
};

Game_Battler.prototype.mpGaugeWidth = function () {
	var width = Math.max(this.spriteWidth(), params.mpGaugeMinimumWidth);
	return (width & 1) ? width + 1 : width;
};

Game_Battler.prototype.mpGaugeHeight = function () {
	return Yanfly.Param.VHGGaugeHeight;
};

Game_Battler.prototype.mpGaugeBackColor = function () {
	return Yanfly.Param.VHGBackColor;
};

Game_Battler.prototype.mpGaugeColor1 = function () {
	return params.mpGaugeColor1;
};

Game_Battler.prototype.mpGaugeColor2 = function () {
	return params.mpGaugeColor2;
};

Game_Battler.prototype.tpGaugeVisible = function () {
	if (this._noTpGauge) {
		return false;
	}
	if (this.isHidden()) {
		return false;
	}
	return true;
};

Game_Battler.prototype.tpGaugeWidth = function () {
	var width = Math.max(this.spriteWidth(), params.tpGaugeMinimumWidth);
	return (width & 1) ? width + 1 : width;
};

Game_Battler.prototype.tpGaugeHeight = function () {
	return Yanfly.Param.VHGGaugeHeight;
};

Game_Battler.prototype.tpGaugeBackColor = function () {
	return Yanfly.Param.VHGBackColor;
};

Game_Battler.prototype.tpGaugeColor1 = function () {
	return params.tpGaugeColor1;
};

Game_Battler.prototype.tpGaugeColor2 = function () {
	return params.tpGaugeColor2;
};

Game_Battler.prototype.tpGaugeXPadding = function () {
	return params.tpGaugeXPadding;
};

Game_Battler.prototype.tpGaugeYPadding = function () {
	return params.tpGaugeYPadding;
};

//=============================================================================
// Game_Actor
//=============================================================================
Game_Actor.prototype.mpGaugeVisible = function () {
	if (this.isHidden()) {
		return false;
	}
	if (this.currentClass().showMpGauge) {
		return true;
	}
	if (!eval(Yanfly.Param.VHGDisplayActor)) {
		return false;
	}
	if (this.currentClass().hideMpGauge) {
		return false;
	}
	return Game_Battler.prototype.mpGaugeVisible.call(this);
};

Game_Actor.prototype.mpGaugeWidth = function () {
	if (this.currentClass().mpGaugeWidth > 0) {
		var width = this.currentClass().mpGaugeWidth;
	} else {
		var width = this.spriteWidth();
	}
	width = Math.max(width, params.mpGaugeMinimumWidth);
	return (width & 1) ? width + 1 : width;
};

Game_Actor.prototype.mpGaugeHeight = function () {
	return this.currentClass().mpGaugeHeight;
};

Game_Actor.prototype.mpGaugeBackColor = function () {
	return this.currentClass().mpGaugeBackColor;
};

Game_Actor.prototype.mpGaugeColor1 = function () {
	return this.currentClass().mpGaugeColor1;
};

Game_Actor.prototype.mpGaugeColor2 = function () {
	return this.currentClass().mpGaugeColor2;
};

Game_Actor.prototype.mpGaugeXPadding = function () {
	return this.currentClass().mpGaugeXPadding;
};

Game_Actor.prototype.mpGaugeYPadding = function () {
	return this.currentClass().mpGaugeYPadding;
};

Game_Actor.prototype.tpGaugeVisible = function () {
	if (this.isHidden()) {
		return false;
	}
	if (this.currentClass().showTpGauge) {
		return true;
	}
	if (!eval(Yanfly.Param.VHGDisplayActor)) {
		return false;
	}
	if (this.currentClass().hideTpGauge) {
		return false;
	}
	return Game_Battler.prototype.tpGaugeVisible.call(this);
};

Game_Actor.prototype.tpGaugeWidth = function () {
	if (this.currentClass().tpGaugeWidth > 0) {
		var width = this.currentClass().tpGaugeWidth;
	} else {
		var width = this.spriteWidth();
	}
	width = Math.max(width, params.tpGaugeMinimumWidth);
	return (width & 1) ? width + 1 : width;
};

Game_Actor.prototype.tpGaugeHeight = function () {
	return this.currentClass().tpGaugeHeight;
};

Game_Actor.prototype.tpGaugeBackColor = function () {
	return this.currentClass().tpGaugeBackColor;
};

Game_Actor.prototype.tpGaugeColor1 = function () {
	return this.currentClass().tpGaugeColor1;
};

Game_Actor.prototype.tpGaugeColor2 = function () {
	return this.currentClass().tpGaugeColor2;
};

Game_Actor.prototype.tpGaugeXPadding = function () {
	return this.currentClass().tpGaugeXPadding;
};

Game_Actor.prototype.tpGaugeYPadding = function () {
	return this.currentClass().tpGaugeYPadding;
};

//=============================================================================
// Game_Enemy
//=============================================================================
Game_Enemy.prototype.mpGaugeVisible = function () {
	if (this.isHidden()) {
		return false;
	}
	if (this.enemy().hideMpGauge) {
		return false;
	}
	if (BattleManager.isBattleTest()) {
		return true;
	}
	if (this.enemy().showMpGauge) {
		return true;
	}
	if (!$gameSystem.showMpGaugeEnemy(this._enemyId)) {
		return false;
	}
	return Game_Battler.prototype.mpGaugeVisible.call(this);
};

var _Game_Enemy_revive = Game_Enemy.prototype.revive;
Game_Enemy.prototype.revive = function () {
	if (this._mp === 0) {
		this._noMpGauge = false;
	}
	if (this._tp === 0) {
		this._noTpGauge = false;
	}
	_Game_Enemy_revive.call(this);
};

Game_Enemy.prototype.mpGaugeWidth = function () {
	if (this.enemy().mpGaugeWidth > 0) {
		var width = this.enemy().mpGaugeWidth;
	} else {
		var width = this.spriteWidth();
	}
	width = Math.max(width, params.mpGaugeMinimumWidth);
	return (width & 1) ? width + 1 : width;
};

Game_Enemy.prototype.mpGaugeHeight = function () {
	return this.enemy().mpGaugeHeight;
};

Game_Enemy.prototype.mpGaugeBackColor = function () {
	return this.enemy().mpGaugeBackColor;
};

Game_Enemy.prototype.mpGaugeColor1 = function () {
	return this.enemy().mpGaugeColor1;
};

Game_Enemy.prototype.mpGaugeColor2 = function () {
	return this.enemy().mpGaugeColor2;
};

Game_Enemy.prototype.mpGaugeXPadding = function () {
	return this.enemy().mpGaugeXPadding;
};

Game_Enemy.prototype.mpGaugeYPadding = function () {
	return this.enemy().mpGaugeYPadding;
};

Game_Enemy.prototype.tpGaugeVisible = function () {
	if (this.isHidden()) {
		return false;
	}
	if (this.enemy().hideTpGauge) {
		return false;
	}
	if (BattleManager.isBattleTest()) {
		return true;
	}
	if (this.enemy().showTpGauge) {
		return true;
	}
	if (!$gameSystem.showTpGaugeEnemy(this._enemyId)) {
		return false;
	}
	return Game_Battler.prototype.tpGaugeVisible.call(this);
};

Game_Enemy.prototype.tpGaugeWidth = function () {
	if (this.enemy().tpGaugeWidth > 0) {
		var width = this.enemy().tpGaugeWidth;
	} else {
		var width = this.spriteWidth();
	}
	width = Math.max(width, params.tpGaugeMinimumWidth);
	return (width & 1) ? width + 1 : width;
};

Game_Enemy.prototype.tpGaugeHeight = function () {
	return this.enemy().tpGaugeHeight;
};

Game_Enemy.prototype.tpGaugeBackColor = function () {
	return this.enemy().tpGaugeBackColor;
};

Game_Enemy.prototype.tpGaugeColor1 = function () {
	return this.enemy().tpGaugeColor1;
};

Game_Enemy.prototype.tpGaugeColor2 = function () {
	return this.enemy().tpGaugeColor2;
};

Game_Enemy.prototype.tpGaugeXPadding = function () {
	return this.enemy().tpGaugeXPadding;
};

Game_Enemy.prototype.tpGaugeYPadding = function () {
	return this.enemy().tpGaugeYPadding;
};

//=============================================================================
// Sprite_Battler
//=============================================================================
var _Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function () {
	_Sprite_Battler_update.call(this);
	this.createVisualMpGaugeWindow();
	this.createVisualTpGaugeWindow();
};

Sprite_Battler.prototype.createVisualMpGaugeWindow = function () {
	if (this._createdVisualMpGaugeWindow) {
		return;
	}
	if (!this._battler) {
		return;
	}
	this._createdVisualMpGaugeWindow = true;
	this._visualMpGauge = new Window_VisualMpGauge();
	this._visualMpGauge.setBattler(this._battler);
	this.parent.parent.addChild(this._visualMpGauge);
};

Sprite_Battler.prototype.createVisualTpGaugeWindow = function () {
	if (this._createdVisualTpGaugeWindow) {
		return;
	}
	if (!this._battler) {
		return;
	}
	this._createdVisualTpGaugeWindow = true;
	this._visualTpGauge = new Window_VisualTpGauge();
	this._visualTpGauge.setBattler(this._battler);
	this.parent.parent.addChild(this._visualTpGauge);
};

var _Sprite_Battler_setBattler = Sprite_Battler.prototype.setBattler;
Sprite_Battler.prototype.setBattler = function (battler) {
	_Sprite_Battler_setBattler.call(this, battler);
	if (this._visualMpGauge) {
		this._visualMpGauge.setBattler(battler);
	}
	if (this._visualTpGauge) {
		this._visualTpGauge.setBattler(battler);
	}
};

//=============================================================================
// Window_VisualMpGauge
//=============================================================================
Window_VisualMpGauge.prototype = Object.create(Window_Base.prototype);
Window_VisualMpGauge.prototype.constructor = Window_VisualMpGauge;

Window_VisualMpGauge.prototype.initialize = function () {
	this._opacitySpeed = 255 / Yanfly.Param.VHGGaugeDuration;
	this._dropSpeed = 0;
	this._visibleCounter = 0;
	Window_Base.prototype.initialize.call(this, 0, 0, 1, 1);
	this._battler = null;
	this._requestRefresh = false;
	this._currentMpValue = 0;
	this._displayedValue = 0;
	this.contentsOpacity = 0;
	this.opacity = 0;
};

Window_VisualMpGauge.prototype.setBattler = function (battler) {
	if (this._battler !== battler) {
		this._battler = battler;
		this._currentMpValue = this._battler ? this._battler.mp : 0;
		this._displayedValue = this._battler ? this._battler.mp : 0;
	}
};

Window_VisualMpGauge.prototype.update = Window_VisualHPGauge.prototype.update;

Window_VisualMpGauge.prototype.updateWindowAspects = function() {
    this.updateWindowSize();
    this.updateWindowPosition();
    this.updateOpacity();
    this.updateMpPosition();
    this.updateRefresh();
};

Window_VisualMpGauge.prototype.updateWindowSize = function () {
	var spriteWidth = this._battler.mpGaugeWidth();
	var width = spriteWidth + this.standardPadding() * 2;
	width = Math.min(width, Graphics.boxWidth + this.standardPadding() * 2);
	var height = Math.max(this.lineHeight(), this.gaugeHeight() + 4);
	height += this.standardPadding() * 2;
	if (width === this.width && height === this.height) {
		return;
	}
	this.width = width;
	this.height = height;
	this.createContents();
	this._requestRefresh = true;
	this.makeWindowBoundaries();
};

Window_VisualMpGauge.prototype.makeWindowBoundaries = Window_VisualHPGauge.prototype.makeWindowBoundaries;

Window_VisualMpGauge.prototype.updateWindowPosition = function() {
    if (!this._battler) {
		return;
	}
    var battler = this._battler;
    this.x = battler.spritePosX() + battler.mpGaugeXPadding();
    this.x -= Math.ceil(this.width / 2); 
    this.x = this.x.clamp(this._minX, this._maxX);
	var y1 = battler.hpGaugeVisible() ? battler.hpGaugeHeight() : 0;
    this.y = battler.spritePosY() + y1 + battler.mpGaugeYPadding();
    if (Yanfly.Param.VHGGaugePos) {
      this.y -= battler.spriteHeight();
    } else {
      this.y -= this.standardPadding();
    }
    this.y = this.y.clamp(this._minY, this._maxY);
    this.y += Yanfly.Param.VHGBufferY;
};

Window_VisualMpGauge.prototype.updateOpacity = Window_VisualHPGauge.prototype.updateOpacity;

Window_VisualMpGauge.prototype.isShowWindow = function () {
	if (!this._battler.isAppeared()) {
		return false;
	}
	if (!this._battler.mpGaugeVisible()) {
		return false;
	}
	if (Yanfly.Param.VHGAlwaysShow && !this._battler.isDead()) {
		return true;
	}
	if (this._currentMpValue !== this._displayedValue) {
		return true;
	}
	if (this._battler.isSelected()) {
		return true;
	}
	--this._visibleCounter;
	return this._visibleCounter > 0;
};

Window_VisualMpGauge.prototype.updateMpPosition = function () {
	if (!this._battler) {
		return;
	}
	if (this._currentMpValue !== this._battler.mp) {
		this._visibleCounter = Yanfly.Param.VHGGaugeDuration;
		this._currentMpValue = this._battler.mp;
		var difference = Math.abs(this._displayedValue - this._battler.mp);
		this._dropSpeed = Math.ceil(difference / Yanfly.Param.VHGGaugeDuration);
	}
	this.updateDisplayCounter();
};

Window_VisualMpGauge.prototype.updateDisplayCounter = function () {
	if (this._currentMpValue === this._displayedValue) {
		return;
	}
	var d = this._dropSpeed;
	var c = this._currentMpValue;
	if (this._displayedValue > this._currentMpValue) {
		this._displayedValue = Math.max(this._displayedValue - d, c);
	} else if (this._displayedValue < this._currentMpValue) {
		this._displayedValue = Math.min(this._displayedValue + d, c);
	}
	this._requestRefresh = true;
};

Window_VisualMpGauge.prototype.updateRefresh = Window_VisualHPGauge.prototype.updateRefresh;

Window_VisualMpGauge.prototype.refresh = function () {
	this.contents.clear();
	if (!this._battler) {
		return;
	}
	this._requestRefresh = false;
	var wy = this.contents.height - this.lineHeight();
	var ww = this.contents.width;
	this.drawActorMp(this._battler, 0, wy, ww);
};

Window_VisualMpGauge.prototype.gaugeBackColor = function () {
	return this.textColor(this._battler.mpGaugeBackColor());
};

Window_VisualMpGauge.prototype.mpGaugeColor1 = function () {
	return this.textColor(this._battler.mpGaugeColor1());
};

Window_VisualMpGauge.prototype.mpGaugeColor2 = function () {
	return this.textColor(this._battler.mpGaugeColor2());
};

Window_VisualMpGauge.prototype.drawActorMp = function (actor, x, y, width) {
	width = width || 186;
	var color1 = this.mpGaugeColor1();
	var color2 = this.mpGaugeColor2();
	var rate = this._displayedValue / actor.mmp;
	if (!rate) return;
	this.drawGauge(x, y, width, rate, color1, color2);
	this.contents.fontSize = params.fontSize;
	if (params.showMpText) {
		this.changeTextColor(this.systemColor());
		this.drawText(TextManager.mpA, x, y, 44);
	}
	if (params.showMpValue) {
		var val = this._displayedValue;
		var max = actor.mmp;
		var color = this.mpColor(actor);
		this.drawCurrentAndMax(val, max, x, y, width, color, this.normalColor());
	}
};

Window_VisualMpGauge.prototype.drawCurrentAndMax = function (current, max, x, y, width, color1, color2) {
	if (params.showMpMax) {
		Window_Base.prototype.drawCurrentAndMax.call(this, current, max, x, y, width, color1, color2);
	} else {
		var align = params.showMpText ? 'right' : 'center';
		var text = Yanfly.Util.toGroup(current);
		this.changeTextColor(color1);
		this.drawText(text, x, y, width, align);
	}
};

Window_VisualMpGauge.prototype.gaugeHeight = function () {
	if (!this._battler) {
		return Window_Base.prototype.gaugeHeight.call(this);
	}
	return this._battler.mpGaugeHeight();
};

if (Imported.YEP_CoreEngine && Yanfly.Param.VHGThick) {
	Window_VisualMpGauge.prototype.drawGauge = Window_VisualHPGauge.prototype.drawGauge;
}

//=============================================================================
// Window_VisualTpGauge
//=============================================================================
Window_VisualTpGauge.prototype = Object.create(Window_Base.prototype);
Window_VisualTpGauge.prototype.constructor = Window_VisualTpGauge;

Window_VisualTpGauge.prototype.initialize = function () {
	this._opacitySpeed = 255 / Yanfly.Param.VHGGaugeDuration;
	this._dropSpeed = 0;
	this._visibleCounter = 0;
	Window_Base.prototype.initialize.call(this, 0, 0, 1, 1);
	this._battler = null;
	this._requestRefresh = false;
	this._currentTpValue = 0;
	this._displayedValue = 0;
	this.contentsOpacity = 0;
	this.opacity = 0;
};

Window_VisualTpGauge.prototype.setBattler = function (battler) {
	if (this._battler !== battler) {
		this._battler = battler;
		this._currentTpValue = this._battler ? this._battler.tp : 0;
		this._displayedValue = this._battler ? this._battler.tp : 0;
	}
};

Window_VisualTpGauge.prototype.update = Window_VisualHPGauge.prototype.update;

Window_VisualTpGauge.prototype.updateWindowAspects = function() {
    this.updateWindowSize();
    this.updateWindowPosition();
    this.updateOpacity();
    this.updateTpPosition();
    this.updateRefresh();
};

Window_VisualTpGauge.prototype.updateWindowSize = function () {
	var spriteWidth = this._battler.tpGaugeWidth();
	var width = spriteWidth + this.standardPadding() * 2;
	width = Math.min(width, Graphics.boxWidth + this.standardPadding() * 2);
	var height = Math.max(this.lineHeight(), this.gaugeHeight() + 4);
	height += this.standardPadding() * 2;
	if (width === this.width && height === this.height) {
		return;
	}
	this.width = width;
	this.height = height;
	this.createContents();
	this._requestRefresh = true;
	this.makeWindowBoundaries();
};

Window_VisualTpGauge.prototype.makeWindowBoundaries = Window_VisualHPGauge.prototype.makeWindowBoundaries;

Window_VisualTpGauge.prototype.updateWindowPosition = function() {
    if (!this._battler) {
		return;
	}
    var battler = this._battler;
    this.x = battler.spritePosX() + battler.tpGaugeXPadding();
    this.x -= Math.ceil(this.width / 2); 
    this.x = this.x.clamp(this._minX, this._maxX);
	var y1 = battler.hpGaugeVisible() ? battler.hpGaugeHeight() : 0;
	var y2 = battler.mpGaugeVisible() ? battler.mpGaugeHeight() : 0;
    this.y = battler.spritePosY() + y1 + y2 + battler.tpGaugeYPadding();
    if (Yanfly.Param.VHGGaugePos) {
      this.y -= battler.spriteHeight();
    } else {
      this.y -= this.standardPadding();
    }
    this.y = this.y.clamp(this._minY, this._maxY);
    this.y += Yanfly.Param.VHGBufferY;
};

Window_VisualTpGauge.prototype.updateOpacity = Window_VisualHPGauge.prototype.updateOpacity;

Window_VisualTpGauge.prototype.isShowWindow = function () {
	if (this._battler.isDead()) {
		return false;
	}
	if (!this._battler.isAppeared()) {
		return false;
	}
	if (!this._battler.tpGaugeVisible()) {
		return false;
	} 
	if (Yanfly.Param.VHGAlwaysShow && !this._battler.isDead()) {
		return true;
	}
	if (this._currentTpValue !== this._displayedValue) {
		return true;
	}
	if (this._battler.isSelected()) {
		return true;
	}
	--this._visibleCounter;
	return this._visibleCounter > 0;
};

Window_VisualTpGauge.prototype.updateTpPosition = function () {
	if (this._battler.isDead()) {
		return;
	} 
	if (!this._battler) {
		return;
	}
	if (this._currentTpValue !== this._battler.tp) {
		this._visibleCounter = Yanfly.Param.VHGGaugeDuration;
		this._currentTpValue = this._battler.tp;
		var difference = Math.abs(this._displayedValue - this._battler.tp);
		this._dropSpeed = Math.ceil(difference / Yanfly.Param.VHGGaugeDuration);
	}
	this.updateDisplayCounter();
};

Window_VisualTpGauge.prototype.updateDisplayCounter = function () {
	if (this._battler.isDead()) {
		return;
	}
	if (this._currentTpValue === this._displayedValue) {
		return;
	}
	var d = this._dropSpeed;
	var c = this._currentTpValue;
	if (this._displayedValue > this._currentTpValue) {
		this._displayedValue = Math.max(this._displayedValue - d, c);
	} else if (this._displayedValue < this._currentTpValue) {
		this._displayedValue = Math.min(this._displayedValue + d, c);
	}
	this._requestRefresh = true;
};

Window_VisualTpGauge.prototype.updateRefresh = Window_VisualHPGauge.prototype.updateRefresh;

Window_VisualTpGauge.prototype.refresh = function () {
	if (this._battler.isDead()) {
		return;
	}
	this.contents.clear();
	if (!this._battler) {
		return;
	}
	this._requestRefresh = false;
	var wy = this.contents.height - this.lineHeight();
	var ww = this.contents.width;
	this.drawActorTp(this._battler, 0, wy, ww);
};

Window_VisualTpGauge.prototype.gaugeBackColor = function () {
	return this.textColor(this._battler.tpGaugeBackColor());
};

Window_VisualTpGauge.prototype.tpGaugeColor1 = function () {
	return this.textColor(this._battler.tpGaugeColor1());
};

Window_VisualTpGauge.prototype.tpGaugeColor2 = function () {
	return this.textColor(this._battler.tpGaugeColor2());
};

Window_VisualTpGauge.prototype.drawActorTp = function (actor, x, y, width) {
	if (this._battler.isDead()) {
		return;
	}
	width = width || 186;
	var color1 = this.tpGaugeColor1();
	var color2 = this.tpGaugeColor2();
	var rate = this._displayedValue / actor.maxTp();
	if (!rate) {
		return;
	}
	this.drawGauge(x, y, width, rate, color1, color2);
	this.contents.fontSize = params.fontSize;
	if (params.showTpText) {
		this.changeTextColor(this.systemColor());
		this.drawText(TextManager.tpA, x, y, 44);
	}
	if (params.showTpValue) {
		var val = this._displayedValue;
		var max = actor.maxTp();
		var w = width;
		var color = this.mpColor(actor);
		this.drawCurrentAndMax(val, max, x, y, w, color, this.normalColor());
	}
};

Window_VisualTpGauge.prototype.drawCurrentAndMax = function (current, max, x, y, width, color1, color2) {
	if (params.showTpMax) {
		Window_Base.prototype.drawCurrentAndMax.call(this, current, max, x, y, width, color1, color2);
	} else {
		var align = params.showTpText ? 'right' : 'center';
		var text = Yanfly.Util.toGroup(current);
		this.changeTextColor(color1);
		this.drawText(text, x, y, width, align);
	}
};

Window_VisualTpGauge.prototype.gaugeHeight = function () {
	if (!this._battler) {
		return Window_Base.prototype.gaugeHeight.call(this);
	}
	return this._battler.tpGaugeHeight();
};

if (Imported.YEP_CoreEngine && Yanfly.Param.VHGThick) {
	Window_VisualTpGauge.prototype.drawGauge = Window_VisualHPGauge.prototype.drawGauge;
}

//=============================================================================
// Window_VisualHPGauge
//=============================================================================
Window_VisualHPGauge.prototype.drawActorHp = function(actor, x, y, width) {
    width = width || 186;
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    var rate = this._displayedValue / actor.mhp;
    if (Imported.YEP_AbsorptionBarrier && actor.barrierPoints() > 0) {
      this.drawBarrierGauge(actor, x, y, width);
    } else {
      this.drawGauge(x, y, width, rate, color1, color2);
    }
	this.contents.fontSize = params.fontSize;
    if (Yanfly.Param.VHGShowHP) {
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.hpA, x, y, 44);
    }
    if (Yanfly.Param.VHGShowValue) {
      var val = this._displayedValue
      var max = actor.mhp;
      var w = width;
      var color = this.hpColor(actor);
      this.drawCurrentAndMax(val, max, x, y, w, color, this.normalColor());
    }
};
})();
} // Imported YEP_X_VisualHpGauge.js
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------