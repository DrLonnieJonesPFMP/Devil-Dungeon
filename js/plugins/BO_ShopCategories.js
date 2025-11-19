//=============================================================================
//  Burning Orca Plugins
//  BO_ShopCategories.js
//  Version: 1.0
//=============================================================================
var Imported = Imported || {};
Imported.BO_ShopCategories = true;

var BurningOrca = BurningOrca || {};
var BO = BurningOrca;

BO.ShopCategories = BO.ShopCategories || {};

/*~struct~WindowLayoutAdjustment:
 * @param AdjustmentType
 * @type select
 * @option Never
 * @value Never
 * @option When Categories Used
 * @value When Categories Used
 * @option When Categories Not Used
 * @value When Categories Not Used
 * @desc Determines when the window affected by the categories 
 * window will be adjusted in size or position.
 * 
 * @param X
 * @type text
 * @desc The amount of pixel in x direction in which the window is moved.
 * Allows Javascript.The result value needs to be a number.
 * 
 * @param Y
 * @type text
 * @desc The amount of pixel in y direction in which the window is moved.
 * Allows Javascript. The result value needs to be a number.
 * 
 * @param Width
 * @type text
 * @desc Adjustment value for the width of the window in pixel.
 * Allows Javascript. The result value needs to be a number.
 * 
 * @param Height
 * @type text
 * @desc Adjustment value for the height of the window in pixel.
 * Allows Javascript as input. The result value needs to be a number.
 */

/*~struct~CommandWindowLayout:
 * @param X
 * @type text
 * @desc The x-Position of the window. Allows Javascript as input. 
 * The result value needs to be a number.
 * 
 * @param Y
 * @type text
 * @desc The y-Position of the window. Allows Javascript as input. 
 * The result value needs to be a number.
 * 
 * @param Width
 * @type text
 * @desc The width of the window. Allows Javascript as input. 
 * The result value needs to be a number.
 * 
 * @param Height
 * @type text
 * @desc The height of the window. Allows Javascript as input. 
 * Set this to auto if height shouldn't be changed.
 * 
 * @param Rows
 * @type number
 * @min 1
 * @desc The number of visible rows in the window.
 * Determines also the height of the window.
 * 
 * @param Columns
 * @type number
 * @min 1
 * @desc The number of columns the window will have.
 * Determines how many commands can be shown simultaniously next to each other. 
 */

/*~struct~CategoriesWindow:
 * @param Use
 * @type boolean
 * @on Yes
 * @off No
 * @desc Determines whether this window should be used in the shop scene.
 * 
 * @param Layout
 * @type struct<CommandWindowLayout>
 * @desc The position and layout of this window.
 * 
 * @param AffectedWindowAdjustment
 * @text Affected Window Adjustment
 * @type struct<WindowLayoutAdjustment>
 * @desc Determines how the layout of the window which will be affected
 * by this categories window will be adjusted.
 */

