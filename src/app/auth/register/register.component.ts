import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Método para registrar al usuario
  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Registro fallido. Intente nuevamente.';
      },
    });
  }

  // Navegar al formulario de inicio de sesión
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Validar y bloquear caracteres especiales en el campo de username
  validateUsername(event: KeyboardEvent) {
    const regex = /^[a-zA-Z0-9]*$/;
    const inputChar = event.key;
    if (!regex.test(inputChar)) {
      event.preventDefault(); // Bloquea la entrada del carácter no permitido
    }
  }

  // Validar y bloquear caracteres especiales en el campo de password
  validatePassword(event: KeyboardEvent) {
    const regex = /^[a-zA-Z0-9]*$/;
    const inputChar = event.key;
    if (!regex.test(inputChar)) {
      event.preventDefault(); // Bloquea la entrada del carácter no permitido
    }
  }
}
