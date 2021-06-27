import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DatabaseCommunicationService } from 'src/app/services/database-communication.service';
import { ListModel } from '../list/list.model';

@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
})
export class PopoverMenuComponent implements OnInit {

  // selectedItem: ListModel;
  // shoppingList: ListModel[];
  @Input() selectedItem: ListModel;
  @Input() shoppingList: ListModel[];
  @Input() selectedListOwner: string;

  constructor(
    private popoverController: PopoverController,
    private databaseService: DatabaseCommunicationService
  ) { }

  ngOnInit() {
    console.log('selectedItem', this.selectedItem );
    console.log('shoppingList', this.shoppingList );
  }

  changePriority(priority: number){
    const indexOfSelectedElement = this.shoppingList.findIndex(
      (listElement: ListModel) => listElement.name === this.selectedItem.name);
    this.shoppingList[indexOfSelectedElement].priority = priority;

    this.databaseService.patchListItem(this.shoppingList, this.selectedListOwner).subscribe(
      value => {console.log('value form subsc', value);
        this.close();
        // TODO add handling error?
      }
    );
  }

  deleteListItem(){
    const indexOfSelectedElement = this.shoppingList.findIndex(
      (listElement: ListModel) => listElement.name === this.selectedItem.name);
    this.shoppingList.splice(indexOfSelectedElement, 1);

    this.databaseService.patchListItem(this.shoppingList, this.selectedListOwner).subscribe(
      value => {console.log('value form subsc', value);
        this.close();
      }
    );
  }

  private close() {
    this.popoverController.dismiss(this.shoppingList, 'some role');
  }

}
