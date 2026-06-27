import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'bofa-legacy-trend',
  template: `
    <svg
      [attr.width]="width"
      [attr.height]="height"
      [attr.viewBox]="'0 0 ' + width + ' ' + height"
      role="img"
      [attr.aria-label]="ariaLabel"
      data-testid="legacy-trend"
    >
      <polyline
        [attr.points]="points"
        fill="none"
        stroke="#012169"
        stroke-width="2"
      />
      <circle
        *ngFor="let dot of dotPositions; let i = index"
        [attr.cx]="dot.x"
        [attr.cy]="dot.y"
        r="3"
        fill="#C8922A"
      />
    </svg>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      svg {
        background: #f5f7fa;
        border-radius: 4px;
      }
    `,
  ],
})
export class LegacyTrendComponent implements OnChanges {
  @Input() data: number[] = [];
  @Input() width = 280;
  @Input() height = 80;
  @Input() ariaLabel = 'Execution trend chart';

  points = '';
  dotPositions: { x: number; y: number }[] = [];

  ngOnChanges(): void {
    this.buildPath();
  }

  private buildPath(): void {
    if (!this.data.length) {
      this.points = '';
      this.dotPositions = [];
      return;
    }

    const min = Math.min(...this.data);
    const max = Math.max(...this.data);
    const range = max - min || 1;
    const padding = 8;
    const innerWidth = this.width - padding * 2;
    const innerHeight = this.height - padding * 2;

    this.dotPositions = this.data.map((value, index) => {
      const x =
        padding + (index / Math.max(this.data.length - 1, 1)) * innerWidth;
      const y = padding + innerHeight - ((value - min) / range) * innerHeight;
      return { x, y };
    });

    this.points = this.dotPositions.map((d) => `${d.x},${d.y}`).join(' ');
  }
}
