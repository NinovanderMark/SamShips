import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { MyShipsComponent } from './components/pages/my-ships/my-ships.component';
import { WorldViewComponent } from './components/pages/world-view/world-view.component';
import { ShipCreateComponent } from './components/ship-create/ship-create.component';
import { ShipDetailComponent } from './components/ship-detail/ship-detail.component';

const routes: Routes = [
  { path: 'my-ships', component: MyShipsComponent, children: [
    { path: 'create', component: ShipCreateComponent },
    { path: 'detail/:id', component: ShipDetailComponent }
  ]},
  { path: 'world', component: WorldViewComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
