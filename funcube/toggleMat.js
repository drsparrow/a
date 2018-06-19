pc.script.create('toggleMat', function (app) {

   
    var ToggleMat = function (entity) {
        this.entity = entity;
        colors=['white','blue','red','yellow','green','orange'];
        this.centerMats=[];
        this.cornerMats=[];
        this.edgeMats=[];
        this.edgeNames=[];
        this.cornerNames=[];
        for(i=0;i<colors.length;i++){
            cornerA=colors[i]+"_corner"; egdeA=colors[i]+"_edge"; edgeName=colors[i]+'E'; cornerName=colors[i]+'C';
            this.centerMats.push( app.assets.find(colors[i], pc.asset.ASSET_MATERIAL) );
            this.cornerMats.push( app.assets.find(cornerA, pc.asset.ASSET_MATERIAL) );
            this.edgeMats.push( app.assets.find(egdeA, pc.asset.ASSET_MATERIAL) );
            this.edgeNames.push( edgeName );
            this.cornerNames.push( cornerName );
        }
        this.rc=this.entity.findByName("Rubik's Cube");
        this.facesOn=false;
        this.cm=this.entity.findByName("CM");
        this.faces=this.cm.findByName("Faces");
    };

    ToggleMat.prototype = {
        
        initialize: function () {
            app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
        },
        
        onKeyDown: function (event) {
            event.event.preventDefault();
            if (app.keyboard.wasPressed(pc.KEY_SPACE)) {
                
                this.facesOn=!this.facesOn;
                if(this.facesOn) this.faces.translateLocal(0, 1000, 0); //move out of frame. find quick way to make invisible w/o disabling
                else this.faces.translateLocal(0, -1000, 0);
                this.cubies=this.rc.getChildren();
                for(i=0;i<this.cubies.length;i++){
                    this.cubie=this.cubies[i];
                    if(this.cubie!==null){
                        this.facets=this.cubie.getChildren();
                        for(j=0;j<this.facets.length-1;j++){
                            this.facet=this.facets[j];
                            
                            if(this.facesOn){
                                for(k=0;k<6;k++){
                                    if( this.facet.name==this.edgeNames[k] || this.facet.name==this.cornerNames[k]){
                                        this.facet.model.materialAsset=this.centerMats[k];
                                   }  
                                }
                            }
                            else{
                                for(k=0;k<6;k++){
                                    if( this.facet.name==this.cornerNames[k] ){
                                        this.facet.model.materialAsset=this.cornerMats[k];
                                    }
                                    else if( this.facet.name==this.edgeNames[k]){
                                        this.facet.model.materialAsset=this.edgeMats[k];
                                    }
                                }
                                
                            }
                          
                        }                  
                    }
                }
            }
           
        }
    };


    return ToggleMat;
});