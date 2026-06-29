import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NotificationPreference } from '../models';
import * as NotificationsActions from '../store/notifications/notifications.actions';
import {
  selectAllPreferences,
  selectEnabledPreferenceCount,
} from '../store/notifications/notifications.selectors';
import { SaveConfirmDialogComponent } from './save-confirm-dialog/save-confirm-dialog.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: false,
})
export class NotificationsComponent {
  preferences$: Observable<NotificationPreference[]>;
  enabledCount$: Observable<number>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.preferences$ = this.store.select(selectAllPreferences);
    this.enabledCount$ = this.store.select(selectEnabledPreferenceCount);
  }

  togglePreference(id: string): void {
    this.store.dispatch(NotificationsActions.togglePreference({ id }));
  }

  openSaveDialog(): void {
    this.dialog.open(SaveConfirmDialogComponent, {
      width: '400px',
      ariaLabel: 'Confirm save notification preferences',
      autoFocus: true,
    });
  }
}
