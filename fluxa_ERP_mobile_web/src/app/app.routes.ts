import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'tabs',
    loadComponent: () =>
      import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
      },
      {
        path: 'produtos',
        loadComponent: () =>
          import('./pages/produtos/produtos.page').then(m => m.ProdutosPage),
      },
      {
        path: 'pdv',
        loadComponent: () =>
          import('./pages/pdv/pdv.page').then(m => m.PdvPage),
      },
      {
        path: 'fornecedores',
        loadComponent: () =>
          import('./pages/fornecedores/fornecedores.page').then(m => m.FornecedoresPage),
      },
      {
        path: 'vendas',
        loadComponent: () =>
          import('./pages/vendas/vendas.page').then(m => m.VendasPage),
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('./pages/perfil/perfil.page').then(m => m.PerfilPage),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login' },  {
    path: 'pdv',
    loadComponent: () => import('./pages/pdv/pdv.page').then( m => m.PdvPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.page').then( m => m.PerfilPage)
  },

];
