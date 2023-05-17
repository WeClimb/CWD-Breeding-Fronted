import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[lazyLoad]'
})

export class LazyLoadDirective {
  @Input() lazyLoad!: string;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {

    const observer = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          const img = new Image();

          img.src = this.lazyLoad;

          img.onload = () => {

            this.elementRef.nativeElement.src = this.lazyLoad;
            console.log(this.lazyLoad);

          };

          observer.unobserve(this.elementRef.nativeElement);

        }

      });

    });

    observer.observe(this.elementRef.nativeElement);

  }

}