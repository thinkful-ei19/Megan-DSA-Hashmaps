'use strict';

class HashMap {
    constructor(initialCapacity=8) {
        this.length = 0;
        this._slots = [];
        this._capacity = initialCapacity;
        this._deleted=0;
    }

    get(key){
        const index = this._findSlot(key);
        if(this._slots[index]===undefined){
            throw new Error('Key Error');
        }
        return this._slots[index].value;
    }

    set(key, value) {
        const loadRatio = (this.length + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
          this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        const index = this._findSlot(key);
    
        if (!this._slots[index]) {
          this.length++;
        }
    
        this._slots[index] = {
          key,
          value,
          deleted: false
        };
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
        const start= hash%this._capacity;

        for(let i=start; i<start +this._capacity; i++){
            const index=i% this._capacity;
            const slot= this._slots[index];

            if(slot===undefined||slot.key==key && !slot.delete){
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
            if(slot!==undefined&& !slot.deleted){
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

console.log(createLor());

function palindromeChecker2(str){
    let palMap= new HashMap();
    let oddKeys= new HashMap();
    let middleLetterCount=0;
    let numOfOddLetters=0;

    for(let i=0; i<str.length; i++){
        const index = palMap._findSlot(str[i]);

         if(!palMap._slots[index]){
             palMap.set(str[i], 1);
         }
         else{
             let value = palMap.get(str[i]);
             palMap.set(str[i], value+1)
         }
    }

    for(let i=0; i<str.length; i++){
        const value= palMap.get(str[i])

        if (value%2 === 0){
            continue;
        }
        else{
            oddKeys.set(str[i], value)
        }
    }


    if(oddKeys.length<2){
        return true;
    }
    else{
        return false;
    }
}
console.log(palindromeChecker2('eracecare'));
console.log(palindromeChecker2('racecar'));
console.log(palindromeChecker2('north'));