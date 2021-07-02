import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DatabaseCommunicationService } from 'src/app/services/database-communication.service';
import { ListModel } from '../list/list.model';

@Component({
  selector: 'app-add-item-menu',
  templateUrl: './add-item-menu.component.html',
  styleUrls: ['./add-item-menu.component.scss'],
})
export class AddItemMenuComponent implements OnInit, OnDestroy {

  @Input() shoppingList: ListModel[];
  @Input() selectedListOwner: string;

  formValueSubscription: Subscription = Subscription.EMPTY;
  formStateSubscription: Subscription = Subscription.EMPTY;

  formGroup = new FormGroup({
    kind: new FormControl(),
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    priority: new FormControl(),
  });

  isAddButtonDisabled = true;
  chosenPriority = 'primary';
  constructor(
    private popoverController: PopoverController,
    private databaseService: DatabaseCommunicationService
  ) { }

  ngOnInit() {
    this.subscribeToFormValue();
    this.subscribeToFormStatus();
    this.setInitialFormValue();
  }

  addNewListItem(){
    this.shoppingList.unshift(this.formGroup.value);
    console.log('nwe list', this.shoppingList);
    this.databaseService.patchListItem(this.shoppingList, this.selectedListOwner).subscribe(
      value => {
        this.close();
      }
    );
  }

  ngOnDestroy(){
    this.formValueSubscription.unsubscribe();
    this.formStateSubscription.unsubscribe();
  }

  private setInitialFormValue(){
    this.formGroup.setValue({
      name: '',
      priority: 0,
      kind: 'food'
    });
  }

  private subscribeToFormValue(): void {
        this.formValueSubscription = this.formGroup.valueChanges.subscribe(
      (value: ListModel) => {
        this.setColorByPriority(value.priority);
      }
    );
  }

  private subscribeToFormStatus(): void {
    this.formStateSubscription = this.formGroup.statusChanges.subscribe(
      (state: string) => {
        if(state === 'INVALID') {
          this.isAddButtonDisabled = true;
        } else {
          this.isAddButtonDisabled = false;
        }
      }
    );
  }

  private close(): void {
    this.popoverController.dismiss(this.shoppingList);
  }

  private setColorByPriority(priority: number): void {
    switch(priority) {
      case 0:
        this.chosenPriority = 'primary';
      break;

      case 1:
        this.chosenPriority = 'warning';
      break;

      case 2:
        this.chosenPriority = 'danger';
      break;
    }
  }
}
