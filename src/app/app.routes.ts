import { Routes } from '@angular/router';
import { ScannerPage } from './scanner/scanner.page';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'scanner',
    pathMatch: 'full',
  },
  {
    path: 'scanner',
    loadComponent: () => import('./scanner/scanner.page').then( m => m.ScannerPage)
  }

];
