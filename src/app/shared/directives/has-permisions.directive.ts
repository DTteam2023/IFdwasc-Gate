import { Directive } from '@angular/core';

@Directive({
  selector: '[appHasPermisions]',
  standalone: true
})
export class HasPermisionsDirective {

  constructor() { }

}
