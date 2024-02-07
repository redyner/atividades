import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-lista-recompensas',
  templateUrl: './lista-recompensas.component.html',
  styleUrl: './lista-recompensas.component.scss'
})
export class ListaRecompensasComponent {
  @Output() atividadeSelecionada = new EventEmitter<string>();

  imagens = [
    '../../assets/img/recompensas/1.png',
    '../../assets/img/recompensas/2.png',
    '../../assets/img/recompensas/3.png',
    '../../assets/img/recompensas/4.png',
    '../../assets/img/recompensas/5.png',
    '../../assets/img/recompensas/6.png',
  ];

  selecionarAtividade(src: string): void {
    this.atividadeSelecionada.emit(src);
  }
}
