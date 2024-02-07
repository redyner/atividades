import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecompensaComponent } from './recompensa/recompensa.component';
import { AtividadeComponent } from './atividade/atividade.component';

const routes: Routes = [
  {path: '', component: AtividadeComponent},
  {path: 'recompensa', component: RecompensaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
