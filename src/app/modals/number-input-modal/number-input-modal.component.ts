import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
@Component({
	selector: 'app-number-input-modal',
	templateUrl: './number-input-modal.component.html',
	styleUrls: ['./number-input-modal.component.scss'],
	standalone: false,
})
export class NumberInputModalComponent implements OnInit {
	@ViewChild('textInput', { static: false }) textInput: ElementRef<HTMLInputElement> | undefined;

	// Inputs from outside
	private _value = '';
	@Input()
	set value(v: string) {
		this._value = v ?? '';
		this.updateDisplayedValue(this._value);
		this.syncNativeValue();
	}
	get value() {
		return this._value;
	}

	private _isValid = true;
	@Input()
	set isValid(v: boolean) {
		this._isValid = !!v;
		this.syncNativeValue();
	}
	get isValid() {
		return this._isValid;
	}

	private _message = '';
	@Input()
	set message(v: string) {
		this._message = v ?? '';
		this.syncNativeValue();
	}
	get message() {
		return this._message;
	}

	private _autoEmit = false;
	@Input()
	set autoEmit(v: boolean) {
		this._autoEmit = v ?? false;
		this.syncNativeValue();
	}

	private _POSAllowDecimalQuantity = false;
	@Input()
	set POSAllowDecimalQuantity(v: boolean) {
		this._POSAllowDecimalQuantity = v ?? false;
		this.syncNativeValue();
	}
	get POSAllowDecimalQuantity() {
		return this._POSAllowDecimalQuantity;
	}

	// Emit change whenever user types or presses keypad
	@Output() change = new EventEmitter<{ value: string; isValid: boolean; message: string }>();

	// Also accept a callback when created via ModalController.componentProps
	@Input() onChange: ((payload: { value: string; isValid: boolean; message: string }) => void) | undefined;

	displayed = '';

	constructor(
		public modalController: ModalController,
		public env: EnvService,
		private cd: ChangeDetectorRef
	) {}

	ngOnInit(): void {}

	private updateDisplayedValue(val: string) {
		this.displayed = val ?? '';
		this.cd.detectChanges();
	}

	// Called when user types in the input field
	onUserInput(ev: Event) {
		const input = ev.target as HTMLInputElement;
		const filtered = this.filterInputValue(input.value, input.selectionStart ?? input.value.length);
		this._value = filtered.value;

		// Ensure the native input element shows the filtered value immediately
		try {
			input.value = this._value ?? '';
			if (typeof input.setSelectionRange === 'function') {
				input.setSelectionRange(filtered.caret, filtered.caret);
			}
		} catch (err) {
			// ignore
		}

		this.updateDisplayedValue(this._value);
		this.emitChange();
	}

	private filterInputValue(rawValue: string, caret: number) {
		let value = '';
		let nextCaret = 0;
		let hasDot = false;

		for (let i = 0; i < rawValue.length; i++) {
			let ch = rawValue[i];
			let keep = false;

			if (this.POSAllowDecimalQuantity) {
				if (ch === ',') ch = '.';
				if (ch >= '0' && ch <= '9') {
					keep = true;
				} else if (ch === '.' && !hasDot) {
					hasDot = true;
					keep = true;
				}
			} else if (ch >= '0' && ch <= '9') {
				keep = true;
			}

			if (keep) {
				value += ch;
				if (i < caret) nextCaret++;
			}
		}

		return { value, caret: nextCaret };
	}

	// Called when keypad buttons pressed
	onButtonPress(key: string) {
		if (key === 'AC') {
			this._value = '';
		} else if (key === '<=') {
			this._value = this._value.slice(0, -1);
		} else if (key === '000') {
			this._value = this._value + '000';
		} else if (key === 'Enter') {
			try {
				this.modalController.dismiss({ value: this._value });
			} catch (err) {
				console.warn('dismiss error', err);
			}
			return;
		} else if (key === '.' && this.POSAllowDecimalQuantity) {
			if (this._value.includes('.')) return;
			this._value = this._value + key;
		} else {
			this._value = this._value + key;
		}
		this.updateDisplayedValue(this._value);
		if (this._autoEmit) this.emitChange();
	}

	private emitChange() {
		const payload = { value: this._value, isValid: this._isValid, message: this._message };
		this.change.emit(payload);
		try {
			this.onChange && this.onChange(payload);
		} catch (err) {
			console.warn('onChange callback error', err);
		}
	}

	// Keep the native input in sync when inputs are pushed from outside.
	private syncNativeValue() {
		try {
			if (this.textInput && this.textInput.nativeElement) {
				const el = this.textInput.nativeElement;
				el.value = this._value ?? '';
			}
		} catch (err) {
			console.warn('syncNativeValue failed', err);
		}
	}

	async closeModal() {
		await this.modalController.dismiss(null);
	}
}
