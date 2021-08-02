import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { ListModel, TodoModel } from '../tabs/list/list.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseCommunicationService {

  constructor(
    private http: HttpClient,
    @Inject('DATABASE_ADDR') readonly databaseAddr: string
    // NOTE dobra praktyka - zewnętrzne zależności wkładać za pomocą @Inject (dependency injection)
  ) { }

    getShoppingList(listOwner: string): Observable<any>{
      return this.http.get(this.databaseAddr + '/' + listOwner + '.json');
    }

    getTodoList(): Observable<any> {
      return this.http.get(this.databaseAddr + '/todo.json');
    }

    patchListItem(shoppingList: ListModel[], listOwner: string){
      return this.http.patch(
        this.databaseAddr + '/' + listOwner + '.json',
        {
          toBuyList : shoppingList,
        }
      );
    }

    patchTodoListItem(todoList: TodoModel[]){
      return this.http.patch(
        this.databaseAddr + '/todo.json',
        {
          ...todoList,
        }
      );
    }
}
