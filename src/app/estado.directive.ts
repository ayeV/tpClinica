import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appEstado]'
})
export class EstadoDirective implements OnInit {
  @Input() estado: any;
  constructor(private el: ElementRef) { 
  
   
  }
  ngOnInit(): void {
    if(this.estado == 'Confirmado')
    {
      this.el.nativeElement.style.color = 'green';
    }
    else if(this.estado == 'Cancelado')
    {
      this.el.nativeElement.style.color = 'red';

    }
    else
    {
      this.el.nativeElement.style.color = 'blue';
    }
  }

}
