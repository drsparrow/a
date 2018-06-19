pc.script.create('ariBox', function (app) {
    var AriBox = function (entity) {
        this.entity = entity;
        this.curSize=10;
        this.timer=0; this.visible = true;
    };

    AriBox.prototype = {
        
        update: function (dt) {
            this.timer+=dt;
            s=this.curSize+(this.curSize/6)*Math.sin(2*this.timer);
            this.entity.rotateLocal(0,10*dt,0);
            this.entity.setLocalScale(s, s, s);
            if (app.keyboard.wasPressed(pc.KEY_SPACE)) {
                this.visible=!this.visible;
                if(this.visible) this.entity.translateLocal(0, 1000, 0);
                else this.entity.translateLocal(0, -1000, 0);
            }
            
        }
    };
    return AriBox;
});