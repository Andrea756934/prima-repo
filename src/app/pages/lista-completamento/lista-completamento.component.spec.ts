import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCompletamentoComponent } from './lista-completamento.component';

describe('ListaCompletamentoComponent', () => {
  let component: ListaCompletamentoComponent;
  let fixture: ComponentFixture<ListaCompletamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCompletamentoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaCompletamentoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
