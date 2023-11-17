import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaixaCardListComponent } from './components/faixa-card-list/faixa-card-list.component';
import { FaixaListComponent } from './components/faixa-list/faixa-list.component';
import { FaixaFormComponent } from './components/faixa-form/faixa-form.component';
import { faixaResolver } from './resolver/faixa-resolver';

const routes: Routes = [
  {path: 'card-list', component: FaixaCardListComponent},
  {path: 'list', component: FaixaListComponent},
  {path: 'new', component: FaixaFormComponent},
  {path: 'edit/:id', component: FaixaFormComponent, resolve: {faixa: faixaResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaixaRoutingModule { }
