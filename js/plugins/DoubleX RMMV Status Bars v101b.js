/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Status Bars
 *----------------------------------------------------------------------------
 *    # Terms Of Use
 *      1. Commercial use's always allowed and crediting me's always optional.
 *      2. You shall keep this plugin's Plugin Info part's contents intact.
 *      3. You shalln't claim that this plugin's written by anyone other than
 *         DoubleX or my aliases. I always reserve the right to deny you from
 *         using any of my plugins anymore if you've violated this.
 *      4. CC BY 4.0, except those conflicting with any of the above, applies
 *         to this plugin, unless you've my permissions not needing follow so.
 *      5. I always reserve the right to deny you from using this plugin
 *         anymore if you've violated any of the above.
 *----------------------------------------------------------------------------
 *    # Prerequisites
 *      Abilities:
 *      1. Nothing special for most rudimetary use cases
 *      2. Little RMMV plugin development proficiency for most ordinary uses
 *      3. Some RMMV plugin development proficiency to fully utilize this
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. http://pastebin.com/5BMvWPbu
 *      Video:
 *      1. https://www.youtube.com/watch?v=kaGhzueQwUs
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.01b(GMT 1200 7-7-2019):
 *      1. Fixed the invisible status bars not being able to be visible again
 *      2. Fixed the equips, classes and actors status bar data not being used
 *      v1.01a(GMT 1400 12-8-2017):
 *      1. Lets you set the status bars to show the stat change processes via
 *         showProc, procUpdateRate, procColor1 and procColor2 in SBX
 *      2. Fixed crashes for status bars having the same minimum and maximum
 *      v1.00a(GMT 1700 16-9-2016):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets you use bars to show battler statuses on their sprites
 * @author DoubleX
 *
 * @param isEnabled
 * @desc Sets whether this plugin will be enabled
 *       It'll be stored as a boolean, and will be regarded as true if and only
 *       if it's true
 *       Don't change this during the same battle unless you really know what
 *       you're truly foing
 *       E.g.: Setting isEnabled as false will disable this plugin
 * @default true
 *
 * @help
 * You're supposed to open this plugin js file to edit its configurations
 * The default plugin file name is DoubleX RMMV Status Bars v101b
 * If you want to change that, you must edit the value of
 * DoubleX_RMMV.Status_Bars_File, which must be done via opening this plugin
 * js file directly
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # Actor/Class/Weapon/Armor/Enemy/State Notetags:
 *      State notetags take the highest priority, followed by enemy, weapon,
 *      armor, class and actor
 *      1. <status status bar: SBX>
 *         - Sets the battler to setup a status bar of status using
 *           configurations set in function name SBX, which can only be edited
 *           in this plugin js file directly
 *         - status must be included in STATUSES, which can only be edited in
 *           this plugin js file directly
 *         - E.g.:
 *           <hp status bar: HP> will set the battler to setup a hp status bar
 *           using configurations set in HP, which can only be edited in this
 *           plugin js file directly
 *         - Only the 1st effective notetag among all having the same status
 *           will be used(Reference tag: NOTETAG_MONO)
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Configuration manipulations
 *      1. $gameSystem.statusBars.param
 *         - Returns the stored value of param listed in the plugin manager
 *         - E.g.:
 *           $gameSystem.statusBars.isEnabled will return a Boolean indicating
 *           whether this plugin's enabled
 *      2. $gameSystem.statusBars.param = val
 *         - Sets the stored value of param listed in plugin manager as val
 *         - E.g.:
 *           $gameSystem.statusBars.isEnabled = false will set the stored
 *           value of parameter isEnabled shown on the plugin manager as false
 *         - All $gameSystem.statusBars.param changes will be saved
 *    # Actor/Class/Weapon/Armor/Enemy/State notetag manipulations
 *      1. meta.statusBars[status]
 *         - Returns the function name SBX for String status specified in
 *           <status status bar: SBX> if there's any
 *         - E.g.:
 *           $dataStates[1].meta.statusBars[hp] will return the function SBX
 *           specified in <hp status bar: SBX> notetag of state with id 1
 *      2. meta.statusBars[status] = SBX
 *         - Sets the String status in <status status bar: SBX> notetag to use
 *           the function with name SBX which is a String
 *         - E.g.:
 *           $dataEnemies[2].meta.statusBars['mp'] = 'MP' will set the SBX
 *           specified in <mp status bar: SBX> notetag of enemy with id 2 as
 *           MP
 *         - All meta.statusBars changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *    # Battler manipulations
 *      1. isStatusBarChanged[status] = true
 *         - Notifys the status status bar of the battler to use a new
 *           configuration object
 *         - It'll be reset as false once a new configuration object's used
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].isStatusBarChanged['tp'] = true will
 *           notify the tp status bar of the battler to use a new
 *           configuration object
 *    # Status bar manipulations
 *      1. new Window_Status_Bar(battler, status)
 *         - Creates a new status bar showing the status status of battler
 *           battler
 *         - E.g.:
 *           new Window_Status_Bar($gameTroop.aliveMembers()[0], 'hp') will
 *           create a new status bar showing the hp status of the 1st troop
 *           member
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV['Status Bars'] = 'v1.01b';

// The plugin file name must be the same as DoubleX_RMMV.Status_Bars_File
DoubleX_RMMV.Status_Bars_File = 'DoubleX RMMV Status Bars v101b';

