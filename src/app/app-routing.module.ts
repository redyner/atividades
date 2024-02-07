import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RecompensasComponent } from './recompensas/recompensas.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'recompensas', component: RecompensasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
