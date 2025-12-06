/*:
 * @plugindesc v1.0.1 Lets you place enemy battlers using a semi-dynamic formula.
 * @author LadyBaskerville
 *
 * @param Use Default Placement
 * @desc If true, all enemies with no notetags will be placed at the default position specified in the parameters below.
 * @type boolean
 * @default false
 *
 * @param Default X Position
 * @desc X position if no notetag is present. Default: 16 + (troopSize + 2) * 32 - index * 32
 * @default 16 + (troopSize + 2) * 32 - index * 32
 *
 * @param Default Y Position
 * @desc Y position if no notetag is present. Default: screenHeight - statusHeight - troopSize * 48 + (index+1) * 48 - 32
 * @default screenHeight - statusHeight - troopSize * 48 + (index+1) * 48 - 32
 *
 * @help
 * EnemyPlacement.js
 * Version 1.0.1
 *
 * Use the following notetags in the enemy notebox:
 *
 * <XPosEval: [expression]> and <YPosEval: [expression]>
 * to place the enemy graphic at the X/Y position to which the Javascript line
 * [expression] evaluates. You can also use pure numbers.
 * 
 * <UseDefaultXPos> and <UseDefaultYPos>
 * to place the enemy graphic at the default position specified
 * in this plugin's parameters.
 *
 * The plugin parameters allow you to set default formulas for the X and Y
 * positions. Set the parameter "Use Default Placement" to true if all
 * enemies without their own <X/YPosEval> notetags should use these default
 * values. You can also keep "Use Default Placement" set to false and use
 * the <UseDefaultX/YPos> notetags for each enemy that should be placed
 * at the default position.
 *
 * You can use the following variables as part of [expression]:
 * screenWidth - the width of the game window in pixels
 * screenHeight - the height of the game window in pixels
 * troopSize - the number of enemies in the troop
 * index - the index of the enemy within the troop
 * statusHeight - the height of the status window
 * (If you know what you are doing, you can also use: 
 *  this - the Game_Troop object
 *  e - the Game_Enemy object)
 * For reference, the default X/Y positions in the parameters are:
 * X: 16 + (troopSize + 2) * 32 - index * 32
 * Y: screenHeight - statusHeight - troopSize * 48 + (index+1) * 48 - 32
 *
 * Changelog:
 * Version 1.0.1
 * - Fixed a mistake in the calculation of statusHeight.
 * Version 1.0.0
 * - Finished the plugin.
 *
 * Free for use in both non-commercial and commercial games.
 * No credit required.
 * Edits and reposts allowed.
 */

(function() {

var baseStatusHeight = 4;

// Compatability
if (typeof Imported !== 'undefined' && Imported.YEP_BattleEngineCore) {
	Window_EnemyVisualSelect.prototype.makeWindowBoundaries = function() {
		if (!this._requestRefresh) return;
		this._minX = -1 * this.standardPadding();
		this._maxX = Graphics.boxWidth - this.width + this.standardPadding();
		this._minY = -1 * this.standardPadding();
		this._maxY = Graphics.boxHeight - this.height + this.standardPadding();
	};
	
	baseStatusHeight = eval(Yanfly.Param.BECCommandRows);
}

var defXPosEval = PluginManager.parameters('EnemyPlacement')['Default X Position'] || 0;
var defYPosEval = PluginManager.parameters('EnemyPlacement')['Default Y Position'] || 0;
var useDef = PluginManager.parameters('EnemyPlacement')['Use Default Placement'] == 'true';

_GameTroop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) {
    _GameTroop_setup.call(this, troopId);
	this.placeEnemies();
};

Game_Troop.prototype.placeEnemies = function() {
	var screenWidth = Graphics.boxWidth;
	var screenHeight = Graphics.boxHeight;
	var troopSize = this._enemies.length;
	var statusHeight = baseStatusHeight * Window_Base.prototype.lineHeight.call(this);
	statusHeight += Window_Base.prototype.standardPadding.call(this) * 2;
	for (var index = 0; index < this._enemies.length; index ++) {
		var e = this._enemies[index];
		if (e.enemy().meta.XPosEval) {
			e._screenX = eval(e.enemy().meta.XPosEval);
		} else if (useDef || e.enemy().meta.UseDefaultXPos) {
			e._screenX = eval(defXPosEval);
		}
		if (e.enemy().meta.YPosEval) {
			e._screenY = eval(e.enemy().meta.YPosEval);
		} else if (useDef || e.enemy().meta.UseDefaultYPos) {
			e._screenY = eval(defYPosEval);
		}
	}
};

})();