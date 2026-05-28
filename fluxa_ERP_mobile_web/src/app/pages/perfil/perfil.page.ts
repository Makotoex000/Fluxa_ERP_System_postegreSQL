// src/app/pages/perfil/perfil.page.ts
import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class PerfilPage implements OnInit {

  email = '';
  totalProdutos = 0;
  totalVendas = 0;

  infoApp = [
    { icon: '📱', label: 'Versão', value: 'v1.0.0 · Mobile' },
    { icon: '🏢', label: 'Sistema', value: 'Fluxa ERP' },
    { icon: '⚡', label: 'Módulos', value: 'Estoque · Vendas · Fornecedores' },
  ];

  constructor(
    private userAuthService: UserAuthService,
    private userService: UserService,
    private router: Router,
    private alertCtrl: AlertController,
  ) {}

  ngOnInit() {
    // Recupera email do localStorage
    const userStr = localStorage.getItem('user') ??
                    localStorage.getItem('fluxa_user') ?? '{}';
    try {
      const user = JSON.parse(userStr);
      this.email = user.email ?? 'usuario@fluxa.com';
    } catch {
      this.email = 'usuario@fluxa.com';
    }

    // Carrega estatísticas
    this.userService.listProducts().subscribe({
      next: (p) => this.totalProdutos = p.length,
      error: () => {},
    });
  }

  get iniciais(): string {
    const nome = this.email.split('@')[0];
    return nome.slice(0, 2).toUpperCase();
  }

  get nomeUsuario(): string {
    return this.email.split('@')[0];
  }

  async confirmarSaida() {
    const alert = await this.alertCtrl.create({
      header: 'Sair da conta',
      message: 'Tem certeza que deseja encerrar a sessão?',
      cssClass: 'fluxa-alert',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Sair',
          role: 'destructive',
          cssClass: 'alert-danger',
          handler: () => this.sair(),
        },
      ],
    });
    await alert.present();
  }

  sair() {
    this.userAuthService.removeUserToken();
    localStorage.clear();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