/*============================================================================
 *    ## Plugin Configurations
 *       You only need to edit this part as it's about what this plugin does
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.Status_Bars = {

    /* Setups the list of statuses that can have their status bars drawn
     * Each status must be represented by the name of its battler getter
     */
    STATUSES: [
        'hp',
        'mp',
        'tp'
    ],

    /*------------------------------------------------------------------------
     *    Status Bar Functions
     *    - Setups SBX used by <status bar: SBX>
     *------------------------------------------------------------------------*/
    /* SBX are used by Window_Status_Bar at this._cfg = SB[this._cfgName](); in
     * _updateCfg
     * SBX are Javascript functions which must return an Object having at least
     * the following:
     * {
     *     visible: function(battler), // Hotspot
     *     opacity: function(battler), // Hotspot
     *     backColor: function(battler), // Hotspot
     *     color1: function(battler), // Hotspot
     *     color2: function(battler), // Hotspot
     *     x: function(battler), // Hotspot
     *     y: function(battler), // Hotspot
     *     w: function(battler), // Hotspot
     *     h, function(battler), // Hotspot
     *     text, function(battler), // Hotspot
     *     textX: function(battler), // Hotspot
     *     textY: function(battler), // Hotspot
     *     textSize: function(battler), // Hotspot
     *     textColor: function(battler), // Hotspot
     *     min: function(battler), // Hotspot
     *     max: function(battler), // Hotspot
     *     (v1.01a+)showProc: function(battler), // Hotspot
     *     (v1.01a+)procUpdateRate: function(battler) // Hotspot
     * }
     * All functions will be bound to the Window_Status_Bar upon its creation
     * and must take the battler and database item using the SBX as their
     * arguments
     *
     * Status bar configuration functions:
     * The function result of visible, which is the status bar visibility, will
     * be interpreted as truthy or falsy only
     * The function of opacity, which is the status bar opacity, must return a
     * Number between 0 and 255
     * The functions of backColor, color1 and color2, which are the status bar
     * back, 1st and 2nd colors respectively, must return a Number between
     * #00000000 and #FFFFFFFF
     * The functions of x and y, which are the status bar x and y offsets from
     * the battler sprites respectively, must return a Number
     * The functions of w and h, which are the status bar width and height
     * respectively, must return a positive Number
     * The function of text, which is the status bar description text, must
     * return a String
     * The functions of textX, textY and textSize, which are the status bar
     * description text x and y offset from the status bar, and size
     * respectively, must return a positive Number
     * The functions of min and max, which are the minimum and maximum value of
     * the status respiectively, must return a Number that must be not greater
     * than and not less than all the possible values of the current value
     * respectively
     * (v1.01a+)The functions of showProc, which is whether the stat change
     * processes will be shown on the status bars, will be interpreted as truthy
     * or falsy only
     * (v1.01a+)The functions of procUpdateRate, which is the rate relative to
     * the max length of the stat bar per second, must return a Number between 0
     * and 1
     * (v1.01a+)The functions of procColor1 and procColor2, which are the status
     * bar 1st and 2nd stat change colors respectively, must return a Number
     * between #00000000 and #FFFFFFFF
     *
     * SBX names can only use alphanumeric characters
     * The below SBX are examples added to help you set your SBX
     * You can freely use, rewrite and/or delete these examples
     *
     * Advanced:
     * The status bar prototype's inherited from Window_Base.prototype
     * All status bar configuration functions are used by Window_Status_Bar
     * visible and opacity are used in _updateBarVisibility
     * backColor, color1, color2, textColor, text, textX and textY are used in
     * _updateSetting
     * x, y, w and h are used in initialize
     * x is also used in _updateX
     * y is also used in _updateY
     * w is also used in _updateW
     * h is also used in _updateH
     * min and max are used in _updateFillW
     * (v1.01a+)showProc
     */

    // Sets the status bar to display the battler's hp statuses
    HP: function() { // v1.00a - v1.01a; Potential Hotspot
        return {
            // Sets the hp bar to be always visible only for alive battlers
            visible: function(battler) { return battler.isAlive(); }, // Hotspot
            // Sets the hp bar opacity to be always 255
            opacity: function(battler) { return 255; }, // Hotspot
            // Sets the hp bar color 1 to be always text color 15
            backColor: function(battler) { // Hotspot
                return this.textColor(15);
            },
            // Sets the hp bar color 1 to be always text color 20
            color1: function(battler) { return this.textColor(20); }, // Hotspot
            // Sets the hp bar color 2 to be always text color 21
            color2: function(battler) { return this.textColor(21); }, // Hotspot
            // Sets the hp bar x offset from battler sprite to be always 0
            x: function(battler) { return 0; }, // Hotspot
            // Sets the hp bar y offset from battler sprite to be always 16
            y: function(battler) { return 16; }, // Hotspot
            // Sets the hp bar width to be always 87
            w: function(battler) { return 87; }, // Hotspot
            // Sets the hp bar height to be always 16
            h: function(battler) { return 16; }, // Hotspot
            // Sets the hp bar description text to be always hp/mhp
            text: function(battler) { // Hotspot
                return battler.hp.toString() + '/' + battler.mhp.toString();
            },
            // Sets the hp bar description text size to be always 0
            textX: function(battler) { return 0; }, // Hotspot
            // Sets the hp bar description text size to be always 0
            textY: function(battler) { return 0; }, // Hotspot
            // Sets the hp bar description text size to be always 13
            textSize: function(battler) { return 13; }, // Hotspot
            // Sets hp bar description text color to be always text color 0
            textColor: function(battler) { // Hotspot
                return this.textColor(0);
            },
            // Sets the minimum hp to be shown on the hp bar to be always 0
            min: function(battler) { return 0; }, // Hotspot
            // Sets the maximum hp to be shown on the hp bar to be always mhp
            max: function(battler) { return battler.mhp; }, // Hotspot
            // (v1.01a+)Sets the hp change processes to be always shown
            showProc: function(battler) { return true; }, // Hotspot
            // (v1.01a+)Sets the hp change processes rate to be 100% of the
            // max length of the hp bar per second
            procUpdateRate: function(battler) { return 0.2; }, // Hotspot
            // Sets the hp change process color 1 to be always text color 6
            procColor1: function(battler) { return this.textColor(6); },
            // Hotspot
            // Sets the hp change process color 2 to be always text color 17
            procColor2: function(battler) { return this.textColor(17); }
            // Hotspot
        };
    },

    // Sets the status bar to display the battler's mp statuses
    MP: function() { // v1.00a - v1.01a; Potential Hotspot
        return {
        	// Sets the mp bar to be always visible only for alive battlers
            visible: function(battler) { return battler.isAlive(); }, // Hotspot
            // Sets the mp bar opacity to be always 255
            opacity: function(battler) { return 255; }, // Hotspot
            // Sets the mp bar color 1 to be always text color 15
            backColor: function(battler) { // Hotspot
                return this.textColor(15);
            },
            // Sets the mp bar color 1 to be always text color 22
            color1: function(battler) { return this.textColor(22); }, // Hotspot
            // Sets the mp bar color 2 to be always text color 23
            color2: function(battler) { return this.textColor(23); }, // Hotspot
            // Sets the mp bar x offset from battler sprite to be always 0
            x: function(battler) { return 0; }, // Hotspot
            // Sets the mp bar y offset from battler sprite to be always 32
            y: function(battler) { return 32; }, // Hotspot
            // Sets the mp bar width to be always 87
            w: function(battler) { return 87; }, // Hotspot
            // Sets the mp bar height to be always 16
            h: function(battler) { return 16; }, // Hotspot
            // Sets the mp bar description text to be always mp/mmp
            text: function(battler) { // Hotspot
                return battler.mp.toString() + '/' + battler.mmp.toString();
            },
            // Sets the mp bar description text size to be always 0
            textX: function(battler) { return 0; }, // Hotspot
            // Sets the mp bar description text size to be always 0
            textY: function(battler) { return 0; }, // Hotspot
            // Sets the mp bar description text size to be always 13
            textSize: function(battler) { return 13; }, // Hotspot
            // Sets mp bar description text color to be always text color 0
            textColor: function(battler) { // Hotspot
                return this.textColor(0);
            },
            // Sets the minimum mp to be shown on the hp bar to be always 0
            min: function(battler) { return 0; }, // Hotspot
            // Sets the maximum mp to be shown on the hp bar to be always mmp
            max: function(battler) { return battler.mmp; }, // Hotspot
            // (v1.01a+)Sets the mp change processes to be always shown
            showProc: function(battler) { return true; }, // Hotspot
            // (v1.01a+)Sets the mp change processes rate to be 100% of the
            // max length of the mp bar per second
            procUpdateRate: function(battler) { return 0.2; }, // Hotspot
            // Sets the mp change process color 1 to be always text color 1
            procColor1: function(battler) { return this.textColor(1); },
            // Hotspot
            // Sets the mp change process color 2 to be always text color 4
            procColor2: function(battler) { return this.textColor(4); }
            // Hotspot
        };
    },

    // Sets the status bar to display the battler's tp statuses
    TP: function() { // v1.00a - v1.01a; Potential Hotspot
        return {
        	// Sets the tp bar to be always visible
            visible: function(battler) { return battler.isAlive(); }, // Hotspot
            // Sets the tp bar opacity to be always 255
            opacity: function(battler) { return 255; }, // Hotspot
            // Sets the tp bar color 1 to be always text color 15
            backColor: function(battler) { // Hotspot
                return this.textColor(15);
            },
            // Sets the tp bar color 1 to be always text color 28
            color1: function(battler) { return this.textColor(28); }, // Hotspot
            // Sets the tp bar color 2 to be always text color 29
            color2: function(battler) { return this.textColor(29); }, // Hotspot
            // Sets the tp bar x offset from battler sprite to be always 0
            x: function(battler) { return 0; }, // Hotspot
            // Sets the tp bar y offset from battler sprite to be always 48
            y: function(battler) { return 48; }, // Hotspot
            // Sets the tp bar width to be always 87
            w: function(battler) { return 87; }, // Hotspot
            // Sets the tp bar height to be always 16
            h: function(battler) { return 16; }, // Hotspot
            // Sets the tp bar description text to be always tp/maxTp()
            text: function(battler) { // Hotspot
                return battler.tp.toString() + '/' + battler.maxTp().toString();
            },
            // Sets the tp bar description text size to be always 0
            textX: function(battler) { return 0; }, // Hotspot
            // Sets the tp bar description text size to be always 0
            textY: function(battler) { return 0; }, // Hotspot
            // Sets the tp bar description text size to be always 13
            textSize: function(battler) { return 13; }, // Hotspot
            // Sets tp bar description text color to be always text color 0
            textColor: function(battler) { // Hotspot
                return this.textColor(0);
            },
            // Sets the minimum tp to be shown on the hp bar to be always 0
            min: function(battler) { return 0; }, // Hotspot
            // Sets maximum tp to be shown on the hp bar to be always maxTp()
            max: function(battler) { return battler.maxTp(); }, // Hotspot
            // (v1.01a+)Sets the tp change processes to be always shown
            showProc: function(battler) { return true; }, // Hotspot
            // (v1.01a+)Sets the mp change processes rate to be 100% of the
            // max length of the mp bar per second
            procUpdateRate: function(battler) { return 0.2; }, // Hotspot
            // Sets the tp change process color 1 to be always text color 3
            procColor1: function(battler) { return this.textColor(3); },
            // Hotspot
            // Sets the tp change process color 2 to be always text color 24
            procColor2: function(battler) { return this.textColor(24); }
            // Hotspot
        };
    },

    // Adds new SBX here


}; // DoubleX_RMMV.Status_Bars

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Decent RMMV plugin development proficiency to fully comprehend
 *           this
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.Is_Status_Bar_Notes_Loaded = false; // v1.00a - v1.00a

