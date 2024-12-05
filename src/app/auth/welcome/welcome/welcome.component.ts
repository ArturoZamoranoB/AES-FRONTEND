import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';// Asegúrate de importar correctamente el servicio

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {

  constructor(
    private router: Router,       // Inyecta Router para la navegación
    private authService: AuthService  // Inyecta AuthService para gestionar autenticación
  ) {}

  // Función para redirigir al encriptador
  goToEncrypt() {
    this.router.navigate(['/encrypt']);
  }

  // Función para realizar el logout
  goTologout() {
    this.authService.logout(); // Llama al método logout de AuthService
    this.router.navigate(['/login']); // Redirige a la página de login
  }
}
