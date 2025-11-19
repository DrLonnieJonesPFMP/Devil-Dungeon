/*:
 * @target MV
 * @plugindesc 
 * -- SRD and MUSH Options Linker --
 * @author Paradise Union Games
 * @help
 * A plugin that links SRD and MUSH Options. 
 * 
 * This plugin connects SumRndmDde's "SRD_OptionsCreator" with 
 * MushroomCake28's "$MUSH_MenuOptionScreenResolution" plugin.
 *
 * ➊ Add a new option in SRD_OptionsCreator:
 *    Name: Screen Resolution
 *    Category: General
 *    Condition: true
 *    Variable ID: 13 (or any free variable)
 *    Default Value: 4
 *    On Change Eval:
 *    -------------------------
 *    if (typeof SceneManager.mush_changeGraphicResolution === "function") {
 *      var resolutions = $mushFeatures.params['MOSR_ResolutionOptions'];
 *      var index = value - 1;
 *      ConfigManager.mosr_screenResolution = index;
 *      var res = resolutions[index];
 *      if (res) SceneManager.mush_changeGraphicResolution(res[0], res[1]);
 *    }
 *    -------------------------
 *    Options: 816x624, 1280x720, 1600x900, 1920x1080
 *
 * ➋ Place this plugin *below both* SRD_OptionsCreator 
 *    and $MUSH_MenuOptionScreenResolution_P1.js in the Plugin Manager.
 *
 * ➌ On game load, the selected resolution will automatically apply.
 *
 * No parameters are required.
 *
 * @help 
 *     Add this belowSumRndmDde's "SRD_OptionsCreator" and MushroomCake28's "$MUSH_MenuOptionScreenResolution" plugins.
 *     It will load the resolution settings on load.
 */

(function() {
    //=============================================================================
    // Sync SRD OptionsCreator with MUSH Resolution Config
    //=============================================================================

    // When SRD variable changes, ensure MUSH ConfigManager is updated.
    var _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);

        if (typeof $mushFeatures !== "undefined" &&
            $mushFeatures.params &&
            $mushFeatures.params['MOSR_ResolutionOptions']) {

            // Ensure resolution index is valid
            var maxIndex = $mushFeatures.params['MOSR_ResolutionOptions'].length - 1;
            if (this.mosr_screenResolution > maxIndex) this.mosr_screenResolution = 0;
        }
    };

    //=============================================================================
    // Auto-Apply Resolution on Boot
    //=============================================================================
    var _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);

        if (typeof SceneManager.mush_changeGraphicResolution === "function" &&
            typeof $mushFeatures !== "undefined") {
            var index = ConfigManager.mosr_screenResolution || 0;
            var resolutions = $mushFeatures.params['MOSR_ResolutionOptions'];
            if (resolutions && resolutions[index]) {
                var res = resolutions[index];
                SceneManager.mush_changeGraphicResolution(res[0], res[1]);
            }
        }
    };

    //=============================================================================
    // Utility: Sync From Game Variable (Optional)
    //=============================================================================
    var _Game_Variables_setValue = Game_Variables.prototype.setValue;
    Game_Variables.prototype.setValue = function(variableId, value) {
        _Game_Variables_setValue.call(this, variableId, value);
        // Optional: if the SRD Option variable changes directly via event, sync resolution
        if (typeof SceneManager.mush_changeGraphicResolution === "function" &&
            $mushFeatures && $mushFeatures.params['MOSR_ResolutionOptions']) {
            var resolutions = $mushFeatures.params['MOSR_ResolutionOptions'];
            var index = value - 1;
            if (resolutions[index]) {
                ConfigManager.mosr_screenResolution = index;
                var res = resolutions[index];
                SceneManager.mush_changeGraphicResolution(res[0], res[1]);
            }
        }
    };

})();
