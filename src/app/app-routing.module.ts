import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
<<<<<<< HEAD
   {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
   {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
=======
>>>>>>> 49b0e980d2afd9a0fb86a99e2ca4a537d5744aaa
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
<<<<<<< HEAD
   {
    path: '',
    redirectTo: 'login',
=======
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
   {
    path: 'ar-launcher',
    loadChildren: () => import('./ar-launcher/ar-launcher.module').then( m => m.ARLauncherPageModule)
  },
   {
    path: '',
    redirectTo: 'home',
>>>>>>> 49b0e980d2afd9a0fb86a99e2ca4a537d5744aaa
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
