import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SaleService } from '../../services/sale';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.page.html',
  styleUrls: ['./vendas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class VendasPage implements OnInit {

  vendas: any[] = [];
  carregando = true;
  totalReceita = 0;

  constructor(private saleService: SaleService) {}

  ngOnInit() { this.carregar(); }

  carregar() {
    this.carregando = true;
    this.saleService.listSales().subscribe({
      next: (data) => {
        this.vendas = data.sort((a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.totalReceita = data.reduce(
          (acc: number, v: any) => acc + (v.totalAmount ?? 0), 0
        );
        this.carregando = false;
      },
      error: () => { this.carregando = false; }
    });
  }

  refresh(event: any) {
    this.carregar();
    setTimeout(() => event.target.complete(), 1500);
  }

  moeda(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency', currency: 'BRL'
    });
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }
}