import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-call-to-action-card',
  standalone: true,
  imports: [RouterLink, AvatarComponent],
  templateUrl: './call-to-action-card.component.html',
  styleUrl: './call-to-action-card.component.scss',
})
export class CallToActionCard {
  @Input() avatarImage?: string;
  @Input({ required: true }) message: string = '';
  @Input({ required: true }) buttonText: string = '';
  @Input() routePath: string = '/';
}
