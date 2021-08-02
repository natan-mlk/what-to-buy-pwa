import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DatabaseCommunicationService } from 'src/app/services/database-communication.service';
import { TodoModel } from '../list/list.model';

@Component({
  selector: 'app-todo-popover-menu',
  templateUrl: './todo-popover-menu.component.html',
  styleUrls: ['./todo-popover-menu.component.scss'],
})
export class TodoPopoverMenuComponent implements OnInit {

  @Input() selectedItem: TodoModel;
  @Input() todoList: TodoModel[];

  constructor(
    private popoverController: PopoverController,
    private databaseService: DatabaseCommunicationService
  ) { }

  ngOnInit() {}

  changePriority(priority: number){
    const indexOfSelectedElement = this.todoList.findIndex(
      (listElement: TodoModel) => listElement.task === this.selectedItem.task);
    this.todoList[indexOfSelectedElement].priority = priority;

    this.databaseService.patchTodoListItem(this.todoList).subscribe(
      value => {console.log('value form subsc', value);
        this.close();
        // TODO add handling error?
      }
    );
  }

  deleteListItem(){
    const indexOfSelectedElement = this.todoList.findIndex(
      (listElement: TodoModel) => listElement.task === this.selectedItem.task);
    this.todoList.splice(indexOfSelectedElement, 1);

    this.databaseService.patchTodoListItem(this.todoList).subscribe(
      value => {console.log('value form subsc', value);
        this.close();
      }
    );
  }


  private close() {
    this.popoverController.dismiss(this.todoList, 'some role');
  }
}
