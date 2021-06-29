import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-item-menu',
  templateUrl: './add-item-menu.component.html',
  styleUrls: ['./add-item-menu.component.scss'],
})
export class AddItemMenuComponent implements OnInit {

  formSubscription: Subscription = Subscription.EMPTY;

  formGroup = new FormGroup({
    itemName: new FormControl(),
    priority: new FormControl(),
    kind: new FormControl(),
  });

  isAddButtonDisabled: false;

  constructor() { }

  ngOnInit() {
    this.formSubscription = this.formGroup.valueChanges.subscribe(
      value => console.log(value)
    );
  }

  public addNewListItem(){

  }
}
