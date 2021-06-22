import { Component, Inject, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
// import { SHOPPING_LIST } from 'src/assets/database-mockup';
import { PopoverMenuComponent } from '../popover-menu/popover-menu.component';
import { ListModel } from './list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  localShoppingList: ListModel[];
  displayShoppingList: ListModel[];

  constructor(
    public popoverController: PopoverController,
    @Inject('SHOPPING_LIST') readonly shoppingList: ListModel[] // NOTE dobra praktyka - zewnętrzne zależności wkładać za pomocą @Inject (dependency injection)
  ) { 
    this.localShoppingList = shoppingList;
    this.displayShoppingList = this.localShoppingList;
  }

  ngOnInit() { }

  // TODO wróć do teorii promisów, await
 
  async presentPopover(event: any, selectedItem: ListModel) {
    const popover = await this.popoverController.create({
      component: PopoverMenuComponent,
      cssClass: 'my-custom-class',
      event: event,
      translucent: false,
      componentProps: {
        selectedItem: selectedItem,
        shoppingList : this.localShoppingList
      },
    });
    await popover.present();

    popover.onDidDismiss().then((result) => {
      console.log(result);
    });
  }

  setColor(priority){
    switch(priority) {
      case 0:
        return 'primary';
      case 1:
        return 'warning';
      case 2:
        return 'danger';
    }
  }

  getIconName(kind) {
    switch(kind) {
      case 'cosmetics':
        return 'sparkles-outline';
      case 'food':
        return 'basket-outline';
      case 'other':
        return 'apps-outline';
    }
  }

  sortByImportance(){
    this.displayShoppingList.sort(
      (a, b) => b.priority - a.priority
    )
  }

  segmentKindChanged(event){
    const sortingKey = event.detail.value;
    this.filterByKind(sortingKey);
  }

  private filterByKind(sortingKey) {
    this.displayShoppingList = this.localShoppingList.filter(
      (arrayItem)=> {
        if(sortingKey === arrayItem.kind) {
          return arrayItem;
        } else if (sortingKey === 'all') {
          return arrayItem;
        }
      }
    )
  }

}
