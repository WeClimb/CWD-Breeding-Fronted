
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[DigitOnly]'
})
export class DigitOnlyDirective {

  constructor(private el: ElementRef) { }

  @Input() OnlyNumber: boolean | undefined;

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    let e = <KeyboardEvent> event;
    if (this.OnlyNumber) {
      if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
          return;
        }

        if (event.which != 8 && event.which != 0 && event.which < 48 || event.which > 57)
        {
          event.preventDefault();
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }

        if (e.key === ' ' || isNaN(Number(e.key))) {
          e.preventDefault();
        }
      }
  }
}
