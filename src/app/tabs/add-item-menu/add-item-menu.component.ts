import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-item-menu',
  templateUrl: './add-item-menu.component.html',
  styleUrls: ['./add-item-menu.component.scss'],
})
export class AddItemMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  valueChange(val){
    console.log(val);
  }

}
