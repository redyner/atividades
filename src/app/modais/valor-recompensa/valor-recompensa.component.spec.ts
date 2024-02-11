import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorRecompensaComponent } from './valor-recompensa.component';

describe('ValorRecompensaComponent', () => {
  let component: ValorRecompensaComponent;
  let fixture: ComponentFixture<ValorRecompensaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValorRecompensaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValorRecompensaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