DoubleX_RMMV.Status_Bars_Params = { // v1.00a - v1.00a

    isEnabled: 'Boolean', // Marks that isEnabled is a Boolean

    /* Checks whether the passed configuration value's truthy or falsy
     * Functional cohesion/Data coupling/Referentially transperant
     * (String)param: The param to have its boolean value checked
     * Return: The boolean value of the param
     */
    Boolean: function(param) { return param === 'true'; }

}; // DoubleX_RMMV.Status_Bars_Params

function Window_Status_Bar() { this.initialize.apply(this, arguments); }

(function(SB) {

    'use strict';

    SB.DataManager = {};
    var DM = SB.DataManager;

    DM.isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() { // v1.00a - v1.00a; Extended
        // Rewritten to read all notetags of this plugin as well
        return DM.isDatabaseLoaded.apply(this, arguments) && DM._loadAllNotes();
        //
    }; // DataManager.isDatabaseLoaded

    /* Reads all notetags of this plugin from the database
     * Return: True
     * Functional cohesion/Message coupling/Idempotent
     */
    DM._loadAllNotes = function() { // v1.00a - v1.00a; New
        // Ensures the notetags will only be read exactly once upon game start
        if (DoubleX_RMMV.Is_Status_Bar_Notes_Loaded) return true;
        var types = [$dataActors, $dataClasses, $dataWeapons, $dataArmors];
        types.concat([$dataEnemies, $dataStates]).forEach(function(type) {
            type.forEach(function(data) { if (data) DM._loadNotes(data); });
        });
        DoubleX_RMMV.Is_Status_Bar_Notes_Loaded = true;
        //
        return true;
    }; // DM._loadAllNotes

    /* Reads all notetags of this plugin from a dataum of the database
     * (Object)datum: The datum to have its notetags of this plugin read
     * Functional cohesion/Data coupling/Idempotent
     */
    DM._loadNotes = function(datum) { // v1.00a - v1.00a; New
        var statusBars = datum.meta.statusBars = {}; // Plugin call
        var regExp = /< *(\w+) +status +bar *: *(\w+) *>/i, status;
        // Refer to reference tag NOTETAG_MONO
        datum.note.split(/[\r\n]+/).forEach(function(line) {
            if (!line.match(regExp)) return;
            status = RegExp.$1;
            statusBars[status] = statusBars[status] || RegExp.$2;
        });
        //
    }; // DM._loadNotes

    SB.Game_System = {};
    var GS = SB.Game_System;

    /*------------------------------------------------------------------------
     *    New public instance variable
     *------------------------------------------------------------------------*/
    // (Plugin call)The container of all parameters shown on the plugin manger
    Object.defineProperty(Game_System.prototype, "statusBars", {
        get: function() { /* Hotspot */ return this._statusBars; },
        configurable: true
    });

    GS.initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() { // v1.00a - v1.00a; Extended
        GS.initialize.apply(this, arguments);
        GS._initializeStatusBars.call(this); // Added to setup configurations
    }; // Game_System.prototype.initialize

    /* Initializes all parameters of this plugin shown on the plugin manager
     * Functional cohesion/Message coupling/Idempotent
     */
    GS._initializeStatusBars = function() { // v1.00a - v1.00a; New
        this._statusBars = {};
        var params = PluginManager.parameters(DoubleX_RMMV.Status_Bars_File);
        var SBP = DoubleX_RMMV.Status_Bars_Params;
        // Lets parameters to use their strategies to have their desired formats
        Object.keys(params).forEach(function(param) {
            this._statusBars[param] = SBP[SBP[param]](params[param]);
        }, this);
        //
    }; // GS._initializeStatusBars

    SB.Game_BattlerBase = {};
    var GBB = SB.Game_BattlerBase;

    /*------------------------------------------------------------------------
     *    New public instance variable
     *------------------------------------------------------------------------*/
    // (Plugin call only)Container of all status bar change notification flags
    Object.defineProperty(Game_BattlerBase.prototype, "isStatusBarChanged", {
        get: function() { /* Hotspot */ return this._isStatusBarChanged; },
        configurable: true
    });

    /*------------------------------------------------------------------------
     *    New private instance variable
     *------------------------------------------------------------------------*/
    // _statusBars: The container of all status bar configurations

    GBB.initMembers = Game_BattlerBase.prototype.initMembers;
    Game_BattlerBase.prototype.initMembers = function() {
    // v1.00a - v1.00a; Extended
        GBB._initStatusBarChanges.call(this); // Added
        GBB.initMembers.apply(this, arguments);
    }; // Game_BattlerBase.prototype.initMembers

    GBB.refresh = Game_BattlerBase.prototype.refresh;
    Game_BattlerBase.prototype.refresh = function() {
    // v1.00a - v1.00a; Extended
        GBB.refresh.apply(this, arguments);
        // Added to notify that the status bar configurations might be changed
        if (!$gameSystem.statusBars.isEnabled) return;
        GBB._notifyStatusBarChanges.call(this);
        //
    }; // Game_BattlerBase.prototype.refresh

    /* Setups the change notification flags of all statuses for this battler
     * Functional cohesion/Message coupling/Idempotent
     */
    GBB._initStatusBarChanges = function() { // v1.00a - v1.00a; New
        this._statusBars = {};
        this._isStatusBarChanged = {};
        SB.STATUSES.forEach(function(status) {
            this._isStatusBarChanged[status] = true;
        }, this);
    }; // GBB._initStatusBarChanges

    /* Marks that a new status bar configuration might need to be used
     * Functional cohesion/Message coupling/Idempotent
     */
    GBB._notifyStatusBarChanges = function() { // v1.00a - v1.00a; New
        // Raises the change notification flags of all statuses for this battler
        Object.keys(this._isStatusBarChanged).forEach(function(status) {
            this._isStatusBarChanged[status] = true;
        }, this);
        //
    }; // GBB._notifyStatusBarChanges

    /* Returns the latest status bar configuration object for the given status
     * Sequential cohesion/Data coupling/Idempotent
     * (String)status: The battler status shown by the status bar
     * Return(Object): The status bar configuration object for the given status
     */
    GBB.statusBarCfg = function(status) { // v1.00a - v1.00a; New; Hotspot
        // Setups a new status bar configuration only when it might be needed
        if (!this._statusBars[status] || this._isStatusBarChanged[status]) {
            this._isStatusBarChanged[status] = false;
            this._statusBars[status] = GBB._newStatusBarCfg.call(this, status);
        }
        //
        return this._statusBars[status];
    }; // GBB.statusBarCfg

    /* Returns a new status bar configuration object for the given status
     * Functional cohesion/Data coupling/Referentially transperant
     * (String)status: The battler status shown by the status bar
     * Return(Object): A new status bar configuration object for the status
     */
    GBB._newStatusBarCfg = function(status) {
    // v1.00a - v1.00a; New; Potential Hotspot
        // Refer to reference tag NOTETAG_MONO
        var datum = this._statusBarData().filter(function(data) {
            return data.meta.statusBars[status];
        })[0];
        return datum ? datum.meta.statusBars[status] : '';
        //
    }; // GBB._newStatusBarCfg

    /* Returns all database items that might have status bar configuration notes
     * Functional cohesion/Message coupling/Referentially transperant
     * Return(Array): An array of database item used by this battler
     */
    GBB._statusBarData = function() { // v1.00a - v1.00a; New; Potential Hotspot
        return this.states(); // Game_BattlerBase is abstract so GBB can be used
    }; // GBB._statusBarData

    /* Returns all database items that might have status bar configuration notes
     * Functional cohesion/Message coupling/Referentially transperant
     * Return(Array): An array of database item used by this actor
     */
    Game_Actor.prototype._statusBarData = function() {
    // v1.00a - v1.00a; New; Potential Hotspot
        // Use polymorphism at the cost of not using GA
        var data = GBB._statusBarData.call(this);
        return data.concat(this.equips().filter(function(equip) {
            return equip;
        })).concat([this.currentClass(), this.actor()]);
        //
    }; // Game_Actor.prototype._statusBarData

    /* Returns all database items that might have status bar configuration notes
     * Functional cohesion/Message coupling/Referentially transperant
     * Return(Array): An array of database item used by this enemy
     */
    Game_Enemy.prototype._statusBarData = function() {
    // v1.00a - v1.00a; New; Potential Hotspot
        // Use polymorphism at the cost of not using GE
        return GBB._statusBarData.call(this).concat([this.enemy()]);
        //
    }; // Game_Enemy.prototype._statusBarData

    SB.Sprite_Battler = {};
    var SBSB = SB.Sprite_Battler;

    /*------------------------------------------------------------------------
     *    New private instance variable
     *------------------------------------------------------------------------*/
    // _statusBars: The container of all status bars for the battler

    SBSB.setBattler = Sprite_Battler.prototype.setBattler;
    Sprite_Battler.prototype.setBattler = function(battler) {
    // 1.00a - v1.00a; Extended; Hotspot
        // Added to reconfigure the status bars upon battler change
        var change = battler !== this._battler;
        //
        SBSB.setBattler.apply(this, arguments);
        // Added
        if (!$gameSystem.statusBars.isEnabled || !battler || !change) return;
        if (!this._statusBars) return SBSB._initStatusBars.call(this);
        SBSB._setStatusBarBattlers.call(this);
        //
    }; // Sprite_Battler.prototype.setBattler

    /* Setups all status bars for this battler
     * Functional cohesion/Message coupling/Idempotent
     */
    SBSB._initStatusBars = function() { // v1.00a - v1.00a; New
        this._statusBars = {};
        SB.STATUSES.forEach(function(status) {
            this._statusBars[status] =
                    new Window_Status_Bar(this._battler, status);
            this.addChild(this._statusBars[status]);
        }, this);
    }; // SBSB._initStatusBars

    /* Updates the owner info stored in all status bars
     * Functional cohesion/Message coupling/Idempotent
     */
    SBSB._setStatusBarBattlers = function() { // v1.00a - v1.00a; New
        SB.STATUSES.forEach(function(status) {
            this._statusBars[status].battler = this._battler;
        }, this);
    }; // SBSB._setStatusBarBattlers

    /*------------------------------------------------------------------------
     *    # New class: Window_Status_Bar
     *------------------------------------------------------------------------*/

    Window_Status_Bar.prototype = Object.create(Window_Base.prototype);
    Window_Status_Bar.prototype.constructor = Window_Status_Bar;

    /*------------------------------------------------------------------------
     *    New public instance variable
     *------------------------------------------------------------------------*/
    // battler: The battler owning this status bar
    Object.defineProperty(Window_Status_Bar.prototype, "battler", {
        set: function() { /* Hotspot */ return this._battler; },
        configurable: true
    });

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    /* _backColor: The back color of this status bar
     * _cfgName: The name of the configuration object used by this status bar
     * _cfg: The configuration object used by this status bar
     * _color1: The 1st color of this status bar
     * _color2: The 2nd color of this status bar
     * _fillW: The width of the filled portion of the status bar
     * _isRedraw: The flag indicating whether the status bar needs to be redrawn
     * (v1.01a+)_procFillW: The width of the stat change process bar
     * _status: The battler status shown by this status bar
     * _text: The status bar description text
     * _textColor: The color of the status bar description text
     * _textX: The x offset of the status bar description text from this bar
     * _textY: The y offset of the status bar description text from this bar
     */

    Window_Status_Bar.prototype.initialize = function(battler, status) {
    // v1.00a - v1.00a
        this._battler = battler;
        this._status = status;
        this._updateCfg(battler, status);
        if (this._cfg) {
            Window_Base.prototype.initialize.call(this, this._cfg.x(battler),
            this._cfg.y(battler), this._cfg.w(battler), this._cfg.h(battler));
        } else {
        	Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
        }
        this.opacity = 0; // Only the status bar needs to be shown
    }; // Window_Status_Bar.prototype.initialize

    Window_Status_Bar.prototype.standardFontSize = function() {
    // v1.00a - v1.00a; Hotspot
        if (this._cfg) return this._cfg.textSize(this._battler);
        return Window_Base.prototype.standardFontSize.call(this);
    }; // Window_Status_Bar.prototype.standardFontSize

    Window_Status_Bar.prototype.standardPadding = function() {
    // v1.00a - v1.00a; Hotspot
        // The whole window is just the statu bar
        return this._cfg ? 0 : Window_Base.prototype.standardPadding.call(this);
        //
    }; // Window_Status_Bar.prototype.standardPadding

    Window_Status_Bar.prototype.resetFontSettings = function() {
    // v1.00a - v1.00a; Hotspot
        if (this.contents.fontSize === this.standardFontSize()) return;
        Window_Base.prototype.resetFontSettings.call(this);
        this._isRedraw = true;
    }; // Window_Status_Bar.prototype.resetFontSettings

    Window_Status_Bar.prototype.update = function() {
    // v1.00a - v1.00a; Hotspot
        Window_Base.prototype.update.call(this);
        this._updateBarStatuses(this._battler);
    }; // Window_Status_Bar.prototype.update

    /* Updates all statuses of this status bar
     * Sequential cohesion/Data coupling
     * (Game_Battler)battler: The battler owning this bar
     */
    Window_Status_Bar.prototype._updateBarStatuses = function(battler) {
    // v1.00a - v1.00a; Hotspot
        if (!battler) return this.visible = false;
        this._updateCfg(battler, this._status);
        this._updateBarVisibility(battler, this._cfg);
        if (!this.visible || this.contentsOpacity <= 0) return;
        this._updateDimensions(battler, this._cfg, this._status);
        if (!this.visible) return;
        this._updateColorText(battler, this._cfg);
        if (!this.visible || !this._isRedraw) return;
        this._isRedraw = false;
        this._redraw(battler, this._cfg);
    }; // Window_Status_Bar.prototype._updateBarStatuses

    /* Updates all configurations used by this status bar
     * Functional cohesion/Data coupling
     * (Game_Battler)battler: The battler owning this bar
     * (String)status: The battler status shown by this status bar
     */
    Window_Status_Bar.prototype._updateCfg = function(battler, status) {
    // v1.00a - v1.00a; Hotspot
        if (!battler) return;
        var lastCfgName = this._cfgName;
        this._cfgName = GBB.statusBarCfg.call(battler, status);
        if (lastCfgName === this._cfgName) return;
        if (this._cfgName.length <= 0) return this._cfg = null;
        this._cfg = SB[this._cfgName]();
        Object.keys(this._cfg).forEach(function(cfg) {
            this._cfg[cfg] = this._cfg[cfg].bind(this);
        }, this);
    }; // Window_Status_Bar.prototype._updateCfg

    /* Updates all visibility settings used by this status bar
     * Functional cohesion/Data coupling
     * (Game_Battler)battler: The battler owning this bar
     * (Object)cfg: The configuration object used by this status bar
     */
    Window_Status_Bar.prototype._updateBarVisibility = function(battler, cfg) {
    // v1.00a - v1.01b; Hotspot
        this.visible = battler && cfg && cfg.visible(battler);
        if (this.visible) this.contentsOpacity = cfg.opacity(battler);
    }; // Window_Status_Bar.prototype._updateBarVisibility

    /* Updates all dimensional settings of this status bar
     * Sequential cohesion/Data coupling
     * (Game_Battler)battler: The battler owning this bar
     * (Object)cfg: The configuration object used by this status bar
     * (String)status: The battler status shown by this status bar
     */
    Window_Status_Bar.prototype._updateDimensions =
    function(battler, cfg, status) {
    // v1.00a - v1.00a; Hotspot
        this._updateW(battler, cfg);
        this.visible = this.visible && this.width > 0;
        if (!this.visible) return;
        this._updateH(battler, cfg);
        this.visible = this.visible && this.height > 0;
        if (!this.visible) return;
        this._updateX(battler, cfg);
        this._updateY(battler, cfg);
        this._updateFillW(battler, cfg, status);
    }; // Window_Status_Bar.prototype.updateDimensions

    /* Updates the width of this status bar and the redraw flag
     * Sequential cohesion/Data coupling
     * (Game_Battler)battler: The battler owning this bar
     * (Object)cfg: The configuration object used by this status bar
     */
    Window_Status_Bar.prototype._updateW = function(battler, cfg) {
    // v1.00a - v1.00a; Hotspot
        var newW = battler && cfg ? cfg.w(battler) : 0;
        if (this.width === newW) return;
        this.width = newW;
        this._isRedraw = true;
    }; // Window_Status_Bar.prototype._updateW

    /* Updates the height of this status bar and the redraw flag
     * Sequential cohesion/Data coupling
     * (Game_Battler)battler: The battler owning this bar
     * (Object)cfg: The configuration object used by this status bar
     */
    Window_Status_Bar.prototype._updateH = function(battler, cfg) {
    // v1.00a - v1.00a; Hotspot
        var newH = battler && cfg ? cfg.h(battler) : 0;
        if (this.height === newH) return;
        this.height = newH;
        this._isRedraw = true;
    }; // Window_Status_Bar.prototype._updateH

    /* Updates the x offset of this status bar from the battler sprite
     * Functional cohesion/Data coupling
     * (Game_Battler)battler: The battler owning this bar
     * (Object)cfg: The configuration object used by this status bar
     */
    Window_Status_Bar.prototype._updateX = function(battler, cfg) {
    // v1.00a - v1.00a; Hotspot
        if (!battler || !cfg) return;
        var newX = cfg.x(battler);
        if (this.x !== newX) this.x = newX;
    }; // Window_Status_Bar.prototype._updateX

    /* Updates the y offset of this status bar from the battler sprite
     * Functional cohesion/Data coupling
     * (Game_Battler)battler: The battler owning this bar
     * (Object)cfg: The configuration object used by this status bar
     */
    Window_Status_Bar.prototype._updateY = function(battler, cfg) {
    // v1.00a - v1.00a; Hotspot
        if (!battler || !cfg) return;
        var newY = cfg.y(battler);
        if (this.y !== newY) this.y = newY;
    }; // Window_Status_Bar.prototype._updateY

    /* Updates the fill width of this status bar and the redraw flag
     * Sequential cohesion/Data coupling
     * (Game_Battler)battler: The battler owning this bar
     * (Object)cfg: The configuration object used by this status bar
     * (String)status: The battler status shown by this status bar
     */
    Window_Status_Bar.prototype._updateFillW = function(battler, cfg, status) {
    // v1.00a - v1.01a; Hotspot
        var lastFillW = this._fillW;
        var statusRange = cfg.max(battler) - cfg.min(battler);
        this._fillW = battler && cfg && statusRange > 0 ?
                this.width * battler[status] / statusRange : 0;
        this._procFillW = this._procFillW || this._fillW;
        this._isRedraw = this._isRedraw || lastFillW !== this._fillW ||
                this._procFillW !== this._fillW;
    }; // Window_Status_Bar.prototype._updateFillW

    /* Updates all color and text settings of this status bar
     * Sequential cohesion/Data coupling
     * (Game_Battler)battler: The battler owning this bar
     * (Object)cfg: The configuration object used by this status bar
     */
    Window_Status_Bar.prototype._updateColorText = function(battler, cfg) {
    // v1.00a - v1.01a; Hotspot
        this._updateSetting(battler, cfg, 'backColor');
        this._updateSetting(battler, cfg, 'color1');
        this._updateSetting(battler, cfg, 'color2');
        this._updateSetting(battler, cfg, 'textColor');
        this._updateSetting(battler, cfg, 'text');
        this.visible = this.visible && !this._isTransperant();
        if (!this.visible) return;
        this._updateSetting(battler, cfg, 'textX');
        this._updateSetting(battler, cfg, 'textY');
        this._updateSetting(battler, cfg, 'procColor1');
        this._updateSetting(battler, cfg, 'procColor2');
    }; // Window_Status_Bar.prototype.updateDimensions

    /* Updates specified setting of this status bar that can change redraw flag
     * Sequential cohesion/Data coupling
     * (Game_Battler)battler: The battler owning this bar
     * (Object)cfg: The configuration object used by this status bar
     * (String)name: The setting name
     */
    Window_Status_Bar.prototype._updateSetting = function(battler, cfg, name) {
    // v1.00a - v1.00a; Hotspot
        if (!battler || !cfg) return;
        var _name = '_' + name, last = this[_name];
        this[_name] = cfg[name](battler);
        this._isRedraw = this._isRedraw || last !== this[_name];
    }; // Window_Status_Bar.prototype._updateSetting

    /* Checks if the whole status bar's transperant
     * Functional cohesion/Message coupling/Referentially transperant
     * Return(Boolean): Whether the whole status bar's transperant
     */
    Window_Status_Bar.prototype._isTransperant = function() {
    // v1.00a - v1.01a; Hotspot
        var opagueColor = 0x01000000;
        if (this._backColor >= opagueColor) return false;
        if (this._color1 >= opagueColor) return false;
        if (this._color2 >= opagueColor) return false;
        if (this._procColor1 >= opagueColor) return false;
        if (this._procColor2 >= opagueColor) return false;
        return this._textColor < opagueColor || this._text.length <= 0;
    }; // Window_Status_Bar.prototype._isTransperant

    /* Redraws the whole status bar
     * Functional cohesion/Message coupling
     */
    Window_Status_Bar.prototype._redraw = function() {
    // v1.00a - v1.01a; Hotspot
        if (this._cfg.showProc(this._battler)) return this._redrawWithProc();
        this._redrawWithoutProc();
    }; // Window_Status_Bar.prototype._redraw

    /* (v1.01a+)Redraws the whole status bar with the stat change process shown
     * Functional cohesion/Message coupling
     */
    Window_Status_Bar.prototype._redrawWithProc = function() {
    // v1.01a - v1.01a; Hotspot
        if (this._procFillW < this._fillW) return this._redrawWithProcAbove();
        if (this._procFillW > this._fillW) return this._redrawWithProcBelow();
        this._redrawWithoutProc();
    }; // Window_Status_Bar.prototype._redrawWithProc

    /* (v1.01a+)Redraws the whole status bar with the stat change process shown
     * Sequential cohesion/Message coupling
     */
    Window_Status_Bar.prototype._redrawWithProcAbove = function() {
    // v1.01a - v1.01a; Hotspot
        this._redrawBack();
        this.contents.gradientFillRect(0, 0, this._fillW, this.height,
                this._color1, this._color2);
        this.contents.gradientFillRect(0, 0, this._procFillW, this.height,
                this._procColor1, this._procColor2);
        this._redrawText();
        this._addProcFillW();
        // Otherwise the stat change process bar would show after it's done
        if (this._procFillW >= this._fillW) this._redrawWithoutProc();
        //
    }; // Window_Status_Bar.prototype._redrawWithProcAbove

    /* (v1.01a+)Increases the stat change process fill width in the stat bar
     * Functional cohesion/Message coupling
     */
    Window_Status_Bar.prototype._addProcFillW = function() {
    // v1.01a - v1.01a; Hotspot
        // Fps's assumed to be always 60
        this._procFillW = Math.min(this._procFillW + this._cfg.procUpdateRate(
                this._battler) * this.width / 60, this._fillW);
        //
    }; // Window_Status_Bar.prototype._addProcFillW

    /* (v1.01a+)Redraws the whole status bar with the stat change process shown
     * Sequential cohesion/Message coupling
     */
    Window_Status_Bar.prototype._redrawWithProcBelow = function() {
    // v1.01a - v1.01a; Hotspot
        this._redrawBack();
        this.contents.gradientFillRect(0, 0, this._procFillW, this.height,
                this._procColor1, this._procColor2);
        this.contents.gradientFillRect(0, 0, this._fillW, this.height,
                this._color1, this._color2);
        this._redrawText();
        this._minusProcFillW();
        // Otherwise the stat change process bar would show after it's done
        if (this._procFillW <= this._fillW) this._redrawWithoutProc();
        //
    }; // Window_Status_Bar.prototype._redrawWithProcBelow

    /* (v1.01a+)Decreases the stat change process fill width in the stat bar
     * Functional cohesion/Message coupling
     */
    Window_Status_Bar.prototype._minusProcFillW = function() {
    // v1.01a - v1.01a; Hotspot
        // Fps's assumed to be always 60
        this._procFillW = Math.max(this._procFillW - this._cfg.procUpdateRate(
                this._battler) * this.width / 60, this._fillW);
        //
    }; // Window_Status_Bar.prototype._addProcFillW

    /* Redraws the whole status bar without showing the stat change processes
     * Functional cohesion/Message coupling/Idempotent
     */
    Window_Status_Bar.prototype._redrawWithoutProc = function() {
    // v1.01a - v1.01a; Potential Hotspot
        this._redrawBack();
        this.contents.gradientFillRect(0, 0, this._fillW, this.height,
                this._color1, this._color2);
        this._redrawText();
    }; // Window_Status_Bar.prototype._redrawWithoutProc

    /* Redraws the whole status bar without showing the stat change processes
     * Functional cohesion/Message coupling/Idempotent
     */
    Window_Status_Bar.prototype._redrawBack = function() {
        this.contents.clear();
        this.contents.fillRect(0, 0, this.width, this.height, this._backColor);
    }; // Window_Status_Bar.prototype._redrawBack

    /* Redraws the whole status bar without showing the stat change processes
     * Functional cohesion/Message coupling/Idempotent
     */
    Window_Status_Bar.prototype._redrawText = function() {
    // v1.01a - v1.01a; Potential Hotspot
        this.changeTextColor(this._textColor);
        var text = this._text;
        this.contents.drawText(text, this._textX, this._textY,
                this.textWidth(text), this.height);
    }; // Window_Status_Bar.prototype._redrawText

})(DoubleX_RMMV.Status_Bars);

/*============================================================================*/
