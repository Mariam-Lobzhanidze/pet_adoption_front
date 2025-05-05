import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FavoriteBtnComponent } from '../favorite-btn/favorite-btn.component';
import { Pet } from '../models/pet.model';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FavoriteBtnComponent, DropdownComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
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

  public onCardSelect(id: string | undefined, event: Event) {
    if (!id) return;
    const selected = (event.target as HTMLInputElement).checked;
    this.cardSelectionChange.emit({ id, selected });
  }

  public onCardSelectForEdit(id: string | undefined) {
    if (!id) return;
    this.currentPetId = id;
    this.idUpdated.emit({ id: this.currentPetId });
  }

  //go to service
  public updateFavoriteStatus(newStatus: boolean): void {
    this.isFavorite = newStatus;

    console.log(`card with id ${this.item.id} changed to ${this.isFavorite}`);
  }
}
