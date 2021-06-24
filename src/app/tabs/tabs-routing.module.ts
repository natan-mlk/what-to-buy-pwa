import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'kolibki', component: ListComponent
      },
      {
        path: 'natan', component: ListComponent
      },
      {
        path: 'adrian', component: ListComponent
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
