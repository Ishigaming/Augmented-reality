import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    try {
      const user = await this.authService.login(this.email, this.password);
      if (user) {
        this.router.navigate(['/home']);
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
    }
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
