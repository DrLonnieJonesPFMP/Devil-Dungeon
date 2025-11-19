//=============================================================================
// CustomStateDamage.js
//=============================================================================

/*:
 * @plugindesc Allows the use of notetags to determine damage/regen done by states
 * @author Icaro Augusto / Wesnoth / Frozen Phoenix
 *
 * @help 
 * Hp damage: <hpd n>formula</hpd>
 * Hp regen: <hpr n>formula</hpr>
 * Mp damage: <mpd n>formula</mpd>
 * Mp regen: <mpr n>formula</mpr>
 * Tp damage: <tpd n>formula</tpd>
 * Tp regen: <tpr n>formula</tpr>
 *
 * n = element id. Put n = 0 for neutral damage/regen.
 * formula = anything you can use in the skill's damage formula
 * 
 * Example:
 *
 * <hpd 2>
 * a.atk*4 - b.def*2
 * </hpd>
 *
 *
 *
 *  
 *  
 */

/*:ja
 * @plugindesc 
 * @author 
 *
 * @help 
 */

(function() {
	
	//Return the value between the tags in the state's notes
	Game_Battler.prototype.matcher = function(mode, stateID) {
		switch (mode) {
			case 1:
				var re = /(?:<hpr\s(\d+)>)\n*(.*)\n*(?:<\/hpr>)/i;
				break;
			case 2:
				var re = /(?:<mpr\s(\d+)>)\n*(.*)\n*(?:<\/mpr>)/i;
				break;
			case 3:
				var re = /(?:<tpr\s(\d+)>)\n*(.*)\n*(?:<\/tpr>)/i;
				break;
			case 4:
				var re = /(?:<hpd\s(\d+)>)\n*(.*)\n*(?:<\/hpd>)/i;
				break;
			case 5:
				var re = /(?:<mpd\s(\d+)>)\n*(.*)\n*(?:<\/mpd>)/i;
				break;
			case 6:
				var re = /(?:<tpd\s(\d+)>)\n*(.*)\n*(?:<\/tpd>)/i;
				break;	
			default:
				var re = /(?:<hpr\s(\d+)>)\n*(.*)\n*(?:<\/hpr>)/i;
				break;
		}
		notes = $dataStates[stateID].note;
		var a = this._stateUser[stateID] ? this._stateUser[stateID] : this;
		var b = this;
		var result = 0;
		if (re.test(notes))
		{
			var m = eval(re.exec(notes)[1]);
			var er = (m == 0) ? 1 : this.elementRate(m);
			var result = eval(re.exec(notes)[2])*er;			
		}		
		return result;
	};
	
	//State user
	_Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
	Game_BattlerBase.prototype.clearStates = function() {
		_Game_BattlerBase_clearStates.call(this);
		this._stateUser = {};
    };
	
	//State user
	_Game_BattlerBase_eraseState = Game_BattlerBase.prototype.eraseState;
	Game_BattlerBase.prototype.eraseState = function(stateId) {
		_Game_BattlerBase_eraseState.call(this, stateId);
		delete this._stateUser[stateId];
	};
	
	//Clear state user
	_Game_Battler_removeBattleStates = Game_Battler.prototype.removeBattleStates;
	Game_Battler.prototype.removeBattleStates = function() {
		_Game_Battler_removeBattleStates.call(this);
		this._stateUser = {};
	};
	
	//State user
	Game_Battler.prototype.addState = function(stateId) {
		if (this.isStateAddable(stateId)) {
			if (!this.isStateAffected(stateId)) {
				this.addNewState(stateId);
				this.refresh();
			}
			this.resetStateCounts(stateId);
			this._result.pushAddedState(stateId);
			this._stateUser[stateId] = BattleManager._subject;
		}
	};
	
	//Evaluation
	Game_Battler.prototype.regenerateHp = function() {
		var value = Math.floor(this.mhp * this.hrg);
		for (i = 0 ; i < this.states().length ; i++)
		{
			value += Math.max(this.matcher(1, this.states()[i].id), 0);
			value -= Math.max(this.matcher(4, this.states()[i].id), 0);
		}
		value = Math.max(Math.floor(value), -Math.floor(this.maxSlipDamage()));
		if (value !== 0) {
			this.gainHp(value);
        }
	};
	
	//Evaluation
	Game_Battler.prototype.regenerateMp = function() {
		var value = Math.floor(this.mmp * this.mrg);
		for (i = 0 ; i < this.states().length ; i++)
		{
			value += Math.max(this.matcher(2, this.states()[i].id), 0);
			value -= Math.max(this.matcher(5, this.states()[i].id), 0);
		}
		if (value !== 0) {
			this.gainMp(value);
		}
	};
	
	//Evaluation
	Game_Battler.prototype.regenerateTp = function() {
		var value = Math.floor(100 * this.trg);
		for (i = 0 ; i < this.states().length ; i++)
		{
			value += Math.max(this.matcher(3, this.states()[i].id), 0);
			value -= Math.max(this.matcher(6, this.states()[i].id), 0);
		}
		this.gainSilentTp(value);
	};


})();


	
	
	

