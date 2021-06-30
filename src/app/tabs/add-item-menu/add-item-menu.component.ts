import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-item-menu',
  templateUrl: './add-item-menu.component.html',
  styleUrls: ['./add-item-menu.component.scss'],
})
export class AddItemMenuComponent implements OnInit, OnDestroy {

  formValueSubscription: Subscription = Subscription.EMPTY;
  formStateSubscription: Subscription = Subscription.EMPTY;

  formGroup = new FormGroup({
    itemName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    priority: new FormControl(),
    kind: new FormControl(),
  });

  isAddButtonDisabled = true;

  constructor() { }

  ngOnInit() {
    this.subscribeToFormValue();
    this.subscribeToFormStatus();
  }

  addNewListItem(){

  }

  ngOnDestroy(){
    this.formValueSubscription.unsubscribe();
    this.formStateSubscription.unsubscribe();
  }

  private subscribeToFormValue(): void {
        this.formValueSubscription = this.formGroup.valueChanges.subscribe(
      value => console.log(value)
    );
    this.formGroup.setValue({
      itemName: '',
      priority: 0,
      kind: 'food'
    });
  }

  private subscribeToFormStatus(): void {
    this.formStateSubscription = this.formGroup.statusChanges.subscribe(
      (state: string) => {
        console.log(state);
        if(state === 'INVALID') {
          this.isAddButtonDisabled = true;
        } else {
          this.isAddButtonDisabled = false;
        }
      }
    );
  }
}
