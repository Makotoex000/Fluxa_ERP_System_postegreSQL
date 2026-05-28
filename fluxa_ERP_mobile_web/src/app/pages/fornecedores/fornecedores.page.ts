import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupplierService } from '../../services/supplier';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.page.html',
  styleUrls: ['./fornecedores.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class FornecedoresPage implements OnInit {

  fornecedores: any[] = [];
  filtrados: any[] = [];
  busca = '';
  carregando = true;

  constructor(private supplierService: SupplierService) {}

  ngOnInit() { this.carregar(); }

  carregar() {
    this.carregando = true;
    this.supplierService.listSuppliers().subscribe({
      next: (data) => {
        this.fornecedores = data;
        this.filtrados = data;
        this.carregando = false;
      },
      error: () => { this.carregando = false; }
    });
  }

  filtrar() {
    const termo = this.busca.toLowerCase();
    this.filtrados = this.fornecedores.filter(f =>
      f.companyName.toLowerCase().includes(termo) ||
      (f.contactName ?? '').toLowerCase().includes(termo)
    );
  }

  refresh(event: any) {
    this.carregar();
    setTimeout(() => event.target.complete(), 1500);
  }

  iniciais(nome: string): string {
    return nome?.split(' ').slice(0, 2)
      .map((n: string) => n[0]).join('').toUpperCase() ?? '?';
  }
}