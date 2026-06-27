import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NotificationsComponent } from './notifications.component';
import { RenderCountComponent } from './render-count/render-count.component';
import { SaveConfirmDialogComponent } from './save-confirm-dialog/save-confirm-dialog.component';

const routes: Routes = [{ path: '', component: NotificationsComponent }];

@NgModule({
  declarations: [NotificationsComponent, RenderCountComponent, SaveConfirmDialogComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class NotificationsModule {}
