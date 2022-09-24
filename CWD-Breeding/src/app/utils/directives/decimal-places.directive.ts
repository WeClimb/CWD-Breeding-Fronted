import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
	selector: '[appDecimalPlaces]'
})
export class DecimalPlacesDirective {

	@Input() roundingValue: number | undefined;

	constructor(private element: ElementRef) { }

	//To Change how many decimal places you want, change the toFixed value
	//This will auto round to the decimal place you set
	//Example Usage => <input id="number" type="number" [roundingValue]="1" [formControl]="number" appDecimalPlaces>
	@HostListener('change') change() {
		if (this.roundingValue == undefined || this.roundingValue < 0) {
			this.roundingValue = 0;
		}

		let num: number = Number(this.element.nativeElement.value);
		this.element.nativeElement.value = num.toFixed(this.roundingValue);
	}
}