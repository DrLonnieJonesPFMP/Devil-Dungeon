//=============================================================================
// Alistair Plugins - Mana Shield
// AP_ManaShield.js
//=============================================================================
var Imported = Imported || {};
Imported.AP_ManaShield = true;
//=============================================================================
 /*:
 * @target MZ
 * @plugindesc v1.0 Allows you to create Mana Shield Weapons/Armours/States
 * @author Alistair Plugins
 * @url https://alistairengine.wordpress.com/2020/08/23/rpg-maker-mz-alistair-plugins-mana-shield/
 *
 * @param Allow Healing
 * @desc In some cases, a mana shield may reduce the damage too much and thus heal the user. Allow this? Default: false
 * @default false
 * @type boolean
 *
 * @param Cap Notetag Values
 * @desc Some Notetags may return strange behaviour if they use Numbers greater than 100. Cap Values at 100? Default: true
 * @default true
 * @type boolean
 *
 * @param Show MP Popups
 * @desc This will show MP Popups. Default: true
 * @default true
 * @type boolean
 *
 * @param Default MP Ratio
 * @desc Each point of MP absorbs x Points of Damage. Default: 1
 * @default 1
 *
 * @param Default TP Ratio
 * @desc Each point of TP absorbs x Points of Damage. Default: 1
 * @default 1
 *
 * @help
 * ============================================================================
 * Alistair Plugins - Mana Shield
 * ============================================================================
 * 
 * Here is the remake of my Mana Shield script. 
 * Mana Shields are pretty common these days since they allow squishy battlers
 * like Mages or Priests to become somewhat tanky since they have so much Mana
 * to use as a second HP bar.
 * This Plugin will allow Weapons, Armours and States to act as Mana Shields.
 *
 * Place this below VisuMZ plugins or it may not work properly.
 * Credit for RegExp Handling structure to Yanfly!
 * ============================================================================
 * Notetags
 * ============================================================================
 * These only work for: Weapons, Armours, States
 * 
 * <MS_Absorb: x%>
 * Will reduce incoming damage by x%.
 * x can be a formula.
 * Example: <MS_Absorb: 20%>. 100 Damage will be reduced by 20% => 80 Damage.
 *
 * <MS_Reduce: x>
 * Will reduce incoming damage by x.
 * x can be a formula.
 * Example: <MS_Reduce: 30>. 160 Damage will be reduced by 30 => 130 Damage.
 *
 * <MS_Split_x: y%>
 * Will split incoming damage between HP and x (x being either MP or TP) by y%.
 * y can be a formula.
 * Example: <MS_Split_MP: 50%>. 140 Damage will be split to 70 HP Damage and 70 MP
 * Damage.
 *
 * <MS_Replenish_x: y%>
 * Will replenish x (x being either HP, MP or TP) by y% of the damage.
 * y can be a formula.
 * Example: <MS_Replenish_TP: 50%>. 100 Damage will recover 50 TP.
 *
 * <MS_Ignore: x%>
 * Will ignore all incoming damage with a probability of x%.
 * x can be a formula.
 * Example: <MS_Ignore: 100%>. Will certainly ignore any damage.
 *
 * <MS_Dissolve_x: y>
 * Will delete the state with the Mana Shield property if the afflicted battler
 * has y or less x (x being either HP, MP or TP)
 * y can be a formula.
 * Example: <MS_Dissolve_MP: 0>. Will remove the Mana Shield State if the battler
 * has 0 MP (or less) left.
 *
 * <MS_TP_Ratio: x>
 * 1 TP will drain x Points of Damage. If there's no Tag present, it will just 
 * revert to what's set in the "Default TP Ratio" parameter.
 * Example: <MS_TP_Ratio: 5>. 1 TP will absorb 5 Points of Damage.
 *
 * <MS_MP_Ratio: x>
 * 1 MP will drain x Points of Damage. If there's no Tag present, it will just 
 * revert to what's set in the "Default MP Ratio" parameter.
 * Example: <MS_MP_Ratio: 2>. 1 MP will absorb 2 Points of Damage.
 *
 * ============================================================================
 * Update History
 * ============================================================================
 * V1.0
 * - First version on RPG Maker MZ
 */
//=============================================================================

(function() {

const parameters = PluginManager.parameters('AP_ManaShield');
const AllowHealing = String(parameters['Allow Healing']);
const CapNotetagValues = String(parameters['Cap Notetag Values']);
const ShowMPPopups = String(parameters['Show MP Popups']);
const DefaultMPRatio = Number(parameters['Default MP Ratio']);
const DefaultTPRatio = Number(parameters['Default TP Ratio']);

//====================================
//			REGEXP HANDLING          =
//====================================
AP_ManaShield_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!AP_ManaShield_DataManager_isDatabaseLoaded.call(this)) return false;
	this.processAPMSN1($dataWeapons);
	this.processAPMSN1($dataArmors);
	this.processAPMSN1($dataStates);
	return true;
};

DataManager.processAPMSN1 = function(dataGroup) {
	const APMSN1_1 = /<(?:MS_ABSORB):[ ](.*)%>/i;
	const APMSN1_2 = /<(?:MS_REDUCE):[ ](.*)>/i;
	const APMSN1_3 = /<(?:MS_SPLIT_)(MP|TP):[ ](.*)%>/i;
	const APMSN1_4 = /<(?:MS_REPLENISH_)(HP|MP|TP):[ ](.*)%>/i;
	const APMSN1_5 = /<(?:MS_IGNORE):[ ](.*)%>/i;
	const APMSN1_6 = /<(?:MS_DISSOLVE_)(HP|MP|TP):[ ](.*)>/i;
	const APMSN1_7 = /<(?:MS_)(MP|TP)(?:RATIO):[ ](\d+)>/i;
	for (let i = 1; i < dataGroup.length; i++) {
		let object = dataGroup[i];
		let noteData = object.note.split(/[\r\n]+/);

		object.msAbsorb = 0;
		object.msReduce = 0;
		object.msSplitMP = 0;
		object.msSplitTP = 0;
		object.msReplenishHP = 0;
		object.msReplenishMP = 0;
		object.msReplenishTP = 0;
		object.msIgnore = 0;
		object.msDissolveHP = 0;
		object.msDissolveMP = 0;
		object.msDissolveTP = 0;
		object.msMPRatio = 0;
		object.msTPRatio = 0;

		for (let n = 0; n < noteData.length; n++) {
			let line = noteData[n];
			if (line.match(APMSN1_1)) {
				object.msAbsorb = String(RegExp.$1);
			} else if (line.match(APMSN1_2)) {
				object.msReduce = String(RegExp.$1);
			} else if (line.match(APMSN1_3)) {
				let param = String(RegExp.$1).toUpperCase();
				let value = String(RegExp.$2);
				if (param === "MP") object.msSplitMP = value;
				if (param === "TP") object.msSplitTP = value;
			} else if (line.match(APMSN1_4)) {
				let param = String(RegExp.$1).toUpperCase();
				let value = String(RegExp.$2);
				if (param === "HP") object.msReplenishHP = value;
				if (param === "MP") object.msReplenishMP = value;
				if (param === "TP") object.msReplenishTP = value;
			} else if (line.match(APMSN1_5)) {
				object.msIgnore = String(RegExp.$1);
			} else if (line.match(APMSN1_6)) {
				let param = String(RegExp.$1).toUpperCase();
				let value = String(RegExp.$2);
				if (param === "HP") object.msDissolveHP = value;
				if (param === "MP") object.msDissolveMP = value;
				if (param === "TP") object.msDissolveTP = value;
			} else if (line.match(APMSN1_7)) {
				let param = String(RegExp.$1).toUpperCase();
				let value = parseInt(RegExp.$2);
				if (param === "MP") object.msMPRatio = value;
				if (param === "TP") object.msTPRatio = value;
			};
		};
	};
};

//====================================
//		END OF REGEXP HANDLING       =
//====================================

// Default Function Overwritten
Game_Action.prototype.makeDamageValue = function(target, critical) {
    const item = this.item();
    const baseValue = this.evalDamageFormula(target);
    let value = baseValue * this.calcElementRate(target);
    if (this.isPhysical()) {
        value *= target.pdr;
    }
    if (this.isMagical()) {
        value *= target.mdr;
    }
    if (baseValue < 0) {
        value *= target.rec;
    }
    if (critical) {
        value = this.applyCritical(value);
    }
    value = this.applyVariance(value, item.damage.variance);
    value = this.applyGuard(value, target);
	// Mana Shield
	value = this.makeManaShield(value, target, critical);
    return Math.round(value);
};

Game_Action.prototype.makeManaShield = function(value, target, critical) {
	const a = this.subject();
    const b = target;
    let s = $gameSwitches._data;
    let v = $gameVariables._data;
    // let msRatio
	// Stores the rates of damage absorption for both MP[0] and TP[1]
	// Will revert to default unless the ratio has been altered by a notetag.
	let msRatio = [DefaultMPRatio, DefaultTPRatio];
	if (target.manaShield("ratio", a,b,s,v)[0] !== 0 || target.manaShield("ratio", a,b,s,v)[1] !== 0) {
		msRatio = target.manaShield("ratio", a,b,s,v);
	};
	// let ms_mpDamage
	// Stores MP Damage done to the target by Mana Shields
	let ms_mpDamage = 0;
	// let ms_tpDamage
	// Stores TP Damage done to the target by Mana Shields
	let ms_tpDamage = 0;
	// Leave Healing Skills and MP Damage unaffected
	if (value > 0 && !this.isMpEffect()) {
		// msAbsorb
		let msAbsorb = Math.max(0, target.manaShield("absorb", a,b,s,v));
		value = value * (100 - msAbsorb) / 100;
		// msReduce
		let msReduce = Math.max(0, target.manaShield("reduce", a,b,s,v));
		value = value - msReduce;
		if (eval(AllowHealing) === false) {
			value = Math.max(value, 0);
		};
		// msSplit
		let msSplit = target.manaShield("split", a,b,s,v);
		msSplit[0] = Math.max(0, msSplit[0]);
		if (msSplit[1]) {
			switch (msSplit[2]) {
				case 1:
				ms_mpDamage = value * msSplit[0] / 100;
				ms_mpDamage = parseInt(ms_mpDamage / msRatio[0])
				value = value * (100 - msSplit[0]) / 100;
				if (target.mp < ms_mpDamage) {
					value = value + (ms_mpDamage - target.mp);
					ms_mpDamage = target.mp;
				};
				break;
				case 2:
				ms_tpDamage = value * msSplit[0] / 100;
				ms_tpDamage = parseInt(ms_tpDamage / msRatio[1])
				value = value * (100 - msSplit[0]) / 100;
				if (target.tp < ms_tpDamage) {
					value = value + (ms_tpDamage - target.tp);
					ms_tpDamage = target.tp;
				};
				break;
				default:
				return value;
			};
		};
		// msReplenish
		let msReplenish = target.manaShield("replenish", a,b,s,v);
		msReplenish[1] = Math.max(0, msReplenish[1]);
		let msHeal = Math.floor(value * msReplenish[1] / 100);
		switch (msReplenish[0]) {
			case 0:
			value = value - (msHeal * target.rec);
			break;
			case 1:
			break;
			case 2:
			msHeal = msHeal * target.tcr;
			target.setTp(Math.round(target.tp + msHeal));
			break;
			default:
			break;
		};
		// msIgnore
		let msIgnore = target.manaShield("ignore", a,b,s,v) / 100;
		msIgnore = Math.max(0, msIgnore);
		if (msIgnore > Math.random()) {
			value = 0;
			ms_mpDamage = 0;
			ms_tpDamage = 0;
		};
		ms_mpDamage = parseInt(ms_mpDamage);
		// MP Regeneration and Popups are managed down here
		if (msReplenish[0] === 1 && eval(ShowMPPopups)) {
			target._result.mpDamage = ms_mpDamage - msHeal;
		};
		if (msReplenish[0] === 2) {
			target._result.tpDamage = -msHeal
		};
		if (msReplenish[0] !== 1 && eval(ShowMPPopups)) {
			target._result.mpDamage = ms_mpDamage;
		};
		if (msReplenish[0] === 1) {
			target.setMp(Math.round(target.mp - ms_mpDamage + (msHeal * target.rec)));
		} else {
			target.setMp(Math.round(target.mp - ms_mpDamage));
		};
		target.setTp(Math.round(target.tp - ms_tpDamage));
		value = Math.round(value);
		// Erase a State
		let msDissolve = target.manaShield("dissolve", a,b,s,v);
		if (msDissolve[0] !== 0) {
			switch (msDissolve[1]) {
				case 1:
				if ((target.hp - value) <= msDissolve[2]) {
					target.removeState(msDissolve[0]);
				};
				break;
				case 2:
				if (target.mp <= msDissolve[2]) {
					target.removeState(msDissolve[0]);
				};
				break;
				case 3:
				if (target.tp <= msDissolve[2]) {
					target.removeState(msDissolve[0]);
				};
				break;
				default:
				return value;
			};
		};
	};
	return value;
};

