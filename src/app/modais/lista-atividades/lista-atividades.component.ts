import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lista-atividades',
  templateUrl: './lista-atividades.component.html',
  styleUrls: ['./lista-atividades.component.scss']
})
export class ListaAtividadesComponent {
  @Output() atividadeSelecionada = new EventEmitter<string>();

  imagens = [
    '../../assets/img/atividades/1.png',
    '../../assets/img/atividades/2.png',
    '../../assets/img/atividades/3.png',
    '../../assets/img/atividades/4.png',
    '../../assets/img/atividades/5.png',
    '../../assets/img/atividades/6.png',
    '../../assets/img/atividades/7.png',
    '../../assets/img/atividades/8.png',
    '../../assets/img/atividades/9.png',
    '../../assets/img/atividades/10.png',
    '../../assets/img/atividades/11.png',
  ];

  selecionarAtividade(src: string): void {
    this.atividadeSelecionada.emit(src);
  }
}
