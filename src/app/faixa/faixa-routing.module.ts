import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaixaCardListComponent } from './components/faixa-card-list/faixa-card-list.component';

const routes: Routes = [
  {path: 'card-list', component: FaixaCardListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaixaRoutingModule { }
