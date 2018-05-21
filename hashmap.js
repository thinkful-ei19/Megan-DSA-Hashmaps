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
            this.resize(this._capacity*HashMap.SIZE_RATIO);
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