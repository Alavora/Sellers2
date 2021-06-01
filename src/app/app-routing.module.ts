import { ProductComponent } from './pages/shops/edit/product/product.component';
import { EditComponent } from './pages/shops/edit/edit.component';
import { DetailsComponent } from './pages/baskets/items/details/details.component';
import { ItemsComponent } from './pages/baskets/items/items.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { BasketsComponent } from './pages/baskets/baskets.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserGuard } from './guards/user.guard';
import { LoginComponent } from './pages/login/login.component';
import { UserLoggedGuard } from './guards/user-logged.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [UserGuard] },
  { path: 'baskets', component: BasketsComponent, canActivate: [UserGuard] },
  { path: 'shops', component: ShopsComponent, canActivate: [UserGuard] },
  {
    path: 'shops/:id/products',
    component: EditComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'shops/:idl/products/:id',
    component: ProductComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'baskets/:id/items',
    component: ItemsComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'baskets/:idbasket/items/:id',
    component: DetailsComponent,
    canActivate: [UserGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [UserLoggedGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
