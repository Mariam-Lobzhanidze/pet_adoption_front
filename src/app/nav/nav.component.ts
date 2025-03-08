import { Component, ViewChild } from '@angular/core';
import { UserAvatarComponent } from '../shared/user-avatar/user-avatar.component';
import { SecondaryNavComponent } from './secondary-nav/secondary-nav.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { Item } from '../shared/models/item.model';
import {
  ADOPT_ITEMS,
  CAT_ITEMS,
  DOG_ITEMS,
  OTHER_TYPE_ITEMS,
} from '../constants/dropdown-constants';
import { SubMenuComponent } from './subMenu/submenu.component';
import { RouterLink } from '@angular/router';
import { AuthComponent } from '../auth/auth/auth.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    UserAvatarComponent,
    SecondaryNavComponent,
    SidebarComponent,
    SubMenuComponent,
    RouterLink,
    AuthComponent,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  public isLoggedIn: boolean = false;

  public showSecondaryNav: boolean = false;
  public showSubMenu: boolean = false;

  public navItems: { title: string; items: Item[] }[] = [
    { title: 'Adopt or get involved', items: ADOPT_ITEMS },
    { title: 'Dogs & puppies', items: DOG_ITEMS },
    { title: 'Cats & kittens', items: CAT_ITEMS },
    { title: 'Other types of pets', items: OTHER_TYPE_ITEMS },
  ];

  public selectedSidebarData: { title: string; items: Item[] } | null = null;

  public onShowSubMenu(selectedData: { title: string; items: Item[] }): void {
    this.selectedSidebarData = selectedData;
    this.showSubMenu = true;
  }

  public onCloseSubMenu(): void {
    this.showSubMenu = false;
  }
}
