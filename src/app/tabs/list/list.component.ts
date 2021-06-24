import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { DatabaseCommunicationService } from 'src/app/services/database-communication.service';
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
    private router: Router,
    public popoverController: PopoverController,
    @Inject('SHOPPING_LIST') readonly shoppingList: ListModel[],
    // NOTE dobra praktyka - zewnętrzne zależności wkładać za pomocą @Inject (dependency injection)
    private databaseService: DatabaseCommunicationService
  ) {
    this.localShoppingList = shoppingList;
    this.displayShoppingList = this.localShoppingList;
    this.selectedListOwner = (this.router.url).substring(1);
    console.log('selectedListOwner: ', this.selectedListOwner);
    this.databaseService.getShoppingList(this.selectedListOwner).subscribe(
      list => {
        console.log('shopping list:  ', list);
      }
    );
  }

  ngOnInit() {
    // this.databaseService.getShoppingList().subscribe(
    //   value => {
    //     console.log('database value', value);
    //   }
    // );
  }

  // TODO wróć do teorii promisów, await

  async presentPopover(event: any, selectedItem: ListModel) {
    const popover = await this.popoverController.create({
      component: PopoverMenuComponent,
      cssClass: 'my-custom-class',
      event,
      translucent: false,
      componentProps: {
        selectedItem,
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
    );
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
    );
  }

}
