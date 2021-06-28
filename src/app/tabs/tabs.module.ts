import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { ListComponent } from './list/list.component';
import { PopoverMenuComponent } from './popover-menu/popover-menu.component';
import { AddItemMenuComponent } from './add-item-menu/add-item-menu.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
    ListComponent,
    PopoverMenuComponent,
    AddItemMenuComponent
  ]
})
export class TabsPageModule {}
