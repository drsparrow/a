pc.script.create('updateLoc2', function (app) {
    
    var UpdateLoc2 = function (entity) {
        this.speed=500; this.lastSpeed=500;
        this.instant=false;
        this.entity = entity;
        this.cubie=null;
        this.curCenter=null;
        this.curCorners;
        this.curEdges;
        this.plane;
        this.dir;
        this.rate=0;
        this.totalR=0;
        this.camRight=false;
        this.camLeft=false;
        this.camera=entity.findByName('CM');
        this.cornerInds;
        this.edgeInds;
        this.updatingInds=false;
        this.testCubie=entity.findByName('test_cubie');
        this.wbo=entity.findByName('white_blue_orange');
        this.wb =entity.findByName('white_blue');
        this.wbr=entity.findByName('white_blue_red');
        this.wo =entity.findByName('white_orange');
        this.wc =entity.findByName('white_center');
        this.wr =entity.findByName('white_red');
        this.wgo=entity.findByName('white_green_orange');
        this.wg =entity.findByName('white_green');
        this.wgr=entity.findByName('white_green_red');
        
        this.bo= entity.findByName('blue_orange');
        this.bc= entity.findByName('blue_center');
        this.br= entity.findByName('blue_red');
        this.oc= entity.findByName('orange_center');
        this.S = entity.findByName('Sphere');
        this.rc= entity.findByName('red_center');
        this.go= entity.findByName('green_orange');
        this.gc= entity.findByName('green_center');
        this.gr= entity.findByName('green_red');
        
        this.ybo=entity.findByName('yellow_blue_orange');
        this.yb =entity.findByName('yellow_blue');
        this.ybr=entity.findByName('yellow_blue_red');
        this.yo =entity.findByName('yellow_orange');
        this.yc =entity.findByName('yellow_center');
        this.yr =entity.findByName('yellow_red');
        this.ygo=entity.findByName('yellow_green_orange');
        this.yg =entity.findByName('yellow_green');
        this.ygr=entity.findByName('yellow_green_red');
        this.curCorners = [null,null,null,null,null,null,null,null,null];
        this.curEdges = [null,null,null,null,null,null,null,null,null];
        this.cubies =   [
                            [[ this.wbo, this.wb, this.wbr ],
                             [ this.wo,  this.wc, this.wr  ],
                             [ this.wgo, this.wg, this.wgr ]],
                             
                            [[ this.bo, this.bc, this.br ],
                             [ this.oc, this.S,  this.rc  ],
                             [ this.go, this.gc, this.gr ]],
                            
                            [[ this.ybo,this.yb, this.ybr ],
                             [ this.yo, this.yc, this.yr  ],
                             [ this.ygo,this.yg, this.ygr ]]
                                                                  ];
        
        
    };
    
  
    UpdateLoc2.prototype = {
        
        initialize: function () {
            this.cubies=this.cubies;
            this.turning=false;
        },

        
        update: function (dt) {
            
            if (app.keyboard.wasPressed(48)){ this.instant=!this.instant } 
            for(i=1;i<9;i++){ 
                    if (app.keyboard.wasPressed(i+48)){ this.lastSpeed=i*75-35; }
                }
                if (app.keyboard.wasPressed(57)){ this.lastSpeed=1500 } //9, very fast
            if(!this.instant){
                this.speed=this.lastSpeed;
            }
            else{ this.speed=11111 }
            
            
            if (!this.turning && (app.keyboard.wasPressed(pc.KEY_A) || app.keyboard.wasPressed(pc.KEY_S)) ){
                //a or s for white side
                par=1; //graphical parity +- direction 
                this.plane=0;//x plane
                
                this.cornerInds=[[0,0,0],[0,0,2],[0,2,2],[0,2,0]];
                this.edgeInds = [[0,0,1],[0,1,2],[0,2,1],[0,1,0]];
                this.curCenter=this.cubies[0][1][1];
                
                this.updatingInds=true;
                if (app.keyboard.wasPressed(pc.KEY_A)){ dir=1 }
                else{ dir=-1 }
                
            }
            
            if (!this.turning && (app.keyboard.wasPressed(pc.KEY_D) || app.keyboard.wasPressed(pc.KEY_F)) ){
                //d or f for yellow side
                par=-1;
                this.plane=0;//x plane
                
                this.cornerInds=[[2,0,2],[2,0,0],[2,2,0],[2,2,2]];
                this.edgeInds = [[2,1,2],[2,0,1],[2,1,0],[2,2,1]];
                this.curCenter=this.cubies[2][1][1];
                this.updatingInds=true;
                
                if (app.keyboard.wasPressed(pc.KEY_D)){ dir=1 }
                else{ dir=-1 } 
                
            }
            
            if (!this.turning && (app.keyboard.wasPressed(pc.KEY_Q) || app.keyboard.wasPressed(pc.KEY_W)) ){
                //q or w for blue side
                par=1;
                this.plane=1;//y plane
                
                this.cornerInds=[[0,0,0],[2,0,0],[2,0,2],[0,0,2]];
                this.edgeInds = [[0,0,1],[1,0,0],[2,0,1],[1,0,2]];
                this.curCenter=this.cubies[1][0][1];
                this.updatingInds=true;
                
                if (app.keyboard.wasPressed(pc.KEY_Q)){ dir=1 }
                else{ dir=-1 } 
               
            }
            
            if (!this.turning && (app.keyboard.wasPressed(pc.KEY_E) || app.keyboard.wasPressed(pc.KEY_R)) ){
                //e or r for green side
                par=-1;
                this.plane=1;//y plane
                
                this.cornerInds=[[0,2,0],[0,2,2],[2,2,2],[2,2,0]];
                this.edgeInds =[[0,2,1],[1,2,2],[2,2,1],[1,2,0]];
                this.curCenter=this.cubies[1][2][1];
                this.updatingInds=true;
                
                if (app.keyboard.wasPressed(pc.KEY_E)){ dir=1 }
                else{ dir=-1 }   
              
            }
            
            if (!this.turning && (app.keyboard.wasPressed(pc.KEY_Z) || app.keyboard.wasPressed(pc.KEY_X)) ){
                //c or v for orange side
                par=1;
                this.plane=2;//z plane
                
                this.cornerInds=[[0,0,0],[0,2,0],[2,2,0],[2,0,0]];
                this.edgeInds = [[0,1,0],[1,2,0],[2,1,0],[1,0,0]];
                this.curCenter=this.cubies[1][1][0];
                this.updatingInds=true;
                
                if (app.keyboard.wasPressed(pc.KEY_Z)){ dir=1 }
                else{ dir=-1 }   
                
            }
            
            if (!this.turning && (app.keyboard.wasPressed(pc.KEY_C) || app.keyboard.wasPressed(pc.KEY_V)) ){
                //z or x for red side
                par=-1;
                this.plane=2;//z plane
                
                this.cornerInds=[[0,0,2],[2,0,2],[2,2,2],[0,2,2]];
                this.edgeInds = [[0,1,2],[1,0,2],[2,1,2],[1,2,2]];
                this.curCenter=this.cubies[1][1][2];
                this.updatingInds=true;
                
                if (app.keyboard.wasPressed(pc.KEY_C)){ dir=1 }
                else{ dir=-1 }    
               
            }
            
            
            if(this.updatingInds){
                for(i=0;i<4;i++){
                    x=this.cornerInds[i][0];y=this.cornerInds[i][1]; z=this.cornerInds[i][2];
                    this.curCorners[i]=this.cubies[x][y][z];
                    x=this.edgeInds[i][0];y=this.edgeInds[i][1]; z=this.edgeInds[i][2];
                    this.curEdges[i]=this.cubies[x][y][z];
                }
                this.updatingInds=false;
                this.turning=true;
            }
            
            
            if (this.turning) { 
            
                this.rate = dt;   
                
                degrees=-par*dir*this.speed*this.rate;
                rotateGraphics(this.curCenter,this.curCorners,this.curEdges,degrees,this.plane);
                
                this.totalR+=this.speed*this.rate;
                
                if(this.totalR>90){
                  
                    rotateGraphics(this.curCenter,this.curCorners,this.curEdges,par*dir*(this.totalR-90),this.plane);
                   
                    for(i=0;i<4;i++){
                        x=this.cornerInds[i][0];y=this.cornerInds[i][1];z=this.cornerInds[i][2];
                        this.cubies[x][y][z]=this.curCorners[(4+i-dir)%4];
                        x=this.edgeInds[i][0];y=this.edgeInds[i][1];z=this.edgeInds[i][2];
                        this.cubies[x][y][z]=this.curEdges[(4+i-dir)%4];
                    }
                    
                    this.turning=false;
                    this.totalR=0;
                }
                
                
                 
            }
        }
    };
   
    rotateGraphics=function(center,corners,edges,degrees,plane){
        i=0;j=0;k=0;
        if (plane===0){
            i=degrees;
        }
        else if(plane==1){
            j=degrees;
        }
        else{
            k=degrees;
        }
        center.rotate(i,j,k);
        for(c=0;c<4;c++){
            corners[c].rotate(i,j,k);
            edges[c].rotate(i,j,k);
        }
        
    };
   
    

    return UpdateLoc2;
});