import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AtividadesComponent } from './atividades/atividades.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  starFilled = '../assets/img/starFilled.png';
  starEmpty = '../assets/img/starEmpty.png';
  count = 0;
  totalEstrelas = this.getStars();
  atividades: any[];
  atividadeDefault = '../assets/img/default.png';

  constructor(private dialog: MatDialog) {
    const storedAtividades = localStorage.getItem('atividades');
    this.atividades = storedAtividades ? JSON.parse(storedAtividades) : [{ src: this.atividadeDefault, rating: this.starEmpty }];
    setInterval(() => {
      const diaDaSemanaAtual = new Date().getDay().toString();
      if(diaDaSemanaAtual != localStorage.getItem('diaDaSemanda'))
      {
        localStorage.setItem('diaDaSemanda', diaDaSemanaAtual);
        this.atividades = this.atividades.map(atividade => ({
          src: atividade.src,
          rating: this.starEmpty
        }));
        this.atualizarAtividadesLocalStorage();
      }
    }, 1000);
  }

  openDialog(atividade: any): void {
    const dialogRef = this.dialog.open(AtividadesComponent);

    dialogRef.componentInstance.atividadeSelecionada.subscribe((src: string) => {
      atividade.src = src;
      dialogRef.close();
      this.atualizarAtividadesLocalStorage();
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
    this.atualizarAtividadesLocalStorage();
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
    this.atividades.push({ src: this.atividadeDefault, rating: this.starEmpty });
    this.atualizarAtividadesLocalStorage();
  }

  removerAtividade(atividade: any): void {
    const index = this.atividades.indexOf(atividade);
    if (index !== -1) {
      this.atividades.splice(index, 1);
      if(atividade.rating == this.starFilled)
      {
        if(this.totalEstrelas)
          this.count = parseInt(this.totalEstrelas,10);
        this.count--;
        localStorage.setItem('totalEstrelas', this.count.toString());
        this.totalEstrelas = this.count < 10 ? '0' + localStorage.getItem('totalEstrelas') : localStorage.getItem('totalEstrelas');
      }
      this.atualizarAtividadesLocalStorage();
    }
  }

  private atualizarAtividadesLocalStorage(): void {
    localStorage.setItem('atividades', JSON.stringify(this.atividades));
  }
  private getStars(){
    const totalEstrelas = localStorage.getItem('totalEstrelas');
    if(totalEstrelas)
      this.count = parseInt(totalEstrelas,10);

    return this.count < 10 ? '0' + this.count : totalEstrelas;
  }
}
