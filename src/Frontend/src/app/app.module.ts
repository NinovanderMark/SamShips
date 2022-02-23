import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShipListComponent } from './components/ship-list/ship-list.component';
import { ShipDetailComponent } from './components/ship-detail/ship-detail.component';
import { WorldViewComponent } from './components/pages/world-view/world-view.component';
import { MyShipsComponent } from './components/pages/my-ships/my-ships.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShipListComponent,
    ShipDetailComponent,
    WorldViewComponent,
    MyShipsComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
