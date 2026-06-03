import { Component } from '@angular/core';
import { appVersion } from '../../../environments/environment';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Importando os ícones necessários
import { addIcons } from 'ionicons';
import { flash, mail, lockClosed, eyeOutline, eyeOffOutline, alertCircleOutline } from 'ionicons/icons';

// Seus services reais
import { UserService } from '../../services/user';
import { UserAuthService } from '../../services/user-auth';

// REGISTRANDO OS ÍCONES PARA O IONIC RECONHECER
addIcons({
  'flash': flash,
  'mail': mail,
  'lock-closed': lockClosed,
  'eye-outline': eyeOutline,
  'eye-off-outline': eyeOffOutline,
  'alert-circle-outline': alertCircleOutline
});

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class LoginPage {
  email = '';
  senha = '';
  carregando = false;
  erro = '';
  mostrarSenha = false;
  emailValido = false;
  emailFocused = false;
  senhaFocused = false;
  versao = `v${appVersion}`;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  validarEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailValido = regex.test(this.email);
  }

  esqueceuSenha() {
    alert('Funcionalidade em desenvolvimento');
  }

  onEmailClick() {
    try {
      const el = document.getElementById('emailInput') as HTMLInputElement | null;
      if (el) el.focus();
    } catch (e) {}
  }

  onSenhaClick() {
    try {
      const el = document.getElementById('senhaInput') as HTMLInputElement | null;
      if (el) el.focus();
    } catch (e) {}
  }

  entrar() {
    if (!this.emailValido || !this.senha) {
      this.erro = 'Preencha os dados corretamente.';
      return;
    }

    this.carregando = true;
    this.erro = '';

    this.userService.login(this.email, this.senha).subscribe({
      next: (resposta) => {
        this.userAuthService.setUserToken(resposta.token);
        this.carregando = false;
        this.router.navigate(['/tabs/dashboard'], { replaceUrl: true });
      },
      error: (err) => {
        this.carregando = false;
        this.erro = err.status === 401
          ? 'E-mail ou senha incorretos.'
          : 'Erro ao conectar. Verifique se o backend está rodando.';
      }
    });
  }
}