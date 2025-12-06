/*:
 *@author Synrec
 *@plugindesc v1.3 Synrec Monster Capture. Allows storing of actor instances in reserve boxes and capturing actors.
 *
 *@help
 *Changes (v1.3):
 *- Addition of actor genders.
 *
 *Changes(v1.2):
 *- BUG FIX: Able to select dead actors to swap to when switching actors in battle.
 *- BUG FIX: Party window remains open after selecting actor to switch to.
 *- BUG FIX: When an enemy dies, the new one in the troop takes the FV location and
 *			 not the SV location.
 *- BUG FIX: When an actor dies, the sprite graphic does not swap out.(SOLO MODE)
 *- BUG FIX (TEMPORARY): Skills are erased on level up. Instanced skills disabled as fix (TEMPORARY)
 *- NOTE: *Removal of instanced skills may become permanent.*
 *- Able to choose to reward on individual enemy death VS battle end.
 *
 *Changes (v1.1):
 *- BUG FIX: Error on returning to party command window from actor command window.
 *- BUG FIX: Actor front view graphic won't change when actor dies and switches out.
 *- BUG FIX: TGR calculation Errors.
 *- Custom Window Battle Status implemented. (Solo/Dual Mode only)
 *- Custom Window Battle Status window skin able to be set.
 *- SV Mode Adjustments.
 *- Note: Actively monitoring stackable states compatibility.
 *
 *Changes (v1.0):
 *- Switching out an actor takes a turn. Can set option in plugin parameters.
 *
 *Changes (v0.9):
 *- Can switch out actors during battles (solo and dual mode only)
 *- Able to set animation to play on entry of actors.
 *- Able to set default window skin.
 *- Able to set window skin for custom UIs.
 *- BUG FIX: Pre-evolution window does not update when actor evolves.
 *- BUG FIX: Actor evolution sprite animation not available yet.
 *- HOTFIX: Scene background crash
 *
 *Changes (v0.8):
 *- Fixed party limit bug.
 *- Front facing actor Sprite added. Front face actor sprite not possible during
 *	raid mode.
 *- Option for front facing sprites to be animated or still.
 *- Actor evolution now posible through custom scene.
 *- Can set unlimited, linear, evolution lines based on database setup.
 *- BUG: Actor evolution sprite animation not available yet due to bug. Will be fixed next revision.
 *- BUG: Pre-evolution window does not update when actor evolves.
 *
 *Changes (v0.7):
 *- Enemy placement (Solo and dual mode) added. Raid enemy offset added.
 *- Entry Animations (Solo and Dual Modes only).
 *- Custom UI bug fix (Solo and Dual modes only).
 *- Can disable normal attack and regular guarding.
 *- Fix to actor selection on going when selecting magic/guard/item.
 *
 *Changes (v0.6):
 *- Addition of solo, dual and raid battle modes. Solo is 1v1, dual is 2v2 and raid is VS many.
 *- Bug fix of targetting enemies not on battlefield.
 *- Adjustment to battle enemy selection shows HP (optional) during raid.
 *- New bugs implemented, specifically enemy placement among others. Will be fixed in newer update.
 *- Single Enemy parameter does nothing.
 *
 *Changes (v0.5):
 *-Resolution modification.
 *-1 v 1 mode enabled when single enemy is enabled.
 *-Bug fixes with log window display, enemy status window is hidden during.
 *
 *Changes (v0.4):
 *-Custom UI available.
 *-Added game resolution modifiers
 *-Modified the base code of Window_BattleStatus, removed gauge area.
 *
 *Changes (v0.3):
 *-Extreme amount of bug fixes with respect to actors still being conjoined.
 *-Progress on custom UI, not ready for use quite yet.
 *
 *Changes(v0.2):
 *-Enemy Actor parameter unity when actor ID set.
 *-Enemy map levels, able to set enemy area levels.
 *-When you capture an enemy, they are set to their captured level.
 * The HP and MP of captured enemy is retained.
 *-Framework for a more user friendly UI created.
 *-Several Bug fixes eg: crash when enemy attacking)
 *-Monster evolution under conception stage.
 *
 *Credit goes to Synrec or twitter account Synrec_Kaisyl. Free to use
 *in commercial, free or donation projects. Do not reupload without crediting source.
 *
 *If you like the script and want to contribute towards my efforts in a monetary way,
 *you can donate to me at: https://ko-fi.com/synrec
 *
 *Simple plug and play script. Call the scene by pushing it with SceneManager.
 *Use notetag (item/skill): <capture:x> to give a capture rate to an item or skill. Numbers equal to or
 *greater than 1 represent perfect capture.
 *
 *Use notetag (enemy): <actorId:x> to state which actor is added to the party when a successful capture is performed.
 *
 *Also for the enemy, use tag <captureHpBonus> to set how much bonus to capture is obtained
 *by reducing Enemy HP. eg:
 *if enemy has 10% HP left, the bonus to capture is 90% of the Capture HP Bonus.
 *The tag <captureMpBonus> operates in the same manner.
 *
 *Captures only work when used against enemy targets. You can even have items capture all enemies.
 *
 *Use notetag (actor): <frontBitmap:'name'> where 'name' without quotations is the name of the front facing bitmap
 *for that actor.
 *
 *Use notetag (actor): <animBitmap> To designate the actor front bitmap as an animated image. Uses same template as side view.
 *
 *Map note tags:
 *1) <levelRangeMin:x> Where x = lowest level of enemy on current map.
 *2) <levelRangeMax:x> Where x = highest level of enemy on current map.
 *
 *Script Calls(Not plugin calls): 
 *1)[{To set the reserve box to open}]$gameSystem._reservePartyBox = 1;
 *2)[{To open the reserve box scene}]SceneManager.push(Scene_MonsterBox);
 *
 *@param Screen Resolution Enable
 *@type boolean
 *@desc Allows changing game resolution.
 *@default true
 *
 *@param Screen Resolution X
 *@type number
 *@desc Changes Width of the game window.
 *@default 816
 *
 *@param Screen Resolution Y
 *@type number
 *@desc Changes Height of the game window.
 *@default 624
 *
 *@param Player Character
 *@type actor
 *@desc The actor which represents the player.
 *
 *@param Player Non-battler
 *@type boolean
 *@default false
 *@desc The player character is not a battler.
 *
 *@param Locked Actors
 *@type actor[]
 *@desc List of locked party members.
 *
 *@param Party Limit
 *@default 4
 *@type number
 *@desc Maximum amount of party members.
 *
 *@param Actor Switch Takes Turn
 *@default true
 *@type boolean
 *@desc When selecting for actor party change, a turn is lost.
 *
 *@param Follower Limit
 *@default 1
 *@type number
 *@desc Maximum number of followers.
 *
 *@param Maximum reserve boxes
 *@default 30
 *@type number
 *@desc Maximum number of reserve boxes.
 *
 *@param Maximum actors per box
 *@default 30
 *@type number
 *@desc Maximum number of actors per reserve box.
 *
 *@param Male Sex Icon
 *@default 85
 *@type icon
 *@desc Icon for male sex.
 *
 *@param Female Sex Icon
 *@default 86
 *@type icon
 *@desc Icon for female sex.
 *
 *@param Unknown Sex Icon
 *@default 84
 *@type icon
 *@desc Icon for unknown sex.
 *
 *@param Name of  Team
 *@default Monster Team
 *@type text
 *@desc Name of party.
 *
 *@param Init Equip On Evolution
 *@default true
 *@type boolean
 *@desc Init Equipment on actor evolution.
 *
 *@param Recover All On Evolution
 *@default true
 *@type boolean
 *@desc Recover all on actor evolution.
 *
 *@param Evolution Animation
 *@type animation
 *@desc Animation on actor evolution.
 *
 *@param Evolution Level Text
 *@default Evolve Level:
 *@type text
 *@desc Text for evolution level.
 *
 *@param Evolution Item Text
 *@default Evolve Item:
 *@type text
 *@desc Text for item evolution.
 *
 *@param Evolution To Text
 *@default Evolve To:
 *@type text
 *@desc Text for evolution into.
 *
 *@param Evolution Into Text
 *@default Evolution
 *@type text
 *@desc Text for old evolution.
 *
 *@param Evolution Possible Color
 *@default #bbbbff
 *@desc Font color when evolution possible.
 *
 *@param Evolution Impossible Color
 *@default #ffbbbb
 *@desc Font color when evolution not possible.
 *
 *@param Default Attack Enabled
 *@default true
 *@type boolean
 *@desc Enable Default Attack?
 *
 *@param Default Guard Enabled
 *@default true
 *@type boolean
 *@desc Enable Default Guard?
 *
 *@param Enemy Reward Individual
 *@default true
 *@type boolean
 *@desc Enemies reward individually rather than at battle end.
 *
 *@param Show Actor Sprite Front View
 *@default false
 *@type boolean
 *@desc Show a bitmap image for actor sprite in front view.
 *
 *@param Front actor Solo X-pos
 *@default 100
 *@desc X-pos of first front actor.
 *
 *@param Front actor Solo Y-pos
 *@default 500
 *@desc Y-pos of first front actor.
 *
 *@param Front actor Duo X-pos
 *@default 300
 *@desc X-pos of second front actor.
 *
 *@param Front actor Duo Y-pos
 *@default 500
 *@desc Y-pos of second front actor.
 *
 *@param Enemy Team Default
 *@default solo
 *@type select
 *@option solo
 *@option dual
 *@option raid
 *@desc Only one enemy fights at a time.
 *
 *@param Solo Enemy Screen X
 *@default 800
 *@type number
 *@desc X-pos of enemy.
 *
 *@param Solo Enemy Screen Y
 *@default 300
 *@type number
 *@desc Y-pos of enemy.
 *
 *@param Dual Enemy Screen X
 *@default 1000
 *@type number
 *@desc X-pos of enemy.
 *
 *@param Dual Enemy Screen Y
 *@default 300
 *@type number
 *@desc Y-pos of enemy.
 *
 *@param Solo SV Enemy Screen X
 *@default 200
 *@type number
 *@desc X-pos of enemy.
 *
 *@param Solo SV Enemy Screen Y
 *@default 400
 *@type number
 *@desc Y-pos of enemy.
 *
 *@param Dual SV Enemy Screen X
 *@default 200
 *@type number
 *@desc X-pos of enemy.
 *
 *@param Dual SV Enemy Screen Y
 *@default 500
 *@type number
 *@desc Y-pos of enemy.
 *
 *@param Raid Enemy Offset X
 *@default 400
 *@type number
 *@desc X-pos of enemy.
 *
 *@param Raid Enemy Offset Y
 *@default 100
 *@type number
 *@desc Y-pos of enemy.
 *
 *@param Success Capture Animation
 *@default 46
 *@type animation
 *@desc animation that plays on the target when successful capture.
 *
 *@param Failed Capture Animation
 *@default 47
 *@type animation
 *@desc animation that plays on the target when successful capture.
 *
 *@param Entry Animation Actor
 *@default 46
 *@type animation
 *@desc animation that plays on the target when entering battle.
 *
 *@param Entry Animation Enemy
 *@default 46
 *@type animation
 *@desc animation that plays on the target when entering battle.
 *
 *@param Exit Animation Actor
 *@default 46
 *@type animation
 *@desc animation that plays on the target when entering battle.
 *
 *@param Exit Animation Enemy
 *@default 46
 *@type animation
 *@desc animation that plays on the target when entering battle.
 *
 *@param Default Window Skin
 *@type file
 *@dir img/windowskins/
 *@desc The default window skin for the game.
 *
 *@param Monster Box Command Window Skin
 *@type file
 *@dir img/windowskins/
 *@desc The default window skin for the game.
 *
 *@param Party Box Window Skin
 *@type file
 *@dir img/windowskins/
 *@desc The default window skin for the game.
 *
 *@param Reserve Box Window Skin
 *@type file
 *@dir img/windowskins/
 *@desc The default window skin for the game.
 *
 *@param Custom UI Actor Status Window Skin
 *@type file
 *@dir img/windowskins/
 *@desc The default window skin for the game.
 *
 *@param Custom UI Enemy Status Window Skin
 *@type file
 *@dir img/windowskins/
 *@desc The default window skin for the game.
 *
 *@param Custom UI Battle Status Window Skin
 *@type file
 *@dir img/windowskins/
 *@desc The default window skin for the game.
 *
 *@param Evolution Party Window Skin
 *@type file
 *@dir img/windowskins/
 *@desc The default window skin for the game.
 *
 *@param Battle Party Window Skin
 *@type file
 *@dir img/windowskins/
 *@desc The default window skin for the game.
 *
 *@param Actor Evolution Window Skin
 *@type file
 *@dir img/windowskins/
 *@desc The default window skin for the game.
 *
 *@param Scene Monster Box Background
 *@type file
 *@dir img/scene_backgrounds/
 *@desc The background bitmap for monster box scene.
 *
 *@param Scene Evolution Background
 *@type file
 *@dir img/scene_backgrounds/
 *@desc The background bitmap for evolution scene.
 *
 *@param Use Custom UI?
 *@default true
 *@type boolean
 *@desc Modifies battle UI to a custom UI.[non-func]
 *
 *@param Custom UI Actor MP?
 *@default true
 *@type boolean
 *@desc Draw Actor MP in custom UI?
 *
 *@param Custom UI Enemy MP?
 *@default true
 *@type boolean
 *@desc Draw Enemy MP in custom UI?
 *
 *@param Custom UI Actor TP?
 *@default true
 *@type boolean
 *@desc Draw Actor TP in custom UI?
 *
 *@param Custom UI Enemy TP?
 *@default true
 *@type boolean
 *@desc Draw Enemy TP in custom UI?
 *
 *@param Custom UI Hp Icon
 *@default 84
 *@type number
 *@desc Icon index for HP icon.
 *
 *@param Custom UI Mp Icon
 *@default 72
 *@type number
 *@desc Icon index for MP icon.
 *
 *@param Custom UI Tp Icon
 *@default 78
 *@type number
 *@desc Icon index for TP icon.
 *
 *@param Custom UI HP Gauge Color 1
 *@default #ffffff
 *@desc Color 1 of hp gauge
 *
 *@param Custom UI HP Gauge Color 2
 *@default #ff0000
 *@desc Color 2 of hp gauge
 *
 *@param Custom UI MP Gauge Color 1
 *@default #ffffff
 *@desc Color 1 of mp gauge
 *
 *@param Custom UI MP Gauge Color 2
 *@default #0000ff
 *@desc Color 2 of mp gauge
 *
 *@param Custom UI TP Gauge Color 1
 *@default #ffffff
 *@desc Color 1 of tp gauge
 *
 *@param Custom UI TP Gauge Color 2
 *@default #00ff00
 *@desc Color 2 of tp gauge
 *
 *@param Enable Enemy Raid HP
 *@default true
 *@type boolean
 *@desc Show enemy HP bars for raid mode.
 */

var Synrec = Synrec || {};
Synrec.MC = Synrec.MC || {};
Synrec.MC.Loaded = true;
Synrec.MC.Version = 1.2;

Synrec.MC.plugSource = PluginManager.parameters('Synrec_MonsterCapture');

