import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ListaAtividadesComponent } from './modais/lista-atividades/lista-atividades.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RecompensaComponent } from './recompensa/recompensa.component';
import { ListaRecompensasComponent } from './modais/lista-recompensas/lista-recompensas.component';
import { AtividadeComponent } from './atividade/atividade.component';
import { ValorRecompensaComponent } from './modais/valor-recompensa/valor-recompensa.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListaAtividadesComponent,
    AppComponent,
    RecompensaComponent,
    ListaRecompensasComponent,
    AtividadeComponent,
    ValorRecompensaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
