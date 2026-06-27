import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegacyTrendComponent } from './trend.component';

@NgModule({
  declarations: [LegacyTrendComponent],
  imports: [CommonModule],
  exports: [LegacyTrendComponent],
})
export class LegacyTrendModule {}