Synrec.MC.resolutionEnable = eval(Synrec.MC.plugSource['Screen Resolution Enable']);
Synrec.MC.resolutionX = eval(Synrec.MC.plugSource['Screen Resolution X']);
Synrec.MC.resolutionY = eval(Synrec.MC.plugSource['Screen Resolution Y']);

Synrec.MC.playerActor = eval(Synrec.MC.plugSource['Player Character']);
Synrec.MC.NonBattlePlayerActor = eval(Synrec.MC.plugSource['Player Non-battler']);;
Synrec.MC.monsterFollowLimit = eval(Synrec.MC.plugSource['Follower Limit']);
Synrec.MC.lockedMonsters = eval(Synrec.MC.plugSource['Locked Actors']);

Synrec.MC.teamSize = eval(Synrec.MC.plugSource['Party Limit']);
Synrec.MC.turnActorSwitch = eval(Synrec.MC.plugSource['Actor Switch Takes Turn']);
Synrec.MC.maxReserveBoxes = eval(Synrec.MC.plugSource['Maximum reserve boxes']);
Synrec.MC.maxReserveMembers = eval(Synrec.MC.plugSource['Maximum actors per box']);
Synrec.MC.partyName = Synrec.MC.plugSource['Name of  Team'];

Synrec.MC.MaleIcon = eval(Synrec.MC.plugSource['Male Sex Icon']);
Synrec.MC.FemaleIcon = eval(Synrec.MC.plugSource['Female Sex Icon']);
Synrec.MC.UnknownIcon = eval(Synrec.MC.plugSource['Unknown Sex Icon']);

Synrec.MC.InitEquip = eval(Synrec.MC.plugSource['Init Equip On Evolution']);
Synrec.MC.RecoverAll = eval(Synrec.MC.plugSource['Recover All On Evolution']);
Synrec.MC.EvolveAnimId = eval(Synrec.MC.plugSource['Evolution Animation']);
Synrec.MC.EvolveYesText = Synrec.MC.plugSource['Evolution Possible Color'];
Synrec.MC.EvolveNoText = Synrec.MC.plugSource['Evolution Impossible Color'];

Synrec.MC.EvolveLvlText = Synrec.MC.plugSource['Evolution Level Text'];
Synrec.MC.EvolveItemText = Synrec.MC.plugSource['Evolution Item Text'];
Synrec.MC.EvolveToText = Synrec.MC.plugSource['Evolution To Text'];
Synrec.MC.EvolvingIntoText = Synrec.MC.plugSource['Evolution Into Text'];

Synrec.MC.DefaultAttack = eval(Synrec.MC.plugSource['Default Attack Enabled']);
Synrec.MC.DefaultGuard = eval(Synrec.MC.plugSource['Default Guard Enabled']);
Synrec.MC.IndividualReward = eval(Synrec.MC.plugSource['Enemy Reward Individual']);

Synrec.MC.ShowActorBitmap = eval(Synrec.MC.plugSource['Show Actor Sprite Front View']);
Synrec.MC.ActorSoloFrontX = eval(Synrec.MC.plugSource['Front actor Solo X-pos']);
Synrec.MC.ActorSoloFrontY = eval(Synrec.MC.plugSource['Front actor Solo Y-pos']);
Synrec.MC.ActorDuoFrontX = eval(Synrec.MC.plugSource['Front actor Duo X-pos']);
Synrec.MC.ActorDuoFrontY = eval(Synrec.MC.plugSource['Front actor Duo Y-pos']);

Synrec.MC.DefaultEnemyTeam = Synrec.MC.plugSource['Enemy Team Default'];
Synrec.MC.soloEnemyScreenX = eval(Synrec.MC.plugSource['Solo Enemy Screen X']);
Synrec.MC.soloEnemyScreenY = eval(Synrec.MC.plugSource['Solo Enemy Screen Y']);
Synrec.MC.dualEnemyScreenX = eval(Synrec.MC.plugSource['Dual Enemy Screen X']);
Synrec.MC.dualEnemyScreenY = eval(Synrec.MC.plugSource['Dual Enemy Screen Y']);

Synrec.MC.soloSvEnemyScreenX = eval(Synrec.MC.plugSource['Solo SV Enemy Screen X']);
Synrec.MC.soloSvEnemyScreenY = eval(Synrec.MC.plugSource['Solo SV Enemy Screen Y']);
Synrec.MC.dualSvEnemyScreenX = eval(Synrec.MC.plugSource['Dual SV Enemy Screen X']);
Synrec.MC.dualSvEnemyScreenY = eval(Synrec.MC.plugSource['Dual SV Enemy Screen Y']);

Synrec.MC.raidEnemyOffsetX = eval(Synrec.MC.plugSource['Raid Enemy Offset X']);
Synrec.MC.raidEnemyOffsetY = eval(Synrec.MC.plugSource['Raid Enemy Offset Y']);

Synrec.MC.EntryAnimActor = eval(Synrec.MC.plugSource['Entry Animation Actor']);
Synrec.MC.EntryAnimEnemy = eval(Synrec.MC.plugSource['Entry Animation Enemy']);
Synrec.MC.ExitAnimActor = eval(Synrec.MC.plugSource['Entry Animation Actor']);
Synrec.MC.ExitAnimEnemy = eval(Synrec.MC.plugSource['Entry Animation Enemy']);

Synrec.MC.SuccessCaptureAnim = eval(Synrec.MC.plugSource['Success Capture Animation']);
Synrec.MC.FailedCaptureAnim = eval(Synrec.MC.plugSource['Failed Capture Animation']);

Synrec.MC.DefaultWindowSkin = Synrec.MC.plugSource['Default Window Skin'];
Synrec.MC.TeamCommandWindowSkin = Synrec.MC.plugSource['Monster Box Command Window Skin'];
Synrec.MC.PartyBoxWindowSkin = Synrec.MC.plugSource['Party Box Window Skin'];
Synrec.MC.ReserveBoxWindowSkin = Synrec.MC.plugSource['Reserve Box Window Skin'];
Synrec.MC.ReserveBoxChoiceWindowSkin = Synrec.MC.plugSource['Reserve Box Choice Window Skin'];
Synrec.MC.CustomActorStatusWindowSkin = Synrec.MC.plugSource['Custom UI Actor Status Window Skin'];
Synrec.MC.CustomEnemyStatusWindowSkin = Synrec.MC.plugSource['Custom UI Enemy Status Window Skin'];
Synrec.MC.CustomBattleStatusWindowSkin = Synrec.MC.plugSource['Custom UI Battle Status Window Skin'];
Synrec.MC.EvolutionPartyWindowSkin = Synrec.MC.plugSource['Evolution Party Window Skin'];
Synrec.MC.BattlePartyWindowSkin = Synrec.MC.plugSource['Battle Party Window Skin'];
Synrec.MC.EvolutionActorDataWindowSkin = Synrec.MC.plugSource['Actor Evolution Window Skin'];

Synrec.MC.MonsterBoxSceneBackground = Synrec.MC.plugSource['Scene Monster Box Background'];
Synrec.MC.EvolutionSceneBackground = Synrec.MC.plugSource['Scene Evolution Background'];

var customUI = eval(Synrec.MC.plugSource['Use Custom UI?']);
Synrec.MC.ActorMpBar = eval(Synrec.MC.plugSource['Custom UI Actor MP?']);
Synrec.MC.EnemyMpBar = eval(Synrec.MC.plugSource['Custom UI Enemy MP?']);
Synrec.MC.ActorTpBar = eval(Synrec.MC.plugSource['Custom UI Actor TP?']);
Synrec.MC.EnemyTpBar = eval(Synrec.MC.plugSource['Custom UI Enemy TP?']);
Synrec.MC.HpIcon = eval(Synrec.MC.plugSource['Custom UI Hp Icon']);
Synrec.MC.MpIcon = eval(Synrec.MC.plugSource['Custom UI Mp Icon']);
Synrec.MC.TpIcon = eval(Synrec.MC.plugSource['Custom UI Tp Icon']);
Synrec.MC.HpColor1 = Synrec.MC.plugSource['Custom UI HP Gauge Color 1'];
Synrec.MC.HpColor2 = Synrec.MC.plugSource['Custom UI HP Gauge Color 2'];
Synrec.MC.MpColor1 = Synrec.MC.plugSource['Custom UI MP Gauge Color 1'];
Synrec.MC.MpColor2 = Synrec.MC.plugSource['Custom UI MP Gauge Color 2'];
Synrec.MC.TpColor1 = Synrec.MC.plugSource['Custom UI TP Gauge Color 1'];
Synrec.MC.TpColor2 = Synrec.MC.plugSource['Custom UI TP Gauge Color 2'];

Synrec.MC.enableHP = eval(Synrec.MC.plugSource['Enable Enemy Raid HP']);

if(Synrec.MB){
	throw new Error('Monster Box and Monster Capture cannot be loaded at the same time.');
}

var $gameAllActors = null;

synrecDataManagerCreateGameObj = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    synrecDataManagerCreateGameObj.call(this);
	$gameAllActors = new Game_AllActors();
}

if(Synrec.MC.resolutionEnable){
	SceneManager._screenHeight = Synrec.MC.resolutionY
	SceneManager._boxHeight = Synrec.MC.resolutionY;
	SceneManager._screenWidth = Synrec.MC.resolutionX;
	SceneManager._boxWidth = Synrec.MC.resolutionX;
}

ImageManager.loadActorFront = function(name, hue){
	return this.loadBitmap('img/actors/', name, hue, false);
}

ImageManager.loadWindowSkin = function(name, hue){
	return this.loadBitmap('img/windowskins/', name, hue, false);
}

ImageManager.loadMenuBackground = function(name, hue){
	return this.loadBitmap('img/scene_backgrounds/', name, hue, false);
}

synrecBattleManagerProcTurn = BattleManager.processTurn;
BattleManager.processTurn = function() {
	if(($gameSystem.battleMode() == 'solo' || $gameSystem.battleMode() == 'dual') && Synrec.MC.turnActorSwitch){
		var subject = this._subject;
		var action = subject.currentAction();
		if(Synrec.MC.turnActorSwitch){
			if(subject.isActor()){
				var actorSwitching = this.checkSubjectActorSwitch(subject);
			}
			if(subject.isEnemy()){
				var enemySwitching = this.checkSubjectEnemySwitch(subject);
			}
		}
		if(actorSwitching){
			if(action)subject.removeCurrentAction();
			this.performActorSwap(subject);
		}
	}
    synrecBattleManagerProcTurn.call(this);
}

BattleManager.checkSubjectActorSwitch = function(actor){
	if(!this._reserveSwap)this._reserveSwap = [];
	var allReserveSwap = this._reserveSwap;
	for(i = 0; i < allReserveSwap.length; i++){
		var index = allReserveSwap[i][0];
		if($gameParty._actors[index] == actor){
			return true;
		}
	}
	return false;
}

BattleManager.checkSubjectEnemySwitch = function(enemy){
	return false
}

synrecBattleManagerMakeActionOrders = BattleManager.makeActionOrders;
BattleManager.makeActionOrders = function() {
	if($gameSystem.battleMode() == 'solo' || $gameSystem.battleMode() == 'dual'){
		var battlers = [];
		if (!this._surprise) {
			if($gameSystem.battleMode() == 'solo'){
				battlers.push($gameParty.members()[0]);
			}else if($gameSystem.battleMode() == 'dual'){
				if($gameParty.members()[0].isAlive())battlers.push($gameParty.members()[0]);
				if($gameParty.members()[1].isAlive())battlers.push($gameParty.members()[1]);
			}
		}
		if (!this._preemptive) {
			if($gameSystem.battleMode() == 'solo'){
				battlers.push($gameTroop.members()[0]);
			}else if($gameSystem.battleMode() == 'dual'){
				if($gameTroop.members()[0].isAlive())battlers.push($gameTroop.members()[0]);
				if($gameTroop.members()[1].isAlive())battlers.push($gameTroop.members()[1]);
			}
		}
		battlers.forEach(function(battler) {
			battler.makeSpeed();
		});
		battlers.sort(function(a, b) {
			return b.speed() - a.speed();
		});
		this._actionBattlers = battlers;
	}else{
		synrecBattleManagerMakeActionOrders.call(this);
	}
}

synrecBattleManagerSelectNextCommand = BattleManager.selectNextCommand;
BattleManager.selectNextCommand = function() {
	if($gameSystem.battleMode() == 'solo' || $gameSystem.battleMode() == 'dual'){
		var cnt = 0;
		if($gameSystem.battleMode() == 'solo')cnt = 1;
		if($gameSystem.battleMode() == 'dual')cnt = 2;
		do {
			if (!this.actor() || !this.actor().selectNextCommand()) {
				this.changeActor(this._actorIndex + 1, 'waiting');
				if (this._actorIndex >= cnt) {
					this.startTurn();
					break;
				}
			}
		} while (!this.actor().canInput());
	}else{
		synrecBattleManagerSelectNextCommand.call(this);
	}
};

BattleManager.reserveActorSwap = function(actorOldIndex, actorNewIndex){
	var scene = SceneManager._scene;
	if(!this._reserveSwap)this._reserveSwap = [];
	this._reserveSwap.push([actorOldIndex, actorNewIndex]);
	this.selectNextCommand();
}

BattleManager.performActorSwap = function(subject){
	if(!this._reserveSwap)this._reserveSwap = [];
	if(this._reserveSwap.length > 0){
		for(i = 0; i < this._reserveSwap.length; i++){
			var reserveIndex = this._reserveSwap[i];
			if(!isNaN(reserveIndex[0]) && !isNaN(reserveIndex[1])){
				var indexR = reserveIndex[0];
				if($gameParty._actors[indexR] == subject){
					$gameParty.swapOrder(reserveIndex[0], reserveIndex[1]);
					var index = reserveIndex[0];
					if(index == 0)SceneManager._scene._spriteset._actorSprite.setBattler($gameParty._actors[index]);
					if(index == 1)SceneManager._scene._spriteset._actorSpriteDuo.setBattler($gameParty._actors[index]);
					$gameParty._actors[index].startAnimation(Synrec.MC.EntryAnimActor, false, 0);
				}
			}
		}
	}
}

BattleManager.removeSwap = function(actorIndex){
	if(!this._reserveSwap)this._reserveSwap = [];
	var reserveSwap = this._reserveSwap;
	for(i = 0; i < reserveSwap.length; i++){
		var index = reserveSwap.length - 1;
		reserveIndex = reserveSwap[index];
		if(reserveIndex[0] && reserveIndex[1]){
			if(reserveIndex[0] == actorIndex){
				reserveSwap.splice(index, 1);
			}
		}
	}
}
synrecBattleManagerTurnEnd = BattleManager.updateTurnEnd;
BattleManager.updateTurnEnd = function() {
	this.clearSwap();
    synrecBattleManagerTurnEnd.call(this);
}

BattleManager.clearSwap = function(){
	this._reserveSwap = [];
}

synrecBattleManagerProcVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
	if(Synrec.MC.IndividualReward){
		$gameParty.removeBattleStates();
		$gameParty.performVictory();
		this.playVictoryMe();
		this.replayBgmAndBgs();
		this.displayVictoryMessage();
		this.endBattle(0);
	}else{
		synrecBattleManagerProcVictory.call(this);
	}
}

synrecBattleManagerEndBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
    synrecBattleManagerEndBattle.call(this, result);
	$gameSystem.clearBattleMode();
}

Game_System.prototype.battleMode = function(mode){
	if(!mode && !this._battleMode)this._battleMode = 'solo';
	if(mode)this._battleMode = mode;
	if(!this._battleMode)this._battleMode = Synrec.MC.DefaultEnemyTeam;
	return this._battleMode;
}

Game_System.prototype.clearBattleMode = function(){
	this._battleMode = Synrec.MC.DefaultEnemyTeam;
	return this._battleMode;
}

synrecGameActionSetSubject = Game_Action.prototype.setSubject;
Game_Action.prototype.setSubject = function(subject) {
	if (subject.isActor()) {
		this._subjectActorId = $gameParty._actors.indexOf(subject);
		this._subjectEnemyIndex = -1;
	} else {
		this._subjectEnemyIndex = subject.index();
		this._subjectActorId = -1;
	}
};

synrecGameActionSubject = Game_Action.prototype.subject;
Game_Action.prototype.subject = function() {
	if($gameSystem.battleMode() == 'solo'){
		if (this._subjectActorId >= 0) {
			return $gameParty._actors[this._subjectActorId];
		} else {
			return $gameTroop.members()[this._subjectEnemyIndex];
		}
	}else{
		if (this._subjectActorId >= 0) {
			return $gameParty._actors[this._subjectActorId];
		} else {
			return $gameTroop.members()[this._subjectEnemyIndex];
		}
	}
}

synrecGameActionTargetsForOpponents = Game_Action.prototype.targetsForOpponents;
Game_Action.prototype.targetsForOpponents = function() {
	var targets = [];
	var unit = this.opponentsUnit();
	if (this.isForRandom()) {
		if($gameSystem.battleMode() == 'solo'){
			for (var i = 0; i < 1; i++) {
				targets.push(unit.randomTarget());
			}
		}else if($gameSystem.battleMode() == 'dual'){
			for (var i = 0; i < 2; i++) {
				targets.push(unit.randomTarget());
			}
		}else{
			for (var i = 0; i < this.numTargets(); i++) {
				targets.push(unit.randomTarget());
			}
		}
	} else if (this.isForOne()) {
		if (this._targetIndex < 0) {
			targets.push(unit.randomTarget());
		} else {
			targets.push(unit.smoothTarget(this._targetIndex));
		}
	} else {
		if($gameSystem.battleMode() == 'solo'){
			targets.push(unit.aliveMembers()[0]);
		}else if($gameSystem.battleMode() == 'dual'){
			targets = [unit.aliveMembers()[0], unit.aliveMembers()[1]];
		}else{
			targets = unit.aliveMembers();
		}
	}
	return targets;
}

Game_Action.prototype.makeTargets = function() {
    var targets = [];
    if (!this._forcing && this.subject().isConfused()) {
        targets = [this.confusionTarget()];
    } else if (this.isForOpponent()) {
        targets = this.targetsForOpponents();
    } else if (this.isForFriend()) {
        targets = this.targetsForFriends();
    }
    return this.repeatTargets(targets);
};

synrecGameActionApply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	var item = this.item();
	if(item.meta.capture && target.isEnemy()){
		var result = target.result();
		this.subject().clearResult();
		result.clear();
		result.used = this.testApply(target);
		result.missed = (result.used && Math.random() >= this.itemHit(target));
		result.evaded = (!result.missed && Math.random() < this.itemEva(target));
		result.physical = this.isPhysical();
		result.drain = this.isDrain();
		if (result.isHit()) {
			if (this.item().damage.type > 0) {
				result.critical = (Math.random() < this.itemCri(target));
				var value = this.makeDamageValue(target, result.critical);
				this.executeDamage(target, value);
			}
			this.item().effects.forEach(function(effect) {
				this.applyItemEffect(target, effect);
			}, this);
			this.applyItemUserEffect(target);
			var item = this.item();
			var enemyId = target._enemyId;
			var enemyData = $dataEnemies[enemyId];
			var enemyHp = target._hp;
			var enemyMaxHp = target.param(0);
			var enemyHpRate = enemyHp / enemyMaxHp;
			var enemyMp = target._mp;
			var enemyMaxMp = target.param(1);
			var enemyHpRate = enemyHp / enemyMaxHp;
			var enemyMpRate = enemyMp / enemyMaxMp;
			var captureActor = eval(enemyData.meta.actorId);
			var captureRate = eval(item.meta.capture);
			var captureHpBonus = eval(enemyData.meta.captureHpBonus);
			if(isNaN(captureHpBonus))captureHpBonus = 0;
			var captureMpBonus = eval(enemyData.meta.captureMpBonus);
			if(isNaN(captureMpBonus))captureMpBonus = 0;
			captureHpBonus = captureHpBonus * enemyHpRate;
			captureMpBonus = captureMpBonus * enemyMpRate;
			captureRate += captureHpBonus + captureMpBonus;
			var isCapture = Math.random() < captureRate;
			if(isCapture && captureActor){
				if(!$gameSystem._captureId)$gameSystem._captureId = 0;
				var captureLevel = target._level;
				var hpSet = target._hp;
				var mpSet = target._mp;
				var sex = target._sex;
				target.startAnimation(Synrec.MC.SuccessCaptureAnim);
				target.die();
				target.refresh();
				$gameParty.addActor(captureActor, captureLevel, hpSet, mpSet, sex);
				var memIndex = $gameParty._actors.length - 1;
				$gameSystem._captureId++;
			}else{
				target.startAnimation(Synrec.MC.FailedCaptureAnim);
			}
		}
	}else{
		synrecGameActionApply.call(this, target);
	}
}

synrecGameBattlerBaseInitMem = Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function() {
    synrecGameBattlerBaseInitMem.call(this);
	this.setSex();
}

Game_BattlerBase.prototype.setSex = function(sex){
	if(sex){
		this._sex = sex;
	}else{
		var sexInt = Math.floor(Math.random() * 3);
		if(sexInt === 0){
			this._sex = 'male';
		}else if(sexInt === 1){
			this._sex = 'female';
		}else if(sexInt === 2){
			this._sex = 'unknown'
		}
	}
}

Game_Actor.prototype.evolve = function(currentLevel){
	var lastActor = $dataActors[this._actorId];
	var evolveToId = eval(lastActor.meta.evolutionActor);
	var evolveLvl = eval(lastActor.meta.evolutionLevel);
	var evolveItemId = eval(lastActor.meta.evolutionItem);
	var evolveItem = $dataItems[evolveItemId];
	var canEvolve = this.evolveReq(currentLevel)
	if(canEvolve){
		if(evolveItem)$gameParty.loseItem(evolveItem, 1);
		var actor = $dataActors[evolveToId];
		this._actorId = evolveToId;
		this._name = actor.name;
		this._nickname = actor.nickname;
		this._profile = actor.profile;
		this._classId = actor.classId;
		this._level = currentLevel;
		this.initImages();
		if(Synrec.MC.InitEquip)this.initEquips(actor.equips);
		if(Synrec.MC.RecoverAll)this.recoverAll();
		this.refresh();
		$gamePlayer.refresh();
	}
}

Game_Actor.prototype.evolveReq = function(currentLevel){
	var lastActor = $dataActors[this._actorId];
	var evolveToId = eval(lastActor.meta.evolutionActor);
	var evolveLvl = eval(lastActor.meta.evolutionLevel);
	var evolveItemId = eval(lastActor.meta.evolutionItem);
	var evolveItem = $dataItems[evolveItemId];
	var lvlReq = false;
	var itemReq = false;
	var evolveTarget = undefined;
	if(currentLevel >= evolveLvl || !evolveLvl){
		lvlReq = true;
	}
	if($gameParty.hasItem(evolveItem) || !evolveItem){
		itemReq = true;
	}
	if(evolveToId){
		evolveTarget = true;
	}
	return lvlReq && itemReq && evolveTarget;
}

synrecGameActorIsSpriteVisible = Game_Actor.prototype.isSpriteVisible;
Game_Actor.prototype.isSpriteVisible = function() {
	if(Synrec.MC.ShowActorBitmap){
		return true;
	}else{
		synrecGameActorIsSpriteVisible.call(this);
	}
}

synrecGameEnemyInitMem = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
	synrecGameEnemyInitMem.call(this);
	this._level = 0;
	this._classId = 0;
	this._actorId = 0;
	this._actorEnemy = false;
}

synrecGameEnemySetup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	var enemy = $dataEnemies[enemyId];
	var mapMeta = $dataMap.meta;
	this._name = enemy.name;
	if(enemy.meta.actorId){
		var actorId = eval(enemy.meta.actorId);
		var actorData = $dataActors[actorId];
		if(mapMeta.levelRangeMin){
			var minLevel = Math.floor(eval(mapMeta.levelRangeMin));
		}else{
			var minLevel = 1;
		}
		if(mapMeta.levelRangeMax){
			var maxLevel = Math.floor(eval(mapMeta.levelRangeMax));
		}else{
			var maxLevel = 99;
		}
		if(isNaN(minLevel) || minLevel <= 0)minLevel = 1;
		if(isNaN(maxLevel) || maxLevel >= 100)maxLevel = 99;
		this._level = this.getLevel(minLevel, maxLevel);
		this._classId = actorData.classId;
		this._actorEnemy = true;
	}
    synrecGameEnemySetup.call(this, enemyId, x, y);
}

Game_Enemy.prototype.getLevel = function(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

Game_Enemy.prototype.paramBase = function(paramId) {
	if(this._actorEnemy){
		var classParam = this.currentClass().params[paramId][this._level];
		var enemParam = this.enemy().params[paramId];
		var syncParam = classParam + enemParam;
		return syncParam;
	}else{
		return this.enemy().params[paramId];
	}
}

Game_Enemy.prototype.currentClass = function() {
    return $dataClasses[this._classId];
}

synrecGameEnemyPerformCollapse = Game_Enemy.prototype.performCollapse;
Game_Enemy.prototype.performCollapse = function() {
    synrecGameEnemyPerformCollapse.call(this);
	if(Synrec.MC.IndividualReward){
		this.makeRewardsIndividual();
	}
}

Game_Enemy.prototype.makeRewardsIndividual = function(troopEnemyIndex) {
	var enemyId = this.enemyId();
	var enemyData = $dataEnemies[enemyId];
    this._rewards = {};
    this._rewards.gold = this.gold();
    this._rewards.exp = this.exp();
    this._rewards.items = this.makeDropItems();
	BattleManager._rewards = this._rewards;
	BattleManager.gainRewards();
	BattleManager.displayRewards();
}

function Game_AllActors(){
	this.initialize.apply(this, arguments);
}

Game_AllActors.prototype.initialize = function(){
	this._data = [];
	this.createMonsterList();
}

Game_AllActors.prototype.createMonsterList = function(){
	var monsterData = $dataActors;
	for(i = 0; i < monsterData.length; i++){
		if(monsterData[i]){
			this._data[i]  = new Game_Actor(i);
		}else{
			this._data[i] = null;
		}
	}
	return null;
}

Game_AllActors.prototype.actor = function(index){
	if($dataActors[index]){
		if(!this._data[index]){
			this._data[index] = new Game_Actor(index);
		}
		return this._data[index];
	}
}

synrecGameUnitTgrSum = Game_Unit.prototype.tgrSum;
Game_Unit.prototype.tgrSum = function() {
	if($gameSystem.battleMode() == 'solo'){
		return this.aliveMembers()[0].tgr;
	}else if($gameSystem.battleMode() == 'dual'){
		var totalTgr = null;
		if(this.aliveMembers()[0])var tgr1 = this.aliveMembers()[0].tgr;
		if(this.aliveMembers()[1])var tgr2 = this.aliveMembers()[1].tgr;
		if(!isNaN(tgr1)) totalTgr += tgr1;
		if(!isNaN(tgr2)) totalTgr += tgr2;
		return totalTgr;
	}else{
		return this.aliveMembers().reduce(function(r, member) {
			return r + member.tgr;
		}, 0);
	}
};

synrecGameUnitRandomTarget = Game_Unit.prototype.randomTarget;
Game_Unit.prototype.randomTarget = function() {
	if($gameSystem.battleMode() == 'solo' || $gameSystem.battleMode() == 'dual'){
		if($gameSystem.battleMode() == 'solo'){
			var target = this.aliveMembers()[0];
			return target;
		}else if($gameSystem.battleMode() == 'dual'){
			var tgrRand = Math.random() * this.tgrSum();
			var target = null;
			var members = [];
			if(this.aliveMembers()[0]){
				if(this.aliveMembers()[0].isAlive())members.push(this.aliveMembers()[0]);
			}
			if(this.aliveMembers()[1]){
				if(this.aliveMembers()[1].isAlive())members.push(this.aliveMembers()[1]);
			}
			members.forEach(function(member) {
				tgrRand -= member.tgr;
				if (tgrRand <= 0 && !target) {
					target = member;
				}
			});
			if(!target){
				var mem0 = this.aliveMembers()[0].isAlive()
				var mem1 = this.aliveMembers()[1].isAlive()
				var randIndex = Math.floor(Math.random() * 2);
				if(randIndex == 0 && mem0)target = this.aliveMembers()[0];
				if(randIndex == 1 && mem1)target = this.aliveMembers()[1];
				if(!target)target = this.aliveMembers()[randIndex];
			}
			return target;
		}
	}else if($gameSystem.battleMode() == 'raid'){
		var tgrRand = Math.random() * this.tgrSum();
		var target = null;
		this.aliveMembers().forEach(function(member) {
			tgrRand -= member.tgr;
			if (tgrRand <= 0 && !target) {
				target = member;
			}
		});
		return target;
	}
}

synrecGamePartyInitialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    synrecGamePartyInitialize.call(this);
	if(!isNaN(Synrec.MC.maxReserveBoxes))this.createReserveBoxes();
}

Game_Party.prototype.createReserveBoxes = function(){
	this._reserveActors = [];
	for(i = 0; i < Synrec.MC.maxReserveBoxes; i++){
		this._reserveActors.push([]);
	}
}

Game_Party.prototype.name = function() {
    return Synrec.MC.partyName;
}

Game_Party.prototype.allMembers = function() {
    return this._actors;
}

Game_Party.prototype.maxBattleMembers = function() {
    return Synrec.MC.teamSize;
}

Game_Party.prototype.setupStartingMembers = function() {
    this._actors = [];
    $dataSystem.partyMembers.forEach(function(actorId) {
        if ($gameAllActors._data[actorId]) {
			var actorData = $gameAllActors._data[actorId];
            this._actors.push(actorData);
        }
    }, this);
}

Game_Party.prototype.setupBattleTestMembers = function() {
    $dataSystem.testBattlers.forEach(function(battler) {
        var actor = $gameAllActors.actor(battler.actorId);
        if (actor) {
            actor.changeLevel(battler.level, false);
            actor.initEquips(battler.equips);
            actor.recoverAll();
            this.addActor(battler.actorId);
        }
    }, this);
}

Game_Party.prototype.addActor = function(actorId, level, hp, mp, sex) {
	var inReserve = this.actorInReserve(actorId);
	var actorData = new Game_Actor(actorId);
	actorData._captureId = $gameSystem._captureId;
	actorData.changeLevel(level);
	actorData._hp = hp;
	actorData._mp = mp;
	actorData.setSex(sex);
    if (this._actors.length < Synrec.MC.teamSize) {
        this._actors.push(actorData);
		$gameActors._data = this._actors;
        $gamePlayer.refresh();
        $gameMap.requestRefresh();
	}else if(this._actors.length >= Synrec.MC.teamSize){
		actorData.recoverAll();
		this.addReserveActor(actorData);
		$gamePlayer.refresh();
        $gameMap.requestRefresh();
    }else{
		SoundManager.playBuzzer();
	}
}

Game_Party.prototype.actorInReserve = function(actorId){
	for(i = 0; i < this._reserveActors.length; i++){
		var box = this._reserveActors[i];
		for(j = 0; j < box.length; j++){
			if(box[j]._actorId == actorId)return true;
		}
	}
	return false
}

Game_Party.prototype.addReserveActor = function(actorId, index){
	if(isNaN(index)){
		index = 0;
	}
	if(this._reserveActors[index].length >= Synrec.MC.maxReserveMembers){
		for(i = 0; i < this._reserveActors.length; i++){
			if(this._reserveActors[i].length < Synrec.MC.maxReserveMembers){
				index = i;
				break;
			}
		}
	}
	if(this._reserveActors[index].length >= Synrec.MC.maxReserveMembers){
		return false;
	}else{
		this._reserveActors[index].push(actorId);
	}
}

Game_Party.prototype.releaseActor = function(index) {
	if(index <= this._actors.length){
		var actor = this._actors[index];
		this._actors.splice(index, 1);
		return actor;
	}
}

Game_Party.prototype.releaseActorReserve = function(boxId, boxIndex) {
	if(boxIndex <= this._reserveActors[boxId].length){
		var actor = this._reserveActors[boxId][boxIndex];
		this._reserveActors[boxId].splice(boxIndex, 1)
		return actor;
	}
}

Game_Party.prototype.removeActor = function(actorId) {
	var inReserve = this.actorInReserve(actorId);
	if(this._actors.length > 1){
		for(i = 0; i < this._actors.length; i++){
			var index = this._actors.length - (i + 1);
			var actorChkId = this._actors[index]._actorId;
			if(actorChkId == actorId)this.releaseActor(index);
		}
	}
	if(inReserve){
		for(j = 0; j < this._reserveActors.length; j++){
			var box = this._reserveActors[j]
			for (k = 0; k < box.length; k++){
				var index = box.length - (k + 1);
				var actorChkId = box[index]._actorId;
				if(actorChkId == actorId)this.releaseActorReserve(j, index);
			}
		}
	}
}

Game_Party.prototype.removeReserve = function(actorId, box){
	if(this._reserveActors[box].contains(actorId)){
		this._reserveActors[box].splice(this._reserveActors[box].indexOf(actorId), 1);
        $gamePlayer.refresh();
        $gameMap.requestRefresh();
	}
}

Game_Party.prototype.swapActiveReserve = function(partyIndex, reserveBox, reserveIndex){
	var partySize = $gameParty._actors.length;
	var temp1 = this._actors[partyIndex];
	var temp2 = this._reserveActors[reserveBox][reserveIndex];
	if(temp1 && temp2){
		this._actors[partyIndex] = temp2;
		this._reserveActors[reserveBox][reserveIndex] = temp1;
	}else if(temp1 && !temp2){
		if(partySize > 1){
			this._reserveActors[reserveBox].push(temp1);
			this._actors.splice(this._actors.indexOf(temp1), 1);
		}
	}else if(!temp1 && temp2){
		this._actors.push(temp2);
		this._reserveActors[reserveBox].splice(this._reserveActors[reserveBox].indexOf(temp2), 1);
	}
	$gamePlayer.refresh();
}

Game_Party.prototype.menuActor = function() {
    var actor = this._actors[this._menuActorId];
    if (!actor) {
        actor = this.members()[0];
		if(!actor)return null;
    }
    return actor;
}

Game_Party.prototype.setMenuActor = function(index) {
    this._menuActorId = index;
}

Game_Party.prototype.makeMenuActorNext = function() {
    var index = this.members().indexOf(this.menuActor());
    if (index >= 0) {
        index = (index + 1) % this.members().length;
        this.setMenuActor(index);
    } else {
        this.setMenuActor(0);
    }
}

Game_Party.prototype.makeMenuActorPrevious = function() {
    var index = this.members().indexOf(this.menuActor());
    if (index >= 0) {
        index = (index + this.members().length - 1) % this.members().length;
        this.setMenuActor(index);
    } else {
        this.setMenuActor(0);
    }
}

Game_Party.prototype.targetActor = function() {
    var actor = this._actors[this._targetActorId];
    if (!actor) {
        actor = this.members()[0];
		if(!actor)return null;
    }
    return actor;
};

Game_Party.prototype.setTargetActor = function(actor) {
    this._targetActorId = actor.actorId();
}

Game_Troop.prototype.meetsConditions = function(page) {
    var c = page.conditions;
    if (!c.turnEnding && !c.turnValid && !c.enemyValid &&
            !c.actorValid && !c.switchValid) {
        return false;  // Conditions not set
    }
    if (c.turnEnding) {
        if (!BattleManager.isTurnEnd()) {
            return false;
        }
    }
    if (c.turnValid) {
        var n = this._turnCount;
        var a = c.turnA;
        var b = c.turnB;
        if ((b === 0 && n !== a)) {
            return false;
        }
        if ((b > 0 && (n < 1 || n < a || n % b !== a % b))) {
            return false;
        }
    }
    if (c.enemyValid) {
        var enemy = $gameTroop.members()[c.enemyIndex];
        if (!enemy || enemy.hpRate() * 100 > c.enemyHp) {
            return false;
        }
    }
    if (c.actorValid) {
        var actor = $gameParty._actors[c.actorId];
        if (!actor || actor.hpRate() * 100 > c.actorHp) {
            return false;
        }
    }
    if (c.switchValid) {
        if (!$gameSwitches.value(c.switchId)) {
            return false;
        }
    }
    return true;
};

Game_Troop.prototype.swapOrder = function(index1, index2){
	var temp = this._enemies[index1];
    this._enemies[index1] = this._enemies[index2];
    this._enemies[index2] = temp;
}

synrecGamePlayerRefresh = Game_Player.prototype.refresh;
Game_Player.prototype.refresh = function() {
	if(Synrec.MC.NonBattlePlayerActor){
		var actorId = Synrec.MC.playerActor;
		if(isNaN(actorId))actorId = 1;
		var actorData = $dataActors[actorId];
		var actor = actorData;
		var characterName = actor ? actor.characterName : 'N/A';
		var characterIndex = actor ? actor.characterIndex : 0;
		this.setImage(characterName, characterIndex);
		this._followers.refresh();
	}else{
		synrecGamePlayerRefresh.call(this);
	}
}

synrecGameFollowersInit = Game_Followers.prototype.initialize;
Game_Followers.prototype.initialize = function() {
	if(Synrec.MC.NonBattlePlayerActor){
		this._visible = $dataSystem.optFollowers;
		this._gathering = false;
		this._data = [];
		for (var i = 0; i < Synrec.MC.monsterFollowLimit; i++) {
			this._data.push(new Game_Follower(i));
		}
	}else{
		synrecGameFollowersInit.call(this);
	}
}

Game_Event.prototype.meetsConditions = function(page) {
    var c = page.conditions;
    if (c.switch1Valid) {
        if (!$gameSwitches.value(c.switch1Id)) {
            return false;
        }
    }
    if (c.switch2Valid) {
        if (!$gameSwitches.value(c.switch2Id)) {
            return false;
        }
    }
    if (c.variableValid) {
        if ($gameVariables.value(c.variableId) < c.variableValue) {
            return false;
        }
    }
    if (c.selfSwitchValid) {
        var key = [this._mapId, this._eventId, c.selfSwitchCh];
        if ($gameSelfSwitches.value(key) !== true) {
            return false;
        }
    }
    if (c.itemValid) {
        var item = $dataItems[c.itemId];
        if (!$gameParty.hasItem(item)) {
            return false;
        }
    }
    if (c.actorValid) {
        var actor = $gameAllActors.actor[c.actorId];
        if (!$gameParty.members().contains(actor)) {
            return false;
        }
    }
    return true;
}

function Game_FauxPlayer (){
	this.initialize.apply(this, arguments);
}

Game_FauxPlayer.prototype = Object.create(Game_Player.prototype);
Game_FauxPlayer.prototype.constructor = Game_FauxPlayer;

Game_FauxPlayer.prototype.initialize = function(actorData) {
    Game_Character.prototype.initialize.call(this);
    this._actorData = actorData;
}

Game_FauxPlayer.prototype.setChar = function(chara){
	this._actorData = chara;
	this.refresh();
}

Game_FauxPlayer.prototype.refresh = function() {
    var actor = this._actorData;
    var characterName = actor ? actor.characterName() : '';
    var characterIndex = actor ? actor.characterIndex() : 0;
    this.setImage(characterName, characterIndex);
    this._followers.refresh();
}

Sprite_Actor.prototype.setActorHome = function(index) {
    this.setHome((Math.floor(SceneManager._screenWidth * 0.75)) + index * 32, (Math.floor(SceneManager._screenHeight * 0.5)) + index * 48);
}

function Sprite_ActorFrontView(){
	this.initialize.apply(this, arguments);
}

Sprite_ActorFrontView.prototype = Object.create(Sprite_Actor.prototype);
Sprite_ActorFrontView.prototype.constructor = Sprite_ActorFrontView;

Sprite_ActorFrontView.prototype.setBattler = function(battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
    var changed = (battler !== this._actor);
    if (changed) {
        this._actor = battler;
        if (battler) {
            this.setActorHome(battler.index());
        }
        this.startEntryMotion();
        this._stateSprite.setup(battler);
    }
}

Sprite_ActorFrontView.prototype.setActorHome = function(index) {
	if(index == 0){
		this.setHome(Synrec.MC.ActorSoloFrontX, Synrec.MC.ActorSoloFrontY);
	}else if(index == 1){
		this.setHome(Synrec.MC.ActorDuoFrontX, Synrec.MC.ActorDuoFrontY);
	}
}

Sprite_ActorFrontView.prototype.updateBitmap = function() {
    Sprite_Battler.prototype.updateBitmap.call(this);
	var actor = this._actor;
	var actorId = actor._actorId;
	var actorData = $dataActors[actorId];
    var name = actorData.meta.frontBitmap;
    if (this._battlerName !== name) {
        this._battlerName = name;
        this._mainSprite.bitmap = ImageManager.loadActorFront(name);
    }
}

Sprite_ActorFrontView.prototype.updateFrame = function() {
    Sprite_Battler.prototype.updateFrame.call(this);
    var bitmap = this._mainSprite.bitmap;
	var actor = this._actor;
	var actorId = actor._actorId;
	var actorData = $dataActors[actorId];
	var animBitmap = eval(actorData.meta.animFrontBitmap);
    if (bitmap && animBitmap) {
        var motionIndex = this._motion ? this._motion.index : 0;
        var pattern = this._pattern < 3 ? this._pattern : 1;
        var cw = bitmap.width / 9;
        var ch = bitmap.height / 6;
        var cx = Math.floor(motionIndex / 6) * 3 + pattern;
        var cy = motionIndex % 6;
        this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
    }
}

function Sprite_MenuActor(){
	this.initialize.apply(this, arguments);
}

Sprite_MenuActor.prototype = Object.create(Sprite_Character.prototype);
Sprite_MenuActor.prototype.constructor = Sprite_MenuActor;

Sprite_MenuActor.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    this.updateBitmap();
    this.updateFrame();
    this.updateAnimation();
    this.updateBalloon();
}

synrecSpriteEnemySetBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
	if($gameSystem.battleMode() == 'raid'){
		this._enemy = battler;
		var x = battler.screenX() + Synrec.MC.raidEnemyOffsetX;
		var y = battler.screenY() + Synrec.MC.raidEnemyOffsetY;
		this.setHome(x, y);
		this._stateIconSprite.setup(battler);
	}else{
		synrecSpriteEnemySetBattler.call(this, battler);
	}
};
	
synrecSpritesetBattleUpdate = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
	if($gameSystem.battleMode() == 'solo' || $gameSystem.battleMode() == 'dual'){
		Spriteset_Base.prototype.update.call(this);
		this.updateActors();
		this.updateEnemies();
		this.updateBattleback();
	}else{
		synrecSpritesetBattleUpdate.call(this);
	}
}

synrecSpritesetCreateActors = Spriteset_Battle.prototype.createActors;
Spriteset_Battle.prototype.createActors = function() {
	if($gameSystem.battleMode() == 'solo' || $gameSystem.battleMode() == 'dual'){
		var memberCnt = 0;
		if($gameSystem.battleMode() == 'solo'){
			memberCnt = 1;
		}else if($gameSystem.battleMode() == 'dual'){
			memberCnt = 2;
		}
		var actors = $gameParty.members();
		for (var i = 0; i < actors.length; i++) {
			if(!this._actorSprite && i == 0){
				if(!$gameSystem.isSideView()){
					this._actorSprite = new Sprite_ActorFrontView(actors[i]);
				}else{
					this._actorSprite = new Sprite_Actor(actors[i]);
				}
				this._battleField.addChild(this._actorSprite);
			}
			if(!this._actorSpriteDuo && memberCnt == 2 && actors.length > 1 && i != 0){
				if(!$gameSystem.isSideView()){
					this._actorSpriteDuo = new Sprite_ActorFrontView(actors[i]);
				}else{
					this._actorSpriteDuo = new Sprite_Actor(actors[i]);
				}
				this._battleField.addChild(this._actorSpriteDuo);
			}
		}
	}else{
		synrecSpritesetCreateActors.call(this);
	}
}

synrecSpritesetBattleCreateEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function() {
	if($gameSystem.battleMode() == 'solo' || $gameSystem.battleMode() == 'dual'){
		var memberCnt = 0;
		if($gameSystem.battleMode() == 'solo'){
			memberCnt = 1;
		}else if($gameSystem.battleMode() == 'dual'){
			memberCnt = 2;
		}
		var sideView = $gameSystem.isSideView();
		var enemies = $gameTroop.members();
		for (var i = 0; i < enemies.length; i++) {
			if(!this._enemySprite && i == 0){
				this._enemySprite = new Sprite_Enemy(enemies[i]);
				if(sideView){
					this._enemySprite.setHome(Synrec.MC.soloSvEnemyScreenX, Synrec.MC.soloSvEnemyScreenY);
				}else{
					this._enemySprite.setHome(Synrec.MC.soloEnemyScreenX, Synrec.MC.soloEnemyScreenY);
				}
				this._battleField.addChild(this._enemySprite);
				if(memberCnt == 1)this._troopIndex = i;
			}
			if(!this._enemySpriteDuo && memberCnt == 2 && enemies.length > 1 && i != 0){
				this._enemySpriteDuo = new Sprite_Enemy(enemies[i]);
				if(sideView){
					this._enemySpriteDuo.setHome(Synrec.MC.dualSvEnemyScreenX, Synrec.MC.dualSvEnemyScreenY);
				}else{
					this._enemySpriteDuo.setHome(Synrec.MC.dualEnemyScreenX, Synrec.MC.dualEnemyScreenY);
				}
				this._battleField.addChild(this._enemySpriteDuo);
			}
		}
	}else{
		synrecSpritesetBattleCreateEnemies.call(this);
	}
}

synrecSpritesetBattleUpdateActors = Spriteset_Battle.prototype.updateActors;
Spriteset_Battle.prototype.updateActors = function() {
	if($gameSystem.battleMode() == 'solo' || $gameSystem.battleMode() == 'dual'){
		var memberCnt = 0;
		if($gameSystem.battleMode() == 'solo'){
			memberCnt = 1;
		}else if($gameSystem.battleMode() == 'dual'){
			memberCnt = 2;
		}
		var members = $gameParty.members();
		var aliveLeader = $gameParty.leader().isAlive();
		var subLead = $gameParty.members()[1].isAlive();
		if(memberCnt == 1){
			for (var i = 0; i < members.length; i++) {
				if(members[i].isAlive() && !aliveLeader){
					var indexLead = 0;
					var indexSwap = i;
					$gameParty.swapOrder(indexLead, indexSwap);
					this._actorSprite.setBattler($gameParty._actors[0]);
					this._actorSprite._battler.startAnimation(Synrec.MC.EntryAnimActor);
				}else if(i ==  members.length - 1 && !members[i].isAlive()){
					this._actorSprite.setBattler();
				}
			}
		}else if(memberCnt == 2){
			for (var i = 0; i < members.length; i++) {
				if(members[i].isAlive() && (!aliveLeader || !subLead)){
					if(!aliveLeader && i > 1){
						var indexLead = 0;
						var indexSwap = i;
						$gameParty.swapOrder(indexLead, indexSwap);
						this._actorSprite.setBattler($gameParty._actors[0]);
						this._actorSprite._battler.startAnimation(Synrec.MC.EntryAnimActor);
					}else if(!subLead && i > 1){
						var indexLead = 1;
						var indexSwap = i;
						$gameParty.swapOrder(indexLead, indexSwap);
						this._actorSpriteDuo.setBattler($gameParty._actors[1]);
						this._actorSpriteDuo._battler.startAnimation(Synrec.MC.EntryAnimActor);
					}
				}else if(i ==  members.length - 1 && !members[i].isAlive()){
					if(this._actorSprite._battler._hp == 0)this._actorSprite._mainSprite.bitmap = null;
					if(this._actorSpriteDuo._battler._hp == 0)this._actorSpriteDuo._mainSprite.bitmap = null;
				}
			}
		}
	}else{
		synrecSpritesetBattleUpdateActors.call(this);
	}
}

synrecSpritesetBattleUpdateEnemies = Spriteset_Battle.prototype.updateEnemies;
Spriteset_Battle.prototype.updateEnemies = function() {
	if($gameSystem.battleMode() == 'solo' || $gameSystem.battleMode() == 'dual'){
		var memberCnt = 0;
		if($gameSystem.battleMode() == 'solo'){
			memberCnt = 1;
		}else if($gameSystem.battleMode() == 'dual'){
			memberCnt = 2;
		}
		var enemies = $gameTroop.members();
		var enemyLead = enemies[0].isAlive();
		var enemySubLead = enemies[1].isAlive();
		if(memberCnt == 1){
			for (var i = 0; i < enemies.length; i++) {
				if(enemies[i].isAlive() && !enemyLead){
					var indexLead = 0;
					var indexSwap = i;
					$gameTroop.swapOrder(indexLead, indexSwap);
					this._enemySprite.setBattler(enemies[0]);
					this._enemySprite._battler.startAnimation(Synrec.MC.EntryAnimEnemy);
					if($gameSystem.isSideView()){
						this._enemySprite.setHome(Synrec.MC.soloSvEnemyScreenX, Synrec.MC.soloSvEnemyScreenY);
					}else{
						this._enemySprite.setHome(Synrec.MC.soloEnemyScreenX, Synrec.MC.soloEnemyScreenY);
					}
				}
			}
		}else if(memberCnt == 2){
			for (var i = 0; i < enemies.length; i++) {
				if(enemies[i].isAlive() && (!enemyLead || !enemySubLead)){
					if(!enemyLead && i > 1){
						var indexLead = 0;
						var indexSwap = i;
						$gameTroop.swapOrder(indexLead, indexSwap);
						this._enemySprite.setBattler(enemies[0]);
						this._enemySprite._battler.startAnimation(Synrec.MC.EntryAnimEnemy);
						if($gameSystem.isSideView()){
							this._enemySprite.setHome(Synrec.MC.soloSvEnemyScreenX, Synrec.MC.soloSvEnemyScreenY);
						}else{
							this._enemySprite.setHome(Synrec.MC.soloEnemyScreenX, Synrec.MC.soloEnemyScreenY);
						}
					}else if(!enemySubLead && i > 1){
						var indexLead = 1;
						var indexSwap = i;
						$gameTroop.swapOrder(indexLead, indexSwap);
						this._enemySpriteDuo.setBattler(enemies[1]);
						this._enemySpriteDuo._battler.startAnimation(Synrec.MC.EntryAnimEnemy);
						if($gameSystem.isSideView()){
							this._enemySpriteDuo.setHome(Synrec.MC.dualSvEnemyScreenX, Synrec.MC.dualSvEnemyScreenY);
						}else{
							this._enemySpriteDuo.setHome(Synrec.MC.dualEnemyScreenX, Synrec.MC.dualEnemyScreenY);
						}
					}
				}
			}
		}
	}else{
		synrecSpritesetBattleUpdateEnemies.call(this);
	}
}

synrecSpritesetBattleBattlerSprites = Spriteset_Battle.prototype.battlerSprites;
Spriteset_Battle.prototype.battlerSprites = function() {
	if($gameSystem.battleMode() == 'solo' || $gameSystem.battleMode() == 'dual'){
		var memberCnt = 0;
		if($gameSystem.battleMode() == 'solo'){
			memberCnt = 1;
		}else if($gameSystem.battleMode() == 'dual'){
			memberCnt = 2;
		}
		if(memberCnt == 1){
			var battleSprites = [this._enemySprite, this._actorSprite];
			return battleSprites;
		}else if(memberCnt == 2){
			var battleSprites = [this._enemySprite, this._enemySpriteDuo, this._actorSprite, this._actorSpriteDuo];
			return battleSprites;
		}
	}else{
		return this._enemySprites.concat(this._actorSprites);
	}
}

synrecWindowBaseUpdate = Window_Base.prototype.update
Window_Base.prototype.update = function() {
	synrecWindowBaseUpdate.call(this);
    if(Synrec.MC.DefaultWindowSkin)this.windowskin = ImageManager.loadWindowSkin(Synrec.MC.DefaultWindowSkin);
}

Window_Base.prototype.drawHpCustomGauge = function(x, y, width, hp, maxHp){
	var backColor1 = '#000000';
	var backColor2 = '#bbbbbb';
	var hpColor1 = Synrec.MC.HpColor1;
	var hpColor2 = Synrec.MC.HpColor2;
	rateWidth = Math.floor((hp / maxHp) * width);
	if(isNaN(rateWidth))rateWidth = 0;
	this.contents.gradientFillRect(x, y, width, 30, backColor1, backColor2);
	this.contents.gradientFillRect(x, y + 2, rateWidth, 26, hpColor1, hpColor2);
}

Window_Base.prototype.drawMpCustomGauge = function(x, y, width, mp, maxMp){
	var backColor1 = '#000000';
	var backColor2 = '#bbbbbb';
	var mpColor1 = Synrec.MC.MpColor1;
	var mpColor2 = Synrec.MC.MpColor2;
	rateWidth = Math.floor((mp / maxMp) * width);
	if(isNaN(rateWidth))rateWidth = 0;
	this.contents.gradientFillRect(x, y, width, 30, backColor1, backColor2);
	this.contents.gradientFillRect(x, y + 2, rateWidth, 26, mpColor1, mpColor2);
}

Window_Base.prototype.drawTpCustomGauge = function(x, y, width, tp){
	var backColor1 = '#000000';
	var backColor2 = '#bbbbbb';
	var tpColor1 = Synrec.MC.TpColor1;
	var tpColor2 = Synrec.MC.TpColor2;
	rateWidth = Math.floor((tp / 100) * width);
	if(isNaN(rateWidth))rateWidth = 0;
	this.contents.gradientFillRect(x, y, width, 30, backColor1, backColor2);
	this.contents.gradientFillRect(x, y + 2, rateWidth, 26, tpColor1, tpColor2);
}

function Window_TeamCommand (){
	this.initialize.apply(this, arguments);
}

Window_TeamCommand.prototype = Object.create(Window_Command.prototype);
Window_TeamCommand.prototype.constructor = Window_TeamCommand;

Window_TeamCommand.prototype.update = function(){
	Window_Command.prototype.update.call(this);
	if(Synrec.MC.TeamCommandWindowSkin)this.windowskin = ImageManager.loadWindowSkin(Synrec.MC.TeamCommandWindowSkin);
}

Window_TeamCommand.prototype.windowWidth = function(){
	return SceneManager._screenWidth;
}

Window_TeamCommand.prototype.numVisibleRows = function(){
	return 1;
}

Window_TeamCommand.prototype.maxCols = function() {
    return 2;
}

Window_TeamCommand.prototype.makeCommandList = function() {
	this.addCommand('Modify Party', 'modify');
	this.addCommand('End', 'end');
}

function Window_TeamWindow(){
	this.initialize.apply(this, arguments);
}

Window_TeamWindow.prototype = Object.create(Window_Selectable.prototype);
Window_TeamWindow.prototype.constructor = Window_TeamWindow;

Window_TeamWindow.prototype.update = function(){
	Window_Selectable.prototype.update.call(this);
	if(Synrec.MC.PartyBoxWindowSkin)this.windowskin = ImageManager.loadWindowSkin(Synrec.MC.PartyBoxWindowSkin);
}

Window_TeamWindow.prototype.maxCols = function(){
	return 1;
}

Window_TeamWindow.prototype.maxItems = function(){
	return Synrec.MC.teamSize;
}

Window_TeamWindow.prototype.itemWidth = function() {
    return Math.floor((this.width - this.padding * 2 +
                       this.spacing()) / this.maxCols() - this.spacing());
}

Window_TeamWindow.prototype.itemHeight = function() {
    return 48;
}

Window_TeamWindow.prototype.drawItem = function(index){
	var data = $gameParty._actors[index];
	if(data){
		var rect = this.itemRect(index);
		this.drawActorCharacter(data, rect.x + 24, rect.y + 48);
		this.drawActorName(data, rect.x + 72, rect.y);
	}
}

Window_TeamWindow.prototype.currentItem = function(){
	var index = this._index;
	return $gameParty._actors[index];
}

Window_TeamWindow.prototype.isReserveable = function(actorId) {
	if(Synrec.MC.lockedMonsters.contains(actorId)){
		return false;
	}else{
		return true;
	}
}

Window_TeamWindow.prototype.refresh = function(){
	this.contents.clear();
	this.drawAllItems();
}

function Window_TeamReserve(){
	this.initialize.apply(this, arguments);
}

Window_TeamReserve.prototype = Object.create(Window_Selectable.prototype);
Window_TeamReserve.prototype.constructor = Window_TeamReserve;

Window_TeamReserve.prototype.update = function(){
	Window_Selectable.prototype.update.call(this);
	if(Synrec.MC.ReserveBoxWindowSkin)this.windowskin = ImageManager.loadWindowSkin(Synrec.MC.ReserveBoxWindowSkin);
}

Window_TeamReserve.prototype.maxCols = function(){
	return 1;
}

Window_TeamReserve.prototype.maxItems = function(){
	return Synrec.MC.maxReserveMembers;
}

Window_TeamReserve.prototype.itemWidth = function() {
    return Math.floor((this.width - this.padding * 2 +
                       this.spacing()) / this.maxCols() - this.spacing());
}

Window_TeamReserve.prototype.itemHeight = function() {
    return 48;
}

Window_TeamReserve.prototype.getData = function(data, boxIndex){
	this._data = data;
	this._reserveIndex = boxIndex;
}

Window_TeamReserve.prototype.drawItem = function(index){
	if(this._data){
		var data = this._data[index];
		if(data){
			var rect = this.itemRect(index);
			this.drawActorCharacter(data, rect.x + 24, rect.y + 48);
			this.drawActorName(data, rect.x + 72, rect.y);
		}
	}
}

Window_TeamReserve.prototype.currentItem = function(){
	var box = this._reserveIndex;
	var index = this.index();
	return $gameParty._reserveActors[box][index];
}

Window_TeamReserve.prototype.refresh = function(){
	this.contents.clear();
	this.drawAllItems();
}

function Window_BoxChoice(){
	this.initialize.apply(this, arguments);
}

Window_BoxChoice.prototype = Object.create(Window_Selectable.prototype);
Window_BoxChoice.prototype.constructor = Window_BoxChoice;

Window_BoxChoice.prototype.update = function(){
	Window_Selectable.prototype.update.call(this);
	if(isNaN(this._boxNumber))this._boxNumber = 0;
	this.refresh();
	if(Synrec.MC.ReserveBoxChoiceWindowSkin)this.windowskin = ImageManager.loadWindowSkin(Synrec.MC.ReserveBoxChoiceWindowSkin);
}

Window_BoxChoice.prototype.maxItems = function(){
	return 1;
}

Window_BoxChoice.prototype.drawBoxNumber = function(){
	var number = this._boxNumber;
	if(!isNaN(number)){
		var textWidth = this.textWidth('Monster Box: ' + number);
		this.drawText('Monster Box: ' + number, (this.width / 2) - (textWidth / 2), 0)
	}
}

Window_BoxChoice.prototype.cursorDown = function(wrap){
	Window_Selectable.prototype.cursorDown.call(this, wrap);
	SoundManager.playCursor();
	this._boxNumber = 0;
}

Window_BoxChoice.prototype.cursorUp = function(wrap){
	Window_Selectable.prototype.cursorDown.call(this, wrap);
	SoundManager.playCursor();
	this._boxNumber = Synrec.MC.maxReserveBoxes - 1;
}

Window_BoxChoice.prototype.cursorRight = function(wrap){
	Window_Selectable.prototype.cursorRight.call(this, wrap);
	if(this._boxNumber < Synrec.MC.maxReserveBoxes - 1){
		SoundManager.playCursor();
		this._boxNumber++;
	}
}

Window_BoxChoice.prototype.cursorLeft = function(wrap){
	Window_Selectable.prototype.cursorLeft.call(this, wrap);
	if(this._boxNumber > 0){
		SoundManager.playCursor();
		this._boxNumber--;
	}
}

Window_BoxChoice.prototype.refresh = function(){
	this.contents.clear();
	this.drawBoxNumber();
}

function Window_ActorStatus(){
	this.initialize.apply(this, arguments);
}

Window_ActorStatus.prototype = Object.create(Window_Base.prototype);
Window_ActorStatus.prototype.constructor = Window_ActorStatus;

Window_ActorStatus.prototype.update = function(){
	Window_Base.prototype.update.call(this);
	if(Synrec.MC.CustomActorStatusWindowSkin)this.windowskin = ImageManager.loadWindowSkin(Synrec.MC.CustomActorStatusWindowSkin);
	this.refresh();
}

Window_ActorStatus.prototype.drawData = function(){
	var actorCnt = $gameParty._actors.length;
	if($gameSystem.battleMode() == 'solo'){
		actorCnt = 1;
	}else if($gameSystem.battleMode() == 'dual'){
		actorCnt = 2;
	}
	for(i = 0; i < actorCnt; i++){
		var data = $gameParty._actors[i];
		var iconWidth = Window_Base._iconWidth;
		var gaugeWidth = this.width - (iconWidth + this.standardPadding() * 2);
		var name = data._name;
		var level = data._level;
		var hp = data._hp;
		var maxHp = data.param(0);
		var hpRate = hp / maxHp;
		if(hpRate <= 0.2){
			this.deathColor();
		}else if(hpRate <= 0.4){
			this.crisisColor();
		}else{
			this.resetFontSettings();
		}
		var mp = data._mp;
		var maxMp = data.param(1);
		var tp = data._tp;
		var hpIcon = Synrec.MC.HpIcon;
		var mpIcon = Synrec.MC.MpIcon;
		var tpIcon = Synrec.MC.TpIcon;
		if(!Synrec.MC.ActorTpBar && !Synrec.MC.ActorMpBar)var height = i * (this.lineHeight() * 2);
		if(!Synrec.MC.ActorTpBar && Synrec.MC.ActorMpBar)var height = i * (this.lineHeight() * 3);
		if(Synrec.MC.ActorTpBar && !Synrec.MC.ActorMpBar)var height = i * (this.lineHeight() * 3);
		if(Synrec.MC.ActorTpBar && Synrec.MC.ActorMpBar)var height = i * (this.lineHeight() * 4);
		this.drawText(name, 0, height);
		var nameWidth = this.textWidth(name);
		this.drawText(TextManager.levelA + ': ' + level, nameWidth + 12, height);
		var topWidth = 32 + nameWidth + this.textWidth(TextManager.levelA + ': ' + level);
		this.drawSexIcon(data, topWidth, height);
		this.drawIcon(hpIcon, 0, this.lineHeight() + height);
		this.drawHpCustomGauge(iconWidth, this.lineHeight() + height, gaugeWidth, hp, maxHp);
		if(Synrec.MC.ActorMpBar){
			this.drawIcon(mpIcon, 0, this.lineHeight() * 2 + height);
			this.drawMpCustomGauge(iconWidth, this.lineHeight() * 2 + height, gaugeWidth, mp, maxMp);
		}
		if(Synrec.MC.ActorTpBar && !Synrec.MC.ActorMpBar){
			this.drawIcon(tpIcon, 0, this.lineHeight() * 2 + height);
			this.drawTpCustomGauge(iconWidth, this.lineHeight() * 2 + height, gaugeWidth, tp);
		}else if (Synrec.MC.ActorTpBar && Synrec.MC.ActorMpBar){
			this.drawIcon(tpIcon, 0, this.lineHeight() * 3 + height);
			this.drawTpCustomGauge(iconWidth, this.lineHeight() * 3 + height, gaugeWidth, tp);
		}
		this.resetFontSettings();
	}
	if(!Synrec.MC.ActorTpBar && !Synrec.MC.ActorMpBar)var winHeight = ((this.lineHeight() * 3) * actorCnt + 1);
	if(!Synrec.MC.ActorTpBar && Synrec.MC.ActorMpBar)var winHeight = ((this.lineHeight() * 4) * actorCnt + 1);
	if(Synrec.MC.ActorTpBar && Synrec.MC.ActorMpBar)var winHeight = ((this.lineHeight() * 5) * actorCnt + 1);
	this.move(this.x, this.y, this.width, winHeight);
}

Window_ActorStatus.prototype.drawSexIcon = function(data, x, y){
	if(data._sex == 'male'){
		this.drawIcon(Synrec.MC.MaleIcon, x, y);
	}else if(data._sex == 'female'){
		this.drawIcon(Synrec.MC.FemaleIcon, x, y);
	}else{
		this.drawIcon(Synrec.MC.UnknownIcon, x, y);
	}
}

Window_ActorStatus.prototype.refresh = function(){
	this.contents.clear();
	this.drawData();
}

function Window_EnemyStatus(){
	this.initialize.apply(this, arguments);
}

Window_EnemyStatus.prototype = Object.create(Window_Base.prototype);
Window_EnemyStatus.prototype.constructor = Window_EnemyStatus;

Window_EnemyStatus.prototype.update = function(){
	Window_Base.prototype.update.call(this);
	if(Synrec.MC.CustomEnemyStatusWindowSkin)this.windowskin = ImageManager.loadWindowSkin(Synrec.MC.CustomEnemyStatusWindowSkin);
	this.refresh();
}

Window_EnemyStatus.prototype.drawData = function(){
	var enemyCnt = $gameTroop._enemies.length;
	if($gameSystem.battleMode() == 'solo'){
		enemyCnt = 1;
	}else if($gameSystem.battleMode() == 'dual'){
		enemyCnt = 2;
	}
	for(i = 0; i < enemyCnt; i++){
		var data = $gameTroop._enemies[i];
		var iconWidth = Window_Base._iconWidth;
		var gaugeWidth = this.width - (iconWidth + this.standardPadding() * 2);
		var name = data._name;
		var level = data._level;
		var hp = data._hp;
		var maxHp = data.param(0);
		var hpRate = hp / maxHp;
		if(hpRate <= 0.2){
			this.deathColor();
		}else if(hpRate <= 0.4){
			this.crisisColor();
		}else{
			this.resetFontSettings();
		}
		var mp = data._mp;
		var maxMp = data.param(1);
		var tp = data._tp;
		var hpIcon = Synrec.MC.HpIcon;
		var mpIcon = Synrec.MC.MpIcon;
		var tpIcon = Synrec.MC.TpIcon;
		if(!Synrec.MC.EnemyTpBar && !Synrec.MC.EnemyMpBar)var height = i * (this.lineHeight() * 2);
		if(!Synrec.MC.EnemyTpBar && Synrec.MC.EnemyMpBar)var height = i * (this.lineHeight() * 3);
		if(Synrec.MC.EnemyTpBar && !Synrec.MC.EnemyMpBar)var height = i * (this.lineHeight() * 3);
		if(Synrec.MC.EnemyTpBar && Synrec.MC.EnemyMpBar)var height = i * (this.lineHeight() * 4);
		this.drawText(name, 0, height);
		var nameWidth = this.textWidth(name);
		this.drawText(TextManager.levelA + ': ' + level, nameWidth + 12, height);
		var topWidth = 32 + nameWidth + this.textWidth(TextManager.levelA + ': ' + level);
		this.drawSexIcon(data, topWidth, height);
		this.drawIcon(hpIcon, 0, this.lineHeight() + height);
		this.drawHpCustomGauge(iconWidth, this.lineHeight() + height, gaugeWidth, hp, maxHp);
		if(Synrec.MC.EnemyMpBar){
			this.drawIcon(mpIcon, 0, this.lineHeight() * 2 + height);
			this.drawMpCustomGauge(iconWidth, this.lineHeight() * 2 + height, gaugeWidth, mp, maxMp);
		}
		if(Synrec.MC.EnemyTpBar && !Synrec.MC.EnemyMpBar){
			this.drawIcon(tpIcon, 0, this.lineHeight() * 2 + height);
			this.drawTpCustomGauge(iconWidth, this.lineHeight() * 2 + height, gaugeWidth, tp);
		}else if (Synrec.MC.EnemyTpBar && Synrec.MC.EnemyMpBar){
			this.drawIcon(tpIcon, 0, this.lineHeight() * 3 + height);
			this.drawTpCustomGauge(iconWidth, this.lineHeight() * 3 + height, gaugeWidth, tp);
		}
		this.resetFontSettings();
	}
	if(!Synrec.MC.EnemyTpBar && !Synrec.MC.EnemyMpBar)var winHeight = ((this.lineHeight() * 3) * enemyCnt + 1) - 36;
	if(!Synrec.MC.EnemyTpBar && Synrec.MC.EnemyMpBar)var winHeight = ((this.lineHeight() * 4) * enemyCnt + 1) - 36;
	if(Synrec.MC.EnemyTpBar && !Synrec.MC.EnemyMpBar)var winHeight = ((this.lineHeight() * 4) * enemyCnt + 1) - 36;
	if(Synrec.MC.EnemyTpBar && Synrec.MC.EnemyMpBar)var winHeight = ((this.lineHeight() * 5) * enemyCnt + 1) - 36;
	this.move(this.x, this.y, this.width, winHeight);
}

Window_EnemyStatus.prototype.drawSexIcon = function(data, x, y){
	if(data._sex == 'male'){
		this.drawIcon(Synrec.MC.MaleIcon, x, y);
	}else if(data._sex == 'female'){
		this.drawIcon(Synrec.MC.FemaleIcon, x, y);
	}else{
		this.drawIcon(Synrec.MC.UnknownIcon, x, y);
	}
}

Window_EnemyStatus.prototype.refresh = function(){
	this.contents.clear();
	this.drawData();
}

SynrecWindowActorCommandMakeCommandList = Window_ActorCommand.prototype.makeCommandList;
Window_ActorCommand.prototype.makeCommandList = function() {
	if(Synrec.MC.DefaultAttack && Synrec.MC.DefaultGuard){
		SynrecWindowActorCommandMakeCommandList.call(this);
		this.addPartyCommand();
	}else{
		if (this._actor) {
			if(Synrec.MC.DefaultAttack)this.addAttackCommand();
			this.addSkillCommands();
			if(Synrec.MC.DefaultGuard)this.addGuardCommand();
			this.addItemCommand();
			this.addPartyCommand();
		}
	}
}

Window_ActorCommand.prototype.addPartyCommand = function(){
	this.addCommand(Synrec.MC.partyName, 'party');
}

Window_BattleEnemy.prototype.drawItem = function(index) {
	if(this._enemies[index]){
		this.resetTextColor();
		var name = this._enemies[index].name();
		var rect = this.itemRectForText(index);
		this.drawText(name, rect.x, rect.y, rect.width);
		if(Synrec.MC.enableHP && $gameSystem.battleMode() == 'raid'){
			var x = this.textWidth(name);
			this.drawIcon(Synrec.MC.HpIcon, rect.x + x, rect.y);
			this.drawHp(rect.x + x + 36, rect.y, this._enemies[index]._hp, this._enemies[index].param(0));
		}
	}else{
		this.drawText('No Target');
	}
}

Window_BattleEnemy.prototype.drawHp = function(x, y, currentHp, maxHp){
	var x = x;
	var y = y;
	var width = 200;
	this.drawHpCustomGauge(x, y, width, currentHp, maxHp);
}

Window_BattleEnemy.prototype.isCurrentItemEnabled = function() {
	var index = this.index();
	if(this._enemies[index])return true;
    return false;
};

Window_BattleEnemy.prototype.maxItems = function() {
	if($gameSystem.battleMode() == 'solo'){
		return 1;
	}else if($gameSystem.battleMode() == 'dual'){
		return 2;
	}else{
		return this._enemies.length;
	}
}

function Window_PartyMembers (){
	this.initialize.apply(this, arguments);
}

Window_PartyMembers.prototype = Object.create(Window_Selectable.prototype);
Window_PartyMembers.prototype.constructor = Window_PartyMembers;

Window_PartyMembers.prototype.maxItems = function(){
	return Synrec.MC.teamSize;
}

Window_PartyMembers.prototype.update = function(){
	Window_Selectable.prototype.update.call(this);
	if(Synrec.MC.EvolutionPartyWindowSkin)this.windowskin = ImageManager.loadWindowSkin(Synrec.MC.EvolutionPartyWindowSkin);
}

Window_PartyMembers.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight() * 4;
    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
    return rect;
};

Window_PartyMembers.prototype.drawItem = function(index){
	var data = $gameParty._actors[index];
	if(data){
		var rect = this.itemRect(index);
		var canEvolve = data.evolveReq(data._level);
		if(canEvolve){
			this.changeTextColor(Synrec.MC.EvolveYesText);
		}else{
			this.changeTextColor(Synrec.MC.EvolveNoText);
		}
		this.drawActorName(data, 0, rect.y);
		var nameWidth = this.textWidth(data._name);
		this.drawActorLevel(data, nameWidth + 4, rect.y);
		var height = this.lineHeight();
		this.drawActorNickname(data, 0, rect.y + height);
		height = height * 2;
		this.drawActorCharacter(data, 24, rect.y + height + this.lineHeight());
		height = this.lineHeight() * 3;
		this.drawIcon(Synrec.MC.HpIcon, 0, rect.y + height);
		this.drawHpCustomGauge(60, rect.y + height, this.width - (this.standardPadding() * 2 + 60), data._hp, data.param(0));
		this.resetFontSettings();
	}
}

Window_PartyMembers.prototype.currentItem = function(){
	return this.index();
}

function Window_BattlePartyMembers (){
	this.initialize.apply(this, arguments);
}

Window_BattlePartyMembers.prototype = Object.create(Window_Selectable.prototype);
Window_BattlePartyMembers.prototype.constructor = Window_BattlePartyMembers;

Window_BattlePartyMembers.prototype.update = function(){
	Window_Selectable.prototype.update.call(this);
	if(Synrec.MC.BattlePartyWindowSkin)this.windowskin = ImageManager.loadWindowSkin(Synrec.MC.BattlePartyWindowSkin);
}

Window_BattlePartyMembers.prototype.maxItems = function(){
	return Synrec.MC.teamSize;
}

Window_BattlePartyMembers.prototype.setIndexForSwap = function(index){
	this._initIndex = index;
}

Window_BattlePartyMembers.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight() * 4;
    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
    return rect;
};

Window_BattlePartyMembers.prototype.drawItem = function(index){
	var data = $gameParty._actors[index];
	if(data){
		var rect = this.itemRect(index);
		var isAlive = data.isAlive();
		if(isAlive){
			this.changeTextColor(Synrec.MC.EvolveYesText);
		}else{
			this.changeTextColor(Synrec.MC.EvolveNoText);
		}
		this.drawActorName(data, 0, rect.y);
		var nameWidth = this.textWidth(data._name);
		this.drawActorLevel(data, nameWidth + 4, rect.y);
		var height = this.lineHeight();
		this.drawActorNickname(data, 0, rect.y + height);
		height = height * 2;
		this.drawActorCharacter(data, 24, rect.y + height + this.lineHeight());
		height = this.lineHeight() * 3;
		this.drawIcon(Synrec.MC.HpIcon, 0, rect.y + height);
		this.drawHpCustomGauge(60, rect.y + height, this.width - (this.standardPadding() * 2 + 60), data._hp, data.param(0));
		this.resetFontSettings();
	}
}

