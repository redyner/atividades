import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-valor-recompensa',
  templateUrl: './valor-recompensa.component.html',
  styleUrl: './valor-recompensa.component.scss'
})
export class ValorRecompensaComponent {
  @Output() valorCadastrado = new EventEmitter<number>();

  form = this.formBuilder.group({
    valor: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder) { }

  cadastrarValor(): void {
    this.valorCadastrado.emit(parseInt(this.form.get('valor')?.value ?? '0'));
  }
}
