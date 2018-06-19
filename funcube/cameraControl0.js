pc.script.create('cameraControl0', function (app) {

    var CameraControl0 = function (entity) {
        this.entity = entity;
        this.speed=55;
        this.cam=entity.findByName('Camera').camera;
    };

    CameraControl0.prototype = {

        initialize: function () {
        },

        update: function (dt) {
            for(i=1;i<10;i++){
                if (app.keyboard.wasPressed(i+48)){ this.speed=i*i*2; }
            }
            incr=this.speed*dt;
            if (app.keyboard.isPressed(pc.KEY_LEFT)) {
                this.entity.rotate(0,incr,-incr);
            }
            else if(app.keyboard.isPressed(pc.KEY_RIGHT)) {
                this.entity.rotate(0,-incr,incr);
            }

            if(app.keyboard.isPressed(pc.KEY_DOWN) || app.keyboard.isPressed(95)) {
                if(this.cam.fov>10) this.cam.fov-=incr;
            }
            else if(app.keyboard.isPressed(pc.KEY_UP) || app.keyboard.isPressed(61)) {
                if(this.cam.fov<80)this.cam.fov+=incr;
            }


        },

    };

    return CameraControl0;
});