//=============================================================================
/*:
 * @plugindesc v1.0 Allows to customize how categories are shown in shop scene.
 * @author BurningOrca
 * 
 * @param BuyCategories
 * @text Buy Categories Window
 * @type struct<CategoriesWindow>
 * @desc The options for a categories window for the buy command.
 * @default {"Use":"false","Layout":"{\"X\":\"this._dummyWindow.x\",\"Y\":\"this._dummyWindow.y\",\"Width\":\"this._buyWindow.width\",\"Height\":\"auto\",\"Rows\":\"1\",\"Columns\":\"4\"}","AffectedWindowAdjustment":"{\"AdjustmentType\":\"When Categories Used\",\"X\":\"0\",\"Y\":\"this._buyCategoriesWindow.height\",\"Width\":\"0\",\"Height\":\"-this._buyCategoriesWindow.height\"}"}
 * 
 * @param SellCategories
 * @text Sell Categories Window
 * @type struct<CategoriesWindow>
 * @desc The options for the categories window for the sell command.
 * @default {"Use":"true","Layout":"{\"X\":\"this._dummyWindow.x\",\"Y\":\"this._dummyWindow.y\",\"Width\":\"Graphics.boxWidth\",\"Height\":\"auto\",\"Rows\":\"1\",\"Columns\":\"4\"}","AffectedWindowAdjustment":"{\"AdjustmentType\":\"When Categories Not Used\",\"X\":\"0\",\"Y\":\"-this._categoryWindow.height\",\"Width\":\"0\",\"Height\":\"this._categoryWindow.height\"}"}
 * 
 * @param SwitchCategory
 * @text Switch Category Name
 * @type text
 * @desc The name of the category for switches. Relevant if BO_Shops or BO_ShopsXL
 * is uses aswell.
 * @default Options
 * 
 * @param CurrencyCategory
 * @text Currency Category Name
 * @type text
 * @desc The name of the category for currencies. Relevant if BO_ShopsXL
 * is uses aswell.
 * @default Currencies
 * 
 * @help
 * This plugin allows you to customize how category windows are shown in shop scene.
 * By default it changes nothing.
 * This plugin cannot add new categories to those category windows. Please consider
 * using YEP_X_ItemMenuCategories for this.
 * 
 * The default plugin parameters are setup for the default shop scene.
 * If you use YEP_ShopMenuCore please go to the text version of these parameter and change them to the following:
 * Buy Categories Window:{"Use":"false","Layout":"{\"X\":\"this._commandWindow.x\",\"Y\":\"this._commandWindow.y\",\"Width\":\"this._commandWindow.width\",\"Height\":\"auto\",\"Rows\":\"4\",\"Columns\":\"1\"}","AffectedWindowAdjustment":"{\"AdjustmentType\":\"Never\",\"X\":\"0\",\"Y\":\"0\",\"Width\":\"0\",\"Height\":\"0\"}"}
 * Sell Categories Window:{"Use":"true","Layout":"{\"X\":\"this._commandWindow.x\",\"Y\":\"this._commandWindow.y\",\"Width\":\"this._commandWindow.width\",\"Height\":\"auto\",\"Rows\":\"4\",\"Columns\":\"1\"}","AffectedWindowAdjustment":"{\"AdjustmentType\":\"Never\",\"X\":\"0\",\"Y\":\"0\",\"Width\":\"0\",\"Height\":\"0\"}"}
 * 
 * If you happen to use NPCDialogueShop aswell, just change the Sell Categories Window to:
 * {"Use":"true","Layout":"{\"X\":\"this._dummyWindow.x\",\"Y\":\"this._dummyWindow.y\",\"Width\":\"this._dummyWindow.width\",\"Height\":\"auto\",\"Rows\":\"1\",\"Columns\":\"4\"}","AffectedWindowAdjustment":"{\"AdjustmentType\":\"When Categories Not Used\",\"X\":\"0\",\"Y\":\"-this._categoryWindow.height\",\"Width\":\"0\",\"Height\":\"this._categoryWindow.height\"}"}
 * 
 * and everything should work already.
 * 
 * I won't describe the plugin parameters here in detail. I just hope they are selfexplanatory enough.
 * 
 * Terms of use:
 * Free for commercial and non-commercial use.
 * Credit not required, but appreciated.
 * You may not repost this plugins. Please only link back to this thread.
 * Redistribution only allowed with games, Edits allowed.
 */

var ShopCategoryParams = PluginManager.parameters('BO_ShopCategories');
BO.ShopCategories.BuyCategories  = ShopCategoryParams['BuyCategories'];
BO.ShopCategories.BuyCategories  = JSON.parse(BO.ShopCategories.BuyCategories);
BO.ShopCategories.SellCategories = ShopCategoryParams['SellCategories'];
BO.ShopCategories.SellCategories = JSON.parse(BO.ShopCategories.SellCategories);
BO.ShopCategories.SwitchCategoryName = ShopCategoryParams['SwitchCategory'];
BO.ShopCategories.CurrencyCategoryName = ShopCategoryParams['CurrencyCategory'];

