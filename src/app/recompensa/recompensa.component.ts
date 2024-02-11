import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListaRecompensasComponent } from '../modais/lista-recompensas/lista-recompensas.component';
import { ValorRecompensaComponent } from '../modais/valor-recompensa/valor-recompensa.component';

@Component({
  selector: 'app-recompensa',
  templateUrl: './recompensa.component.html',
  styleUrl: './recompensa.component.scss'
})
export class RecompensaComponent {
  starFilled = '../assets/img/starFilled.png';
  starEmpty = '../assets/img/starEmpty.png';
  countStars = 0;
  totalEstrelas = this.getStars();
  recompensas: any[];
  recompensaDefault = '../assets/img/default.png';

  constructor(private dialog: MatDialog) {
    const storedRecompensas = localStorage.getItem('recompensas');
    this.recompensas = storedRecompensas ? JSON.parse(storedRecompensas) : [{ src: this.recompensaDefault, valor: 0 }];
  }

  openDialog(recompensa: any): void {
    const dialogLista = this.dialog.open(ListaRecompensasComponent);    

    dialogLista.componentInstance.recompensaSelecionada.subscribe((src: string) => {
      recompensa.src = src;
      dialogLista.close();

      const dialogValor = this.dialog.open(ValorRecompensaComponent);
      dialogValor.componentInstance.valorCadastrado.subscribe((valor: number) => {
      recompensa.valor = valor;
      dialogValor.close();
      this.atualizarRecompensasLocalStorage();
      });      
    });
  }

  adicionarRecompensa() {
    this.recompensas.push({ src: this.recompensaDefault, valor: 0 });
    this.atualizarRecompensasLocalStorage();
  }

  removerRecompensa(recompensa: any): void {
    const index = this.recompensas.indexOf(recompensa);
    if (index !== -1) {
      this.recompensas.splice(index, 1);
      this.atualizarRecompensasLocalStorage();
    }
  }

  private atualizarRecompensasLocalStorage(): void {
    localStorage.setItem('recompensas', JSON.stringify(this.recompensas));
  }

  private getStars(){
    const totalEstrelas = localStorage.getItem('totalEstrelas');
    if(totalEstrelas)
      this.countStars = parseInt(totalEstrelas,10);

    return this.countStars < 10 ? '0' + this.countStars : totalEstrelas;
  }

  resgatarRecompensa(recompensa: any){
    if (recompensa.valor <= this.countStars) {
      this.countStars = this.countStars - recompensa.valor;
        localStorage.setItem('totalEstrelas', (this.countStars).toString());
        this.totalEstrelas = this.getStars();
    }
    else {
      alert("Você não possui pontos suficientes para resgatar este prêmio.");
  }
  }
}
