class Case{
    constructor(dataArray){
        this.i = dataArray[1]
        this.j = dataArray[2]
    }
    canAcceptPlayer(){}
    toString(){}
    }
    class Mountain extends Case{
        canAcceptPlayer(){return false;}
        toString(){ return 'M - '+this.i+' - '+this.j;}
        }

        
    class Treasure extends Case{
        canAcceptPlayer(){return false;}
        toString(){ return 'M - '+this.i+' - '+this.j;}
        }

        