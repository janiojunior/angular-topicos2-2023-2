import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaixaRoutingModule } from './faixa-routing.module';
import { FaixaCardListComponent } from './components/faixa-card-list/faixa-card-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    FaixaCardListComponent
  ],
  imports: [
    CommonModule,
    FaixaRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class FaixaModule { }