function Window_ActorData(){
	this.initialize.apply(this, arguments);
}

Window_ActorData.prototype = Object.create(Window_Base.prototype);
Window_ActorData.prototype.constructor = Window_ActorData;

Window_ActorData.prototype.update = function(){
	Window_Base.prototype.update.call(this);
	if(Synrec.MC.EvolutionActorDataWindowSkin)this.windowskin = ImageManager.loadWindowSkin(Synrec.MC.EvolutionActorDataWindowSkin);
	this.refresh();
}

Window_ActorData.prototype.getData = function(data, partyIndex){
	this._data = data;
	this._gameActor = $gameParty._actors[partyIndex];
	this.refresh();
}

Window_ActorData.prototype.drawData = function(){
	if(this._data && this._gameActor){
		var canEvolve = this._gameActor.evolveReq(this._gameActor._level);
		if(canEvolve){
			this.changeTextColor(Synrec.MC.EvolveYesText);
		}else{
			this.changeTextColor(Synrec.MC.EvolveNoText);
		}
		var faceWidth = Window_Base._faceWidth + 4;
		this.drawFace(this._data.faceName, this._data.faceIndex, 0, 0);
		this.drawText(this._data.name, faceWidth, 0);
		this.drawActorLevel(this._gameActor, faceWidth, this.lineHeight() * 2);
		this.drawCharacter(this._data.characterName, this._data.characterIndex, this.standardPadding(), this.lineHeight() * 5 + 16);
		var height = this.lineHeight() * 6;
		var evolutionLvl = eval(this._data.meta.evolutionLevel);
		var evolutionItemId = eval(this._data.meta.evolutionItem);
		var evolutionActorId = eval(this._data.meta.evolutionActor);
		this.drawText(Synrec.MC.EvolveToText, 0, height);
		this.drawText(Synrec.MC.EvolveLvlText, 0, height + this.lineHeight() * 2);
		this.drawText(Synrec.MC.EvolveItemText, 0, height + this.lineHeight() * 4);
		var evolingWidth = this.textWidth(Synrec.MC.EvolvingIntoText);
		if(canEvolve)this.drawText(Synrec.MC.EvolvingIntoText, (this._width / 2) - (evolingWidth / 2), height + this.lineHeight() * 6);
		this.resetFontSettings();
		if(canEvolve){
			this.changeTextColor(Synrec.MC.EvolveYesText);
		}else{
			this.changeTextColor(Synrec.MC.EvolveNoText);
		}
		var width1 = this.textWidth(Synrec.MC.EvolveToText) + this.standardPadding();
		var width2 = this.textWidth(Synrec.MC.EvolveLvlText) + this.standardPadding();
		var width3 = this.textWidth(Synrec.MC.EvolveItemText) + this.standardPadding();
		if($dataActors[evolutionActorId]){
			var evolveToName = $dataActors[evolutionActorId].name;
		}else{
			var evolveToName = 'N/A';
		}
		if($dataItems[evolutionItemId]){
			var evolveItemName = $dataItems[evolutionItemId].name;
		}else{
			var evolveItemName = 'N/A';
		}
		this.drawText(evolveToName, width1, height);
		this.drawText(evolutionLvl, width2, height + this.lineHeight() * 2);
		this.drawText(evolveItemName, width3, height + this.lineHeight() * 4);
	}
}

Window_ActorData.prototype.refresh = function(){
	this.contents.clear();
	this.drawData();
}

function Window_CustomBattleStatus(){
	this.initialize.apply(this, arguments);
}

Window_CustomBattleStatus.prototype = Object.create(Window_BattleStatus.prototype);
Window_CustomBattleStatus.prototype.constructor = Window_CustomBattleStatus;

Window_CustomBattleStatus.prototype.numVisibleRows = function() {
    return 1;
}

Window_CustomBattleStatus.prototype.windowHeight = function() {
    return this.fittingHeight(4);
}

Window_CustomBattleStatus.prototype.maxCols = function() {
	var raidMode = $gameSystem.battleMode() != 'solo' && $gameSystem.battleMode() != 'dual'
	if(raidMode)return $gameParty.battleMembers().length;
	if($gameSystem.battleMode() == 'solo'){
		return 1;
	}else if($gameSystem.battleMode() == 'dual'){
		return 2;
	}
}

Window_CustomBattleStatus.prototype.maxItems = function() {
	var raidMode = $gameSystem.battleMode() != 'solo' && $gameSystem.battleMode() != 'dual';
	if(raidMode)return $gameParty.battleMembers().length;
	if($gameSystem.battleMode() == 'solo'){
		return 1;
	}else if($gameSystem.battleMode() == 'dual'){
		return 2;
	}
}

Window_CustomBattleStatus.prototype.update = function(){
	Window_BattleStatus.prototype.update.call(this);
	if(Synrec.MC.CustomBattleStatusWindowSkin)this.windowskin = ImageManager.loadWindowSkin(Synrec.MC.CustomBattleStatusWindowSkin);
}

Window_CustomBattleStatus.prototype.drawItem = function(index) {
    var actor = $gameParty.battleMembers()[index];
    this.drawBasicArea(this.basicRect(index), actor);
}

Window_CustomBattleStatus.prototype.basicRect = function(index) {
	var rect = new Rectangle();
	var maxCols = this.maxCols();
	rect.width = this.itemWidth();
	rect.height = this.height;
	rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
    return rect;
}

Window_CustomBattleStatus.prototype.drawBasicArea = function(rect, actor) {
	var actorLevel = actor._level;
    this.drawActorName(actor, rect.x, rect.y, 150);
    this.drawActorIcons(actor, rect.x + 156, rect.y, rect.width - 156);
	this.drawActorFace(actor, rect.x + rect.width - Window_Base._faceWidth, rect.y);
	this.drawActorCharacter(actor, rect.x + Window_Base._faceWidth, rect.y + this.lineHeight() * 2);
	this.drawActorLevel(actor, rect.x, rect.y + this.lineHeight() * 2);
	if(actorLevel < 2){
		var currentExp = actor.currentExp();
	}else{
		var currentExp = actor.currentExp() - actor.currentLevelExp();
	}
	var nextExp = actor.nextLevelExp() - actor.currentLevelExp();
	var expTextWidth = this.textWidth(TextManager.expA);
	this.drawExpGauge(rect.x + expTextWidth, rect.y + (this.lineHeight() * 3), rect.width - expTextWidth, currentExp, nextExp);
	this.drawText(TextManager.expA, rect.x, rect.y + (this.lineHeight() * 3));
}

Window_CustomBattleStatus.prototype.drawExpGauge = function(x, y, width, currentExp, nextExp){
	var currentExp = eval(currentExp);
	var nextExp = eval(nextExp);
	var rate = currentExp / nextExp;
	if(!isNaN(rate)){
		var color1 = '#333300';
		var color2 = '#aaffff';
		var fillW = (Math.floor(width * rate));
		this.contents.gradientFillRect(x, y, width, this.lineHeight(), color1, color2);
		this.contents.gradientFillRect(x, y + 2, fillW, this.lineHeight() - 4, '#ffffff', '#000000');
	}
}

synrecSceneBattleUpdate = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	var raidMode = $gameSystem.battleMode() != 'solo' && $gameSystem.battleMode() != 'dual';
	if(customUI && !raidMode){
		var active = this.isActive();
		$gameTimer.update(active);
		$gameScreen.update();
		this.updateStatusWindow();
		this.updateWindowPositions();
		if (active && !this.isBusy()) {
			if(this._logWindow._lines.length > 0){
				this._enemyStatusWindow.hide();
			}else if(this._logWindow._lines.length <= 0){
				this._enemyStatusWindow.show();
			}
			if($gameSystem.battleMode() == 'solo'){
				this._enemyIndex = this._spriteset._troopIndex;
				this._currentEnemy = $gameTroop.members()[0];
				BattleManager._currentEnemy = this._currentEnemy;
			}
			this.updateBattleProcess();
		}
		Scene_Base.prototype.update.call(this);
	}else{
		synrecSceneBattleUpdate.call(this);
	}
}

synrecSceneBattleIsAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive = function() {
	var raidMode = $gameSystem.battleMode() != 'solo' && $gameSystem.battleMode() != 'dual' 
	if(customUI && !raidMode){
		return (this._partyCommandWindow.active ||
				this._actorCommandWindow.active ||
				this._skillWindow.active ||
				this._itemWindow.active ||
				this._actorWindow.active ||
				this._enemyWindow.active ||
				this._partySwitchWindow.active);
	}else{
		return(synrecSceneBattleIsAnyInputWindowActive.call(this));
	}
}

synrecSceneBattleCreateAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	var raidMode = $gameSystem.battleMode() != 'solo' && $gameSystem.battleMode() != 'dual' 
	if(customUI && !raidMode){
		var raidMode = $gameSystem.battleMode() == 'raid';
		this.createLogWindow();
		if(raidMode){
			this.createStatusWindow();
		}else{
			this.createCustomStatusWindow();
		}
		this.createPartyCommandWindow();
		this.createActorCommandWindow();
		this.createActorStatusWindow();
		this.createEnemyStatusWindow();
		this.createHelpWindow();
		this.createSkillWindow();
		this.createItemWindow();
		this.createActorWindow();
		this.createEnemyWindow();
		this.createPartySwitchWindow();
		this.createMessageWindow();
		this.createScrollTextWindow();
	}else{
		synrecSceneBattleCreateAllWindows.call(this);
	}
}

Scene_Battle.prototype.createCustomStatusWindow = function() {
    this._statusWindow = new Window_CustomBattleStatus();
    this.addWindow(this._statusWindow);
}

Scene_Battle.prototype.createActorCommandWindow = function() {
    this._actorCommandWindow = new Window_ActorCommand();
    this._actorCommandWindow.setHandler('attack', this.commandAttack.bind(this));
    this._actorCommandWindow.setHandler('skill',  this.commandSkill.bind(this));
    this._actorCommandWindow.setHandler('guard',  this.commandGuard.bind(this));
    this._actorCommandWindow.setHandler('item',   this.commandItem.bind(this));
    this._actorCommandWindow.setHandler('party',  this.commandParty.bind(this));
    this._actorCommandWindow.setHandler('cancel', this.selectPreviousCommand.bind(this));
    this.addWindow(this._actorCommandWindow);
};

Scene_Battle.prototype.createActorStatusWindow = function(){
	var x = SceneManager._screenWidth - 300;
	if($gameSystem.isSideView()){
		var y = 0;
	}else{
		var y = SceneManager._screenHeight -  388;
	}
	var width = 300;
	var height = SceneManager._screenHeight;
	this._actorStatusWindow = new Window_ActorStatus(x, y, width, height);
	this._actorStatusWindow.refresh();
	this._actorStatusWindow.close();
	this.addWindow(this._actorStatusWindow);
}

Scene_Battle.prototype.createEnemyStatusWindow = function(){
	var x = 0;
	var y = 0;
	var width = 300;
	var height = SceneManager._screenHeight;
	this._enemyStatusWindow = new Window_EnemyStatus(x, y, width, height);
	this._enemyStatusWindow.refresh();
	this._enemyStatusWindow.close();
	this.addWindow(this._enemyStatusWindow);
}

Scene_Battle.prototype.createPartySwitchWindow = function(){
	var x = SceneManager._screenWidth / 2 - 150;
	var y = 0;
	var width = 300;
	var height = 450;
	this._partySwitchWindow = new Window_BattlePartyMembers(x, y, width, height);
	this._partySwitchWindow.setHandler('ok', this.beginActorSwap.bind(this));
	this._partySwitchWindow.setHandler('cancel', this.endActorSwap.bind(this));
	this._partySwitchWindow.refresh();
	this._partySwitchWindow.close();
	this._partySwitchWindow.deactivate();
	this.addWindow(this._partySwitchWindow);
}

synrecSceneBattleStartPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
	var raidMode = $gameSystem.battleMode() != 'solo' && $gameSystem.battleMode() != 'dual' 
	if(customUI && !raidMode){
		this.refreshStatus();
		this._statusWindow.deselect();
		this._partySwitchWindow.close();
		this._partySwitchWindow.deactivate();
		this._actorStatusWindow.open();
		this._enemyStatusWindow.open();
		this._statusWindow.open();
		this._actorCommandWindow.close();
		this._partyCommandWindow.setup();
	}else{
		synrecSceneBattleStartPartyCommandSelection.call(this);
	}
}

synrecSceneBattleRefreshStatus = Scene_Battle.prototype.refreshStatus;
Scene_Battle.prototype.refreshStatus = function() {
	var raidMode = $gameSystem.battleMode() != 'solo' && $gameSystem.battleMode() != 'dual' 
	if(customUI && !raidMode){
		this._actorStatusWindow.refresh();
		this._enemyStatusWindow.refresh();
		this._statusWindow.refresh();
	}else{
		synrecSceneBattleRefreshStatus.call(this);
	}
}

Scene_Battle.prototype.commandParty = function(){
	this._actorCommandWindow.deactivate()
	this._partySwitchWindow.refresh();
	this._partySwitchWindow.open();
	this._partySwitchWindow.activate();
}

synrecSceneBattleEnemySelection = Scene_Battle.prototype.selectEnemySelection
Scene_Battle.prototype.selectEnemySelection = function() {
    synrecSceneBattleEnemySelection.call(this);
	if($gameSystem.battleMode() == 'solo'){
		this.onEnemyOk();
	}
}

synrecSceneBattleOnEnemyOk = Scene_Battle.prototype.onEnemyOk
Scene_Battle.prototype.onEnemyOk = function() {
    var action = BattleManager.inputtingAction();
    action.setTarget(this._enemyWindow.enemyIndex());
    this._enemyWindow.hide();
    this._skillWindow.hide();
    this._itemWindow.hide();
	if($gameSystem.battleMode() == 'solo'){
		BattleManager.startTurn();
		this._enemyWindow.deselect();
		this._enemyWindow.deactivate();
	}else{
		this.selectNextCommand();
	}
}

