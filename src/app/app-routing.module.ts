import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { AdminTemplateComponent } from './shared/components/admin-template/admin-template.component';
import { EstadoFormComponent } from './estado/components/estado-form/estado-form.component';
import { UserTemplateComponent } from './shared/components/user-template/user-template.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminTemplateComponent,
    children: [
      { path: 'estados', loadChildren:
      () => import('./estado/estado.module')
        .then(m => m.EstadoModule)},
      { path: 'cidades', loadChildren:
      () => import('./cidade/cidade.module')
        .then(m => m.CidadeModule)},
      { path: 'faixas', loadChildren:
      () => import('./faixa/faixa.module')
        .then(m => m.FaixaModule)},
    ],
  },
  {
    path: 'user',
    component: UserTemplateComponent,
    children: [
      { path: 'login', component: LoginComponent },
      // { path: 'register', component: RegisterComponent },
    ],
  },
  { path: '', redirectTo: '/user', pathMatch: 'full' }, // Rota padrão
  { path: '**', redirectTo: '/user' }, // Rota para tratamento de erro
];


// const routes: Routes = [
//   {
//     path: 'estados', loadChildren:
//       () => import('./estado/estado.module')
//         .then(m => m.EstadoModule)
//   },

//   {
//     path: 'cidades', loadChildren:
//       () => import('./cidade/cidade.module')
//         .then(m => m.CidadeModule)
//   },

//   {
//     path: 'faixas', loadChildren:
//       () => import('./faixa/faixa.module')
//         .then(m => m.FaixaModule)
//   },

//   // {
//   //   path: 'auth', loadChildren:
//   //     () => import('./auth/auth.module')
//   //       .then(m => m.AuthModule)
//   // },

//   // {
//   //   path: 'login', // Adicione a rota de login
//   //   component: LoginComponent, // Componente de login (pode ser seu LoginComponent)
//   // }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
