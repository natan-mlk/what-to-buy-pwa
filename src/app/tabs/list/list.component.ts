import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@angular/router';
import { ActionSheetController, PopoverController } from '@ionic/angular';
import { DatabaseCommunicationService } from 'src/app/services/database-communication.service';
import { AddItemMenuComponent } from '../add-item-menu/add-item-menu.component';
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
  selectedListOwner = '';

  constructor(
    public popoverController: PopoverController,
    public actionSheetController: ActionSheetController,
    private router: Router,
    private databaseService: DatabaseCommunicationService,
  ) {

    this.selectedListOwner = (this.router.url).substring(1);
    this.databaseService.getShoppingList(this.selectedListOwner).subscribe(
      (shoppingList: {toBuyList: ListModel[]}) => {
        console.log('shopping list:  ', shoppingList);
        this.localShoppingList = shoppingList.toBuyList;
        this.displayShoppingList = this.localShoppingList;
      }
    );
  }

  ngOnInit() { }

  // TODO wróć do teorii promisów, await

  async openImportanceMenu(event: any, selectedItem: ListModel) {
    const popover = await this.popoverController.create({
      component: PopoverMenuComponent,
      cssClass: 'importance-menu-popover',
      event,
      translucent: false,
      componentProps: {
        selectedItem,
        shoppingList : this.localShoppingList,
        selectedListOwner: this.selectedListOwner
      },
    });
    await popover.present();

    popover.onDidDismiss().then((result) => {
      console.log(result);
    });
  }

  addNewListItem(){
    this.openAddListItemPopover();
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
    );
  }

  segmentKindChanged(event){
    const sortingKey = event.detail.value;
    this.filterByKind(sortingKey);
  }

  private async openAddListItemPopover() {
    const popover = await this.popoverController.create({
      component: AddItemMenuComponent,
      cssClass: 'new-list-item-popover',
      event,
      translucent: false,
      componentProps: {
        shoppingList : this.localShoppingList,
        selectedListOwner: this.selectedListOwner
      },
    });
    await popover.present();

    popover.onDidDismiss().then((result) => {
      console.log(result);
    });
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
    );
  }

}
