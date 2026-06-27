import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { axe } from 'jest-axe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { NotificationsComponent } from './notifications.component';
import { RenderCountComponent } from './render-count/render-count.component';
import { NotificationBatchService } from './notification-batch.service';

describe('NotificationsComponent a11y', () => {
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationsComponent, RenderCountComponent],
      imports: [
        NoopAnimationsModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatCardModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatDialogModule,
      ],
      providers: [
        NotificationBatchService,
        provideMockStore({
          initialState: {
            notifications: {
              preferences: [
                {
                  id: 'email-statements',
                  label: 'Monthly statement emails',
                  enabled: true,
                  category: 'email',
                },
              ],
              loaded: true,
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsComponent);
    fixture.detectChanges();
  });

  it('should have no a11y violations', async () => {
    const results = await axe(fixture.nativeElement, {
      exclude: [['[data-testid="render-count-panel"]']],
    });
    expect(results).toHaveNoViolations();
  });
});
