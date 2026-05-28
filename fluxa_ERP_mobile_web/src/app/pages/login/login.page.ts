import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// ← Seus services reais, copiados do projeto Angular
import { UserService } from '../../services/user';
import { UserAuthService } from '../../services/user-auth';

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
    // TODO: Implementar fluxo de recuperação de senha
    alert('Funcionalidade em desenvolvimento');
  }

  entrar() {
    if (!this.emailValido || !this.senha) {
      this.erro = 'Preencha os dados corretamente.';
      return;
    }

    this.carregando = true;
    this.erro = '';

    // Chama o mesmo service que seu site web usa
    this.userService.login(this.email, this.senha).subscribe({
      next: (resposta) => {
        // Salva o token (igual ao seu site)
        this.userAuthService.setUserToken(resposta.token);

        this.carregando = false;

        // Vai para o dashboard
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