BO.ShopCategories.BuyCategories.Use                      = eval(BO.ShopCategories.BuyCategories.Use);
BO.ShopCategories.BuyCategories.Layout                   = JSON.parse(BO.ShopCategories.BuyCategories.Layout);
BO.ShopCategories.BuyCategories.AffectedWindowAdjustment = JSON.parse(BO.ShopCategories.BuyCategories.AffectedWindowAdjustment);

BO.ShopCategories.SellCategories.Use                      = eval(BO.ShopCategories.SellCategories.Use);
BO.ShopCategories.SellCategories.Layout                   = JSON.parse(BO.ShopCategories.SellCategories.Layout);
BO.ShopCategories.SellCategories.AffectedWindowAdjustment = JSON.parse(BO.ShopCategories.SellCategories.AffectedWindowAdjustment);

//----------------------- Scene_Shop ----------------------------------------------//
BO.ShopCategories.createShopScene = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function()
{
    BO.ShopCategories.createShopScene.call(this);
    if( BO.ShopCategories.BuyCategories.Use )
    {
        this.createBuyCategoriesWindow();
    }
}

BO.ShopCategories.createBuyWindow = Scene_Shop.prototype.createBuyWindow;
Scene_Shop.prototype.createBuyWindow = function()
{
    BO.ShopCategories.createBuyWindow.call(this);
    if( Imported.NPCDialogueShop ) // Cannot calculate with strings
    {
        this._buyWindow.x      = Number(this._buyWindow.x);
        this._buyWindow.y      = Number(this._buyWindow.y);
        this._buyWindow.width  = Number(this._buyWindow.width);
        this._buyWindow.height = Number(this._buyWindow.height);
    }

    if( !BO.ShopCategories.BuyCategories.Use
     && BO.ShopCategories.BuyCategories.AffectedWindowAdjustment.AdjustmentType == 'When Categories Not Used' )
    {
        this._buyWindow.x      += Number(eval(BO.ShopCategories.BuyCategories.AffectedWindowAdjustment.X));
        this._buyWindow.y      += Number(eval(BO.ShopCategories.BuyCategories.AffectedWindowAdjustment.Y));
        this._buyWindow.width  += Number(eval(BO.ShopCategories.BuyCategories.AffectedWindowAdjustment.Width));
        this._buyWindow.height += Number(eval(BO.ShopCategories.BuyCategories.AffectedWindowAdjustment.Height));
    }
}

BO.ShopCategories.createSellWindow = Scene_Shop.prototype.createSellWindow;
Scene_Shop.prototype.createSellWindow = function()
{
    BO.ShopCategories.createSellWindow.call(this);
    if( Imported.NPCDialogueShop ) // Cannot calculate with strings
    {
        this._categoryWindow.x      = Number(this._categoryWindow.x);
        this._categoryWindow.y      = Number(this._categoryWindow.y);
        this._categoryWindow.width  = Number(this._categoryWindow.width);
        this._categoryWindow.height = Number(this._categoryWindow.height);

        this._sellWindow.x      = Number(this._sellWindow.x);
        this._sellWindow.y      = Number(this._sellWindow.y);
        this._sellWindow.width  = Number(this._sellWindow.width);
        this._sellWindow.height = Number(this._sellWindow.height);
    }

    if( BO.ShopCategories.SellCategories.Use
     && BO.ShopCategories.SellCategories.AffectedWindowAdjustment.AdjustmentType == 'When Categories Used' )
    {
        this._sellWindow.x      += eval(BO.ShopCategories.SellCategories.AffectedWindowAdjustment.X);
        this._sellWindow.y      += eval(BO.ShopCategories.SellCategories.AffectedWindowAdjustment.Y);
        this._sellWindow.width  += eval(BO.ShopCategories.SellCategories.AffectedWindowAdjustment.Width);
        this._sellWindow.height += eval(BO.ShopCategories.SellCategories.AffectedWindowAdjustment.Height);
    }
    else if( !BO.ShopCategories.SellCategories.Use
           && BO.ShopCategories.SellCategories.AffectedWindowAdjustment.AdjustmentType == 'When Categories Not Used' )
    {
        this._sellWindow.x      += eval(BO.ShopCategories.SellCategories.AffectedWindowAdjustment.X);
        this._sellWindow.y      += eval(BO.ShopCategories.SellCategories.AffectedWindowAdjustment.Y);
        this._sellWindow.width  += eval(BO.ShopCategories.SellCategories.AffectedWindowAdjustment.Width);
        this._sellWindow.height += eval(BO.ShopCategories.SellCategories.AffectedWindowAdjustment.Height);
    }
}

