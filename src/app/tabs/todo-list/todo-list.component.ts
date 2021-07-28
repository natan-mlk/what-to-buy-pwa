import { Component, OnInit } from '@angular/core';
import { DatabaseCommunicationService } from 'src/app/services/database-communication.service';
import { TodoModel } from '../list/list.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {

  localTodoList: TodoModel[];
  displayTodoList: TodoModel[];

  constructor(
    private databaseService: DatabaseCommunicationService,
  ) {
    this.getTodoListFromDatbase();
  }

  ngOnInit() {}

  addNewListItem(){

  }

  sortByImportance(){}

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

  openImportanceMenu(event, item){}

  private getTodoListFromDatbase(){
    this.databaseService.getTodoList().subscribe(
      (todoList: TodoModel[]) => {
        console.log('shopping list:  ', todoList);
        this.localTodoList = todoList;
        this.displayTodoList = this.localTodoList;
      }
    );
  }

}