Scene_Battle.prototype.beginActorSwap = function(){
	var indexInit = BattleManager.actor().index();
	var partyWindowIndex = this._partySwitchWindow.index();
	var aliveMember = $gameParty._actors[partyWindowIndex].isAlive();
	if(!aliveMember){
		SoundManager.playBuzzer();
		this._partySwitchWindow.activate();
		return 0;
	}
	if(Synrec.MC.turnActorSwitch){
		BattleManager.reserveActorSwap(indexInit, partyWindowIndex);
		this._partySwitchWindow.close();
		this._partySwitchWindow.deactivate();
		this.changeInputWindow();
	}else{
		var battleMode = $gameSystem.battleMode();
		var allowCondition = this.processSwap(indexInit, partyWindowIndex, battleMode);
		if(allowCondition){
			if((Synrec.MC.ShowActorBitmap || $gameSystem.isSideView())){
				this._partySwitchWindow.close();
				this._partySwitchWindow.deactivate();
				$gameParty.swapOrder(indexInit, partyWindowIndex);
				if(indexInit == 0)SceneManager._scene._spriteset._actorSprite.setBattler($gameParty._actors[indexInit]);
				if(indexInit == 1)SceneManager._scene._spriteset._actorSpriteDuo.setBattler($gameParty._actors[indexInit]);
				$gameParty._actors[indexInit].startAnimation(Synrec.MC.EntryAnimActor, false, 0);
				$gameParty._actors[indexInit].refresh();
				this.changeInputWindow();
				this._statusWindow.refresh();
			}else{
				this._partySwitchWindow.close();
				this._partySwitchWindow.deactivate();
				this._statusWindow.refresh();
				$gameParty.swapOrder(indexInit, partyWindowIndex);
				this.changeInputWindow();
				this._statusWindow.refresh();
			}
		}else{
			SoundManager.playBuzzer();
			this._partySwitchWindow.activate();
		}
		this._statusWindow.refresh();
	}
}

Scene_Battle.prototype.processSwap = function(index1, index2, battleMode){
	switch(battleMode){
		case 'solo':
			if(index2 != index1){
				return true;
			}else{
				return false;
			}
			break;
		case 'dual':
			if(index2 != 0 && index2 != 1){
				return true;
			}else{
				return false;
			}
			break;
	}
}

Scene_Battle.prototype.endActorSwap = function(){
	this.selectPreviousCommand();
}

synrecSceneBattleSelectPreviousCommand = Scene_Battle.prototype.selectPreviousCommand;
Scene_Battle.prototype.selectPreviousCommand = function() {
    synrecSceneBattleSelectPreviousCommand.call(this);
	if(BattleManager.actor()){
		var actorIndex = BattleManager.actor().index();
		BattleManager.removeSwap(actorIndex);
	}
}

synrecSceneBattleEndCommandSelection = Scene_Battle.prototype.endCommandSelection;
Scene_Battle.prototype.endCommandSelection = function() {
	var raidMode = $gameSystem.battleMode() != 'solo' && $gameSystem.battleMode() != 'dual' 
	if(customUI && !raidMode){
		this._partySwitchWindow.close();
		this._partySwitchWindow.deactivate();
		this._partyCommandWindow.close();
		this._actorCommandWindow.close();
		this._statusWindow.deselect();
	}else{
		synrecSceneBattleEndCommandSelection.call(this);
	}
}

function Scene_MonsterBox (){
	this.initialize.apply(this, arguments);
}

Scene_MonsterBox.prototype = Object.create(Scene_MenuBase.prototype);
Scene_MonsterBox.prototype.constructor = Scene_MonsterBox;

Scene_MonsterBox.prototype.update = function(){
	Scene_MenuBase.prototype.update.call(this);
	if(this._boxChoice.active){
		var boxNumber = this._boxChoice._boxNumber;
		this._reserveWindow.getData($gameParty._reserveActors[boxNumber], boxNumber);
		this._reserveWindow.refresh();
	}
}

Scene_MonsterBox.prototype.create = function(){
	this.createBackground();
	this.createWindowLayer();
	this.createTeamCommandWindow();
	this.createTeamReserveBox();
	this.createReserveChoiceWindow();
	this.createTeamWindow();
	if(!isNaN($gameSystem._reservePartyBox)){
		this._rserveBox = $gameSystem._reservePartyBox;
		this._singleBoxMode = true;
		this.openSingleReserve();
	}
}

Scene_MonsterBox.prototype.createBackground = function(){
	if(Synrec.MC.MonsterBoxSceneBackground){
		var width = SceneManager._screenWidth;
		var height = SceneManager._screenHeight;
		this._backgroundSprite = new TilingSprite();
		this._backgroundSprite.move(0, 0, width, height);
		this._backgroundSprite.bitmap = ImageManager.loadMenuBackground(Synrec.MC.MonsterBoxSceneBackground);
		this.addChild(this._backgroundSprite);
	}
}

Scene_MonsterBox.prototype.createTeamCommandWindow = function(){
	var x = 0;
	var y = 0;
	this._teamCommand = new Window_TeamCommand(x, y);
	this._teamCommand.setHandler('modify', this.modifyParty.bind(this));
	this._teamCommand.setHandler('end', this.closeScene.bind(this));
	this._teamCommand.setHandler('cancel', this.closeScene.bind(this));
	this.addWindow(this._teamCommand);
}

Scene_MonsterBox.prototype.createTeamWindow = function(){
	var x = 0;
	var y = 72;
	var width = SceneManager._screenWidth / 2;
	var height = SceneManager._screenHeight / 2;
	this._teamWindow = new Window_TeamWindow(x, y, width, height);
	this._teamWindow.setHandler('ok', this.onTeamWindowOk.bind(this));
	this._teamWindow.setHandler('cancel', this.onTeamWindowCancel.bind(this));
	this._teamWindow.refresh();
	this._teamWindow.deactivate();
	this._teamWindow.close();
	this.addWindow(this._teamWindow);
}

Scene_MonsterBox.prototype.createTeamReserveBox = function(){
	var x = 0;
	var y = 144;
	var width = SceneManager._screenWidth;
	var height = SceneManager._screenHeight - 144;
	this._reserveWindow = new Window_TeamReserve(x, y, width, height);
	this._reserveWindow.setHandler('ok', this.onReserveBoxOk.bind(this));
	this._reserveWindow.setHandler('cancel', this.onReserveBoxCancel.bind(this));
	this._reserveWindow.deactivate();
	this.addWindow(this._reserveWindow);
}

Scene_MonsterBox.prototype.createReserveChoiceWindow = function(){
	var x = SceneManager._screenWidth / 2;
	var y = 72
	var width = SceneManager._screenWidth / 2;
	var height = 72;
	this._boxChoice = new Window_BoxChoice(x, y, width, height);
	this._boxChoice.setHandler('ok', this.startModify.bind(this));
	this._boxChoice.setHandler('cancel', this.cancelModifyParty.bind(this));
	this.addWindow(this._boxChoice);
}

Scene_MonsterBox.prototype.openSingleReserve = function(){
	this._teamCommand.deactivate();
	this._teamCommand.deselect();
	this._boxChoice.hide();
	this._boxChoice._boxNumber = $gameSystem._reservePartyBox;
	var boxNumber = this._boxChoice._boxNumber;
	this._boxChoice.deactivate();
	this._reserveWindow.move(0, 72, SceneManager._screenWidth, SceneManager._screenHeight - 72);
	this._reserveWindow.getData($gameParty._reserveActors[boxNumber], boxNumber);
	this._reserveWindow.activate();
	this._reserveWindow.refresh();
}

Scene_MonsterBox.prototype.modifyParty = function(){
	this._teamCommand.deactivate();
	this._boxChoice.activate();
	this._boxChoice.select(0);
}

Scene_MonsterBox.prototype.cancelModifyParty = function(){
	this._teamCommand.activate();
	this._teamCommand.select(0);
	this._boxChoice.deactivate();
}

Scene_MonsterBox.prototype.startModify = function(){
	this._teamCommand.deactivate();
	this._boxChoice.deactivate();
	this._teamCommand.deselect();
	this._boxChoice.deselect();
	var boxNumber = this._boxChoice._boxNumber;
	this._reserveWindow.getData($gameParty._reserveActors[boxNumber], boxNumber);
	this._reserveWindow.refresh();
	this._reserveWindow.activate();
	this._reserveWindow.select(0);
}

Scene_MonsterBox.prototype.onTeamWindowOk = function(){
	var partyMember = this._teamWindow.index();
	var actor = this._teamWindow.currentItem();
	var reserveActor = this._reserveWindow.currentItem();
	if(actor && !reserveActor){
		if(this._teamWindow.isReserveable(actor._actorId)){
			var boxNumber = this._boxChoice._boxNumber;
			var reserveMember = this._reserveWindow.index();
			$gameParty.swapActiveReserve(partyMember, boxNumber, reserveMember);
			this._reserveWindow.refresh();
			this._teamWindow.deselect();
			this._teamWindow.refresh();
			this._reserveWindow.activate();
			this._teamWindow.deactivate();
			this._teamWindow.close();
		}else{
			this._teamWindow.activate();
			SoundManager.playBuzzer();
		}
	}else if(actor && reserveActor){
		if(this._teamWindow.isReserveable(actor._actorId)){
			var boxNumber = this._boxChoice._boxNumber;
			var reserveMember = this._reserveWindow.index();
			$gameParty.swapActiveReserve(partyMember, boxNumber, reserveMember);
			this._reserveWindow.refresh();
			this._teamWindow.deselect();
			this._teamWindow.refresh();
			this._reserveWindow.activate();
			this._teamWindow.deactivate();
		}else{
			this._teamWindow.activate();
			SoundManager.playBuzzer();
		}
	}else if(!actor && reserveActor){
		var boxNumber = this._boxChoice._boxNumber;
		var reserveMember = this._reserveWindow.index();
		$gameParty.swapActiveReserve(partyMember, boxNumber, reserveMember)
		this._reserveWindow.refresh();
		this._teamWindow.deselect();
		this._teamWindow.refresh();
		this._reserveWindow.activate();
		this._teamWindow.deactivate();
	}else{
		this._teamWindow.activate();
		SoundManager.playBuzzer();
	}
}

Scene_MonsterBox.prototype.onTeamWindowCancel = function(){
	this._reserveWindow.activate();
	this._teamWindow.deactivate();
	this._teamWindow.close();
}

Scene_MonsterBox.prototype.onReserveBoxOk = function(){
	this._reserveWindow.deactivate();
	this._teamWindow.activate();
	this._teamWindow.open();
}

Scene_MonsterBox.prototype.onReserveBoxCancel = function(){
	if(this._singleBoxMode){
		$gameSystem._reservePartyBox = undefined;
		SceneManager.pop();
	}
	this._boxChoice.activate();
	this._boxChoice.select(0);
	this._reserveWindow.deactivate();
	this._reserveWindow.deselect();
}

Scene_MonsterBox.prototype.closeScene = function(){
	SceneManager.pop();
}

function Scene_Evolution(){
	this.initialize.apply(this, arguments);
}

Scene_Evolution.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Evolution.prototype.constructor = Scene_Evolution;

Scene_Evolution.prototype.initialize = function(){
	Scene_MenuBase.prototype.initialize.call(this);
}

Scene_Evolution.prototype.update = function(){
	Scene_MenuBase.prototype.update.call(this);
	var index = this._partyWindow.currentItem();
	if(this._oldDataWindow.isOpen() && this._newDataWindow.isOpen() && index !== this._index){
		this._index = index;
		var actorParty = $gameParty._actors[this._index];
		if(actorParty){
			var gameChar = new Game_FauxPlayer(actorParty);
			this._actorWindow._actorSprite._character.setChar(gameChar);
			var actorId = actorParty._actorId;
			var actorData = $dataActors[actorId];
			var evolveActorId = eval(actorData.meta.evolutionActor);
			var evolveActorData = $dataActors[evolveActorId];
			this._oldDataWindow.getData(actorData, this._index);
			this._newDataWindow.getData(evolveActorData, this._index);
		}
	}
	if(this._actorWindow._actorSprite && this._evolvingActor){
		if(!this._actorWindow._actorSprite.isAnimationPlaying()){
			this._partyWindow.show();
			this._oldDataWindow.show();
			this._newDataWindow.show();
			this._oldDataWindow.refresh();
			this._newDataWindow.refresh();
			this._partyWindow.activate();
			this._evolvingActor = false;
		}else{
			this._partyWindow.hide();
			this._partyWindow.deactivate();
		}
	}
}

Scene_Evolution.prototype.create = function(){
	this.createBackground();
	this.createWindowLayer();
	this.createActor();
	this.createPartyMemberSelection();
	this.createOldActorWindow();
	this.createNewActorWindow();
}

Scene_Evolution.prototype.createBackground = function(){
	if(Synrec.MC.EvolutionSceneBackground){
		var width = SceneManager._screenWidth;
		var height = SceneManager._screenHeight;
		this._backgroundSprite = new TilingSprite();
		this._backgroundSprite.move(0, 0, width, height);
		this._backgroundSprite.bitmap = ImageManager.loadMenuBackground(Synrec.MC.EvolutionSceneBackground);
		this.addChild(this._backgroundSprite);
	}
}

Scene_Evolution.prototype.createActor = function(){
	var x = SceneManager._screenWidth / 2 - 100;
	var y = SceneManager._screenHeight / 2 - 100;
	var width = 200;
	var height = 200;
	var actorData = $gameParty._actors[1];
	var gameChar = new Game_FauxPlayer(actorData);
	this._actorWindow = new Window_Base(x, y, width, height);
	this._actorWindow._actorSprite = new Sprite_MenuActor(gameChar);
	this._actorWindow._actorSprite.x = 100;
	this._actorWindow._actorSprite.y = 100;
	this._actorWindow.addChild(this._actorWindow._actorSprite);
	this.addWindow(this._actorWindow);
}

Scene_Evolution.prototype.createPartyMemberSelection = function(){
	var x = (SceneManager._screenWidth / 3);
	var y = 0;
	var width = SceneManager._screenWidth / 3;
	var height = SceneManager._screenHeight;
	this._partyWindow = new Window_PartyMembers(x, y, width, height);
	this._partyWindow.setHandler('ok', this.evolveActor.bind(this));
	this._partyWindow.setHandler('cancel', this.popScene.bind(this));
	this._partyWindow.drawAllItems();
	this._partyWindow.activate();
	this.addWindow(this._partyWindow);
}

Scene_Evolution.prototype.createOldActorWindow = function(){
	var x = 0;
	var y = 0;
	var width = SceneManager._screenWidth / 3;
	var height = SceneManager._screenHeight;
	this._oldDataWindow = new Window_ActorData(x, y, width, height);
	this.addWindow(this._oldDataWindow);
}

Scene_Evolution.prototype.createNewActorWindow = function(){
	var x = (SceneManager._screenWidth / 3) * 2;
	var y = 0;
	var width = SceneManager._screenWidth / 3;
	var height = SceneManager._screenHeight;
	this._newDataWindow = new Window_ActorData(x, y, width, height);
	this.addWindow(this._newDataWindow);
}

Scene_Evolution.prototype.evolveActor = function(){
	var index = this._partyWindow.currentItem();
	var actor = $gameParty._actors[index];
	if(actor.evolveReq(actor._level)){
		this._partyWindow.hide();
		this._oldDataWindow.hide();
		this._newDataWindow.hide();
		this._evolvingActor = true;
		$gameParty._actors[index].evolve(actor._level);
		this._actorWindow._actorSprite._character.setChar(actor);
		this._actorWindow._actorSprite.startAnimation($dataAnimations[Synrec.MC.EvolveAnimId]);
		this._partyWindow.refresh();
		var actorDataIndex = $gameParty._actors[index]._actorId;
		this._oldDataWindow.getData($dataActors[actorDataIndex], index);
		this._oldDataWindow.refresh();
		this._newDataWindow.refresh();
	}else{
		SoundManager.playBuzzer();
		this._partyWindow.activate();
	}
}