BO.ShopCategories.createSellCategoriesWindow = Scene_Shop.prototype.createCategoryWindow;
Scene_Shop.prototype.createCategoryWindow = function()
{
    // We always create it we just never show it. It is easier to handle the adjustments to selling window when it still exist.
    if( !BO.ShopCategories.SellCategories.Use )
    {
        BO.ShopCategories.createSellCategoriesWindow.call(this);
        // Don't care about the layout
    }
    else
    {
        if( Imported.YEP_ShopMenuCore && !Imported.NPCDialogueShop ) // It's already a new Window, that I can customize, NPCDialogueShop would have one too, but I cannot access it.
        {
            BO.ShopCategories.createSellCategoriesWindow.call(this);
        }
        else
        {
            this._categoryWindow = new Window_SellShopCategory();
            this._categoryWindow.setHelpWindow(this._helpWindow);
            this._categoryWindow.y = this._dummyWindow.y;
            this._categoryWindow.hide();
            this._categoryWindow.deactivate();
            this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
            this._categoryWindow.setHandler('cancel', this.onCategoryCancel.bind(this));
            this.addWindow(this._categoryWindow);
        }
        
        this._categoryWindow.x      = eval(BO.ShopCategories.SellCategories.Layout.X);
        this._categoryWindow.y      = eval(BO.ShopCategories.SellCategories.Layout.Y);
        this._categoryWindow.width  = eval(BO.ShopCategories.SellCategories.Layout.Width);

        if( BO.ShopCategories.SellCategories.Layout.Height !== 'auto' )
        {
            this._categoryWindow.height = eval(BO.ShopCategories.SellCategories.Layout.Height);
        }
        this._categoryWindow.refresh();
    }
}

Scene_Shop.prototype.createBuyCategoriesWindow = function()
{
    this._buyCategoriesWindow = new Window_BuyShopCategory(this._goods);
    this._buyCategoriesWindow.setHelpWindow(this._helpWindow);
    this._buyCategoriesWindow.x      = eval(BO.ShopCategories.BuyCategories.Layout.X);
    this._buyCategoriesWindow.y      = eval(BO.ShopCategories.BuyCategories.Layout.Y);
    this._buyCategoriesWindow.width  = eval(BO.ShopCategories.BuyCategories.Layout.Width);

    if( BO.ShopCategories.BuyCategories.Layout.Height !== 'auto' )
    {
        this._buyCategoriesWindow.height = eval(BO.ShopCategories.BuyCategories.Layout.Height);
    }

    this._buyCategoriesWindow.hide();
    this._buyCategoriesWindow.refresh();
    this._buyCategoriesWindow.deactivate();
    this._buyCategoriesWindow.setHandler('ok',     this.onBuyCategoryOk.bind(this));
    this._buyCategoriesWindow.setHandler('cancel', this.onBuyCategoryCancel.bind(this));
    this._buyCategoriesWindow.setItemWindow(this._buyWindow);
    this.addWindow(this._buyCategoriesWindow);

    if( BO.ShopCategories.BuyCategories.Use
     && BO.ShopCategories.BuyCategories.AffectedWindowAdjustment.AdjustmentType == 'When Categories Used' )
    {
        this._buyWindow.x      += eval(BO.ShopCategories.BuyCategories.AffectedWindowAdjustment.X);
        this._buyWindow.y      += eval(BO.ShopCategories.BuyCategories.AffectedWindowAdjustment.Y);
        this._buyWindow.width  += eval(BO.ShopCategories.BuyCategories.AffectedWindowAdjustment.Width);
        this._buyWindow.height += eval(BO.ShopCategories.BuyCategories.AffectedWindowAdjustment.Height);
    }
}

