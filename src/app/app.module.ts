import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderLogoffComponent } from './components/header-logoff/header-logoff.component';
import { HeaderLoginComponent } from './components/header-login/header-login.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

// binding text
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// captcha
import { NgxCaptchaModule } from 'ngx-captcha';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { GameDetailComponentsComponent } from './components/game-detail-components/game-detail-components.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartComponentsComponent } from './components/cart-components/cart-components.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginComponentsComponent } from './components/login-components/login-components.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisterComponentsComponent } from './components/register-components/register-components.component';
import { InnapropriatePageComponent } from './pages/innapropriate-page/innapropriate-page.component';
import { InnapropriateComponentsComponent } from './components/innapropriate-components/innapropriate-components.component';
import { WishlistPageComponent } from './pages/wishlist-page/wishlist-page.component';
import { WishlistComponentsComponent } from './components/wishlist-components/wishlist-components.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { CheckoutComponentsComponent } from './components/checkout-components/checkout-components.component';
import { MarketPageComponent } from './pages/market-page/market-page.component';
import { MarketComponentsComponent } from './components/market-components/market-components.component';
import { ItemDetailPageComponent } from './pages/item-detail-page/item-detail-page.component';
import { ItemDetailComponentsComponent } from './components/item-detail-components/item-detail-components.component';
import { TopupWalletComponentsComponent } from './components/topup-wallet-components/topup-wallet-components.component';
import { TopupWalletPageComponent } from './pages/topup-wallet-page/topup-wallet-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileComponentsComponent } from './components/profile-components/profile-components.component';
import { ChatComponentsComponent } from './components/chat-components/chat-components.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { SearchGamePageComponent } from './pages/search-game-page/search-game-page.component';
import { SearchGameComponentsComponent } from './components/search-game-components/search-game-components.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderLogoffComponent,
    HeaderLoginComponent,
    FooterComponent,
    MainMenuComponent,
    HomePageComponent,
    GameDetailComponent,
    GameDetailComponentsComponent,
    CartPageComponent,
    CartComponentsComponent,
    LoginPageComponent,
    LoginComponentsComponent,
    RegisterPageComponent,
    RegisterComponentsComponent,
    InnapropriatePageComponent,
    InnapropriateComponentsComponent,
    WishlistPageComponent,
    WishlistComponentsComponent,
    CheckoutPageComponent,
    CheckoutComponentsComponent,
    MarketPageComponent,
    MarketComponentsComponent,
    ItemDetailPageComponent,
    ItemDetailComponentsComponent,
    TopupWalletComponentsComponent,
    TopupWalletPageComponent,
    ProfilePageComponent,
    ProfileComponentsComponent,
    ChatComponentsComponent,
    ChatPageComponent,
    SearchGamePageComponent,
    SearchGameComponentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxCaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
