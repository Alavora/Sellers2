import { ItemsComponent } from './pages/baskets/items/items.component';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatMenuModule } from '@angular/material/menu';

import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import localeDe from '@angular/common/locales/de';

import { MatBadgeModule } from '@angular/material/badge';
import { SidBarComponent } from './shared/sid-bar/sid-bar.component';
import { BottomNavModule } from 'ngx-bottom-nav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './pages/home/home.component';
import { BasketsComponent } from './pages/baskets/baskets.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { LOCALE_ID } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OkdialogComponent } from './pages/dialogs/okdialog/okdialog.component';
import { LoginComponent } from './pages/login/login.component';
import { IntercepterService } from './services/intercepter.service';
import { EditComponent } from './pages/shops/edit/edit.component';
import { MatTableModule } from '@angular/material/table';
import { DetailsComponent } from './pages/baskets/items/details/details.component';
import { registerLocaleData } from '@angular/common';
import { ProductComponent } from './pages/shops/edit/product/product.component';
registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    SidBarComponent,
    HomeComponent,
    BasketsComponent,
    ShopsComponent,
    OkdialogComponent,
    LoginComponent,
    EditComponent,
    ItemsComponent,

    DetailsComponent,
     ProductComponent,
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    AppRoutingModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatDialogModule,
    MatIconModule,
    FlexLayoutModule,
    MatBadgeModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatMenuModule,
    BottomNavModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: IntercepterService, multi: true },
    { provide: LOCALE_ID, useValue: 'de-DE' },
  ],
  bootstrap: [AppComponent],
  entryComponents: [OkdialogComponent],
})
export class AppModule {}
