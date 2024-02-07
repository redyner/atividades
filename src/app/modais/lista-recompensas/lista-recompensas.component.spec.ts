import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRecompensasComponent } from './lista-recompensas.component';

describe('ListaRecompensasComponent', () => {
  let component: ListaRecompensasComponent;
  let fixture: ComponentFixture<ListaRecompensasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaRecompensasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaRecompensasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
