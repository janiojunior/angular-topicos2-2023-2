import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaixaCardListComponent } from './components/faixa-card-list/faixa-card-list.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';

const routes: Routes = [
  {path: 'produtos', component: FaixaCardListComponent},
  {path: 'carrinho', component: CarrinhoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompraRoutingModule { }
