//==============================================================================
//  Improved Mouse Input by Rehtinor
//  RiP_ImprovedMouseInput.js
//==============================================================================
/*:
 * @author Rehtinor
 * @plugindesc Improves mouse input by making elements highlight on mouse-over.
*/
//==============================================================================
 
(function() {
 
//==============================================================================
//  TouchInput
//==============================================================================
 
TouchInput._onMouseMove = function( event )
{
    var x = Graphics.pageToCanvasX( event.pageX );
    var y = Graphics.pageToCanvasY( event.pageY );
    this._onMove( x, y );
}
 
var Window_Selectable_update = Window_Selectable.prototype.update;
Window_Selectable.prototype.update = function()
{
    if ( this.isOpenAndActive() && TouchInput.isMoved() )
    {
        var _x = this.canvasToLocalX( TouchInput.x );
        var _y = this.canvasToLocalY( TouchInput.y );
        if ( _x > this.padding && _x <= this.width - this.padding )
        {
            if ( _y > this.padding && _y < this.height - this.padding )
            {
                this.onTouch( false );
            }
        }
    }
    Window_Selectable_update.call( this );
}
 
//==============================================================================
 
})();
 
//==============================================================================
//  End of File
//==============================================================================