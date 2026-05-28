// src/app/pages/produtos/produtos.page.ts
import { Component } from '@angular/core';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html', 
  styleUrls: ['./produtos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ProdutosPage implements ViewWillEnter {


  produtos: any[] = [];
  produtosFiltrados: any[] = [];
  busca = '';
  carregando = true;

  constructor(private userService: UserService) {}

  /**
   * OTIMIZAÇÃO DE CACHE: Substituído o OnInit por ViewWillEnter do Ionic.
   * Garante a atualização instantânea das quantidades físicas em estoque
   * sempre que você sair do PDV e abrir a listagem de mercadorias.
   */
  ionViewWillEnter() {
    this.carregar();
  }

  carregar(event?: any) {
    if (!event) this.carregando = true;

    this.userService.listProducts().subscribe({
      next: (data) => {
        this.produtos = data ?? [];
        this.filtrar(); // Mantém os filtros aplicados de forma persistente
        this.finalizarCarregamento(event);
      },
      error: (err) => {
        console.error('Erro ao buscar produtos no Fluxa:', err);
        this.finalizarCarregamento(event);
      }
    });
  }

  filtrar() {
    const termo = this.busca.toLowerCase().trim();
    if (!termo) {
      this.produtosFiltrados = [...this.produtos];
      return;
    }
    // Proteção de propriedades (?.) adicionada contra valores nulos
    this.produtosFiltrados = this.produtos.filter(p =>
      p.title?.toLowerCase().includes(termo) ||
      p.category?.toLowerCase().includes(termo)
    );
  }

  private finalizarCarregamento(event?: any) {
    this.carregando = false;
    if (event) {
      event.target.complete(); // Encerra o Pull-to-refresh no tempo real da resposta HTTP
    }
  }

  refresh(event: any) {
    this.carregar(event);
  }

  // DESEMPENHO: Rastreia os registros unicamente no DOM para zerar o delay de digitação
  trackByProductId(index: number, item: any): number {
    return item.id;
  }

  moeda(valor: number): string {
    if (valor === undefined || valor === null) return 'R$ 0,00';
    return valor.toLocaleString('pt-BR', {
      style: 'currency', 
      currency: 'BRL'
    });
  }
}