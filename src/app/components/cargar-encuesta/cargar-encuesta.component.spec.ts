import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarEncuestaComponent } from './cargar-encuesta.component';

describe('CargarEncuestaComponent', () => {
  let component: CargarEncuestaComponent;
  let fixture: ComponentFixture<CargarEncuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarEncuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
