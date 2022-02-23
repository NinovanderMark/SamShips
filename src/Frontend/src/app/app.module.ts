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
import { ShipCreateComponent } from './components/ship-create/ship-create.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShipListComponent,
    ShipDetailComponent,
    WorldViewComponent,
    MyShipsComponent,
    FooterComponent,
    HomeComponent,
    ShipCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
