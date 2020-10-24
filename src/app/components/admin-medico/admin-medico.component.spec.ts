import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMedicoComponent } from './admin-medico.component';

describe('AdminMedicoComponent', () => {
  let component: AdminMedicoComponent;
  let fixture: ComponentFixture<AdminMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
