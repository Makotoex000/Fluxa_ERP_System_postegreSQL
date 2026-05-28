import { Component } from '@angular/core';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';
import { SaleService } from '../../services/sale';
import { SupplierService } from '../../services/supplier';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class DashboardPage implements ViewWillEnter {

  totalProdutos     = 0;
  totalVendas       = 0;
  totalFornecedores = 0;
  receitaTotal      = 0;
  topProdutos: any[] = [];
  carregando = true;

  constructor(
    private userService: UserService,
    private saleService: SaleService,
    private supplierService: SupplierService,
    private router: Router
  ) {}

  /**
   * RESOLUÇÃO DO BUG: ionViewWillEnter executa TODA VEZ que o usuário entra na aba.
   * Diferente do ngOnInit, ele ignora o cache automático de abas do Ionic.
   */
  ionViewWillEnter() {
    this.carregarDados();
  }

  carregarDados(event?: any) {
    // Se vier do Pull-to-Refresh, não ativa o esqueleto piscando para não quebrar a UI
    if (!event) {
      this.carregando = true;
    }

    // Busca todas as APIs em paralelo (Performance máxima)
    forkJoin({
      produtos:     this.userService.listProducts(),
      vendas:       this.saleService.listSales(),
      fornecedores: this.supplierService.listSuppliers(),
    }).subscribe({
      next: ({ produtos, vendas, fornecedores }) => {
        this.totalProdutos     = produtos ? produtos.length : 0;
        this.totalVendas       = vendas ? vendas.length : 0;
        this.totalFornecedores = fornecedores ? fornecedores.length : 0;
        
        // Mapeia os 3 primeiros produtos para a listagem
        this.topProdutos       = produtos ? produtos.slice(0, 3) : [];

        // Calcula a receita somando o totalAmount de cada venda de forma segura
        this.receitaTotal = vendas ? vendas.reduce(
          (acc: number, v: any) => acc + (v.totalAmount ?? 0), 0
        ) : 0;

        this.finalizarCarregamento(event);
      },
      error: (err) => {
        console.error('Erro ao atualizar painel do Fluxa:', err);
        this.finalizarCarregamento(event);
      }
    });
  }

  /**
   * Centraliza o encerramento dos estados de loading
   */
  private finalizarCarregamento(event?: any) {
    this.carregando = false;
    if (event) {
      event.target.complete(); // Fecha o refresher na hora exata que a API responde
    }
  }

  /**
   * Pull-to-refresh otimizado repassando o evento nativo
   */
  refresh(event: any) {
    this.carregarDados(event);
  }

  sair() {
    localStorage.clear();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  moeda(valor: number): string {
    if (valor === undefined || valor === null) return 'R$ 0';
    return valor.toLocaleString('pt-BR', {
      style: 'currency', 
      currency: 'BRL', 
      maximumFractionDigits: 0 // Mantém o padrão compacto do layout Vanaheim
    });
  }
}