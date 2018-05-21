'use strict';

const LinkedList=require('./linked-list');


class HashMap2 {
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
    if (loadRatio > HashMap2.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap2.SIZE_RATIO);
    }
    const index = this._findSlot(key);
    
    if (!this._slots[index]) {
      this.length++;
    }
    // console.log('set', JSON.stringify(this._slots))
    this._slots[index]=new LinkedList;
    this._slots[index].insertFirst({
      key,
      value,
      deleted: false
    });
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
    const hash= HashMap2._hashString(key);
    const index= hash%this._capacity;
    let slot = this._slots[index];

    if(!slot){
      return this._slots[index]={key};
    }

    if(slot.key===key){
      return slot;
    }

    while(slot.next){
      slot=slot.next;
      if(slot.key===key)
        return slot;   
    }
    
    return slot.next={key};
  }

  _resize(size){
    const oldSlots= this._slots;
    this._capacity=size;
    this.length = 0;
    this._slots=[];

    for(const slot of oldSlots){
      //go through linked list and grab key/value pairs from there...
      if(slot!==undefined){
        let currentNode=slot.head;
  
        while(currentNode !== null){
          console.log('key', currentNode);
          this.set(currentNode, currentNode.value);
          currentNode = currentNode.next;
        }
            
      }
    }
  }

  static _hashString(string) {
    console.log(string, 'string');
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
    


}

HashMap2.MAX_LOAD_RATIO = 0.9;
HashMap2.SIZE_RATIO = 3;

function createLor(){
  const lor = new HashMap2();

  lor.set('Hobbit', 'Bilbo');
  lor.set('Hobbit', 'Frodo');
  lor.set('Wizard', 'Gandolf');
  lor.set('Human', 'Aragorn');
  lor.set('Elf', 'Legolas');
  lor.set('Maiar', 'The Necromancer');
  lor.set('Maiar', 'Sauron');
  lor.set('Ringbearer', 'Gollum');
  lor.set('LadyOfLight', 'Galadriel');
  lor.set('HalfElven', 'Arwen');
  lor.set('Ent', 'Treebeard');

  //    return lor.get('Maiar')

  return lor;

}

console.log(JSON.stringify(createLor()));