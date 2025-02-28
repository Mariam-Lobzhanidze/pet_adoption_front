import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-join-us-card',
  standalone: true,
  imports: [RouterLink, AvatarComponent],
  templateUrl: './join-us-card.component.html',
  styleUrl: './join-us-card.component.scss',
})
export class JoinUsCardComponent {
  @Input({ required: true }) message: string = '';
  @Input({ required: true }) buttonText: string = '';
  @Input({ required: true }) routePath: string = '/';
}
