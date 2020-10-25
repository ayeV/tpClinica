import { Injectable } from '@angular/core';
import { Turno } from '../classes/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  public turno:Turno;
  constructor() { }
}
