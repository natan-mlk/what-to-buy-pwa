import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { WspolneComponent } from './wspolne/wspolne.component';
import { NatanComponent } from './natan/natan.component';
import { ListComponent } from './list/list.component';
import { PopoverMenuComponent } from './popover-menu/popover-menu.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
    WspolneComponent,
    NatanComponent,
    ListComponent,
    PopoverMenuComponent
  ]
})
export class TabsPageModule {}
