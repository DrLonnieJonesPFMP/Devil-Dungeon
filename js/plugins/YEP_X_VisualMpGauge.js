//=============================================================================
// Yanfly Engine Plugins - Battle Engine Extension - Visual MP Gauge
// YEP_X_VisualHpGauge.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_VisualHpGauge = true;

var Yanfly = Yanfly || {};
Yanfly.VHG = Yanfly.VHG || {};
Yanfly.VHG.version = 1.07

//=============================================================================
 /*:
 * @plugindesc v1.07 (Requires YEP_BattleEngineCore.js) Reveal MP Gauges
 * when a battler is selected or takes damage in battle.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Display Actor
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Do you wish to display the MP Gauge for actors?
 * NO - false     YES - true
 * @default true
 *
 * @param Defeat First
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Enemies must be defeated first before showing the MP Gauge.
 * NO - false     YES - true
 * @default false
 *
 * @param Always Visible
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc MP Gauge is always visible and doesn't fade away.
 * NO - false     YES - true
 * @default false
 *
 * @param ---Appearance---
 * @default
 *
 * @param Minimum Gauge Width
 * @parent ---Appearance---
 * @type number
 * @min 1
 * @desc This is the minimum width in pixels for MP Gauges.
 * @default 144
 *
 * @param Gauge Height
 * @parent ---Appearance---
 * @type number
 * @min 1
 * @desc This is the height in pixels for MP Gauges.
 * @default 18
 *
 * @param Back Color
 * @parent ---Appearance---
 * @desc This is the text color used for the back of MP Gauges.
 * @default 19
 *
 * @param MP Color 1
 * @parent ---Appearance---
 * @type number
 * @min 0
 * @max 31
 * @desc This is the text color used for the 1st part of MP Gauges.
 * @default 20
 *
 * @param MP Color 2
 * @parent ---Appearance---
 * @type number
 * @min 0
 * @max 31
 * @desc This is the text color used for the 2nd part of MP Gauges.
 * @default 21
 *
 * @param Gauge Duration
 * @parent ---Appearance---
 * @type number
 * @min 0
 * @desc This is the frames the MP gauge will continue to show after
 * it finishes draining or filling.
 * @default 30
 *
 * @param Gauge Position
 * @parent ---Appearance---
 * @type boolean
 * @on Above
 * @off Below
 * @desc Where do you wish to show the MP gauge?
 * BELOW - false     ABOVE - true
 * @default false
 *
 * @param Y Buffer
 * @parent ---Appearance---
 * @type number
 * @desc How much do you wish to shift the gauge Y position?
 * @default -16
 *
 * @param Use Thick Gauges
 * @parent ---Appearance---
 * @type boolean
 * @on Thick
 * @off Normal
 * @desc Use the thick gauges provided by this plugin?
 * Default - false     Thick - true
 * @default true
 *
 * @param ---Text Display---
 * @default
 *
 * @param Show MP
 * @parent ---Text Display---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show the actual 'MP' text.
 * NO - false     YES - true
 * @default false
 *
 * @param Show Value
 * @parent ---Text Display---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show the MP value.
 * NO - false     YES - true
 * @default false
 *
 * @param Show Max
 * @parent ---Text Display---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show the MaxMP value if value is shown?
 * NO - false     YES - true
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_BattleEngineCore.
 * Make sure this plugin is located under YEP_BattleEngineCore in the plugin
 * list.
 *
 * This plugin shows the MP Gauges of enemies as they're selected or while they
 * take damage. You can also opt for actors to show their MP Gauge as well.
 * Adjust the parameters to change the way you want the MP Gauges to appear.
 *
 * By default, enemies would need to be defeated first in order for the gauges
 * to show up. This can be changed within the parameter settings. However,
 * during battle test, the MP gauges are always shown unless the enemy has a
 * hidden MP gauge.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Class and Enemy Notetags:
 *   <Hide MP Gauge>
 *   This MP gauge will always be hidden if this notetag is present.
 *
 *   <Show MP Gauge>
 *   This MP gauge will always be shown if this notetag is present while the
 *   target is selected or taking damage.
 *
 *   <MP Gauge Width: x>
 *   This will set the battler's MP Gauge width to x pixels. However, if this
 *   width is less than the minimum width, minimum width will take priority.
 *
 *   <MP Gauge Height: x>
 *   This set's the MP Gauge height to x pixels.
 *
 *   <MP Gauge Back Color: x>
 *   This changes the MP Gauge's back color to x text color.
 *
 *   <MP Gauge Color 1: x>
 *   This changes the MP Gauge's color 1 to x text color.
 *
 *   <MP Gauge Color 2: x>
 *   This changes the MP Gauge's color 2 to x text color.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.07:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.06:
 * - Compatibility update with State Categories.
 *
 * Version 1.05:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.04:
 * - Optimization update.
 *
 * Version 1.03:
 * - Fixed a bug when Escape skill-effects are used on battlers.
 *
 * Version 1.02:
 * - Fixed a bug with gauge height not adjusting.
 *
 * Version 1.01b:
 * - Fixed a bug regarding dependancy checks.
 * - Fixed many bugs regarding stacking errors.
 *
 * Version 1.01:
 * - Rewrote the good majority of plugin to accomodate the following features:
 * ---'Always Visible' parameter.
 * ---'Gauge Position' parameter.
 * ---'Y Buffer' parameter.
 * ---'Use Thick Gauges' parameter.
 * ---'Show MP' parameter.
 * ---'Show Value' parameter.
 * ---'Show Max' parameter.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_VisualMpGauge');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.VHGDisplayActor = String(Yanfly.Parameters['Display Actor']);
Yanfly.Param.VHGDefeatFirst = String(Yanfly.Parameters['Defeat First']);
Yanfly.Param.VHGAlwaysShow = eval(String(Yanfly.Parameters['Always Visible']));

Yanfly.Param.VHGMinMpWidth = Number(Yanfly.Parameters['Minimum Gauge Width']);
Yanfly.Param.VHGGaugeHeight = Number(Yanfly.Parameters['Gauge Height']);
Yanfly.Param.VHGBackColor = Number(Yanfly.Parameters['Back Color']);
Yanfly.Param.VHGMpColor1 = Number(Yanfly.Parameters['MP Color 1']);
Yanfly.Param.VHGMpColor2 = Number(Yanfly.Parameters['MP Color 2']);
Yanfly.Param.VHGGaugeDuration = Number(Yanfly.Parameters['Gauge Duration']);
Yanfly.Param.VHGGaugePos = eval(String(Yanfly.Parameters['Gauge Position']));
Yanfly.Param.VHGBufferY = Number(Yanfly.Parameters['Y Buffer']);
Yanfly.Param.VHGThick = eval(String(Yanfly.Parameters['Use Thick Gauges']));

Yanfly.Param.VHGShowMP = eval(String(Yanfly.Parameters['Show MP']));
Yanfly.Param.VHGShowValue = eval(String(Yanfly.Parameters['Show Value']));
Yanfly.Param.VHGShowMax = eval(String(Yanfly.Parameters['Show Max']));

//=============================================================================
// DataManager
//=============================================================================

Yanfly.VHG.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.VHG.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_X_VisualMpGauge) {
  	this.processVHGNotetags($dataClasses);
  	this.processVHGNotetags($dataEnemies);
    Yanfly._loaded_YEP_X_VisualMpGauge = true;
  }
	return true;
};

DataManager.processVHGNotetags = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.hideMpGauge = false;
		obj.showMpGauge = false;
		obj.mpGaugeWidth = 0;
		obj.mpGaugeHeight = Yanfly.Param.VHGGaugeHeight;
		obj.mpGaugeBackColor = Yanfly.Param.VHGBackColor;
		obj.mpGaugeColor1 = Yanfly.Param.VHGMpColor1;
		obj.mpGaugeColor2 = Yanfly.Param.VHGMpColor2;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:HIDE MP GAUGE)>/i)) {
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
			}
		}
	}
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.VHG.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.VHG.Game_System_initialize.call(this);
		this.initShownMpGauge();
};

Game_System.prototype.initShownMpGauge = function() {
    this._shownMpGauge = [];
};

Game_System.prototype.showMpGaugeEnemy = function(id) {
    if (this._shownMpGauge === undefined) this.initShownMpGauge();
		if (!eval(Yanfly.Param.VHGDefeatFirst)) return true;
		return this._shownMpGauge.contains(id);
};

Game_System.prototype.addMpGaugeEnemy = function(id) {
    if (this._shownMpGauge === undefined) this.initShownMpGauge();
		if (this._shownMpGauge.contains(id)) return;
		this._shownMpGauge.push(id);
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.VHG.Game_BattlerBase_die = Game_BattlerBase.prototype.die;
Game_BattlerBase.prototype.die = function() {
  Yanfly.VHG.Game_BattlerBase_die.call(this);
  if (!this.isEnemy()) return;
  if (eval(Yanfly.Param.VHGDefeatFirst)) {
    if (!$gameSystem.showMpGaugeEnemy(this._enemyId)) this._noMpGauge = true;
  }
  $gameSystem.addMpGaugeEnemy(this._enemyId);
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.mpGaugeVisible = function() {
		if (this._noMpGauge) return false;
    if (this.isHidden()) return false;
		return true;
};

Game_Battler.prototype.mpGaugeWidth = function() {
		var width = Math.max(this.spriteWidth(),	Yanfly.Param.VHGMinMpWidth);
		return (width & 1) ? width + 1 : width;
};

Game_Battler.prototype.mpGaugeHeight = function() {
		return Yanfly.Param.VHGGaugeHeight;
};

Game_Battler.prototype.mpGaugeBackColor = function() {
		return Yanfly.Param.VHGBackColor;
};

Game_Battler.prototype.mpGaugeColor1 = function() {
		return Yanfly.Param.VHGMpColor1;
};

Game_Battler.prototype.mpGaugeColor2 = function() {
		return Yanfly.Param.VHGMpColor2;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.mpGaugeVisible = function() {
    if (this.isHidden()) return false;
		if (this.currentClass().showMpGauge) return true;
		if (!eval(Yanfly.Param.VHGDisplayActor)) return false;
		if (this.currentClass().hideMpGauge) return false;
		return Game_Battler.prototype.mpGaugeVisible.call(this);
};

Game_Actor.prototype.mpGaugeWidth = function() {
		if (this.currentClass().mpGaugeWidth > 0) {
			var width = this.currentClass().mpGaugeWidth;
		} else {
			var width = this.spriteWidth();
		}
		width = Math.max(width,	Yanfly.Param.VHGMinMpWidth);
		return (width & 1) ? width + 1 : width;
};

Game_Actor.prototype.mpGaugeHeight = function() {
		return this.currentClass().mpGaugeHeight;
};

Game_Actor.prototype.mpGaugeBackColor = function() {
		return this.currentClass().mpGaugeBackColor;
};

Game_Actor.prototype.mpGaugeColor1 = function() {
		return this.currentClass().mpGaugeColor1;
};

Game_Actor.prototype.mpGaugeColor2 = function() {
		return this.currentClass().mpGaugeColor2;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.mpGaugeVisible = function() {
    if (this.isHidden()) return false;
		if (this.enemy().hideMpGauge) return false;
    if (BattleManager.isBattleTest()) return true;
		if (this.enemy().showMpGauge) return true;
		if (!$gameSystem.showMpGaugeEnemy(this._enemyId)) return false;
		return Game_Battler.prototype.mpGaugeVisible.call(this);
};

Yanfly.VHG.Game_Enemy_revive = Game_Enemy.prototype.revive;
Game_Enemy.prototype.revive = function() {
    if (this._mp === 0) this._noMpGauge = false;
		Yanfly.VHG.Game_Enemy_revive.call(this);
};

Game_Enemy.prototype.mpGaugeWidth = function() {
		if (this.enemy().mpGaugeWidth > 0) {
			var width = this.enemy().mpGaugeWidth;
		} else {
			var width = this.spriteWidth();
		}
		width = Math.max(width,	Yanfly.Param.VHGMinMpWidth);
		return (width & 1) ? width + 1 : width;
};

Game_Enemy.prototype.mpGaugeHeight = function() {
		return this.enemy().mpGaugeHeight;
};

Game_Enemy.prototype.mpGaugeBackColor = function() {
		return this.enemy().mpGaugeBackColor;
};

Game_Enemy.prototype.mpGaugeColor1 = function() {
		return this.enemy().mpGaugeColor1;
};

Game_Enemy.prototype.mpGaugeColor2 = function() {
		return this.enemy().mpGaugeColor2;
};

//=============================================================================
// Sprite_Battler
//=============================================================================

Yanfly.VHG.Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
    Yanfly.VHG.Sprite_Battler_update.call(this);
    this.createVisualMpGaugeWindow();
};

Sprite_Battler.prototype.createVisualMpGaugeWindow = function() {
		if (this._createdVisualMpGaugeWindow) return;
		if (!this._battler) return;
		if (this.checkVisualATBGauge()) {
			if (!this._visualATBWindow) return;
			if (!this.parent.parent.children.contains(this._visualATBWindow)) return;
		}
		this._createdVisualMpGaugeWindow = true;
    this._visualMpGauge = new Window_VisualMPGauge();
    this._visualMpGauge.setBattler(this._battler);
    this.parent.parent.addChild(this._visualMpGauge);
};

Sprite_Battler.prototype.checkVisualATBGauge = function() {
    if (!Imported.YEP_X_BattleSysATB) return false;
    if (!BattleManager.isATB()) return false;
    if (!Imported.YEP_X_VisualATBGauge) return false;
    return this._battler.isEnemy();
};

Yanfly.VHG.Sprite_Battler_setBattler = Sprite_Battler.prototype.setBattler;
Sprite_Battler.prototype.setBattler = function(battler) {
    Yanfly.VHG.Sprite_Battler_setBattler.call(this, battler);
    if (this._visualMpGauge) this._visualMpGauge.setBattler(battler);
};

//=============================================================================
// Window_VisualMPGauge
//=============================================================================

function Window_VisualMPGauge() {
    this.initialize.apply(this, arguments);
}

Window_VisualMPGauge.prototype = Object.create(Window_Base.prototype);
Window_VisualMPGauge.prototype.constructor = Window_VisualMPGauge;

Window_VisualMPGauge.prototype.initialize = function() {
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

Window_VisualMPGauge.prototype.setBattler = function(battler) {
    if (this._battler === battler) return;
    this._battler = battler;
    this._currentMpValue = this._battler ? this._battler.mp : 0;
    this._displayedValue = this._battler ? this._battler.mp : 0;
};

Window_VisualMPGauge.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (!this._battler) return;
    this.updateWindowAspects();
};

Window_VisualMPGauge.prototype.updateWindowAspects = function() {
    this.updateWindowSize();
    this.updateWindowPosition();
    this.updateOpacity();
    this.updateMpPosition();
    this.updateRefresh();
};

Window_VisualMPGauge.prototype.updateWindowSize = function() {
    var spriteWidth = this._battler.mpGaugeWidth();
    var width = spriteWidth + this.standardPadding() * 2;
    width = Math.min(width, Graphics.boxWidth + this.standardPadding() * 2);
    var height = Math.max(this.lineHeight(), this.gaugeHeight() + 4);
    height += this.standardPadding() * 2;
    if (width === this.width && height === this.height) return;
    this.width = width;
    this.height = height;
    this.createContents();
    this._requestRefresh = true;
    this.makeWindowBoundaries();
};

Window_VisualMPGauge.prototype.makeWindowBoundaries = function() {
    if (!this._requestRefresh) return;
    this._minX = -1 * this.standardPadding();
    this._maxX = Graphics.boxWidth - this.width + this.standardPadding();
    this._minY = -1 * this.standardPadding();
    this._maxY = Graphics.boxHeight - this.height + this.standardPadding();
    this._maxY -= SceneManager._scene._statusWindow.height;
};

Window_VisualMPGauge.prototype.updateWindowPosition = function() {
    if (!this._battler) return;
    var battler = this._battler;
    this.x = battler.spritePosX();
    this.x -= Math.ceil(this.width / 2); 
    this.x = this.x.clamp(this._minX, this._maxX);
    this.y = battler.spritePosY();
    if (Yanfly.Param.VHGGaugePos) {
      this.y -= battler.spriteHeight();
    } else {
      this.y -= this.standardPadding();
    }
    this.y = this.y.clamp(this._minY, this._maxY);
    this.y += Yanfly.Param.VHGBufferY;
};

Window_VisualMPGauge.prototype.updateOpacity = function() {
    if (this.isShowWindow()) {
      this.contentsOpacity += 32;
    } else {
      this.contentsOpacity -= 32;
    }
};

Window_VisualMPGauge.prototype.isShowWindow = function() {
    if (!this._battler.isAppeared()) return false;
    if (!this._battler.mpGaugeVisible()) return false;
    if (Yanfly.Param.VHGAlwaysShow && !this._battler.isDead()) return true;
    if (this._currentMpValue !== this._displayedValue) return true;
    if (this._battler.isSelected()) return true;
    --this._visibleCounter;
    return this._visibleCounter > 0;
};

Window_VisualMPGauge.prototype.updateMpPosition = function() {
    if (!this._battler) return;
    if (this._currentMpValue !== this._battler.mp) {
      this._visibleCounter = Yanfly.Param.VHGGaugeDuration;
      this._currentMpValue = this._battler.mp;
      var difference = Math.abs(this._displayedValue - this._battler.mp);
      this._dropSpeed = Math.ceil(difference / Yanfly.Param.VHGGaugeDuration);
    }
    this.updateDisplayCounter();
};

Window_VisualMPGauge.prototype.updateDisplayCounter = function() {
    if (this._battler._barrierAltered) {
      this._battler._barrierAltered = false;
    } else if (this._currentMpValue === this._displayedValue) {
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

Window_VisualMPGauge.prototype.updateRefresh = function() {
    if (this._requestRefresh) this.refresh();
};

Window_VisualMPGauge.prototype.refresh = function() {
    this.contents.clear();
    if (!this._battler) return;
    this._requestRefresh = false;
    var wy = this.contents.height - this.lineHeight();
    var ww = this.contents.width;
    this.drawActorMp(this._battler, 0, wy, ww);
};

Window_VisualMPGauge.prototype.gaugeBackColor = function() {
    return this.textColor(this._battler.mpGaugeBackColor());
};

Window_VisualMPGauge.prototype.mpGaugeColor1 = function() {
    return this.textColor(this._battler.mpGaugeColor1());
};

Window_VisualMPGauge.prototype.mpGaugeColor2 = function() {
    return this.textColor(this._battler.mpGaugeColor2());
};

Window_VisualMPGauge.prototype.drawActorMp = function(actor, x, y, width) {
    width = width || 186;
    var color1 = this.mpGaugeColor1();
    var color2 = this.mpGaugeColor2();
    var rate = this._displayedValue / actor.mmp;
    if (Imported.YEP_AbsorptionBarrier && actor.barrierPoints() > 0) {
      ww = this.drawBarrierGauge(actor, x, y, width);
    } else {
      this.drawGauge(x, y, width, rate, color1, color2);
    }
    if (Yanfly.Param.VHGShowMP) {
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.mpA, x, y, 44);
    }
    if (Yanfly.Param.VHGShowValue) {
      var val = this._displayedValue
      var max = actor.mmp;
      var w = width;
      var color = this.mpColor(actor);
      this.drawCurrentAndMax(val, max, x, y, w, color, this.normalColor());
    }
};

Window_VisualMPGauge.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                   width, color1, color2) {
    if (Yanfly.Param.VHGShowMax) {
      Window_Base.prototype.drawCurrentAndMax.call(this, current, max,
        x, y, width, color1, color2);
    } else {
      var align = Yanfly.Param.VHGShowMP ? 'right' : 'center';
      var text = Yanfly.Util.toGroup(current);
      this.changeTextColor(color1);
      this.drawText(text, x, y, width, align);
    }
};

Window_VisualMPGauge.prototype.gaugeHeight = function() {
    if (!this._battler) return Window_Base.prototype.gaugeHeight.call(this);
    return this._battler.mpGaugeHeight();
};

if (Imported.YEP_CoreEngine && Yanfly.Param.VHGThick) {

Window_VisualMPGauge.prototype.drawGauge =
function(dx, dy, dw, rate, color1, color2) {
    var color3 = this.gaugeBackColor();
    var fillW = Math.floor(dw * rate).clamp(0, dw);
    var gaugeH = this.gaugeHeight();
    var gaugeY = dy + this.lineHeight() - gaugeH - 2;
    if (eval(Yanfly.Param.GaugeOutline)) {
      color3.paintOpacity = this.translucentOpacity();
      this.contents.fillRect(dx, gaugeY, dw, gaugeH, color3);
      dx += 2;
      gaugeY += 2;
      fillW = Math.max(0, fillW - 4);
      gaugeH -= 4;
    } else {
      var fillW = Math.floor(dw * rate);
      var gaugeY = dy + this.lineHeight() - gaugeH - 2;
      this.contents.fillRect(dx, gaugeY, dw, gaugeH, color3);
    }
    this.contents.gradientFillRect(dx, gaugeY, fillW, gaugeH, color1, color2);
};

} // Imported.YEP_CoreEngine

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function(inVal) {
        return inVal;
    }
};

//=============================================================================
// End of File
//=============================================================================
};

