import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaixaRoutingModule } from './faixa-routing.module';
import { FaixaCardListComponent } from './components/faixa-card-list/faixa-card-list.component';
import { FaixaFormComponent } from './components/faixa-form/faixa-form.component';
import { FaixaListComponent } from './components/faixa-list/faixa-list.component';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MatPaginatorModule } from '@angular/material/paginator';

import { FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    FaixaCardListComponent,
    FaixaFormComponent,
    FaixaListComponent
  ],
  imports: [
    CommonModule,
    FaixaRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FormsModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class FaixaModule { }
