import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AtividadesComponent } from './atividades/atividades.component';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app';
  starFilled = '../assets/img/starFilled.png';
  starEmpty = '../assets/img/starEmpty.png';
  count = 0;

  atividades = 
  [
    {src: '../assets/img/atividades/0.png', rating: this.starEmpty}
  ]

  constructor(private dialog: MatDialog) { }

  openDialog(atividade: any): void {
    const dialogRef = this.dialog.open(AtividadesComponent);

    dialogRef.componentInstance.atividadeSelecionada.subscribe((src: string) => {
      atividade.src = src;
      dialogRef.close(); 
    });
  }

  changeRating(atividade: any): void {
    if(atividade.rating === this.starFilled)
    {
      atividade.rating = this.starEmpty;
      this.count --;
    }
    else
    {
      atividade.rating = this.starFilled;
      this.count ++;
    }
  }
  
  weekday(){
    const hoje = new Date();
    const diaDaSemana = hoje.getDay();

  switch (diaDaSemana) {
    case 0:
      return "Domingo";
    case 1:
      return "Segunda-feira";
    case 2:
      return "Terça-feira";
    case 3:
      return "Quarta-feira";
    case 4:
      return "Quinta-feira";
    case 5:
      return "Sexta-feira";
    case 6:
      return "Sábado";
    default:
      return "Erro ao obter o dia da semana";
    }
  }

  adicionarAtividade(){
    this.atividades.push({src: '../assets/img/atividades/0.png', rating: this.starEmpty});
  }

  removerAtividade(atividade: any): void {
    const index = this.atividades.indexOf(atividade);
    if (index !== -1) {
      this.atividades.splice(index, 1);
    }
  }
}
