'use strict';

class HashMap {
    constructor(initialCapacity=8) {
        this.length = 0;
        this._slots = [];
        this._capacity = initialCapacity;
    }

    get(key){
        const index = this._findSlot(key);
        if(this._slots[index]===undefined){
            throw new Error('Key Error');
        }
        return this._slots[index].value;
    }

    set(key, value){
        const loadRatio=(this.length+1)/this._capacity;
        if(loadRatio>HashMap.MAX_LOAD_RATIO){
            this._resize(this._capacity*HashMap.SIZE_RATIO);
        }
        const index = this._findSlot(key);
        this._slots[index]={
            key, value
        };
        this.length++
    }

    remove(key){
        const index=this._findSlot(key);
        const slot = this._slots[index];
        if(slot===undefined){
            throw new Error('Key Error');
        }
        slot.deleted=true;
        this.length--;
        this._deleted++;
    }

    _findSlot(key){
        const hash= HashMap._hashString(key);
        //can we use this here instead of HashMap.?
        const start= hash%this._capacity;

        for(let i=start; i<start +this._capacity; i++){
            const index=i% this._capacity;
            const slot= this._slots[index];

            if(slot===undefined||slot.key==key){
                return index;
            }
        }
    }

    _resize(size){
        const oldSlots= this._slots;
        this._capacity=size;
        this.length = 0;
        this._slots=[];

        for(const slot of oldSlots){
            if(slot!==undefined){
                this.set(slot.key, slot.value);
            }
        }
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i=0; i<string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i);
            hash = hash & hash;
        }
        return hash >>> 0;
    }
    


}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

function createLor(){
    const lor = new HashMap();

    lor.set("Hobbit", "Bilbo");
    lor.set("Hobbit", "Frodo");
    lor.set("Wizard", "Gandolf");
    lor.set("Human", "Aragorn");
    lor.set("Elf", "Legolas");
    lor.set("Maiar", "The Necromancer");
    lor.set("Maiar", "Sauron");
    lor.set("Ringbearer", "Gollum");
    lor.set("LadyOfLight", "Galadriel");
    lor.set("HalfElven", "Arwen");
    lor.set("Ent", "Treebeard");

//    return lor.get('Maiar')

return lor;

}

// console.log(createLor());

function palindromeChecker(str, permutation){
    if (str.length !== permutation.length){
        return false;
    }

    const strMap = new HashMap();
    const palMap = new HashMap();

    for(let i=0; i<str.length; i++){
        let count=0;
        strMap.set(str[i], count);

        for(let j=0; j<str.length; j++){
           if(str[i]===str[j]){
               let value = strMap.get(str[i]);
               strMap.set(str[i], value+1);
           }
        }   
    }

    for(let i=0; i<permutation.length; i++){
        let count=0;
        palMap.set(permutation[i], count);

        for(let j=0; j<permutation.length; j++){

           if(permutation[i]===permutation[j]){
               let value = palMap.get(permutation[i]);
               palMap.set(permutation[i], value+1);
           }
        }   
    }

    for(let i=0; i<str.length; i++){
        let strKey = str[i];
        let strValue= strMap.get(strKey);
       
        for(let j=0; j<permutation.length; j++){
           let palKey= permutation[j];
           let palValue = palMap.get(palKey);
           try{
               strMap.get(palKey)
            }
           catch(err){
               if(err.message==='Key Error'){
                   return false;
               }
           }

           if(strKey===palKey){
               if(strValue!==palValue){
                   return false;
               }
           }
          
        }   
    }


    return true;

}
console.log(palindromeChecker('racecar', 'carerace'));