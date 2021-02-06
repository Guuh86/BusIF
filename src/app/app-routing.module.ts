import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'aluno-contact',
    loadChildren: () => import('./aluno/contato/contato.module').then( m => m.ContatoPageModule)
  },
  {
    path: 'aluno-info',
    loadChildren: () => import('./aluno/info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'aluno-map',
    loadChildren: () => import('./aluno/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'aluno-menu',
    loadChildren: () => import('./aluno/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'aluno-stops',
    loadChildren: () => import('./aluno/paradas/paradas.module').then( m => m.ParadasPageModule)
  },
  {
    path: 'motorista-alert',
    loadChildren: () => import('./motorista/alerta/alerta.module').then( m => m.AlertaPageModule)
  },
  {
    path: 'motorista-alert/:id',
    loadChildren: () => import('./motorista/alerta/alerta.module').then( m => m.AlertaPageModule)
  },
  {
    path: 'motorista-map',
    loadChildren: () => import('./motorista/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'motorista-menu',
    loadChildren: () => import('./motorista/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./login/register/register.module').then( m => m.RegisterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
