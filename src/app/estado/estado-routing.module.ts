import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadoListComponent } from './components/estado-list/estado-list.component';
import { EstadoFormComponent } from './components/estado-form/estado-form.component';

const routes: Routes = [
  {path: 'list', component: EstadoListComponent},
  {path: 'new', component: EstadoFormComponent},
  {path: 'edit/:id', component: EstadoFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadoRoutingModule { }
