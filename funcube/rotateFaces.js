pc.script.create('rotateFaces', function (app) {

   
    var RotateFaces = function (entity) {
        this.entity = entity;
        this.speed=11;
        this.children=this.entity.getChildren();
        this.timer=0;
        this.redCorner = app.assets.find("red_corner", pc.asset.ASSET_MATERIAL);
        this.curSize=35;
    };

    RotateFaces.prototype = {
        
        initialize: function () {
            
        },
       
        update: function (dt) {
            
            for(i=1;i<10;i++){ 
                if (app.keyboard.wasPressed(i+48)){ this.speed=i*i+2; }
            }
            
            incr=this.speed*dt;
            this.entity.rotateLocal(0,incr,0);
            
            min=-85;max=15;change=2*incr;
            pos=this.entity.getLocalPosition();
            if(pos.y < max +1 ){ //still in frame
                if (app.keyboard.isPressed(pc.KEY_U)) {
                    if(pos.y+change<max) this.entity.translateLocal(0, change, 0);
                    else this.entity.setLocalPosition(0, max, 0);
                }
                else if(app.keyboard.isPressed(pc.KEY_J)) { console.log(pos.y);
                    if(pos.y-change>min) this.entity.translateLocal(0, -change, 0);
                    else this.entity.setLocalPosition(0, min, 0);
                }
            }
            
            minSize=15;maxSize=70;change=4*incr;
       
            if (app.keyboard.isPressed(pc.KEY_I)) {
                if(this.curSize+change<maxSize) this.curSize+=change;
                else this.curSize=maxSize;
            }
            else if(app.keyboard.isPressed(pc.KEY_K)) { 
                if(this.curSize-change>minSize) this.curSize-=change;
                else this.curSize=minSize;
                
            }
          
            
            this.timer+=dt;
            s=this.curSize+(this.curSize/6)*Math.sin(2*this.timer); //spin and scale each face
            for(i=0; i<this.children.length; i++){
                this.children[i].rotateLocal(0,3*incr,0);
                this.children[i].setLocalScale(this.curSize, 0.1, this.curSize);

            }
        },
        
    };

    return RotateFaces;
});