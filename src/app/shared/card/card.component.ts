import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FavoriteBtnComponent } from '../favorite-btn/favorite-btn.component';
import { Pet } from '../models/pet.model';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { Item } from '../models/item.model';
import { PetService } from '../../services/pet.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FavoriteBtnComponent, DropdownComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  public isLoggedIn = computed(() => this.authService.isLoggedIn());
  @Input() loading: boolean = true;
  @Input() editDropdownItems: Item[] = [];
  public imageLoaded: boolean = false;
  @Input() item: Partial<Pet> = {};

  public isFavorite: boolean = false;
  @Input() showEdit: boolean = false;
  private currentPetId: string = '';
  @Output() idUpdated = new EventEmitter<{ id: string }>();

  @Input() showCheckbox: boolean = false;
  @Input() isSelected: boolean = false;
  @Output() cardSelectionChange = new EventEmitter<{
    id: string;
    selected: boolean;
  }>();

  public currentUserId: string | undefined = '';

  constructor(
    private petService: PetService,
    private authService: AuthService,
    private router: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.currentUserId = this.authService.user()?.id;
    this.setFavoriteStatus();
  }

  private setFavoriteStatus() {
    if (this.item.id) {
      const isIncluded = this.authService
        .user()
        ?.favorites?.includes(this.item.id);

      if (isIncluded) {
        this.isFavorite = true;
      }
    }
  }

  public onCardSelect(id: string | undefined, event: Event) {
    event.stopPropagation();
    if (!id) return;
    const selected = (event.target as HTMLInputElement).checked;
    this.cardSelectionChange.emit({ id, selected });
  }

  public onCardSelectForEdit(id: string | undefined) {
    if (!id) return;
    this.currentPetId = id;
    this.idUpdated.emit({ id: this.currentPetId });
  }

  public updateFavoriteStatus(status: boolean): void {
    // if (!this.authService.user()) {
    //   this.router.navigate(['auth'], { queryParams: { authView: 'login' } });
    //   return;
    // }

    this.isFavorite = status;
    if (this.item.id && this.currentUserId) {
      this.petService
        .toggleFavorite(this.item.id, this.currentUserId)
        .subscribe((res) => {
          this.isFavorite = res.isFavorite;

          this.authService.updateFavorite(this.item.id!, res.isFavorite);
        });
    }
  }

  public onNavigateToDetails(): void {
    this.router.navigate(['pet', this.item.id]);
    this.navigationService.scrollToTop();
  }
}
