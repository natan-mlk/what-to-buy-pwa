import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseCommunicationService } from 'src/app/services/database-communication.service';

@Component({
  selector: 'app-natan',
  templateUrl: './natan.component.html',
  styleUrls: ['./natan.component.scss'],
})
export class NatanComponent implements OnInit {

  selectedListOwner = '';

  constructor(
    private databaseService: DatabaseCommunicationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.selectedListOwner = (this.router.url).substring(1);
    console.log('selectedListOwner: ', this.selectedListOwner);
    this.databaseService.getShoppingList(this.selectedListOwner).subscribe(
      list => {
        console.log('shopping list:  ', list);
      }
    );
  }

}
