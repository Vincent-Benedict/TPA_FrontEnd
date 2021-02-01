import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponentsComponent } from './components/login-components/login-components.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { InnapropriatePageComponent } from './pages/innapropriate-page/innapropriate-page.component';
import { ItemDetailPageComponent } from './pages/item-detail-page/item-detail-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MarketPageComponent } from './pages/market-page/market-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SearchGamePageComponent } from './pages/search-game-page/search-game-page.component';
import { TopupWalletPageComponent } from './pages/topup-wallet-page/topup-wallet-page.component';
import { WishlistPageComponent } from './pages/wishlist-page/wishlist-page.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'gamedetail/:id',
    component: GameDetailComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'inappropriate/:id',
    component: InnapropriatePageComponent
  },
  {
    path: 'wishlist',
    component: WishlistPageComponent
  },
  {
    path: 'checkout/:price',
    component: CheckoutPageComponent
  },
  {
    path: 'market',
    component: MarketPageComponent
  },
  {
    path: 'item-detail/:id',
    component: ItemDetailPageComponent
  },
  {
    path: 'topup-wallet',
    component: TopupWalletPageComponent
  },
  {
    path: 'profile/:id',
    component: ProfilePageComponent
  },
  {
    path: 'chat/:id',
    component: ChatPageComponent
  },
  {
    path: 'searchgame',
    component: SearchGamePageComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