Scene_Shop.prototype.onBuyCategoryOk = function() 
{
    this._buyWindow.select(0);
    this.activateBuyWindow();
};

Scene_Shop.prototype.onBuyCategoryCancel = function() 
{
    this._commandWindow.activate();
    this._dummyWindow.show();
    this._buyCategoriesWindow.hide();
    this._buyWindow.hide();
    this._statusWindow.setItem(null);
    this._helpWindow.clear();
    this._statusWindow.hide();
};

BO.ShopCategories.commandBuy = Scene_Shop.prototype.commandBuy;
Scene_Shop.prototype.commandBuy = function() 
{
    if( BO.ShopCategories.BuyCategories.Use )
    {
        this._dummyWindow.hide();
        this._buyCategoriesWindow.show();
        this._buyCategoriesWindow.activate();
        this._statusWindow.show();
        this._buyWindow.setMoney(this.money());
        this._buyWindow.show();
        this._buyWindow.deselect();
        this._buyWindow.refresh();
    }
    else
    {
        BO.ShopCategories.commandBuy.call(this);
    }
}

BO.ShopCategories.activateBuyWindow = Scene_Shop.prototype.activateBuyWindow;
Scene_Shop.prototype.activateBuyWindow = function() 
{
    if( BO.ShopCategories.BuyCategories.Use )
    {  
        this._buyCategoriesWindow.show();
        BO.ShopCategories.activateBuyWindow.call(this);
    }
    else
    {
        BO.ShopCategories.activateBuyWindow.call(this);
    }
}

if( BO.ShopCategories.BuyCategories.Use )
{
    BO.ShopCategories.onBuyOk = Scene_Shop.prototype.onBuyOk;
    Scene_Shop.prototype.onBuyOk = function() 
    {
        this._item = this._buyWindow.item();
        let hideWindow = true;

        if( $gameTemp.getActiveShop() )
        {
            if( Imported.BO_ShopsXL )
            {
                hideWindow = this._item.kind !== 'Switch' || $gameTemp.getActiveShop().getNumberBoughtOf('Switch', this._item.id) !== 1;
            }
            else
            {
                hideWindow = !this._item.isSwitch || $gameTemp.getActiveShop().getNumberBoughtOf(3, this._item.id) !== 1;
            }
        }

        this._buyCategoriesWindow.refresh();

        if( hideWindow )
        {
            this._buyCategoriesWindow.hide();
        }
        BO.ShopCategories.onBuyOk.call(this);
    }
}

BO.ShopCategories.onBuyCancel = Scene_Shop.prototype.onBuyCancel;
Scene_Shop.prototype.onBuyCancel = function() 
{
    if( BO.ShopCategories.BuyCategories.Use )
    {
         this._buyWindow.deselect();
         this._buyCategoriesWindow.refresh();
         this._buyCategoriesWindow.activate();
         this._statusWindow.setItem(null);
         this._helpWindow.clear();
    }
    else
    {
        BO.ShopCategories.onBuyCancel.call(this);
    }
}

