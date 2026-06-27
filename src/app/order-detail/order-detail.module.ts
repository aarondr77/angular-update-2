import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegacyTrendModule } from '@bofa/legacy-trend-widget';
import { SharedModule } from '../shared/shared.module';
import { OrderDetailComponent } from './order-detail.component';

const routes: Routes = [{ path: '', component: OrderDetailComponent }];

@NgModule({
  declarations: [OrderDetailComponent],
  imports: [SharedModule, LegacyTrendModule, RouterModule.forChild(routes)],
})
export class OrderDetailModule {}
