const Band = require("./band");

class Bands{


    constructor(){
        this.bands=[];
    }
    
    addBand(band = new Band){
        this.bands.push( band );
    }
    getBands(){
        return this.bands;
    }
    deleteBand( id = '' ){
        //retornamos todas las bandas que no tenga el id pasado por argumento
        this.bands = this.bands.filter(b => b.id !== id);
        return this.bands;
    }

    voteBand( id = '' ){
        
        this.bands=this.bands.map( band => {
           
            if ( band.id == id ) {
                band.votes++;
                return band;
            } else {
                return band;
            }

        });
    }
}

module.exports = Bands;