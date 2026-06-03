import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user';
import { SaleService } from '../../services/sale';

interface CartItem {
  product: any;
  quantity: number;
  subtotal: number;
}

@Component({
  selector: 'app-pdv',
  templateUrl: './pdv.page.html',
  styleUrls: ['./pdv.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class PdvPage implements OnInit {

  produtos: any[] = [];
  produtosFiltrados: any[] = [];
  carrinho: CartItem[] = [];
  busca = '';
  carregando = true;
  finalizando = false;

  constructor(
    private userService: UserService,
    private saleService: SaleService,
    private zone: NgZone,
  ) {}

  ngOnInit() { this.carregarProdutos(); }

  carregarProdutos() {
    this.carregando = true;
    this.userService.listProducts().subscribe({
      next: (data) => {
        this.zone.run(() => {
          this.produtos = (data ?? []).filter(
            (p: any) => p.quantity > 0 && p.status === 'anunciado'
          );
          this.produtosFiltrados = [...this.produtos];
          this.carregando = false;
        });
      },
      error: () => { this.zone.run(() => { this.carregando = false; }); }
    });
  }

  filtrar() {
    const termo = this.busca.toLowerCase().trim();
    this.produtosFiltrados = !termo
      ? [...this.produtos]
      : this.produtos.filter(p =>
          p.title?.toLowerCase().includes(termo) ||
          p.category?.toLowerCase().includes(termo)
        );
  }

  // ── Carrinho ──────────────────────────────────────

  adicionarAoCarrinho(produto: any) {
    this.zone.run(() => {
      const existente = this.carrinho.find(i => i.product.id === produto.id);
      if (existente) {
        if (existente.quantity < produto.quantity) {
          existente.quantity++;
          existente.subtotal = existente.quantity * Number(produto.sale_price);
          this.carrinho = [...this.carrinho];
        } else {
          this.toast(`Estoque máximo: ${produto.quantity} un`, 'warning');
        }
      } else {
        this.carrinho = [...this.carrinho, {
          product: produto,
          quantity: 1,
          subtotal: Number(produto.sale_price),
        }];
      }
    });
  }

  removerDoCarrinho(item: CartItem) {
    this.zone.run(() => {
      const no = this.carrinho.find(i => i.product.id === item.product.id);
      if (!no) return;
      if (no.quantity > 1) {
        no.quantity--;
        no.subtotal = no.quantity * Number(no.product.sale_price);
        this.carrinho = [...this.carrinho];
      } else {
        this.carrinho = this.carrinho.filter(i => i.product.id !== item.product.id);
      }
    });
  }

  removerItemCompleto(item: CartItem) {
    this.zone.run(() => {
      this.carrinho = this.carrinho.filter(i => i.product.id !== item.product.id);
    });
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

  confirmarVenda() {
    if (this.carrinho.length === 0) {
      this.toast('Adicione produtos ao carrinho', 'warning');
      return;
    }
    const ok = window.confirm(
      `Confirmar venda?\n\nTotal: ${this.moeda(this.totalValor)}\n${this.totalItens} item(s)`
    );
    if (ok) this.finalizarVenda();
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
      next: () => {
        this.zone.run(() => {
          this.finalizando = false;
          this.carrinho = [];
          this.toast('Venda realizada com sucesso!', 'success');
          this.carregarProdutos();
        });
      },
      error: (err) => {
        this.zone.run(() => {
          this.finalizando = false;
          this.toast(err.message ?? 'Erro ao finalizar venda.', 'danger');
        });
      },
    });
  }

  // ── Helpers ───────────────────────────────────────

  moeda(valor: number): string {
    if (valor == null) return 'R$ 0,00';
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  toast(msg: string, tipo: 'success' | 'warning' | 'danger') {
    const colors: Record<string, string> = {
      success: '#10b981',
      warning: '#f59e0b',
      danger:  '#f72585',
    };
    const el = document.createElement('div');
    el.textContent = msg;
    Object.assign(el.style, {
      position:     'fixed',
      top:          '24px',
      left:         '50%',
      transform:    'translateX(-50%)',
      background:   colors[tipo] ?? '#333',
      color:        '#fff',
      padding:      '12px 20px',
      borderRadius: '10px',
      fontSize:     '0.9rem',
      fontWeight:   '600',
      zIndex:       '99999',
      maxWidth:     '90vw',
      textAlign:    'center',
      boxShadow:    '0 4px 20px rgba(0,0,0,0.4)',
      pointerEvents:'none',
    });
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2500);
  }
}
