import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NatanComponent } from './natan/natan.component';
import { TabsPage } from './tabs.page';
import { WspolneComponent } from './wspolne/wspolne.component';

const routes: Routes = [
  {
    path: 'czyje',
    component: TabsPage,
    children: [
      {
        path: 'wspolne', component: WspolneComponent
      },
      {
        path: 'natan', component: NatanComponent
      },
      {
        path: '',
        redirectTo: '/czyje/wspolne',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/czyje/wspolne',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
