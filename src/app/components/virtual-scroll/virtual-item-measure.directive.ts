import { Directive, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';

/**
 * Reports the real rendered height of a virtual-scroll item exactly once it settles, via
 * ResizeObserver. Runs entirely outside the Angular zone — the consumer
 * (`VirtualViewportComponent`) batches these callbacks itself and re-enters the zone
 * only once per animation frame, regardless of how many rows report in that frame.
 *
 * Re-emits only when `measureGeneration` bumps (viewport invalidated heights, e.g. width /
 * responsive change) so off-screen rows stay locked while currently-rendered rows remeasure.
 */
@Directive({
	selector: '[virtualItemMeasure]',
	standalone: false,
})
export class VirtualItemMeasureDirective implements OnInit, OnChanges, OnDestroy {
	@Input('virtualItemMeasure') itemId: string | number;
	/** Bumped by the viewport on `invalidateHeights()` — allows a fresh one-shot measure. */
	@Input() measureGeneration = 0;
	@Output() heightMeasured = new EventEmitter<number>();

	private ro?: ResizeObserver;
	private reportedForGeneration = -1;

	constructor(
		private readonly el: ElementRef<HTMLElement>,
		private readonly ngZone: NgZone
	) {}

	ngOnInit(): void {
		this.ngZone.runOutsideAngular(() => {
			this.ro = new ResizeObserver((entries) => {
				if (this.reportedForGeneration === this.measureGeneration) {
					return;
				}
				const entry = entries[0];
				const height = entry?.borderBoxSize?.[0]?.blockSize || this.el.nativeElement.getBoundingClientRect().height;
				if (height > 0) {
					this.reportedForGeneration = this.measureGeneration;
					this.heightMeasured.emit(height);
				}
			});
			this.ro.observe(this.el.nativeElement);
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['measureGeneration'] && !changes['measureGeneration'].firstChange) {
			this.reportedForGeneration = -1;
		}
	}

	ngOnDestroy(): void {
		this.ro?.disconnect();
	}
}
