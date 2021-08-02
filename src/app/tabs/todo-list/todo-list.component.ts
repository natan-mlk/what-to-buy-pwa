import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DatabaseCommunicationService } from 'src/app/services/database-communication.service';
import { TodoModel } from '../list/list.model';
import { TodoPopoverMenuComponent } from '../todo-popover-menu/todo-popover-menu.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {

  localTodoList: TodoModel[];
  displayTodoList: TodoModel[];

  constructor(
    public popoverController: PopoverController,
    private databaseService: DatabaseCommunicationService,
  ) {
    this.getTodoListFromDatbase();
  }

  ngOnInit() {}

  addNewListItem(){
    this.openAddListItemPopover();
  }

  sortByImportance(){
    this.displayTodoList.sort(
      (a, b) => b.priority - a.priority
    );
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

  async openImportanceMenu(event: any, selectedItem: TodoModel) {
    const popover = await this.popoverController.create({
      component: TodoPopoverMenuComponent,
      cssClass: 'importance-menu-popover',
      event,
      translucent: false,
      componentProps: {
        selectedItem,
        todoList : this.localTodoList
      },
    });
    await popover.present();

    // TODO wydzielić metodę odświeżenia danych po jakimś czasie, ta z setTimeout
    popover.onDidDismiss().then((result) => {
      console.log('wynik zamknięcia okna', result);
      if (result.role !== 'backdrop'){
        setTimeout(()=>
        this.getTodoListFromDatbase(),
        1000
      );
      }
    });
  }

  private getTodoListFromDatbase(){
    this.databaseService.getTodoList().subscribe(
      (todoList: TodoModel[]) => {
        console.log('todoList list:  ', todoList);
        this.localTodoList = todoList;
        this.displayTodoList = this.localTodoList;
      }
    );
  }

  private async openAddListItemPopover() {
    // const popover = await this.popoverController.create({
    //   component: TodoPopoverMenuComponent,
    //   cssClass: 'new-list-item-popover',
    //   event,
    //   translucent: false,
    //   componentProps: {
    //     shoppingList : this.localTodoList
    //   },
    // });
    // await popover.present();

    // popover.onDidDismiss().then((result) => {
    //   if (result.role !== 'backdrop'){
    //     setTimeout(()=>
    //       this.getTodoListFromDatbase(),
    //       1000
    //     );
    //   }
    // });
  }

}
