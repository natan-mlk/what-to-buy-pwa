import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { ListComponent } from './list/list.component';
import { PopoverMenuComponent } from './popover-menu/popover-menu.component';
import { AddItemMenuComponent } from './add-item-menu/add-item-menu.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule // NOTE rective forms had to be imported in this module because importing on app.module didn't work.
  ],
  declarations: [
    TabsPage,
    ListComponent,
    PopoverMenuComponent,
    AddItemMenuComponent,
    TodoListComponent
  ]
})
export class TabsPageModule {}