BO.ShopCategories.commandSell = Scene_Shop.prototype.commandSell;
Scene_Shop.prototype.commandSell = function() 
{
    if( BO.ShopCategories.SellCategories.Use )
    {
        BO.ShopCategories.commandSell.call(this);
    }
    else
    {
        this._dummyWindow.hide();
        this.activateSellWindow();
        this._sellWindow.select(0);
    }
}

BO.ShopCategories.activateSellWindow = Scene_Shop.prototype.activateSellWindow;
Scene_Shop.prototype.activateSellWindow = function()
{
    if( BO.ShopCategories.SellCategories.Use )
    {
        BO.ShopCategories.activateSellWindow.call(this);
    }
    else
    {
        this._sellWindow.refresh();
        this._sellWindow.show();
        this._sellWindow.activate();
        this._statusWindow.hide();
    }
}


BO.ShopCategories.onSellCancel = Scene_Shop.prototype.onSellCancel;
Scene_Shop.prototype.onSellCancel = function() 
{
    if( BO.ShopCategories.SellCategories.Use )
    {
        BO.ShopCategories.onSellCancel.call(this);
    }
    else
    {
        this._sellWindow.deselect();
        this._statusWindow.setItem(null);
        this._helpWindow.clear();
        this.onCategoryCancel();
    }
}

//----------------------- Window_BuyShopCategory ----------------------------------------------//
function Window_BuyShopCategory() {
    this.initialize.apply(this, arguments);
}

Window_BuyShopCategory.prototype = Object.create(Window_ItemCategory.prototype);
Window_BuyShopCategory.prototype.constructor = Window_SellShopCategory;

Window_BuyShopCategory.prototype.initialize = function(goods)
{
    this._shopGoods = goods;
    Window_ItemCategory.prototype.initialize.call(this);
}

Window_BuyShopCategory.prototype.maxCols = function()
{
    return Number(BO.ShopCategories.BuyCategories.Layout.Columns);
}

Window_BuyShopCategory.prototype.numVisibleRows = function()
{
    return Number(BO.ShopCategories.BuyCategories.Layout.Rows);
}

Window_BuyShopCategory.prototype.makeCommandList = function()
{
    if( Imported.YEP_X_ItemCategories )
    {
        Window_ItemCategory.prototype.makeCommandList.call(this);
    }
    else
    {
        var data = ['items', 'weapons', 'armors', 'keyItems'];
        for( var i = 0; i < data.length; i++ )
        {
            this.addItemCategory(data[i]);
        }
    }

    if( Imported.BO_Shops || Imported.BO_ShopsXL )
    {
        this.addItemCategory('switch');
    }
    if( Imported.BO_ShopsXL )
    {
        this.addItemCategory('currency');
    }
}

Window_BuyShopCategory.prototype.addItemCategory = function(category)
{
    if( this.hasItemOfCategory(category) )
    {
        if( category.match(/switch/gi) )
        {
            this.addCommand(BO.ShopCategories.SwitchCategoryName, 'switch');
        }
        if( category.match(/currency/gi) )
        {
            this.addCommand(BO.ShopCategories.CurrencyCategoryName, 'currency');
        }
        else if( Imported.YEP_X_ItemCategories )
        {
            Window_ItemCategory.prototype.addItemCategory.call(this, category);
        }
        else
        {
            if( category.match(/KeyItems/gi) )
            {
                this.addCommand(TextManager.keyItem, 'keyItem');
            }
            else if( category.match(/Items/gi) )
            {
                this.addCommand(TextManager.item, 'item');
            }
            else if( category.match(/Weapons/gi) )
            {
                this.addCommand(TextManager.weapon, 'weapon');
            }
            else if( category.match(/Armors/gi) )
            {
                this.addCommand(TextManager.armor, 'armor');
            }
        }
    }
}

Window_BuyShopCategory.prototype.hasItemOfCategory = function(category)
{
    return this._shopGoods.filter(function(goods) {
            return this.isItemOfCategory(goods, category);            
        }.bind(this)).length > 0;
}

