import { Component } from '@angular/core';
import { UserAvatarComponent } from '../shared/user-avatar/user-avatar.component';
import { SecondaryNavComponent } from './secondary-nav/secondary-nav.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { DropdownItem } from '../shared/models/dropdown-item.model';
import {
  ADOPT_ITEMS,
  CAT_ITEMS,
  DOG_ITEMS,
  OTHER_TYPE_ITEMS,
} from '../shared/constants/dropdown-constants';
import { SubMenuComponent } from './subMenu/submenu.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    UserAvatarComponent,
    SecondaryNavComponent,
    SidebarComponent,
    SubMenuComponent,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  public isLoggedIn: boolean = false;

  public showSecondaryNav: boolean = false;
  public showInnerSidebar: boolean = false;

  public navItems: { title: string; items: DropdownItem[] }[] = [
    { title: 'Adopt or get involved', items: ADOPT_ITEMS },
    { title: 'Dogs & puppies', items: DOG_ITEMS },
    { title: 'Cats & kittens', items: CAT_ITEMS },
    { title: 'Other types of pets', items: OTHER_TYPE_ITEMS },
  ];

  public selectedSidebarData: { title: string; items: DropdownItem[] } | null =
    null;

  public onShowInnerSidebar(innerSidebarData: {
    title: string;
    items: DropdownItem[];
  }): void {
    this.selectedSidebarData = innerSidebarData;
    this.showInnerSidebar = true;
  }

  public onCloseInnerSidebar(): void {
    this.showInnerSidebar = false;
  }
}
