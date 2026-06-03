import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../../services/user';
import { SaleService } from '../../services/sale';
import { SupplierService } from '../../services/supplier';
import { forkJoin, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class DashboardPage implements OnInit, OnDestroy {

  totalProdutos = 0;
  totalVendas = 0;
  totalFornecedores = 0;
  receitaTotal = 0;
  topProdutos: any[] = [];
  carregando = true;
  private rotaSub: Subscription | null = null;

  constructor(
    private userService: UserService,
    private saleService: SaleService,
    private supplierService: SupplierService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.carregarDados();
    this.rotaSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        if (e.url.includes('/dashboard')) this.carregarDados();
      });
  }

  ngOnDestroy() { this.rotaSub?.unsubscribe(); }

  carregarDados() {
    this.carregando = true;

    // Busca tudo ao mesmo tempo (mais rápido)
    forkJoin({
      produtos: this.userService.listProducts(),
      vendas: this.saleService.listSales(),
      fornecedores: this.supplierService.listSuppliers(),
    }).subscribe({
      next: ({ produtos, vendas, fornecedores }) => {
        this.totalProdutos = produtos.length;
        this.totalVendas = vendas.length;
        this.totalFornecedores = fornecedores.length;
        this.topProdutos = produtos.slice(0, 3);

        // Calcula receita somando todas as vendas
        this.receitaTotal = vendas.reduce(
          (acc: number, v: any) => acc + Number(v.totalAmount ?? 0), 0
        );

        this.carregando = false;
      },
      error: () => { this.carregando = false; }
    });
  }

  refresh(event: any) {
    this.carregarDados();
    setTimeout(() => event.target.complete(), 1500);
  }

  moeda(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency', currency: 'BRL', maximumFractionDigits: 0
    });
  }
}