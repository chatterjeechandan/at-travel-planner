import { Directive, ElementRef, EventEmitter, NgZone, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appGooglePlaces]',
   standalone: true,
})
export class GooglePlacesDirective implements OnInit {
  @Output() placeSelected = new EventEmitter<any>();

  private autocomplete!: google.maps.places.Autocomplete;

  constructor(private el: ElementRef, private ngZone: NgZone) {}

  ngOnInit() {
    this.autocomplete = new google.maps.places.Autocomplete(this.el.nativeElement, {
      types: ['geocode'],
    });

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.autocomplete.getPlace();
        this.placeSelected.emit(place);
      });
    });
  }
}