// Default Function Overwritten 
Game_Battler.prototype.gainMp = function(value) {
	if (eval(ShowMPPopups)) {
    	this._result.mpDamage = -value;
	};
    this.setMp(this.mp + value);
};


// New function Game_BattlerBase.prototype.manaShield(arg)
// arg determines which Mana Shield property will be returned.
// arg accepts strings.
Game_BattlerBase.prototype.manaShield = function(arg, a, b, s, v) {
	/*
	let a = a;
	let b = b;
	let s = s;
	let v = v;
	let arg = arg;
	*/
	let msAbsorb = 0;
	let msReduce = 0;
	let msSplit = [0, false, 0];
	let msReplenish = [0, 0];
	let msIgnore = 0;
	let msDissolve = [0, 0, 0];
	let msRatio = [0, 0];

	if (this.isActor()) {
	const equip = this.equips()
		for (let i = 0; i < equip.length; i++) {
			let item = equip[i]
			if (item) {
				msAbsorb += eval(item.msAbsorb);
				msReduce += eval(item.msReduce);
				if (eval(item.msSplitMP) >= eval(item.msSplitTP)) {
					msSplit[0] += Number(eval(item.msSplitMP));
					msSplit[1] = true;
					msSplit[2] = 1;
				} else {
					msSplit[0] += Number(eval(item.msSplitTP));
					msSplit[1] = true;
					msSplit[2] = 2;
				};
				if (eval(item.msReplenishHP) > 0) {
					msReplenish[0] = 0;
					msReplenish[1] += eval(item.msReplenishHP);
				} else if (eval(item.msReplenishMP) > 0) {
					msReplenish[0] = 1;
					msReplenish[1] += eval(item.msReplenishMP);
				} else if (eval(item.msReplenishTP) > 0) {
					msReplenish[0] = 2;
					msReplenish[1] += eval(item.msReplenishTP);
				};
				msIgnore += eval(item.msIgnore);
				msRatio[0] += item.msMPRatio;
				msRatio[1] += item.msTPRatio;
			};
		};
	};

	const state = this.states()
		for (let i = 0; i < state.length; i++) {
			let item = state[i]
			if (item) {
				msAbsorb += eval(item.msAbsorb);
				msReduce += eval(item.msReduce);
				if (eval(item.msSplitMP) >= eval(item.msSplitTP)) {
					msSplit[0] += Number(eval(item.msSplitMP));
					msSplit[1] = true;
					msSplit[2] = 1;
				} else {
					msSplit[0] += Number(eval(item.msSplitTP));
					msSplit[1] = true;
					msSplit[2] = 2;
				};
				if (eval(item.msReplenishHP) > 0) {
					msReplenish[0] = 0;
					msReplenish[1] += eval(item.msReplenishHP);
				} else if (eval(item.msReplenishMP) > 0) {
					msReplenish[0] = 1;
					msReplenish[1] += eval(item.msReplenishMP);
				} else if (eval(item.msReplenishTP) > 0) {
					msReplenish[0] = 2;
					msReplenish[1] += eval(item.msReplenishTP);
				};
				msIgnore += eval(item.msIgnore);
				if (eval(item.msDissolveHP) > 0) {
					msDissolve = [item.id, 1, eval(item.msDissolveHP)];
				} else if (eval(item.msDissolveMP) > 0) {
					msDissolve = [item.id, 2, eval(item.msDissolveMP)];
				} else if (eval(item.msDissolveTP) > 0) {
					msDissolve = [item.id, 3, eval(item.msDissolveTP)];
				}
				msRatio[0] += item.msMPRatio;
				msRatio[1] += item.msTPRatio;
			};
		};

	if (eval(CapNotetagValues)) {
		msAbsorb = Math.min(100, msAbsorb);
		msSplit[0] = Math.min(100, msSplit[0]);
		msReplenish[1] = Math.min(100, msReplenish[1]);
		msIgnore = Math.min(100, msIgnore);
	};

	switch (arg) {
		// Mana Shield Properties
		case "absorb": return msAbsorb;
		case "reduce": return msReduce;
		case "split" : return msSplit ;
		case "replenish": return msReplenish;
		case "ignore": return msIgnore;
		// Dissolve Property
		case 'dissolve': 
		msDissolve[2] = parseInt(msDissolve[2]);
		return msDissolve;
		// Ratio Property
		case 'ratio': return msRatio;
		// Default
		default: return 0
	};
};
})();
//=============================================================================
// End of Plugin
//=============================================================================