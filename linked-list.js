'use strict';

class _Node {
  constructor(value, next){
    this.value=value;
    this.next=next;
  }
}

class LinkedList {
  constructor(){
    this.head=null;

  }

  insertFirst(item){
    this.head= new _Node(item, this.head);
  }

  insertBefore(item, putBefore){
    if(this.head === null){
      return this.insertFirst(item);
    }

    if(this.head.value=== putBefore){
      return this.insertFirst(item);
    }
  
    let currNode= this.head;
    let previousNode = this.head;
  
    while((currNode !== null) && (currNode.value !== putBefore)){
      previousNode= currNode;
      console.log(previousNode);
      currNode = currNode.next;
      console.log(currNode);
    }
    if(currNode === null){
      console.log('Next item Not Found');
      return;
    }
    previousNode.next= new _Node(item, currNode);
  } 
  

  insertAfter(item, itemAfter){
    if(this.head === null){
      return this.insertFirst(item);
    }
  
    if(this.head.value=== itemAfter){
      return this.insertLast(item);
    }
    
    let currNode= this.head;
    let futureNode = this.head;
    
    while((currNode !== null) && (currNode.value !== itemAfter)){
      currNode = currNode.next;
      futureNode= currNode.next;
    }
    if(currNode === null){
      console.log('Next item Not Found');
      return;
    }
    currNode.next= new _Node(item, futureNode);
  }

  insertLast(item){
    if(this.head === null){
      this.insertFirst(item);
    }
    else{
      let tempNode= this.head;
      while(tempNode.next !== null){
        tempNode=tempNode.next;
      }
      tempNode.next= new _Node(item, null);
    }
  }
  //Note: position must === number like an array index
  insertAt(item, position){
    if(this.head === null || position ===0) {
      return this.insertFirst(item);
    }
 
    let currentNode = this.head;
    let prevNode = this.head;
    let ticks =0;
 
    while(ticks !== position){
      if (currentNode.next === null && ticks === position-1){
        return this.insertLast(item);
      }
      if (currentNode.next === null && ticks !== position-1){
        throw new Error ('position does not exist in list');
      }
      prevNode=currentNode;
      currentNode=currentNode.next;
      ticks++;
    }
    prevNode.next= new _Node(item, currentNode);
  }

  find(item){
    let currNode= this.head;
    if(!this.head){
      return null;
    }
    while(currNode.value !== item){
      if(currNode.next === null){
        return null;
      }
      else{
        currNode=currNode.next;
      }
    }
    return currNode;
  }


  remove(item){
    if(!this.head){
      return null;
    }
    if(this.head.value === item){
      this.head= this.head.next;
      return;
    }

    let currNode= this.head;
    let previousNode = this.head;

    while((currNode !== null) && (currNode.value !== item)){
      previousNode= currNode;
      currNode = currNode.next;
    }
    if(currNode === null){
      console.log('Item Not Found');
      return;
    }
    previousNode.next = currNode.next;
  } 


}

module.exports=LinkedList