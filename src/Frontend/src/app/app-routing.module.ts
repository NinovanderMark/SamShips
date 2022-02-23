import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { MyShipsComponent } from './components/pages/my-ships/my-ships.component';
import { WorldViewComponent } from './components/pages/world-view/world-view.component';

const routes: Routes = [
  { path: 'my-ships', component: MyShipsComponent },
  { path: 'world', component: WorldViewComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