Window_BuyShopCategory.prototype.isItemOfCategory = function(goods, category)
{
    var item = null;

    if( Imported.BO_ShopsXL && $gameTemp.getActiveShop() !== null )
    {
        if( !eval(goods.AvailabilityCond) )
            return false;

        if( goods.kind == 'Switch' )
        {
            item = {"isSwitch":true};
        }
        else if( goods.kind == 'Currency' )
        {
            item = {"isCurrency":true};
        }
        else
        {
            item = goods.dataObject();
        }
    }
    else
    {
        switch( goods[0] )
        {
            case 0:
                item = $dataItems[goods[1]];
                break;
            case 1:
                item = $dataWeapons[goods[1]];
                break;
            case 2:
                item = $dataArmors[goods[1]];
                break;
            case 3:
                item = goods[6];
                break;
        }
    }
    if( !item )
    {
        return false;
    }
    else if( !!item.isSwitch )
    {
        return category.match(/Switch/gi);
    }
    else if( !!item.isCurrency )
    {
        return category.match(/Currency/gi);
    }
    else if( category.match(/Category:(.*)/gi) ) 
    {
        return item.itemCategory.contains(String(RegExp.$1));
    }
    else if( category.match(/WType:(\d+)/gi) ) 
    {
        return DataManager.isWeapon(item) && item.wtypeId === Number(RegExp.$1);
    }
    else if( category.match(/AType:(\d+)/gi) ) 
    {
        return DataManager.isArmor(item) && item.atypeId === Number(RegExp.$1);
    }
    else if( category.match(/EType:(\d+)/gi) ) 
    {
        return item.etypeId === Number(RegExp.$1);
    }
    else
    {
        switch( category.toUpperCase() )
        {
            case 'ALLITEMS':
                return DataManager.isItem(item);
            case 'REGULARITEMS':
            case 'ITEMS':
                return DataManager.isItem(item) && item.itypeId === 1;
            case 'KEYITEMS':
                return DataManager.isItem(item) && item.itypeId === 2;
            case 'HIDDENITEMA':
                return DataManager.isItem(item) && item.itypeId === 3;
            case 'HIDDENITEMB':
                return DataManager.isItem(item) && item.itypeId === 4;
            case 'WEAPONS':
                return DataManager.isWeapon(item);
            case 'ARMORS':
                return DataManager.isArmor(item);
            case 'CONSUMABLE':
                return DataManager.isItem(item) && item.consumable;
            case 'NONCONSUMABLE':
                return DataManager.isItem(item) && !item.consumable;
            case 'ALWAYSUSABLE':
                return DataManager.isItem(item) && [0].contains(item.occasion);
            case 'BATTLEUSABLE':
                return DataManager.isItem(item) && [0, 1].contains(item.occasion);
            case 'FIELDUSABLE':
                return DataManager.isItem(item) && [0, 2].contains(item.occasion);
            case 'NEVERUSABLE':
                return DataManager.isItem(item) && [3].contains(item.occasion);
            default:
                return false;
        }
    }
}

//----------------------- Window_SellShopCategory ----------------------------------------------//
function Window_SellShopCategory() {
    this.initialize.apply(this, arguments);
}

Window_SellShopCategory.prototype = Object.create(Window_ItemCategory.prototype);
Window_SellShopCategory.prototype.constructor = Window_SellShopCategory;

Window_SellShopCategory.prototype.initialize = function()
{
    Window_ItemCategory.prototype.initialize.call(this);
}

Window_SellShopCategory.prototype.maxCols = function()
{
    return Number(BO.ShopCategories.SellCategories.Layout.Columns);
}

Window_SellShopCategory.prototype.numVisibleRows = function()
{
    return Number(BO.ShopCategories.SellCategories.Layout.Rows);
}

