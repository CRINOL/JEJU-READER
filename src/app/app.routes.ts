import { Routes } from '@angular/router';
import { ScannerPage } from './scanner/scanner.page';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'scanner',
    loadComponent: () => import('./scanner/scanner.page').then( m => m.ScannerPage)
  },
  {
    path: 'sales-history',
    loadComponent: () => import('./sales-history/sales-history.page').then( m => m.SalesHistoryPage)
  },
  {
    path: 'sale-ticket',
    loadComponent: () => import('./sale-ticket/sale-ticket.page').then( m => m.SaleTicketPage)
  },
  {
    path: 'device-info',
    loadComponent: () => import('./device-info/device-info.page').then( m => m.DeviceInfoPage)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.page').then( m => m.AboutPage)
  },
  {
    path: 'verify',
    loadComponent: () => import('./verify/verify.page').then( m => m.VerifyPage)
  }


];
