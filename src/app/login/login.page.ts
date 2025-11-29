<<<<<<< HEAD
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> 49b0e980d2afd9a0fb86a99e2ca4a537d5744aaa

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
<<<<<<< HEAD
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
=======
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

>>>>>>> 49b0e980d2afd9a0fb86a99e2ca4a537d5744aaa
}
