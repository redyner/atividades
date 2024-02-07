import { Component } from '@angular/core';

@Component({
  selector: 'app-recompensas',
  templateUrl: './recompensas.component.html',
  styleUrl: './recompensas.component.scss'
})

export class RecompensasComponent {
  recompensas: any[];
  atividadeDefault = '../assets/img/default.png';
  
  constructor() {
    const storedAtividades = localStorage.getItem('recompensas');
    this.recompensas = storedAtividades ? JSON.parse(storedAtividades) : [{ src: this.atividadeDefault, price: 0 }];
  }
}
