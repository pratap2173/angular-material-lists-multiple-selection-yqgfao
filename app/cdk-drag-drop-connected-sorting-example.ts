import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'cdk-drag-drop-connected-sorting-example',
  templateUrl: 'cdk-drag-drop-connected-sorting-example.html',
  styleUrls: ['cdk-drag-drop-connected-sorting-example.css'],
})
export class CdkDragDropConnectedSortingExample {
  stored:any=[];
  ctrlPress=false;
  isMultidragging=false;
  todo = [
    {
      name:'Get to work',
      selected:false
    },
    {
      name:'Pick up groceries',
      selected:false
    
    },
    {
     name:'Go home',
      selected:false
     },

    {name:'Fall asleep',
    selected:false
     }
  ];

  done = [
    {
      name:'Wash hair',
      selected:false
    },
    {
      name: 'Brush teeth',
      selected:false
    },
    {
      name:'Go home',
      selected:false
     },
    {
      name:'Check e-mail',
      selected:false
     },
    {
      name: 'Walk dog',
      selected:false
     }
    ];

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(this.stored.length > 0){
        event.previousContainer.data.slice(0).reverse().forEach(function(item,idx){
           if (item.selected) {
            event.previousContainer.data.splice(event.previousContainer.data.indexOf(item), 1);
          
            event.container.data.splice(event.currentIndex,0,item)
            event.container.data.forEach(function(d){
              d.isMultidragging=false;
              d.selected=false;
            })
           
           }
        });
       this.stored=[];

     }else{
      
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        
    }

      }

  }
  test(event){
       
    if(this.ctrlPress !==false && this.stored.length > 0){
        for(let item of event.source.dropContainer.data){
          if(item.selected){
           item.isMultidragging=true;
          }else {
            item.isMultidragging=false;
          }
        }
    }

  }
    onKeyDown(e,item,data){
      this.ctrlPress=e.ctrlKey;

     if (e.ctrlKey && this.stored.indexOf(item)==-1){
        item.selected=true;
        let idx=data.indexOf(item);
        item.selected=true;
        item.index=idx;
       
        this.stored.push(item)
        console.log(item)
     } 

  }

}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
