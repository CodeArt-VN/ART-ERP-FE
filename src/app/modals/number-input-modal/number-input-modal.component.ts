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
		this.triggerNativeChange();
	}
	get value() { return this._value; }

	private _isValid = true;
	@Input()
	set isValid(v: boolean) {
		this._isValid = !!v;
		this.triggerNativeChange();
	}
	get isValid() { return this._isValid; }

	private _message = '';
	@Input()
	set message(v: string) {
		this._message = v ?? '';
		this.triggerNativeChange();
	}
	get message() { return this._message; }

	// Emit change whenever user types or presses keypad
	@Output() change = new EventEmitter<{ value: string; isValid: boolean; message: string }>();

	// Also accept a callback when created via ModalController.componentProps
	@Input() onChange: ((payload: { value: string; isValid: boolean; message: string }) => void) | undefined;

	displayed = '';

	constructor(
		public modalController: ModalController,
		public env: EnvService,
		private cd: ChangeDetectorRef,
	) {}

	ngOnInit(): void {}

	private updateDisplayedValue(val: string) {
		this.displayed = val ?? '';
		this.cd.detectChanges();
	}

	// Called when user types in the input field
	onUserInput(ev: Event) {
		const input = ev.target as HTMLInputElement;
		this._value = input.value;
		this.displayed = this._value;
		this.emitChange();
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
			this.emitChange();
			return;
		} else {
			this._value = this._value + key;
		}
		this.updateDisplayedValue(this._value);
		this.emitChange();
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

	// When outside pushes inputs, ensure native input elements receive change/input events
	private triggerNativeChange() {
		// update native input value and dispatch events
		try {
			if (this.textInput && this.textInput.nativeElement) {
				const el = this.textInput.nativeElement;
				el.value = this._value ?? '';
				const inputEvent = new Event('input', { bubbles: true });
				el.dispatchEvent(inputEvent);
				const changeEvent = new Event('change', { bubbles: true });
				el.dispatchEvent(changeEvent);
			}
		} catch (err) {
			console.warn('triggerNativeChange failed', err);
		}
	}
	
}
