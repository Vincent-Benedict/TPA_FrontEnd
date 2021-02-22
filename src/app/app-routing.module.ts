import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponentsComponent } from './components/login-components/login-components.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { BadgePageComponent } from './pages/badge-page/badge-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { CommunityPageComponent } from './pages/community-page/community-page.component';
import { DiscoveryPageComponent } from './pages/discovery-page/discovery-page.component';
import { DiscussionDetailPageComponent } from './pages/discussion-detail-page/discussion-detail-page.component';
import { EditProfilePageComponent } from './pages/edit-profile-page/edit-profile-page.component';
import { FriendPageComponent } from './pages/friend-page/friend-page.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { InnapropriatePageComponent } from './pages/innapropriate-page/innapropriate-page.component';
import { InventoryPageComponent } from './pages/inventory-page/inventory-page.component';
import { ItemDetailPageComponent } from './pages/item-detail-page/item-detail-page.component';
import { LoginAdminPageComponent } from './pages/login-admin-page/login-admin-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ManageGamePageComponent } from './pages/manage-game-page/manage-game-page.component';
import { ManagePromoPageComponent } from './pages/manage-promo-page/manage-promo-page.component';
import { ManageUserPageComponent } from './pages/manage-user-page/manage-user-page.component';
import { MarketPageComponent } from './pages/market-page/market-page.component';
import { PointShopPageComponent } from './pages/point-shop-page/point-shop-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ReviewDetailPageComponent } from './pages/review-detail-page/review-detail-page.component';
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
    path: 'checkout/:price/:state',
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
    path: 'profile/:customurl',
    component: ProfilePageComponent
  },
  {
    path: 'edit-profile/:customurl',
    component: EditProfilePageComponent
  },
  {
    path: 'chat/:id',
    component: ChatPageComponent
  },
  {
    path: 'searchgame',
    component: SearchGamePageComponent
  },
  {
    path: 'friends',
    component: FriendPageComponent
  },
  {
    path: 'pointshop',
    component: PointShopPageComponent
  },
  {
    path: 'community',
    component: CommunityPageComponent
  },
  {
    path: 'review-detail/:id',
    component: ReviewDetailPageComponent
  },
  {
    path: 'discussion-detail/:id',
    component: DiscussionDetailPageComponent
  },
  {
    path: 'inventory',
    component: InventoryPageComponent
  },
  {
    path: 'badge',
    component: BadgePageComponent
  },
  {
    path: 'discovery/:state',
    component: DiscoveryPageComponent
  },


  // admin
  {
    path: 'login-admin',
    component: LoginAdminPageComponent
  },
  {
    path: 'home-admin',
    component: AdminHomePageComponent
  },
  {
    path: 'manage-game-admin',
    component: ManageGamePageComponent
  },
  {
    path: 'manage-promo-admin',
    component: ManagePromoPageComponent
  },
  {
    path: 'manage-user-admin',
    component: ManageUserPageComponent
  },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
