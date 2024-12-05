import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = ''; // Nombre de usuario ingresado
  password = ''; // Contraseña ingresada
  errorMessage = ''; // Mensaje de error si el login falla

  constructor(private authService: AuthService, private router: Router) {}

  
  login() {
    // Validar manualmente el username antes de enviar
    if (!/^[a-zA-Z0-9]+$/.test(this.username)) {
      this.errorMessage = 'El nombre de usuario no debe contener caracteres especiales.';
      return;
    }
  
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        // Almacena el token en el almacenamiento local
        localStorage.setItem('token', res.token);
  
        // Redirige al usuario a la página de bienvenida después de iniciar sesión correctamente
        this.router.navigate(['/welcome']);
      },
      error: (err) => {
        // Verifica si el error está relacionado con la contraseña incorrecta
        if (err.error?.message === 'Incorrect password') {
          this.errorMessage = 'Contraseña incorrecta. Intenta de nuevo.';
        } else {
          this.errorMessage = err.error?.error || 'Error en el inicio de sesión.';
        }
      },
    });
  }
  

  validateUsername(event: KeyboardEvent) {
    const regex = /^[a-zA-Z0-9]*$/;
    const inputChar = event.key;
    if (!regex.test(inputChar)) {
      event.preventDefault(); // Bloquea la entrada del carácter no permitido
    }
  }
  validatePassword(event: KeyboardEvent) {
    const regex = /^[a-zA-Z0-9]*$/;
    const inputChar = event.key;
    if (!regex.test(inputChar)) {
      event.preventDefault(); // Bloquea la entrada del carácter no permitido
    }
  }
  // Navega al formulario de registro
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
