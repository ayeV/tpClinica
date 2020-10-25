import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarResenaComponent } from './cargar-resena.component';

describe('CargarResenaComponent', () => {
  let component: CargarResenaComponent;
  let fixture: ComponentFixture<CargarResenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarResenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarResenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
