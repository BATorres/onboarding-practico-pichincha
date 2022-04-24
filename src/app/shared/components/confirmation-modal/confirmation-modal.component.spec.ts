import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConfirmationModalComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationModalComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe emitir sendModalResponse con valor true en el botón de Eliminar', () => {
    jest.spyOn(component.sendModalResponse, 'emit');

    let buttonDelete = compiled.querySelector('[data-test=btn-delete]');
    buttonDelete?.dispatchEvent(new Event('click'));

    expect( component.sendModalResponse.emit ).toHaveBeenCalledWith(true);
  });

  it('Debe emitir sendModalResponse con valor false en el botón de Cancelar', () => {
    jest.spyOn(component.sendModalResponse, 'emit');

    let buttonDelete = compiled.querySelector('[data-test=btn-cancel]');
    buttonDelete?.dispatchEvent(new Event('click'));

    expect( component.sendModalResponse.emit ).toHaveBeenCalledWith(false);
  });

  it('Debe emitir sendModalResponse con valor false en el botón de cerrar modal (X)', () => {
    jest.spyOn(component.sendModalResponse, 'emit');

    let buttonDelete = compiled.querySelector('[data-test=btn-close]');
    buttonDelete?.dispatchEvent(new Event('click'));

    expect( component.sendModalResponse.emit ).toHaveBeenCalledWith(false);
  });
});
