import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';
import { SaleService } from '../../services/sale';

interface CartItem {
  product: any;
  quantity: number;
  subtotal: number;
}

@Component({
  selector: 'app-pdv',
  templateUrl: './pdv.page.html',   // ← aponta para pdv.page.html
  styleUrls: ['./pdv.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PdvPage implements OnInit {  // ← classe PdvPage (não ProdutosPage)

  produtos: any[] = [];
  produtosFiltrados: any[] = [];
  carrinho: CartItem[] = [];
  busca = '';
  carregando = true;
  finalizando = false;

  constructor(
    private userService: UserService,
    private saleService: SaleService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router,
  ) {}

  ngOnInit() { this.carregarProdutos(); }

  carregarProdutos() {
    this.carregando = true;
    this.userService.listProducts().subscribe({
      next: (data) => {
        this.produtos = (data ?? []).filter(
          (p: any) => p.quantity > 0 && p.status === 'anunciado'
        );
        this.produtosFiltrados = [...this.produtos];
        this.carregando = false;
      },
      error: () => { this.carregando = false; }
    });
  }

  filtrar() {
    const termo = this.busca.toLowerCase().trim();
    if (!termo) {
      this.produtosFiltrados = [...this.produtos];
      return;
    }
    this.produtosFiltrados = this.produtos.filter(p =>
      p.title?.toLowerCase().includes(termo) ||
      p.category?.toLowerCase().includes(termo)
    );
  }

  // ── Carrinho ──────────────────────────────────────

  adicionarAoCarrinho(produto: any) {
    const existente = this.carrinho.find(i => i.product.id === produto.id);
    if (existente) {
      if (existente.quantity < produto.quantity) {
        existente.quantity++;
        existente.subtotal = existente.quantity * produto.sale_price;
      } else {
        this.mostrarToast(`Estoque máximo: ${produto.quantity} un`, 'warning');
      }
    } else {
      this.carrinho.push({
        product: produto,
        quantity: 1,
        subtotal: produto.sale_price,
      });
    }
  }

  removerDoCarrinho(item: CartItem) {
    const no = this.carrinho.find(i => i.product.id === item.product.id);
    if (!no) return;
    if (no.quantity > 1) {
      no.quantity--;
      no.subtotal = no.quantity * no.product.sale_price;
    } else {
      this.carrinho = this.carrinho.filter(i => i.product.id !== item.product.id);
    }
  }

  removerItemCompleto(item: CartItem) {
    this.carrinho = this.carrinho.filter(i => i.product.id !== item.product.id);
  }

  quantidadeNoCarrinho(produto: any): number {
    return this.carrinho.find(i => i.product.id === produto.id)?.quantity ?? 0;
  }

  get totalItens(): number {
    return this.carrinho.reduce((acc, i) => acc + i.quantity, 0);
  }

  get totalValor(): number {
    return this.carrinho.reduce((acc, i) => acc + i.subtotal, 0);
  }

  // ── Finalizar venda ───────────────────────────────

  async confirmarVenda() {
    if (this.carrinho.length === 0) {
      this.mostrarToast('Adicione produtos ao carrinho', 'warning');
      return;
    }
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Venda',
      message: `Total: ${this.moeda(this.totalValor)} · ${this.totalItens} item(s)`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Finalizar', handler: () => this.finalizarVenda() },
      ],
    });
    await alert.present();
  }

  finalizarVenda() {
    this.finalizando = true;
    const payload = {
      items: this.carrinho.map(i => ({
        productId: i.product.id,
        quantity: i.quantity,
      })),
    };
    this.saleService.createSale(payload as any).subscribe({
      next: async () => {
        this.finalizando = false;
        this.carrinho = [];
        this.mostrarToast('✅ Venda realizada com sucesso!', 'success');
        this.carregarProdutos();
      },
      error: async (err) => {
        this.finalizando = false;
        this.mostrarToast(`❌ ${err.message ?? 'Erro ao finalizar venda.'}`, 'danger');
      },
    });
  }

  // ── Helpers ───────────────────────────────────────

  moeda(valor: number): string {
    if (valor === undefined || valor === null) return 'R$ 0,00';
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  async mostrarToast(msg: string, color: string) {
    const t = await this.toastCtrl.create({
      message: msg, duration: 2500, color, position: 'top',
    });
    t.present();
  }
}