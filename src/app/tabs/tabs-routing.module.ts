import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NatanComponent } from './natan/natan.component';
import { TabsPage } from './tabs.page';
import { WspolneComponent } from './wspolne/wspolne.component';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'kolibki', component: NatanComponent
      },
      {
        path: 'natan', component: NatanComponent
      },
      {
        path: '',
        redirectTo: '/kolibki',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/kolibki',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
