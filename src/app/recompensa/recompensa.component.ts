import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListaRecompensasComponent } from '../modais/lista-recompensas/lista-recompensas.component';

@Component({
  selector: 'app-recompensa',
  templateUrl: './recompensa.component.html',
  styleUrl: './recompensa.component.scss'
})
export class RecompensaComponent {
  starFilled = '../assets/img/starFilled.png';
  starEmpty = '../assets/img/starEmpty.png';
  count = 0;
  totalEstrelas = this.getStars();
  recompensas: any[];
  atividadeDefault = '../assets/img/default.png';

  constructor(private dialog: MatDialog) {
    const storedRecompensas = localStorage.getItem('recompensas');
    this.recompensas = storedRecompensas ? JSON.parse(storedRecompensas) : [{ src: this.atividadeDefault, rating: this.starEmpty }];
    setInterval(() => {
      const diaDaSemanaAtual = new Date().getDay().toString();
      if(diaDaSemanaAtual != localStorage.getItem('diaDaSemanda'))
      {
        localStorage.setItem('diaDaSemanda', diaDaSemanaAtual);
        this.recompensas = this.recompensas.map(atividade => ({
          src: atividade.src,
          rating: this.starEmpty
        }));
        this.atualizarRecompensasLocalStorage();
      }
    }, 1000);
  }

  openDialog(atividade: any): void {
    const dialogRef = this.dialog.open(ListaRecompensasComponent);

    dialogRef.componentInstance.atividadeSelecionada.subscribe((src: string) => {
      atividade.src = src;
      dialogRef.close();
      this.atualizarRecompensasLocalStorage();
    });
  }

  changeRating(atividade: any): void {
    if(this.totalEstrelas)
      this.count = parseInt(this.totalEstrelas,10);

    if (atividade.rating === this.starFilled) {
      atividade.rating = this.starEmpty;
      this.count--;
    } else {
      atividade.rating = this.starFilled;
      this.count++;
    }
    localStorage.setItem('totalEstrelas', this.count.toString());
    this.totalEstrelas = this.count < 10 ? '0' + localStorage.getItem('totalEstrelas') : localStorage.getItem('totalEstrelas');
    this.atualizarRecompensasLocalStorage();
  }

  weekday() {
    switch (localStorage.getItem('diaDaSemanda')) {
      case "0":
        return "Domingo";
      case "1":
        return "Segunda-feira";
      case "2":
        return "Terça-feira";
      case "3":
        return "Quarta-feira";
      case "4":
        return "Quinta-feira";
      case "5":
        return "Sexta-feira";
      case "6":
        return "Sábado";
      default:
        return "Erro ao obter o dia da semana";
    }
  }

  adicionarAtividade() {
    this.recompensas.push({ src: this.atividadeDefault, rating: this.starEmpty });
    this.atualizarRecompensasLocalStorage();
  }

  removerAtividade(atividade: any): void {
    const index = this.recompensas.indexOf(atividade);
    if (index !== -1) {
      this.recompensas.splice(index, 1);
      if(atividade.rating == this.starFilled)
      {
        if(this.totalEstrelas)
          this.count = parseInt(this.totalEstrelas,10);
        this.count--;
        localStorage.setItem('totalEstrelas', this.count.toString());
        this.totalEstrelas = this.count < 10 ? '0' + localStorage.getItem('totalEstrelas') : localStorage.getItem('totalEstrelas');
      }
      this.atualizarRecompensasLocalStorage();
    }
  }

  private atualizarRecompensasLocalStorage(): void {
    localStorage.setItem('recompensas', JSON.stringify(this.recompensas));
  }
  private getStars(){
    const totalEstrelas = localStorage.getItem('totalEstrelas');
    if(totalEstrelas)
      this.count = parseInt(totalEstrelas,10);

    return this.count < 10 ? '0' + this.count : totalEstrelas;
  }
}
