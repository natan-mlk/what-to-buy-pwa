import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseCommunicationService {

  constructor(
    private http: HttpClient,
    @Inject('DATABASE_ADDR') readonly shoppingList: string
  ) { }

    getShoppingList(): Observable<any>{
      return this.http.get(this.shoppingList + '.json');
    }

    patchCharacterData(selectedCharacter: string, characterData: CharacterData, newMoneyAmount: number){
    //   return this.http.patch(
    //     databaseAddrCharacters + selectedCharacter + '/.json',
    //     {
    //       "money" : newMoneyAmount,
    //       "history": characterData.history
    //   }
    //   )
    }
}
