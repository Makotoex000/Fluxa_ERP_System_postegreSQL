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
  nomeExibido = '';
  totalProdutos = 0;

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
    this.carregarUsuario();
    this.userService.listProducts().subscribe({
      next: (p) => this.totalProdutos = p.length,
      error: () => {},
    });
  }

  carregarUsuario() {
    // Decodifica o JWT para pegar o email do usuário logado
    const token = this.userAuthService.getUserToken();

    if (token) {
      try {
        // O JWT tem 3 partes separadas por ponto: header.payload.signature
        // O payload (parte do meio) contém os dados do usuário
        const payload = token.split('.')[1];

        // Decodifica o base64
        const decoded = JSON.parse(atob(payload));

        // Pega o email — ajuste o campo se o seu JWT usar outro nome
        this.email = decoded.email
                  ?? decoded.sub
                  ?? decoded.username
                  ?? 'usuario@fluxa.com';

        // Nome para exibição (parte antes do @)
        this.nomeExibido = this.email.split('@')[0];

        console.log('Usuário decodificado:', decoded);

      } catch (e) {
        console.error('Erro ao decodificar token:', e);
        this.email = 'usuario@fluxa.com';
        this.nomeExibido = 'usuario';
      }
    } else {
      // Sem token — volta para login
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }

  get iniciais(): string {
    return this.nomeExibido.slice(0, 2).toUpperCase();
  }

  async confirmarSaida() {
    const alert = await this.alertCtrl.create({
      header: 'Sair da conta',
      message: 'Tem certeza que deseja encerrar a sessão?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Sair',
          role: 'destructive',
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