//----------------------- Window_ShopCategory ----------------------------------------------//
if( Imported.YEP_ShopMenuCore )
{
    Window_ShopCategory.prototype.maxCols = function()
    {
        return Number(BO.ShopCategories.SellCategories.Layout.Columns);
    }

    Window_ShopCategory.prototype.numVisibleRows = function()
    {
        return Number(BO.ShopCategories.SellCategories.Layout.Rows);
    }
}

//----------------------- Window_ShopSell ----------------------------------------------//
BO.ShopCategories.isItemIncludedInSellWindow = Window_ShopSell.prototype.includes;
Window_ShopSell.prototype.includes = function(item)
{
    return !BO.ShopCategories.SellCategories.Use
        || BO.ShopCategories.isItemIncludedInSellWindow.call(this, item);
}

//----------------------- Window_ShopBuy ----------------------------------------------//
if( BO.ShopCategories.BuyCategories.Use )
{
    BO.ShopCategories.initializeBuyWindow = Window_ShopBuy.prototype.initialize;
    Window_ShopBuy.prototype.initialize = function(x, y, height, shopGoods)
    {
        this._category = 'none';
        this._allShopGoods = shopGoods;
        
        if( Imported.YEP_X_ItemCategories )
        {
            this._ext = 'none';
        }

        BO.ShopCategories.initializeBuyWindow.call(this, x, y, height, shopGoods);
    }

    Window_ShopBuy.prototype.setCategory = function(category)
    {
        if( this._category !== category ) 
        {
            this._category = category;
            this.refresh();
            this.resetScroll();
        }
    }

    if( Imported.YEP_X_ItemCategories )
    {
        Window_ShopBuy.prototype.setExt = function(ext)
        {
           if( this._ext !== ext ) 
           {
                this._ext = ext;
                this.refresh();
                this.resetScroll();
           }
        }
    }

    Window_ShopBuy.prototype.includes = Window_ItemList.prototype.includes;
    if( Imported.BO_Shops )
    {
        BO.ShopCategories.isItemIncludedInBuyWindow = Window_ShopBuy.prototype.includes;
        Window_ShopBuy.prototype.includes = function(item)
        {
            if( !!item.isSwitch )
            {
                return this._category === 'switch';
            }
            return BO.ShopCategories.isItemIncludedInBuyWindow.call(this, item);
        }
    }
    if( Imported.BO_ShopsXL )
    {
        BO.ShopCategories.isItemIncludedInBuyWindow = Window_ShopBuy.prototype.includes;
        Window_ShopBuy.prototype.includes = function(item)
        {
            if( $gameTemp.getActiveShop() !== null )
            {
                if( item.kind == 'Switch' )
                {
                    return this._category === 'switch';
                }
                if( item.kind == 'Currency' )
                {
                    return this._category === 'currency';
                }
                return BO.ShopCategories.isItemIncludedInBuyWindow.call(this, item.dataObject());
            }
            return BO.ShopCategories.isItemIncludedInBuyWindow.call(this, item);
        }
    }

    BO.ShopCategories.makeBuyItemList = Window_ShopBuy.prototype.makeItemList;
    Window_ShopBuy.prototype.makeItemList = function()
    {
        if( Imported.BO_ShopsXL && $gameTemp.getActiveShop() !== null )
        {
            this._shopGoods = this._allShopGoods.filter(function(goods) 
            {
                return this.includes(goods);
            }.bind(this));
        }
        else
        {
            this._shopGoods = this._allShopGoods.filter(function(goods) 
            {
                var item = null;
                switch( goods[0] ) 
                {
                case 0:
                    item = $dataItems[goods[1]];
                    break;
                case 1:
                    item = $dataWeapons[goods[1]];
                    break;
                case 2:
                    item = $dataArmors[goods[1]];
                    break;
                case 3: // Switch
                    item = goods[6];
                    break;
                }

                return this.includes(item);
            }.bind(this));
        }
        BO.ShopCategories.makeBuyItemList.call(this);
    }
}