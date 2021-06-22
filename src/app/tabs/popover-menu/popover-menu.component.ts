import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ListModel } from '../list/list.model';

@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
})
export class PopoverMenuComponent implements OnInit {

  selectedItem: ListModel;
  shoppingList: ListModel[];

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}

  changePriority(priority: number){
    // jak usunąć z listy? Nie mam do dyspozycji ID
    this.close(priority);
  }

  private close(priority: number) {
    this.popoverController.dismiss(this.shoppingList, 'some role');
  }

}
